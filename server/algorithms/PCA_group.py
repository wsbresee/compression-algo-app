import numpy as np
from sklearn import decomposition
from sklearn import datasets
from functools import *
from server.helpers.graph_helper import *

class PCAGroup:

    def __init__(self, audioFiles, otherParam):
        data = audioFiles
        lengthOfDataPoint = max(list(map(lambda x: len(x), data)))
        numZeros = list(map(lambda x: lengthOfDataPoint - len(x), data))
        data = zip(data, numZeros)
        data = list(map(lambda x: np.append(np.array(x[0]), np.zeros(x[1])),\
                        data))
        pca = decomposition.PCA(n_components=otherParam)
        pca.fit(data)
        postCompressedAudio = (np.dot(pca.transform(data)[:, :otherParam],
                                      pca.components_[:otherParam, :]) + mu)[0]
        if numZeros[0] > 0:
            postCompressedAudio = postCompressedAudio[:-numZeros[0]]

        self.name = 'PCA group'
        self.numComponents = otherParam
        self.preCompressedAudio = audioFiles[0]
        self.postCompressedAudio = postCompressedAudio
        self.lossVsNumComp = generateLossVsNumComp(data)
        self.freqPre = np.fft.fft(self.preCompressedAudio)
        self.freqPost = np.fft.fft(self.postCompressedAudio)
        self.freqLoss = self.freqPre - self.freqPost
        self.features = pca.transform(data)

    def getPackagedJson(self):
        return packageJson(self)
