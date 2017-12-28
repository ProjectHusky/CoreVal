# CoreVal
![alt text](https://github.com/UWHack/CoreVal/blob/master/client/images/coreval_logo_small.png "CoreVal logo")

### Mission
**CoreVal** is a project that provides a parser and online search engine for the University of 
Washington course evaluation catalog.

# About the project
### Website
The search engine currently deployed onto **Heroku** and uses:
* MySQL (hosted on ClearDB)
* Express (building website and routing)
* React (frontend)
* Nodejs

The website currently has two endpoints
```
The main application lives at:
/

Users can make a request and receive JSON for a specific query:
/api/eval/[query]
```

### Backend parsing
A Python based parser uses Selenium to crawl the University of Washington course catalog and parse 
course data from the entirety of the University of Washington course evaluation catalog. The 
scrapped data is hosted on a online MySQL database and then is connected to a React based 
website to service user queries.

Currently the parser only supports the course evaluation data from the last year as that is the
only publicly available data.
#### Requirements
* Python 3.X
* Selenium
* Google Chrome

#### Usage
##### Parser: /database_admin/course_parser.py
The parser is mostly intended for a server that hosts a database and services the users, however
it is possible to use the scraper to procure a local csv file that contains the course evaluation
data.

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

##### Settings
You(the user) should fill in your information in the settings.ini file with their own relevant
University of Washington NetID username and password. Note: the file only lives locally on the 
host computer.

##### Loader: /database_admin/course_loader.py
The loader is in meant to be executed after the creation of the csv file from the parser.
To be able to use, a MySQL database must be created beforehand.
Note: Please change the configuration in the file to match your settings.

To use the parser install the required libraries with followings commands:
```shell
$ pip install mysql-connector-python-rf
```
To execute the parser from the shell call the parser using the following commands:
```shell
$ python course_loader.py
```
## Contributing
## Setup
```shell
# Clone the repository
$ git clone https://github.com/ProjectHusky/CoreVal.git
$ cd CoreVal
```
Once you have your own local copy of the data. Follow the steps to get the application running on your local machine.
```shell
# Load the data to the database
$ python course_loader.py
```
After changing **../server/model/mysql** to match your settings run: 
```shell
# Install all the dependencies.
$ npm install

# Build the project
$ npm run build

# Start on local server
$ npm start
```

## Disclaimer
The information and data provided is meant to help UW students navigate through course evaluations. We **do not own** any of the data and recommend going through the official UW Course Eval page.

## Contributors
- William Kim
- Thoa Nguyen
- Tuan Ma
- Tony Vo
