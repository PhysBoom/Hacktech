import json
from .firebase_interactor import push_object, get_object

class FirebasePushableObject:
    """
    Any JSON-able object that is pushed to Firebase.
    """

    def __init__(self, parent_path, object_id, **kwargs):
        self.parent_path = parent_path
        self.object_id = object_id
        self.__dict__.update(kwargs)

    def to_dict(self):
        return self.__dict__

    def to_json(self):
        return json.dumps(self, indent=4, default=lambda o: o.__dict__)

    def push(self):
        """
        Pushes the object to Firebase
        """
        path = self.parent_path + '/' + self.object_id
        push_object(path, self.to_json())

    def load(self):
        """
        Gets the object from Firebase.
        """
        path = self.parent_path + '/' + self.object_id
        # Get the data from the path
        data = get_object(path)
        # Create a new object from the data
        return self.from_dict(**data)

    def from_dict(self, **kwargs):
        """
        Creates a FirebasePushableObject from a dictionary
        """
        parent_path = kwargs.pop('parent_path')
        object_id = kwargs.pop('object_id')
        self.__init__(parent_path, object_id, **kwargs)







