import numpy as np
from sklearn import decomposition
from sklearn import datasets
from functools import *


class PCAGroup:

    def __init__(self, audioFiles, otherParam):
        self.data = audioFiles
        self.numComponents = otherParam
        self.preCompressedAudio = audioFiles[0]

        data = audioFiles
        lengthOfDataPoint = max(list(map(lambda x: len(x), data)))
        numZeros = list(map(lambda x: lengthOfDataPoint - len(x), data))
        data = zip(data, numZeros)
        data = list(map(lambda x: np.append(
            np.array(x[0]), np.zeros(x[1])), data))
        nComp = self.numComponents
        mu = np.mean(data, axis=0)
        pca = decomposition.PCA()
        pca.fit(data)

        self.postCompressedAudio = (np.dot(pca.transform(data)[:, :nComp],
                                           pca.components_[:nComp, :]) + mu)[0]
        if numZeros[0] > 0:
            self.postCompressedAudio = self.postCompressedAudio[:-numZeros[0]]

        self.compressed = pca.transform(data)

    def getName(self):
        return "PCA group"

    def getPreCompressedAudioAsArray(self):
        return self.preCompressedAudio

    def getPostCompressedAudioAsArray(self):
        return self.postCompressedAudio

    def getLoss(self):
        return self.preCompressedAudio - self.postCompressedAudio

    def getLossSum(self):
        loss = zip(self.preCompressedAudio, self.postCompressedAudio)
        loss = list(map(lambda x: x[0] - x[1], loss))
        loss = reduce(lambda a, b: a + b, loss)
        return abs(loss)

    def getCompressed(self):
        return self.compressed

    def getPackagedJson(self):
        return [['name', self.getName()],
                ['pre_compression', self.getPreCompressedAudioAsArray().tolist()],
                ['post_compression', self.getPostCompressedAudioAsArray().tolist()],
                ['loss', self.getLoss().tolist()],
                ['loss_sum', self.getLossSum()],
                ['features', self.getCompressed().tolist()]]
