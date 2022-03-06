from flask import Flask, request
from sentence_game.sentence_game_blueprint import sentence_game_blueprint
from auth_methods.auth_blueprint import auth_blueprint
from user_methods.user_blueprint import user_blueprint
from serve_react.react_blueprint import react_blueprint
import waitress
from dotenv import dotenv_values
import json

ENVIRONMENT = dotenv_values(".env")["FLASK_ENV"]

app = Flask(__name__, static_folder="build", static_url_path="/")
app.register_blueprint(sentence_game_blueprint)
app.register_blueprint(auth_blueprint)
app.register_blueprint(user_blueprint)
app.register_blueprint(react_blueprint)




if __name__ == "__main__":
    if ENVIRONMENT != "production":
        app.run("localhost", 5000, debug=True)
    else:
        # Serve on port 0.0.0.0:80
        waitress.serve(app, host="0.0.0.0", port=80)
