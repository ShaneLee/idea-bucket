#!/usr/bin/python
from database import get_monthly_ideas
from email_table import get_idea_table
from email_helper import send_ideas

data = {
    'title': "This Month's Ideas",
    'ideas': get_monthly_ideas()
    }

table = {
    'table': get_idea_table(data),
    'title': data['title']
}

send_ideas(table)
