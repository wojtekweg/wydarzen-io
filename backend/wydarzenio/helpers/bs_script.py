from bs4 import BeautifulSoup
import requests
from urllib.request import urlopen
import ssl
import os


def getHTMLdocument(url):
        response = requests.get(url)
        return response.text


def save_img_from_fb_url(fb_url, save_to_file=False, download_folder="../media/fb_img_downloads"):

    url_to_scrape = fb_url
    html_document = getHTMLdocument(url_to_scrape)
    soup = BeautifulSoup(html_document, 'html.parser')

    img_url = soup.find_all('img')[1].get('src')

    if save_to_file:
        if not os.path.exists(download_folder):
            os.makedirs(download_folder)
        ssl._create_default_https_context = ssl._create_unverified_context
        context = ssl._create_unverified_context()
        data = urlopen(img_url, context=context)
        with open(os.path.join(download_folder, os.path.basename(img_url)), "wb") as f:
            f.write(data.read())

    return img_url
