import json

from flask import request, send_file, Blueprint
from .sentence_game import SentenceGame

# Blueprint for the sentence game
sentence_game_blueprint = Blueprint(
    "sentence-game", __name__, url_prefix="/sentence-game"
)


@sentence_game_blueprint.route("/new", methods=["POST"])
def new_game():
    """
    Creates a new game and returns the game id.
    :return: {success: bool, game_id: UUIDv4}
    """
    game = SentenceGame()
    game.push()
    return {"success": True, "game_id": game.object_id}

@sentence_game_blueprint.route("/<game_id>/play-round", methods=["POST"])
def play_round(game_id):
    """
    Utilizes the SentenceGame's play_round to play a round.
    :param <UUIDv4> game_id: Id of the game

    JSON Parameters:
    :param <string> sentence: The sentence submitted by the player.

    :return: JSONified game object + success
    """
    game = SentenceGame(object_id=game_id)
    game.load()
    if game.is_finished():
        return {"success": False, "error": "Game is finished."}
    sentence = request.json["sentence"]
    resp=game.play_round(sentence)
    game.push()
    return {"success": True, "response": resp, "game": json.loads(game.to_json())}
