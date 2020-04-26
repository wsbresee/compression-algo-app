import React from 'react';
import './FileUpload.css';

const FileUpload = props => {
  return (
    <div id="file-upload">
      <h2>Upload A File</h2>
      <div id="upload-box">
        <h4>.wav</h4>
      </div>
      <button type="button">compress</button>
    </div>
  );
};

export default FileUpload;
