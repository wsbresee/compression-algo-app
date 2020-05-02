import os
from src.algorithms.PCA import PCA
from src.algorithms.PCA_group import PCAGroup
import src.helpers.audio_file_transformations as aft
import sys
import zipfile

class AlgorithmRouter:

    def __init__(self, algorithm, filename, otherParam):
        if algorithm == "PCA":
            theFile = aft.librosa_from_mp3_path(filename[:-4] + ".mp3")
            samples = theFile[0]
            self.sampleRate = theFile[1]
            self.algorithm = PCA(samples, otherParam)
        elif algorithm == "PCA group":
            directory = filename + "_directory/"
            for aFile in os.listdir(directory):
                os.remove(directory + aFile)
            with zipfile.ZipFile(filename, 'r') as zip_ref:
                zip_ref.extractall(directory)
            audioFiles = []
            for filename in os.listdir(directory):
                theFile = aft.librosa_from_mp3_path(directory + filename)
                samples = theFile[0]
                self.sampleRate = theFile[1]
                audioFiles.append(samples)
            self.algorithm = PCAGroup(audioFiles, otherParam)
        aft.librosa_to_mp3_path(\
                self.algorithm.getPostCompressedAudioAsArray(),\
                "audio_1",\
                sr=self.sampleRate)

    def getPackagedJson(self):
        return self.algorithm.getPackagedJson()
