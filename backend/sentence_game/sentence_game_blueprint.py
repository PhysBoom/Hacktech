from flask import request, send_file, Blueprint
from .sentence_game import SentenceGame

# Blueprint for the sentence game
sentence_game_blueprint = Blueprint('sentence-game', __name__, url_prefix='/sentence-game')

@sentence_game_blueprint.route('/new', methods=['POST'])
def new_game():
    """
    Creates a new game and returns the game id.
    :return: {success: bool, game_id: UUIDv4}
    """
    game = SentenceGame()
    game.push()
    return {'success': True, 'game_id': game.object_id}