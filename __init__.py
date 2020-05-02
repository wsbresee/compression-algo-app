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
    filename = 'tempxxxx'
    otherParam = 20

    request.files['file'].save(filename)
    algorithmRouter = AlgorithmRouter(algorithm, filename, otherParam)
    json = algorithmRouter.getPackagedJson()

    # old
    # filename = 'temp.mp3'
    # request.files['file'].save(filename)
    # theFile = aft.librosa_from_mp3_path(filename)
    # samples = theFile[0]
    # sr = theFile[1]
    # pca = PCA.PCA(samples, 50)
    # aft.librosa_to_mp3_path(pca.getPostCompressedAudioAsArray(),\
    #                         filename,
    #                         sr=sr)
    return jsonify(json)

@app.route('/<path>')
def send_file(path):
    return send_from_directory("public", path)
