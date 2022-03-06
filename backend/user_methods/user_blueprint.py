import json

from utility.firebase_interactor import check_token
from .user import User

from flask import request, Blueprint

user_blueprint = Blueprint('user', __name__, url_prefix='/user')

@user_blueprint.route('/<uuid>', methods=['GET'])
@check_token(request)
def get_user_data(uuid):
    if not uuid == request.user['user_id']:
        return json.dumps({"success": False, "error": "Unauthorized"})
    user = User.get_by_uuid(uuid)
    print(user.to_dict())
    if user:
        return json.dumps({"success": True, "user": user.to_dict()})
    else:
        return json.dumps({"success": False, "error": "User not found"})

