from flask import Flask, render_template, request, send_from_directory

app = Flask(__name__, static_url_path="", static_folder="/public")


@app.route('/')
def send_index():
    return send_from_directory("public", "index.html")


@app.route('/<path>')
def send_file(path):
    return send_from_directory("public", path)
