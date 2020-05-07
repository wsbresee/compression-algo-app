import numpy as np
from sklearn import decomposition
from sklearn import datasets
from functools import *
from server.helpers.graph_helper import *
from scipy.fft import fftshift

class PCA:

    def __init__(self, audioFile, otherParam):
        data = np.array(audioFile)
        lengthOfDataPoint = 100
        numZeros = lengthOfDataPoint - (len(data) % lengthOfDataPoint)
        data = np.append(data, np.zeros(numZeros))
        data = np.reshape(data, (-1, lengthOfDataPoint))
        mu = np.mean(data, axis=0)
        nComp = otherParam
        pca = decomposition.PCA(n_components=nComp)
        pca.fit(data)
        postCompressedAudio = np.reshape(np.dot(pca.transform(data)[:,:nComp],
                                                pca.components_[:nComp,:]) + mu,
                                         (-1))
        if numZeros > 0:
            postCompressedAudio = postCompressedAudio[:-numZeros]

        self.name = 'PCA'
        self.numComponents = otherParam
        self.preCompressedAudio = audioFile
        self.postCompressedAudio = postCompressedAudio
        self.lossVsNumComponents = generateLossVsNumComp(data)
        self.freqPre = myFFT(self.preCompressedAudio)
        self.freqPost = myFFT(self.postCompressedAudio)
        self.freqLoss = myFFT((np.array(self.preCompressedAudio) \
                - np.array(self.postCompressedAudio)).tolist())
        self.features = pca.transform(data)

    def getPackagedJson(self):
        return packageJson(self)

