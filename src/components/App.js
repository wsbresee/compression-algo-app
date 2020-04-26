import React from 'react';
import './App.css';
import Topbar from './Topbar';
import AlgChoices from './AlgChoices';
import FileUpload from './FileUpload';

class App extends React.Component {
  constructor() {
    super();
    this.state = { algChoice: null };
    this.chooseAlg = this.chooseAlg.bind(this);
  }

  chooseAlg(algChoice) {
    this.setState({ algChoice });
  }

  render() {
    return (
      <React.Fragment>
        <Topbar />
        <div className="contents">
          <AlgChoices chooseAlg={this.chooseAlg} />
          <FileUpload />
        </div>
      </React.Fragment>
    );
  }
}

export default App;
