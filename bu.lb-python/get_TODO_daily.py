#!/usr/bin/python
from database import get_todos_daily
from email_table import get_idea_table
from email_helper import send_ideas

data = {
    'title': "TODOS",
    'ideas': get_todos_daily()
    }

table = {
    'table': get_idea_table(data),
    'title': data['title']
}

send_ideas(table)
