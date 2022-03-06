import json

from user_methods.user import User
from utility.firebase_interactor import register_user, login, verify_id_token

from flask import request, Blueprint

auth_blueprint = Blueprint('auth', __name__, url_prefix='/auth')

@auth_blueprint.route('/register', methods=['POST'])
def register():
    """
    Registers a user
    """
    data = request.get_json()
    email, password = data['email'], data['password']
    resp = register_user(email, password)
    if resp['success']:
        user = User(object_id = resp['uuid'], email = email)
        user.push()
    return json.dumps(resp)

@auth_blueprint.route('/login', methods=['POST'])
def login_user():
    """
    Logs in a user
    """
    data = request.get_json()
    email, password = data['email'], data['password']
    resp = login(email, password)
    return json.dumps(resp)


@auth_blueprint.route('/verify', methods=['POST'])
def verify_auth_token():
    """
    Verifies a firebase auth token.
    In JSON:
    :param token: the auth token to verify
    :return:
    """
    try:
        data = request.get_json()
        token = data['token']
        return json.dumps(verify_id_token(token))
    except Exception as e:
        return json.dumps({'success': False, 'error': "Please log in!"})
