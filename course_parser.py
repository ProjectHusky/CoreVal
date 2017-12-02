from bs4 import BeautifulSoup
import urllib.request

from selenium import webdriver


def setup_browser():
    """
    This method sets up a browser for the scraper.

    :return: A Chrome browser object.
    """

    options = webdriver.ChromeOptions()
    options.add_experimental_option('prefs', {'credentials_enable_service': False})  # Ignore saving password
    browser = webdriver.Chrome(executable_path="chromedriver.exe", chrome_options=options)  # Create the Chrome browser
    return browser


def parse_letter(letter, browser):
    browser.get("https://www.washington.edu/cec/c/CEE220A4696.html")
    print(browser.page_source.split("\n"))

def main():
    # Navigate theo global url for a letter.
    #base_url = "https://www.washington.edu/cec/" + letter + "-toc.html"

    # driver.get(base_url)  # Go to Venmo URL to login.
    #
    # # Log in to UW.
    # username_location = driver.find_element_by_id("weblogin_netid")
    # username_location.send_keys("tuanma")
    #
    # password_location = driver.find_element_by_id("weblogin_password")
    # password_location.send_keys("Lovelove1!")
    #
    # send_button = driver.find_element_by_tag_name("input").submit()

    browser = setup_browser()
    for x in range(97, 123):
        # Append the character to the base URL.
        parse_letter(chr(x), browser)
parse_letter("a")