from bs4 import BeautifulSoup
import requests
from urllib.request import urlopen
import os
import ssl
from .decorators import limit_scraping
from bing_image_downloader import downloader


def get_html_document(url):
    response = requests.get(url)
    return response.text


@limit_scraping
def save_img_from_url(fb_url, save_to_file=True, download_folder="media/img_downloads"):
    """
    Having URL, scrap the site and save images.
    """
    url_to_scrape = fb_url
    html_document = get_html_document(url_to_scrape)
    soup = BeautifulSoup(html_document, 'html.parser')

    images = soup.find_all('img')
    i = images[0].get('src')

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
            print(e)

    return images


def save_img_by_query(query, output_dir='media/bing_img_downloads'):
    downloader.download(
        query,
        limit=1,
        output_dir=output_dir,
        adult_filter_off=True,
        force_replace=False,
        timeout=60,
        verbose=True)


if __name__ == "__main__":
    pass
