#!/usr/bin/python
from database import get_wins
from email_table import get_idea_table
from email_helper import send_ideas

if (len(get_wins()) > 1):

    data = {
        'title': "Wins",
        'ideas': get_wins()
        }

    table = {
        'table': get_idea_table(data),
        'title': data['title']
    }

    send_ideas(table)

else:
    exit()
