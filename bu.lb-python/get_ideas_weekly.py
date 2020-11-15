#!/usr/bin/python
from database import get_weekly_ideas
from email_table import get_idea_table
from email_helper import send_ideas

data = {
    'title': "This Week's Ideas",
    'ideas': get_weekly_ideas()
    }

table = {
    'table': get_idea_table(data),
    'title': data['title']
}

send_ideas(table)
