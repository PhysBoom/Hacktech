import time

from sentences import SentenceAnalyzer
import uuid
from utility.firebase_pushable_object import FirebasePushableObject


class SentenceGame(FirebasePushableObject):
    """
    The SentenceGame class for the replace the sentence game thing.
    :param <dict[] {sentence: score}> past_sentences: The past sentences that the user has used.
    :param <int> score: The score of the user.
    :param <int> rounds: The number of rounds to play
    :param <int> round_number: The current round number.
    :param <string> sentence: The sentence to be replaced.
    :param <UNIX Timestamp> start_time: The time the game started.
    :param <UNIX Timestamp> duration: The duration of the game.
    """

    def __init__(
        self,
        parent_path="SentenceGames",
        object_id=None,
        past_sentences=[],
        score=0,
        rounds=10,
        round_number=1,
        sentence=None,
        start_time=None,
        duration=120
    ):
        # Generate a random UUIDv4 for game_id if its none.
        if object_id is None:
            self.object_id = str(uuid.uuid4())
        else:
            self.object_id = object_id
        self.parent_path = parent_path
        self.past_sentences = past_sentences
        self.score = score
        self.sentence_analyzer = SentenceAnalyzer.get_instance()
        self.rounds = rounds
        self.round_number = round_number
        if not sentence:
            self._generate_sentence()
        else:
            self.sentence = sentence
        self.start_time = start_time or int(time.time())
        self.duration = duration

    def _generate_sentence(self):
        self.sentence = self.sentence_analyzer.generate_random_sentence()

    def play_round(self, new_sentence):
        self.round_number += 1
        if new_sentence in [elem["sentence"] for elem in self.past_sentences]:
            self.past_sentences.append({"sentence": new_sentence, "score": 0})
            return {"score": self.score, "message": "You already played this sentence!"}

        if self.sentence_analyzer.check_grammar(new_sentence):
            self.past_sentences.append({"sentence": new_sentence, "score": 0})
            return {
                "score": self.score,
                "message": "This sentence is grammatically incorrect!",
            }

        similarity = self.sentence_analyzer.get_similarity_scores(
            self.sentence, new_sentence
        )

        if similarity < 0.72:
            self.past_sentences.append({"sentence": new_sentence, "score": 0})
            return {
                "score": self.score,
                "message": "This sentence is not similar enough!",
            }

        new_score = SentenceAnalyzer.get_sentence_complexity(new_sentence)
        self.score += new_score
        self.past_sentences.append({"sentence": new_sentence, "score": new_score})
        return {"score": self.score, "message": "Good sentence!"}

    def is_finished(self):
        return self.round_number >= self.rounds or int(time.time()) - self.start_time > self.duration

    def to_json(self):
        tmp = self.sentence_analyzer
        self.sentence_analyzer = None
        resp = super().to_json()
        self.sentence_analyzer = tmp
        return resp
