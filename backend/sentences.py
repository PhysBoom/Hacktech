from sentence_transformers import SentenceTransformer, util
from nltk.corpus import wordnet
from wordfreq import word_frequency

import language_tool_python


import numpy as np
import random
import nltk
nltk.download("wordnet")




class SentenceAnalyzer:
  MOST_FREQUENT_WORD = 0.0537 # Frequency of "the"
  FREQUENCY_MULTIPLIER = 1/MOST_FREQUENT_WORD

  """
  A singleton class for sentence analysis.
  """
  __instance = None

  def __init__(self):
    if SentenceAnalyzer.__instance is None:
      SentenceAnalyzer.__instance = self
      self.model = SentenceTransformer('stsb-roberta-large')
      self.tool = language_tool_python.LanguageTool('en-US')
    else:
      raise Exception("SentenceAnalyzer is a singleton class!")

  @staticmethod
  def get_instance():
    if SentenceAnalyzer.__instance is None:
      SentenceAnalyzer()
    return SentenceAnalyzer.__instance

  @staticmethod
  def frequency(word):
    return word_frequency(word, "en")

  @staticmethod
  def complexity(word):
    if SentenceAnalyzer.frequency(word) > 1e-10:
      return np.log(1/(SentenceAnalyzer.frequency(word) * SentenceAnalyzer.FREQUENCY_MULTIPLIER))
    return 15

  @staticmethod
  def get_sentence_complexity(sentence):
    return sum([SentenceAnalyzer.complexity(word) for word in sentence.split()])

  def get_similarity_scores(self, s1, s2):
    embedding1 = self.model.encode(s1, convert_to_tensor=True)
    embedding2 = self.model.encode(s2, convert_to_tensor=True)
    cosine_scores = util.pytorch_cos_sim(embedding1, embedding2)
    return cosine_scores.item()

  def generate_random_sentence(self):
    text = ""
    verbs=["enjoy", "like", "hate", "despise", "thoroughly enjoy", "love", "absolutely hate"]
    gerund_list=["walking","running","swimming", "biking", "sprinting", "boating", "skiing"]
    adverb_list=["quickly", "swimmingly"]
    adjective_list=["red","blue"]
    nouns=["dogs", "cats"]
    while not text or self.tool.check(text):
      text= f"I {random.choice(verbs)} {random.choice(gerund_list)}"

    return text

  def check_grammar(self, sentence):
    return self.tool.check(sentence)
  

class SentenceGame:
  def __init__(self, past_words=[], score=0, rounds=10):
    self.past_words = past_words
    self.score = score
    self.sentence_analyzer = SentenceAnalyzer.get_instance()
    self.rounds = rounds
    self._generate_sentence()

  def _generate_sentence(self):
    self.sentence = self.sentence_analyzer.generate_random_sentence()

  def _play_round(self, new_sentence):
    self.past_words.append(new_sentence)
    if new_sentence in self.past_words:
      return {"score": self.score, "message": "You already played this sentence!"}

    if self.sentence_analyzer.check_grammar(new_sentence):
      return {"score": self.score, "message": "This sentence is grammatically incorrect!"}

    similarity = self.sentence_analyzer.get_similarity_scores(self.sentence, new_sentence)
    
    if similarity < 0.82:
      return {"score": self.score, "message": "This sentence is not similar enough!"}
    
    self.score += SentenceAnalyzer.get_sentence_complexity(new_sentence)
    return {"score": self.score, "message": "Good sentence!"}

  def play_game(self):
    for i in range(self.rounds):
      new_sentence = input("Sentence: ")
      result = self._play_round(new_sentence)
      print(result["message"])
      print(f"Score: {result['score']}")
      print("\n")

    # Print final score.
    print(f"Final score: {self.score}")

if __name__ == "__main__":
  game = SentenceGame()
  game.play_game()     