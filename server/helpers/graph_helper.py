import math

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
