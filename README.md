# CoreVal
![alt text](https://github.com/UWHack/CoreVal/blob/master/images/logo.png "CoreVal logo")

**CoreVal** is a project that provides a parser and online search engine for the University of 
Washington course evaluation catalog.

A Python based parser uses Selenium to crawl the University of Washington course catalog and parse 
course data from the entirety of the University of Washington course evaluation catalog. The 
scrapped data is hosted on a online Firebase database and then is connected to a React based 
website to service user queries.

Currently the parser only supports the course evaluation data from the last year as that is the
only publicly available data.


## Demonstration
[Prototype](https://projects.invisionapp.com/share/PXERSPO2Q#/screens 
"Prototype")
## Requirements
* Python 3.X
* Selenium
* Google Chrome

## Usage
### Parser
To use the parser install the required libraries with followings commands:
```shell
$ pip install selenium
```
To execute the parser from the shell call the parser using the following commands:
```shell
$ python course_parser.py True
```
Note that the last argument is an command line argument that determines whether or not the the
Selenium Chrome browser should graphically display. Pass in True to not to display the browser
and False to not display it.

### Settings
You(the user) should fill in your information in the settings.ini file with their own relevant
University of Washington NetID username and password. Note: the file only lives locally on the 
host computer.

## Contributors
- William Kim
- Thoa Nguyen
- Tuan Ma
- Tony Vo
