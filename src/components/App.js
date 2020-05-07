import React from 'react';
import axios from 'axios';
import './App.css';
import Topbar from './Topbar';
import AlgChoices from './AlgChoices';
import Parameter from './Parameter';
import FileUpload from './FileUpload';
import LoadingScreen from './LoadingScreen';
import Graph from './Graph';
import AudioPlayer from './AudioPlayer';
import Results from './Results';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      algChoice: null,
      paramChoice: null,
      file: {},
      results: [],
      loading: false,
    };
    this.chooseAlg = this.chooseAlg.bind(this);
    this.chooseParam = this.chooseParam.bind(this);
    this.chooseFile = this.chooseFile.bind(this);
    this.compressFile = this.compressFile.bind(this);
  }

  chooseAlg(algChoice) {
    this.setState({ algChoice });
  }

  chooseParam(paramChoice) {
    this.setState({ paramChoice });
  }

  chooseFile(file) {
    this.setState({ file });
  }

  compressFile() {
    if (this.state.file.name) {
      const file = new Blob([this.state.file]);
      const algChoice = this.state.algChoice;
      const paramChoice = this.state.paramChoice;

      const formData = new FormData();

      formData.append('file', file, file.filename);
      formData.append('algChoice', algChoice);
      formData.append('paramChoice', paramChoice);
      this.setState({ loading: true });
      axios
        .post('/compress', formData, {})
        .then(({ data }) => {
          this.setState({ loading: false, results: data });
        })
        .catch(err => {
          this.setState({ loading: false });
          console.log(err);
        });
    }
  }

  componentDidMount() {
    axios.get('/algs').then(({ data }) => {
      this.setState({ algs: data });
    });
  }

  render() {
    const algs = this.state.algs || [];

    const { algChoice, paramChoice, file, loading, results } = this.state;
    const { chooseAlg, chooseParam, chooseFile, compressFile } = this;

    return (
      <React.Fragment>
        <Topbar />
        <div className='title'>
        <h1>"PCA and Audio Experimentation Station"</h1>
        <p>"With this application, you can quickly and easily explore Principal Component Analysis with audio data. You’ll provide audio and choose the number of principal components you’d like to preserve. Then, the application will generate a number of visualizations of the impact of PCA on your audio data, with a particular focus on data integrity and signal loss.  </p>
        </div>
        <div className="contents">
          <div className="left-side">
            <AlgChoices
              algs={algs}
              chooseAlg={chooseAlg}
              algChoice={algChoice}
            />
            <Parameter chooseParam={chooseParam} paramChoice={paramChoice} />
          </div>
          <FileUpload
            file={file}
            chooseFile={chooseFile}
            compressFile={compressFile}
          />
          {loading && <LoadingScreen />}
        </div>
        <Results results={results} />
        <AudioPlayer />
      </React.Fragment>
    );
  }
}

export default App;
