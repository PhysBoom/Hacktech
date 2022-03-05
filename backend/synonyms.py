from sentences import SentenceAnalyzer

from sentence_transformers import SentenceTransformer, util
from nltk.corpus import wordnet
from wordfreq import word_frequency

import language_tool_python
from english_words import english_words_lower_set

from random_word import RandomWords
r = RandomWords()

import numpy as np
import random
import nltk

class Synonyms:
    def __init__(self, score=0):
        self.score = score
        self.sentence_analyzer = SentenceAnalyzer.get_instance()

    def gen_word(self):
        list_of_words = list(english_words_lower_set)
        return random.choice(list_of_words)
    
    def game(self):
        s1 = self.gen_word()    
        s2 = input(f"Enter a synonym or definition for {s1}: ")
        if self.sentence_analyzer.get_similarity_scores(s1, s2) > 0.6 and s1 != s2:
            print("Correct!")
            self.score += SentenceAnalyzer.complexity(s2)
            print(self.score)
        else:    
            print(f"Incorrect! {s2} is not a synonym for {s1}.")
            print(self.score)

synonyms = Synonyms()
for i in range(20):
    synonyms.game()