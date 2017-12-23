"""
This file is responsible for loading all the data into the database
from the output file of course_parser.py.
"""

import mysql.connector

# TODO: Modularize code:
#           Database information on a config file to be shared with server/model
#           Command line arguments possibly for file.
#
#       Don't want to double insert so check database or ensure file
#       has non-contained data


# Connect to our database and establish a connection
cnx = mysql.connector.connect(user='root', password='secretPassword',
                              host='127.0.0.1',
                              database="coreval")
cursor = cnx.cursor();

"""
Read the formatted csv file, parse each line for a information,
and insert the information to a sql database.
"""
def load_data():
    data_set = open("./data.csv", "r")
    for line in data_set:
        # Skip empty lines.
        if line != "\n":
            # Parse the line for information.
            line = line.replace("\n", "")
            line_tokens = line.split(",")

            # Rating tokens take the form of ['float', 'float', 'float', 'float']
            # Steps to parse: Remove bracks, replace "'" with empty and then split by ", "
            rating_tokens = ((line_tokens[2])[1: len(line_tokens[2]) - 1]).replace("'", "").split(" ")

            # Create a map of this course eval info and add to database.
            eval_data =  {
                "professor": line_tokens[0],
                "course": line_tokens[1],
                "quarter": line_tokens[3],
                "overall": float(rating_tokens[0]),
                "content": float(rating_tokens[1]),
                "contribution": float(rating_tokens[2]),
                "effectiveness": float(rating_tokens[3]),
                "numSurveyed": int(line_tokens[4])
            }
            add_to_sql(eval_data)
    data_set.close()

"""
Given course eval data, upload it to my sql.
param eval_data: Information for a specific row in our database in the form of a map.
"""
def add_to_sql(eval_data):
    add_eval = ("INSERT INTO evaluations "
                "(professor, course, quarter, overall, content, contribution, effectiveness, numSurveyed) "
                "VALUES (%(professor)s, %(course)s, %(quarter)s, %(overall)s, %(content)s, %(contribution)s, "
                "%(effectiveness)s, %(numSurveyed)s)")
    cursor.execute(add_eval, eval_data)
    cnx.commit()


# Parse the data, insert into data base and close connection.
def main():
    load_data()
    cursor.close()
    cnx.close()

if __name__ == "__main__":
    main()
