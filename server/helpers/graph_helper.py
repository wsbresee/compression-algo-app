import math
import numpy as np
from sklearn import decomposition
from functools import *

def convertArrayToSize(inArray, size):
    inPerOut = math.floor(len(inArray)/size)
    i = 0
    runningSum = 0
    outArray = []
    while i < len(inArray):
        runningSum += abs(inArray[i])
        i += 1
        if i % inPerOut == 0:
            outArray.append(runningSum/inPerOut)
            runningSum = 0
    return outArray

def packageJson(algoInstance, graphLen=1000):
    loss = algoInstance.preCompressedAudio - algoInstance.postCompressedAudio
    freqLoss = algoInstance.freqPre - algoInstance.freqPost
    return [['name', algoInstance.name],
            ['pre_compression', convertArrayToSize( \
                    algoInstance.preCompressedAudio.tolist(), graphLen)],
            ['post_compression', convertArrayToSize( \
                    algoInstance.postCompressedAudio.tolist(), graphLen)],
            ['loss', convertArrayToSize( \
                    loss.tolist(), graphLen)],
            ['freq_pre_compression', convertArrayToSize( \
                    algoInstance.freqPre.tolist(), graphLen)],
            ['freq_post_compression', convertArrayToSize( \
                    algoInstance.freqPost.tolist(), graphLen)],
            ['freq_loss', convertArrayToSize( \
                    freqLoss.tolist(), graphLen)],
            ['loss_vs_num_components', \
                   algoInstance.lossVsNumComponents],
            ['loss_sum', getLossSum(algoInstance)],
            ['features', algoInstance.features.tolist()]]

def generateLossVsNumComp(data):
    mu = np.mean(data, axis=0)
    lossVsNumComp = []
    lengthOfDataPoint = max(list(map(lambda x: len(x), data)))
    i = 0
    while i < lengthOfDataPoint:
        pca = decomposition.PCA(n_components=i)
        pca.fit(data)
        reconstructed = (np.dot(pca.transform(data)[:, :i],
                         pca.components_[:i, :]) + mu)
        loss = reduce(lambda x, y: x + sum(y), reconstructed - data, 0)
        lossVsNumComp.append(loss)
        i += 10
    return lossVsNumComp

def getLossSum(self):
    loss = zip(self.preCompressedAudio, self.postCompressedAudio)
    loss = list(map(lambda x: x[0] - x[1], loss))
    loss = reduce(lambda a, b: a + b, loss)
    return abs(loss)
