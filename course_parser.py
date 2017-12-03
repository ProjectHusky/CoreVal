from selenium import webdriver
import csv
import configparser


def setup_browser(is_headless):
    """
    This methods sets up the browser object that is to be used for parsing.

    :param is_headless: This boolean value determines whether the browser is displayed as it is browsing.
    :return: A Google Chrome browser object.
    """

    # Setup your browser object and its options.
    options = webdriver.ChromeOptions()
    options.add_experimental_option('prefs', {'credentials_enable_service': False})
    # The parameter value determines whether or not the browser is visually shown.
    if is_headless:
        options.add_argument("headless")
    browser = webdriver.Chrome(executable_path="chromedriver.exe", chrome_options=options)

    # Setup a parser for the config
    config = configparser.ConfigParser()
    config.read("settings.ini")
    username = config["credentials"]["username"]
    password = config["credentials"]["password"]

    # Navigate to a University of Washington page to login. Note that this username will be used to log in the entire
    # time while scrapping.
    browser.get("https://www.washington.edu/cec/a-toc.html")

    # Input the username field.
    username_location = browser.find_element_by_id("weblogin_netid")
    username_location.send_keys(username)

    # Input the password field.
    password_location = browser.find_element_by_id("weblogin_password")
    password_location.send_keys(password)

    # Send the information.
    send_button = browser.find_element_by_tag_name("input").submit()
    return browser


def parse_site(course_link, browser):
    """
    Gets the raw HTML code for a given course.

    :param course_link: The course code for the course.
    :param browser: The browser object to use.
    :return: A list containing the lines of the HTML code.
    """

    browser.get("https://www.washington.edu/cec/" + course_link)
    return browser.page_source.split("\n")


def parse_letter(letter, browser):
    """
    Parses the main directory for a given letter and returns a reference to all course that begin with said letter.

    :param letter: The letter to query.
    :param browser: The browser to use.
    :return: A list containing the codes for all the course evaluations for the letter.
    """
    # Navigate to the URL.
    base_url = "https://www.washington.edu/cec/" + letter + "-toc.html"
    browser.get(base_url)

    # Get the HTML code for the page. Remove any irrelevant lines.
    html = browser.page_source.split("\n")[58:]
    # Cut off any lines that are needed.
    html = html[:html.index("<p></p>")]

    # Stores all the URLs in a list and return them.
    courses = []
    for line in html:
        line = line[9:line.find(">") - 1]
        # If actual course ID contains an ampersand we need to replace the parsed line because it will contain an HTML
        # ampersand. Replace it with an actual ampersand.
        if "&amp;" in line:
            line = line.replace('&amp;', '&')
        courses.append(line)
    return courses


def parse_all_letters(browser):
    """
    Goes through the entire directory for a letter and then returns a list containing all the links for all letters.

    :param browser: The browser object to use.
    :return: A list of list, where each list is the course links for a specific letter.
    """
    all_links = []
    # Note that 'a' in ASCII is 97 and 'z' is 122, so we need to loop from 97 - 122 inclusive.
    for x in range(97, 123):
        # chr(x) converts the integer to a character.
        all_links.append(parse_letter(chr(x), browser))
    return all_links


def get_course_id(course):
    """
    This method takes in a course code for a class and then extracts the course ID from it.

    :param course: The course code to parse.
    :return: The course ID for the class.
    """

    # This flag determines whether or not you have already seen a digit.
    finish = False

    # Note that we do not want the section letter i.e. we want CSE 142 rather than CSE 142B. The flag remedies this.

    # Get rid of the first two letters. We do not want the / and the first letter of the course.
    copy = course[2:]

    # This holds the resulting string.
    result = ""

    # Loop through every character and decide whether to add it.
    for x in copy:
        # If you see have you already seen a digit and then you see a character, then you should stop.
        if finish and x.isalpha():
            return result

        # If you see a digit, change the flag.
        if x.isdigit():
            finish = True

        # If you have not already returned, add the character to the resulting string.
        result = result + x


def parse_course(course, html):
    """
    Parses the URL of a class for the relevant data and puts them into a return value.

    :param course: The course code.
    :param html: The HTML code of the course page.
    :return: A list containing all our data.
    """
    # Setup a list with dummy variables.
    course_data = ["", "", "", "", ""]
    # Parse the course ID.
    course_data[1] = get_course_id(course)
    # Setup an array to hold all the ratings.
    ratings = []
    # Go through every line in the HTML and check what kind of line it is. If its a special line then you should parse
    # it for the relevant information.
    for line in html:
        # This means it is a ratings line.
        if line.startswith("<tr><td>"):
            # Delete any extra HTML code.
            ratings.append(line[len(line) - 14:-11])
        # This means it is the line containing the number of students.
        elif line.startswith("<caption"):
            # Delete all the text between the first 4 quotes.
            for x in range(0, 3):
                line = line[line.index("\"") + 1:]
            # Delete anything from the start to the first quote.
            line = line[:line.index("\"")]
            # Add it to the list.
            course_data[4] = line
        # This means it is the line that contains both the teacher name and the date that they taught.
        elif line.startswith("<h2>"):
            # Replace the HTML hard spaces with normal spaces.
            line = line.replace(u'\xa0', u' ')
            # Delete any extra HTML characters and split it.
            line = line[4:-5].split("   ")
            # Do not add the second element in the line, it is the title of the professor. This is not really relevant
            # to students so it is not required.
            course_data[0] = line[0]
            course_data[3] = line[2]
    # Add the ratings after you have looped through everything.
    course_data[2] = ratings

    return course_data


def main(display):
    """
    This is the main program that runs and connects all the methods together to parse the entire UW course catalog.

    :param display: A boolean value that is passed into the setting up browser to determine whether or not the
    browser is graphically displayed when the parsing occurs.
    :return: N/A void.
    """
    # Setup the browser.
    browser = setup_browser(not display)
    # Open a csv file to write and a csv writer.
    csv_file = open("data.csv", "w")
    csv_writer = csv.writer(csv_file)
    # Gets all the courses.
    all_courses = parse_all_letters(browser)

    # Loop through every list in the list of all courses.
    for letter_course in all_courses:
        # Go through every course for each letter.
        for course in letter_course:
            # Get the HTML code for the course.
            html = parse_site(course, browser)
            # Parse the HTML code for the data needed.
            course_data = parse_course(course, html)

            # Decides whether or not the parsed information should be displayed to console.
            if display:
                print(course_data)
            # Replace the list in the 3rd argument with a string and replace the commas with spaces for easier parsing.
            course_data[2] = str(course_data[2]).replace(", ", " ")

            # Write the list to disk as the csv file.
            # csv_writer.writerow(course_data)
    csv_file.close()


main(False)
