from bs4 import BeautifulSoup
import requests
from urllib.request import urlopen
import os
import ssl
from .decorators import limit_scraping


def get_html_document(url):
    response = requests.get(url)
    return response.text


@limit_scraping
def save_img_from_fb_url(fb_url, save_to_file=True, download_folder="../media/fb_img_downloads"):
    """
    Having URL, scrap the site and save images.
    """
    url_to_scrape = fb_url
    html_document = get_html_document(url_to_scrape)
    soup = BeautifulSoup(html_document, 'html.parser')

    images = soup.find_all('img')
    images = [i.get('src') for i in images]

    for i in images:
        if save_to_file:
            if not os.path.exists(download_folder):
                os.makedirs(download_folder)

            # TODO review that SSL call
            ssl._create_default_https_context = ssl._create_unverified_context
            context = ssl._create_unverified_context()
            try:
                data = urlopen(i, context=context)
                with open(os.path.join(download_folder, os.path.basename(i)), "wb") as f:
                    f.write(data.read())
            except Exception as e:
                print(e)
                continue

    return images


if __name__ == "__main__":
    pass
