from utility.firebase_pushable_object import FirebasePushableObject

class User(FirebasePushableObject):
    """
    Base user class.

    :param <string> email: The email of the user
    :param <UUIDv4[]> sentence_game_games: IDs of active sentence game games owned by the user
    :param <int> exp: Experience
    """
    def __init__(self, parent_path="Users", object_id=None, email=None, sentence_game_games=None, exp=0):
        super().__init__(parent_path, object_id)
        self.email = email
        if self.sentence_game_games is not None:
            self.sentence_game_games = sentence_game_games
        else:
            self.sentence_game_games = []
        self.exp = exp

    def add_sentence_game(self, sentence_game_id):
        self.sentence_game_games.append(sentence_game_id)

    def remove_sentence_game(self, sentence_game_id):
        self.sentence_game_games.remove(sentence_game_id)
        print(self.sentence_game_games)


