"""
     Mock server
"""
import json
import random

from flask import Flask, request
from idea import Idea

app = Flask(__name__)

ideas = [
    Idea("1", "Test idea", "Programming", ""),
    Idea("2", "Bigger idea", "Programming", ""),
    Idea("3", "Test idea\nTest ideas this is the sameidea", "Example", ""),
    Idea("4", "Test general idea", "General", ""),
]

@app.route("/rest/v1/ideas")
def ideas():
    """
    Ideas endpoint
    """
    global ideas
    return json.dumps(ideas, default=lambda o: o.__dict__)


@app.route("/rest/v1/submitIdea", methods=["POST"])
def submitIdeas():
    """
    post ideas
    """
    global ideas
    print(request.form)
    return {}
