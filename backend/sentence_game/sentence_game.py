from sentences import SentenceAnalyzer
import uuid
from utility.firebase_pushable_object import FirebasePushableObject


class SentenceGame(FirebasePushableObject):
    """
    The SentenceGame class for the replace the sentence game thing.
    :param <string[]> past_words: The past words that the user has used.
    :param <int> score: The score of the user.
    :param <int> rounds: The number of rounds to play
    :param <int> round_number: The current round number.
    :param <string> sentence: The sentence to be replaced.
    """

    def __init__(
        self,
        parent_path="SentenceGames",
        object_id=None,
        past_words=[],
        score=0,
        rounds=10,
        round_number=1,
        sentence=None,
    ):
        # Generate a random UUIDv4 for game_id if its none.
        if object_id is None:
            self.object_id = str(uuid.uuid4())
        else:
            self.object_id = object_id
        self.parent_path = parent_path
        self.past_words = past_words
        self.score = score
        self.sentence_analyzer = SentenceAnalyzer.get_instance()
        self.rounds = rounds
        self.round_number = round_number
        if not sentence:
            self._generate_sentence()
        else:
            self.sentence = sentence

    def _generate_sentence(self):
        self.sentence = self.sentence_analyzer.generate_random_sentence()

    def play_round(self, new_sentence):

        if new_sentence in self.past_words:
            return {"score": self.score, "message": "You already played this sentence!"}
        self.past_words.append(new_sentence)
        if self.sentence_analyzer.check_grammar(new_sentence):
            return {
                "score": self.score,
                "message": "This sentence is grammatically incorrect!",
            }

        similarity = self.sentence_analyzer.get_similarity_scores(
            self.sentence, new_sentence
        )

        if similarity < 0.82:
            return {
                "score": self.score,
                "message": "This sentence is not similar enough!",
            }

        self.score += SentenceAnalyzer.get_sentence_complexity(new_sentence)
        return {"score": self.score, "message": "Good sentence!"}

    def is_finished(self):
        return self.round_number >= self.rounds

    def to_json(self):
        tmp = self.sentence_analyzer
        self.sentence_analyzer = None
        resp = super().to_json()
        self.sentence_analyzer = tmp
        return resp

    def play_game(self):
        print(self.sentence)
        for i in range(self.rounds):
            new_sentence = input("Sentence: ")
            result = self._play_round(new_sentence)
            print(result["message"])
            print(f"Score: {result['score']}")
            print("\n")

        # Print final score.
        print(f"Final score: {self.score}")
