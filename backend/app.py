from flask import Flask, request, url_for, redirect
from utility.firebase_pushable_object import FirebasePushableObject
import os
import waitress
from dotenv import dotenv_values
import json
import sqlite3
from flask_login import (
    LoginManager,
    current_user,
    login_required,
    login_user,
    logout_user,
)


ENVIRONMENT = dotenv_values(".env")["FLASK_ENV"]

app = Flask(__name__)


@app.route("/")
def index():
    return "hi"


if __name__ == "__main__":
    if ENVIRONMENT != "production":
        app.run("localhost", 5000, debug=True)

    else:

        # Serve on port 0.0.0.0:80
        waitress.serve(app, host="0.0.0.0", port=80)
