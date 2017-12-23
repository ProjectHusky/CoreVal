import mysql.connector

cnx = mysql.connector.connect(user='root', password='Firefox00!',
                              host='127.0.0.1',
                              database="coreval")
cursor = cnx.cursor();


def load_data():
    data_set = open("./data.csv", "r")
    for line in data_set:
        if line != "\n":
            line = line.replace("\n", "")
            line_tokens = line.split(",")

            rating_tokens = ((line_tokens[2])[1: len(line_tokens[2]) - 1]).replace("'", "").split(" ")
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


def add_to_sql(eval_data):
    add_eval = ("INSERT INTO evaluations "
                "(professor, course, quarter, overall, content, contribution, effectiveness, numSurveyed) "
                "VALUES (%(professor)s, %(course)s, %(quarter)s, %(overall)s, %(content)s, %(contribution)s, "
                "%(effectiveness)s, %(numSurveyed)s)")
    cursor.execute(add_eval, eval_data)
    cnx.commit()


load_data()
cursor.close()
cnx.close()


