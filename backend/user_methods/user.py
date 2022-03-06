from utility.firebase_pushable_object import FirebasePushableObject

class User(FirebasePushableObject):
    """
    Base user class.

    :param <string> email: The email of the user
    :param <UUIDv4[]> sentence_game_games: IDs of active sentence game games owned by the user
    :param <int> exp: Experience
    """
    def __init__(self, parent_path="Users", object_id=None, email=None, sentence_game_games=[], exp=0):
        super().__init__(parent_path, object_id)
        self.email = email
        self.sentence_game_games = sentence_game_games
        self.exp = exp

    @staticmethod
    def get_by_uuid(uuid):
        user = User(object_id=uuid)
        user.load()
        return user

    def add_sentence_game(self, sentence_game_id):
        self.sentence_game_games.append(sentence_game_id)


