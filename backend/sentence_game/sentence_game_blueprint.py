import json

from flask import request, Blueprint

from user_methods.user import User
from .sentence_game import SentenceGame

# Blueprint for the sentence game
sentence_game_blueprint = Blueprint(
    "sentence-game", __name__, url_prefix="/sentence-game"
)


@sentence_game_blueprint.route("/new", methods=["POST"])
def new_game():
    """
    Creates a new game and returns the game id.
    :param <string> uuid: UUID of user to attach the game to.
    :return: {success: bool, game_id: UUIDv4}
    """
    user = User.get_by_uuid(request.json["uuid"])
    if not user:
        return json.dumps({"success": False, "error": "User not found."})
    game = SentenceGame()
    game.push()
    user.add_sentence_game(game.object_id)
    user.push()
    return json.dumps({"success": True, "game_id": game.object_id})

@sentence_game_blueprint.route("/<game_id>", methods=["GET"])
def get_game(game_id):
    """
    Returns the game object.
    :param <UUIDv4> game_id: Id of the game
    :return: JSONified game object
    """
    try:
        game = SentenceGame(object_id=game_id)
        game.load()
        return json.dumps({"success": True, "game": json.loads(game.to_json())})
    except:
        return json.dumps({"success": False, "error": "Unable to load game."})

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
        return json.dumps({"success": False, "error": "Game is finished."})
    sentence = request.json["sentence"]
    resp=game.play_round(sentence)
    game.push()
    return json.dumps({"success": True, "response": resp, "game": json.loads(game.to_json())})
