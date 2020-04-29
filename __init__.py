from flask import Flask, jsonify, send_from_directory, request
import algorithms_for_app.PCA


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
    pca = PCA.PCA(request.files['file'], 50)
    json = (('name', pca.getName()),
            ('pre_compression', pca.getPreCompressedAudioAsArray()),
            ('post_compression', pca.getPostCompressedAudioAsArray()),
            ('loss', pca.getLoss()),
            ('loss_sum', pca.getLossSum()),
            ('features', pca.getCompressed()))
    return jsonify(json)


@app.route('/<path>')
def send_file(path):
    return send_from_directory("public", path)
