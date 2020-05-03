import React from 'react';
import axios from 'axios';
import './App.css';
import Topbar from './Topbar';
import AlgChoices from './AlgChoices';
import Parameter from './Parameter';
import FileUpload from './FileUpload';
import LoadingScreen from './LoadingScreen';
import Graph from './Graph';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      algChoice: null,
      paramChoice: null,
      file: {},
      results: {},
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

    const { algChoice, paramChoice, file, loading } = this.state;
    const { chooseAlg, chooseParam, chooseFile, compressFile } = this;

    const data = [
      { id: '5fbmzmtc', x: 7, y: 41, z: 6 },
      { id: 's4f8phwm', x: 11, y: 45, z: 9 },
    ];

    return (
      <React.Fragment>
        <Topbar />
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
        <div className="results">
          <Graph data={data} domain={{ x: [0, 30], y: [0, 100] }} />
        </div>
      </React.Fragment>
    );
  }
}

export default App;
