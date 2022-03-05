from flask import Flask, request
import os
import waitress
from dotenv import dotenv_values

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
