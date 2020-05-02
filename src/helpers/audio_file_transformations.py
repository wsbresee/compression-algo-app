from pydub import AudioSegment
import librosa
import soundfile as sf
import os

def librosa_from_mp3_path(file):
    a = AudioSegment.from_mp3(file)
    os.remove(file)
    a.export(file[:-4] + '.wav', format='wav')
    theFile = librosa.load(file[:-4] + '.wav', sr=None)
    os.remove(file[:-4] + '.wav')
    return theFile

def librosa_to_mp3_path(file, filename, sr=44100):
    if len(file) == 2:
        samples = file[0]
        sr = file[1]
    else:
        samples = file
    sf.write(filename[:-4] + '.wav', samples, sr, format='wav')
    a = AudioSegment.from_wav(filename[:-4] + '.wav')
    a.export(filename, format='mp3')
    os.remove(filename[:-4] + '.wav')
    return filename
