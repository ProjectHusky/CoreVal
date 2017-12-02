import urllib.request
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

def parse_site(letter, browser):
    browser.get("https://www.washington.edu/cec/" + letter)
    return browser.page_source.split("\n")

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
    return all_links

def get_courseID(course):
    finish = False
    copy = course[2:]
    result = ""
    for x in copy:
        if finish and x.isalpha():
            return result

        if x.isdigit():
            finish = True
        result = result + x

def parse_course(course, html):
    course_data = ["", "", "", "", ""]
    course_data[1] = get_courseID(course)
    ratings = []
    for line in html:
        if line.startswith("<tr><td>"):
            ratings.append(line[len(line) - 14:-11])
        elif line.startswith("<caption"):
            for x in range(0, 3):
                line = line[line.index("\"") + 1:]
            line = line[:line.index("\"")]
            course_data[4] = line
        elif line.startswith("<h2>"):
            line = line.replace(u'\xa0', u' ')
            line = line[4:-5].split("   ")
            course_data[0] = line[0]
            course_data[3] = line[2]
    course_data[2] = ratings
    return course_data


def main():
    browser = setup_browser(True)
    all_courses = parse_all_letters(browser)
    for letter_course in all_courses:
        for course in letter_course:
            html = parse_site(course, browser)
            print(parse_course(course, html))
            # adjust the print to include the professor, courseID, ratings (call above), quarter, number enrolled

main()

# prints all the numbers
# print('[%s]' % ', '.join(map(str, extract_data(retrieve_lines(parse_letter("a/AA210A1311.html", setup_browser()))))))


# place given file for specific professor
# example --- parse_professor(the file from the site -> "a/AA210A1311")

