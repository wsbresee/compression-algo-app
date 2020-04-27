import React from 'react';

import './FileUpload.css';

class FileUpload extends React.Component {
  constructor() {
    super();
    this.dropRef = React.createRef();
    this.state = {
      dragging: false,
    };

    this.handleDrag = this.handleDrag.bind(this);
    this.handleDragIn = this.handleDragIn.bind(this);
    this.handleDragOut = this.handleDragOut.bind(this);
    this.handleDrop = this.handleDrop.bind(this);
  }

  handleDragIn(e) {
    e.preventDefault();
    e.stopPropagation();

    if (e.dataTransfer.items && e.dataTransfer.items.length > 0) {
      this.setState({ dragging: true });
    }
  }

  handleDragOut(e) {
    e.preventDefault();
    e.stopPropagation();

    this.setState({ dragging: false });
  }

  handleDrag(e) {
    e.preventDefault();
    e.stopPropagation();
  }

  handleDrop(e) {
    e.preventDefault();
    e.stopPropagation();

    this.setState({ dragging: false });

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const files = e.dataTransfer.files;

      if (files.length === 1) {
        this.props.chooseFile(files[0]);
      }

      e.dataTransfer.clearData();
    }
  }

  componentDidMount() {
    let box = this.dropRef.current;
    box.addEventListener('dragenter', this.handleDragIn);
    box.addEventListener('dragleave', this.handleDragOut);
    box.addEventListener('dragover', this.handleDrag);
    box.addEventListener('drop', this.handleDrop);
  }

  componentWillUnmount() {
    let box = this.dropRef.current;
    box.removeEventListener('dragenter', this.handleDragIn);
    box.removeEventListener('dragleave', this.handleDragOut);
    box.removeEventListener('dragover', this.handleDrag);
    box.removeEventListener('drop', this.handleDrop);
  }

  render() {
    const { dragging } = this.state;
    const fileName = this.props.file.name || '.wav';
    return (
      <div id="file-upload">
        <h2>Upload A File</h2>
        <div
          id="upload-box"
          ref={this.dropRef}
          className={dragging ? 'dragging' : ''}
        >
          <h4>{fileName}</h4>
        </div>
        <button type="button" onClick={this.props.compressFile}>
          compress
        </button>
      </div>
    );
  }
}

export default FileUpload;
