#!/usr/bin/python
from database import get_playcounts
from email_table import get_idea_table
from email_helper import send_ideas

if (len(get_playcounts()) > 1):

    data = {
        'title': "Playcounts",
        'ideas': get_playcounts()
        }

    table = {
        'table': get_idea_table(data),
        'title': data['title']
    }

    send_ideas(table)

else:
    exit()
