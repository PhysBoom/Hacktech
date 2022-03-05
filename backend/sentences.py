from sentence_transformers import SentenceTransformer, util
from nltk.corpus import wordnet
from wordfreq import word_frequency

import language_tool_python


import numpy as np
import random
import nltk

nltk.download("wordnet")


class SentenceAnalyzer:
    MOST_FREQUENT_WORD = 0.0537  # Frequency of "the"
    FREQUENCY_MULTIPLIER = 1 / MOST_FREQUENT_WORD

    """
  A singleton class for sentence analysis.
  """
    __instance = None

    def __init__(self):
        if SentenceAnalyzer.__instance is None:
            SentenceAnalyzer.__instance = self
            self.model = SentenceTransformer("stsb-roberta-large")
            self.tool = language_tool_python.LanguageTool("en-US")
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
            return np.log(
                1
                / (
                    SentenceAnalyzer.frequency(word)
                    * SentenceAnalyzer.FREQUENCY_MULTIPLIER
                )
            )
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
        nouns = ["You","I","They","He","She","Jaden","Ethan", "Kaylee", "Matthew", "Sarah", "Catherine", "Leonard", "Bradbury", "Moses", "Noah", "Miles", "Evan", "Sam", "Enzo", "Heather", "Hana", "Hannah", "Mr. Maine", "Mr. Nguyen", "Ms. Underwood", "Max", "Zander", "Wesley"]
        verbsI = ["enjoy", "like", "love", "dislike", "hate", "despise", "appreciate","adore", "fancy", "loathe", "detest", "abhor"]
        verbsNotI = ["enjoys","likes","loves","dislikes", "despises","hates","appreciates","adores","fancies","loathes","detests","abhors"]
        gerund = ["walking", "running", "sprinting", "jogging", "ice skating", "skiing", "jumping", "bungee jumping", "skydiving", "bowling", "dancing", "making money", "wasting time", "swimming", "snowboarding", "taking the bus", "traveling", "watching Netflix", "playing Valorant", "playing Fortnite", "playing Minecraft", "playing Chess", "programming", "drinking water"]
        prob1 = random.randint(1, 100)
        prob2 = random.randint(1, 100)
        noun_choice = random.choice(nouns)
        while not text or self.tool.check(text):
            text = f"{noun_choice} {random.choice(verbsI) if noun_choice in ['I', 'You', 'They'] else random.choice(verbsNotI)} {random.choice(gerund)}"
        return text

    def check_grammar(self, sentence):
        return self.tool.check(sentence)
