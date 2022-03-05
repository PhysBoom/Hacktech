import json


class FirebasePushableObject:
    """
    Any JSON-able object that is pushed to Firebase.
    """

    def __init__(self, **kwargs):
        self.__dict__.update(kwargs)

    def to_dict(self):
        return self.__dict__

    def to_json(self):
        return json.dumps(self.to_dict())
