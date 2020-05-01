from flask import Flask, jsonify, send_from_directory, request
from pydub import AudioSegment
import sys
sys.path.append('/Users/willybreese/NYU/VisML/compression-algo-app')
import src.algorithms.PCA as PCA
import src.helpers.audio_file_transformations as aft
import numpy as np

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
    filename = 'temp.mp3'
    request.files['file'].save(filename)
    theFile = aft.librosa_from_mp3_path(filename)
    samples = theFile[0]
    sr = theFile[1]
    pca = PCA.PCA(samples, 50)
    aft.librosa_to_mp3_path(pca.getPostCompressedAudioAsArray(),\
                            filename,
                            sr=sr)
    return jsonify(pca.getPackage())

@app.route('/<path>')
def send_file(path):
    return send_from_directory("public", path)
