from selenium import webdriver


def setup_browser(headless):
    """
    This method sets up a browser for the scraper.

    :return: A Chrome browser object.
    """

    options = webdriver.ChromeOptions()
    options.add_experimental_option('prefs', {'credentials_enable_service': False})  # Ignore saving password
    if headless:
        options.add_argument("headless")
    browser = webdriver.Chrome(executable_path="chromedriver.exe", chrome_options=options)  # Create the Chrome browser
    browser.get("https://www.washington.edu/cec/a-toc.html")  # Go to UW URL to login.

    # Log in to UW.
    username_location = browser.find_element_by_id("weblogin_netid")
    username_location.send_keys("tuanma")

    password_location = browser.find_element_by_id("weblogin_password")
    password_location.send_keys("Lovelove1!")

    send_button = browser.find_element_by_tag_name("input").submit()
    return browser


def parse_letter(letter, browser):
    """
    Parses the webpage for a given letter and returns a list of all course evaluations for that letter.

    :param letter: The letter to query.
    :param browser: The browser to use.
    :return: A list containing the codes for all the course evaluations for the letter.
    """
    base_url = "https://www.washington.edu/cec/" + letter + "-toc.html"
    browser.get(base_url)
    html = browser.page_source.split("\n")[58:]
    html = html[:html.index("<p></p>")]

    courses = []
    for line in html:
        line = line[9:line.find(">") - 1]
        courses.append(line)
    return courses


def parse_all_letters(browser):
    all_links = []
    for x in range(97, 123):
        all_links.append(parse_letter(chr(x), browser))
    print(all_links)


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
    #

    browser = setup_browser(True)
    parse_all_letters(browser)

main()