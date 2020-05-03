import os
from server.algorithms.PCA import PCA
from server.algorithms.PCA_group import PCAGroup
import server.helpers.audio_file_transformations as aft
import sys
import zipfile


class AlgorithmRouter:

    def __init__(self, algorithm, fileOrDirectory, otherParam):
        if algorithm == '0':
            theFile = aft.librosa_from_mp3_path(fileOrDirectory)
            samples = theFile[0]
            self.sampleRate = theFile[1]
            self.algorithm = PCA(samples, otherParam)
        elif algorithm == '1':
            directory = 'temp/'
            if os.path.isdir(directory):
                for file in os.listdir(directory):
                    os.remove(directory + file)
            with zipfile.ZipFile(fileOrDirectory, 'r') as zip_ref:
                zip_ref.extractall(directory)
            audioFiles = []
            for filename in os.listdir(directory):
                theFile = aft.librosa_from_mp3_path(directory + filename)
                samples = theFile[0]
                self.sampleRate = theFile[1]
                audioFiles.append(samples)
            self.algorithm = PCAGroup(audioFiles, otherParam)
            if os.path.isdir(directory):
                for file in os.listdir(directory):
                    os.remove(directory + file)
            os.rmdir(directory)
        aft.librosa_to_mp3_path(\
                self.algorithm.getPostCompressedAudioAsArray(),\
                fileOrDirectory + '_after.mp3',\
                sr=self.sampleRate)

    def getPackagedJson(self):
        return self.algorithm.getPackagedJson()
