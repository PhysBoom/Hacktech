import json
from utility.firebase_interactor import register_user, login

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
    if resp.success:
        user = User(object_id = resp.uuid, email = email)
        user.push()
    return resp



