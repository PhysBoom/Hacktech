from flask import send_from_directory, Blueprint, render_template

react_blueprint = Blueprint('react', __name__, url_prefix='/')

@react_blueprint.route('/', methods=['GET'])
def index():
    return send_from_directory('build', 'index.html')

@react_blueprint.route('/register', methods=['GET'])
def reg():
    return send_from_directory('build', 'index.html')

@react_blueprint.route('/gamemodes', methods=['GET'])
def game():
    return send_from_directory('build', 'index.html')

@react_blueprint.route('/login', methods=['GET'])
def log():
    return send_from_directory('build', 'index.html')

@react_blueprint.route('/sentencegen', methods=['GET'])
def sentgen():
    return send_from_directory('build', 'index.html')