"""
    The Idea model class
"""
import json

from dataclasses import asdict, dataclass


@dataclass
class Idea:
    """
    The idea model
    """

    id: str
    idea: str
    category: str
    timeSubmitted: str

    @property
    def __dict__(self):
        """
        get a python dictionary
        """
        return asdict(self)

    @property
    def json(self):
        """
        get the json formated string
        """
        return dumps(self.__dict__)
