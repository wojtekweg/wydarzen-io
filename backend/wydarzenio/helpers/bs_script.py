from bs4 import BeautifulSoup
import requests
from urllib.request import urlopen
import os
import ssl
from .decorators import limit_scraping
from bing_image_downloader import downloader
import random


def get_html_document(url):
    response = requests.get(url)
    return response.text


@limit_scraping
def save_img_from_url(url, save_to_file=True, download_folder="media/img_downloads"):
    """
    Having URL, scrap the site and save images.
    """
    url_to_scrape = url
    html_document = get_html_document(url_to_scrape)
    soup = BeautifulSoup(html_document, 'html.parser')

    images = soup.find_all('img')
    pic_to_get = 1
    if not 'facebook' in url:
        pic_to_get = random.randint(0, len(images)-1)
    i = images[pic_to_get].get('src')  #.split(sep='?', maxsplit=1)[0]

    if save_to_file:
        # move it to helper_scripts.save_img_from_file_to_model
        if not os.path.exists(download_folder):
            os.makedirs(download_folder)

        ssl._create_default_https_context = ssl._create_unverified_context
        context = ssl._create_unverified_context()
        try:
            data = urlopen(i, context=context)
            with open(os.path.join(download_folder, os.path.basename(i)), "wb") as f:
                f.write(data.read())
        except Exception as e:
            # TODO it almost always raise that error
            print(f"[ERROR] Problem with saving the file: {e}")

    return i


def save_img_by_query(query, output_dir='media/bing_img_downloads'):
    downloader.download(
        query,
        limit=1,
        output_dir=output_dir,
        adult_filter_off=True,
        force_replace=False,
        timeout=60,
        verbose=True)


def save_img_from_bing(event_to_update):
    save_img_by_query(event_to_update.title, output_dir='media/event/posters/')
    file_path = f'event/posters/{event_to_update.title}/Image_1.jpg'
    was_picture_updated = "(picture was not updated)"
    try:
        # if file opens, then it can be saved to model
        with open('media/' + file_path, "r"):
            pass
        event_to_update.picture = file_path
        print(f"Updated event {event_to_update.id} picture")
    except IOError:
        event_to_update.picture_can_be_updated = False
        print(f"Set event picture upload to False for {event_to_update.id}")
    finally:
        if event_to_update.picture_can_be_updated:
            was_picture_updated = "(picture was correctly updated)" 
        event_to_update.save()
    return was_picture_updated


if __name__ == "__main__":
    pass
