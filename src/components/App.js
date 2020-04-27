import React from 'react';
import axios from 'axios';
import './App.css';
import Topbar from './Topbar';
import AlgChoices from './AlgChoices';
import FileUpload from './FileUpload';

class App extends React.Component {
  constructor() {
    super();
    this.state = { algChoice: null, file: {} };
    this.chooseAlg = this.chooseAlg.bind(this);
    this.chooseFile = this.chooseFile.bind(this);
    this.compressFile = this.compressFile.bind(this);
  }

  chooseAlg(algChoice) {
    this.setState({ algChoice });
  }

  chooseFile(file) {
    this.setState({ file });
  }

  compressFile() {
    if (this.state.file.name) {
      const file = new Blob([this.state.file]);

      const formData = new FormData();

      formData.append('file', file, file.filename);

      axios.post('/compress', formData, {}).then(({ data }) => {
        console.log(data);
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

    const { algChoice, file } = this.state;
    const { chooseAlg, chooseFile, compressFile } = this;

    return (
      <React.Fragment>
        <Topbar />
        <div className="contents">
          <AlgChoices algs={algs} chooseAlg={chooseAlg} algChoice={algChoice} />
          <FileUpload
            file={file}
            chooseFile={chooseFile}
            compressFile={compressFile}
          />
        </div>
      </React.Fragment>
    );
  }
}

export default App;
