from flask import Flask, jsonify, send_from_directory, request

app = Flask(__name__, static_url_path="", static_folder="/public")

algs = ["Algorithm 1", "Algorithm 2",
        "Algorithm 3", 'Algorithm 4']


@app.route('/')
def send_index():
    return send_from_directory("public", "index.html")


@app.route('/algs')
def send_alg_choices():
    return jsonify(algs)


@app.route('/compress', methods=['POST'])
def compress_file():
    print(request.files['file'])
    return jsonify([1, 2, 3, 4])


@app.route('/<path>')
def send_file(path):
    return send_from_directory("public", path)
