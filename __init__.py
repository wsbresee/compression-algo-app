from flask import Flask, jsonify, send_from_directory, request
from pydub import AudioSegment
import sys
sys.path.append('/Users/willybreese/NYU/VisML/compression-algo-app')
from src.algorithms.algorithm_router import AlgorithmRouter
import numpy as np

app = Flask(__name__, static_url_path="", static_folder="/public")

algs = ["PCA", "PCA group"]

@app.route('/')
def send_index():
    return send_from_directory("public", "index.html")

@app.route('/algs')
def send_alg_choices():
    return jsonify(algs)

@app.route('/compress', methods=['POST'])
def compress_file():
    # TODO replace all this with API handlers
    algorithm = "PCA group"
    filename = 'temp'
    otherParam = 5

    request.files['file'].save(filename)
    algorithmRouter = AlgorithmRouter(algorithm, filename, otherParam)
    json = algorithmRouter.getPackagedJson()
    return jsonify(json)

@app.route('/<path>')
def send_file(path):
    return send_from_directory("public", path)
