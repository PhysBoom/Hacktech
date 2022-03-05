from sentence_transformers import SentenceTransformer, util
from nltk.corpus import wordnet
from wordfreq import word_frequency

import language_tool_python
tool = language_tool_python.LanguageTool('en-US')

import numpy as np
import random
import nltk
nltk.download("wordnet")

model = SentenceTransformer('stsb-roberta-large')

MOST_FREQUENT_WORD = 0.0537 # Frequency of "the"
FREQUENCY_MULTIPLIER = 1/MOST_FREQUENT_WORD

class SentenceGame:
  def __init__(self, past_words=[], score=0):
    self.past_words = past_words
    self.score = score
    self.generate_sentence()

  def generate_sentence(self):
    
    text = ""
    while not text or tool.check(text):
      text= f"I {random.choice(verbs)} {random.choice(gerund_list)}"

    return text
  
  def get_score(self):



def get_similarity_scores(s1, s2):
  embedding1 = model.encode(s1, convert_to_tensor=True)
  embedding2 = model.encode(s2, convert_to_tensor=True)
  cosine_scores = util.pytorch_cos_sim(embedding1, embedding2)
  return cosine_scores.item()
  

def frequency(word):
    return word_frequency(word, "en")


def complexity(word):
  if frequency(word) > 1e-10:
    return np.log(1/(frequency(word) * FREQUENCY_MULTIPLIER))
  return 15


verbs=["enjoy", "like", "hate", "despise", "thoroughly enjoy", "love", "absolutely hate"]
gerund_list=["walking","running","swimming", "biking", "sprinting", "boating", "skiing"]
adverb_list=["quickly", "swimmingly"]
adjective_list=["red","blue"]
nouns=["dogs", "cats"]


def random_sentence():
  text = ""
  """
  while not text or tool.check(text):
    text = f"I {random.choice(verbs)} {random.choice(adverb_list)} {random.choice(gerund_list)} {random.choice(adjective_list)} {random.choice(nouns)}"
  """
  while not text or tool.check(text):
    text= f"I {random.choice(verbs)} {random.choice(gerund_list)}"

  return text


def game():
    sent = random_sentence()
    print(sent)
    score = 0
    for i in range(10): # Make this on a timer
        new_sent = input("Sentence: ")
        if tool.check(new_sent): # Grammar check
            print("Grammatically wrong!")
            continue
        if get_similarity_scores(new_sent, sent) > 0.82:
            print("Valid!")
            score += sum([complexity(word) for word in new_sent.split()])
        else:
            print("Invalid!")
        print(f"Your score is {score}")

game()