from bs4 import BeautifulSoup
import urllib.request

from selenium import webdriver


def parse_letter(letter):
    # Define a driver.
    driver = webdriver.Firefox()

    # Navigate theo global url for a letter.
    base_url = "https://www.washington.edu/cec/" + letter + "-toc.html"
    driver.get(base_url)

    # Log in to UW.
    response = urllib.request.urlopen(base_url)
    username_location = driver.find_element_by_id("weblogin_netid")
    username_location.send_keys("tuanma")

    password_location = driver.find_element_by_id("weblogin_password")
    password_location.send_keys("Lovelove1!")

    send_button = driver.find_element_by_name("submit").submit()
    html = response.read()

def main():
    for x in range(97, 123):
        # Append the character to the base URL.
        parse_letter(chr(x))
parse_letter("a")