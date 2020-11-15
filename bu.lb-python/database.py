#!/usr/bin/python
from database_con import get_connection

def get_weekly_ideas():
    db = get_connection()
    cursor = db.cursor()
    cursor.execute("""SELECT * FROM ideas \
                   WHERE date(time_submitted) >= CURDATE() - interval 7 day \
                   AND NOT category='Playcount';""")
    return cursor.fetchall()

def get_todos_daily():
    db = get_connection()
    cursor = db.cursor()
    cursor.execute("""SELECT * FROM ideas \
                   WHERE date(time_submitted) >= CURDATE() - interval 3 day \
                   AND category = 'TODO';""")
    return cursor.fetchall()

def get_playcounts():
    db = get_connection()
    cursor = db.cursor()
    cursor.execute("""SELECT * FROM ideas \
                   WHERE date(time_submitted) >= CURDATE() - interval 7 day \
		   AND category = 'Playcount';""")
    return cursor.fetchall()

def get_monthly_ideas():
    db = get_connection()
    cursor = db.cursor()
    cursor.execute("""SELECT * FROM ideas \
                   WHERE date(time_submitted) >= CURDATE() - interval 1 month \
		   AND NOT category = 'Playcount';""")
    return cursor.fetchall()

def get_quarterly_ideas():
    db = get_connection()
    cursor = db.cursor()
    cursor.execute("""SELECT * FROM ideas \
                   WHERE date(time_submitted) >= CURDATE() - interval 3 month \
		   AND NOT category = 'Playcount';""")
    return cursor.fetchall()

def get_yearly_ideas():
    db = get_connection()
    cursor = db.cursor()
    cursor.execute("""SELECT * FROM ideas \
                   WHERE date(time_submitted) >= CURDATE() - interval 1 year \
		   AND NOT category = 'Playcount';""")
    return cursor.fetchall()
