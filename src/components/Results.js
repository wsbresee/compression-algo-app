import React from 'react';

import Graph from './Graph';

const getMax = arr => {
  let len = arr.length;
  let max = -Infinity;

  while (len--) {
    max = arr[len] > max ? arr[len] : max;
  }
  return max;
};

const getMin = arr => {
  let len = arr.length;
  let min = Infinity;

  while (len--) {
    min = arr[len] < min ? arr[len] : min;
  }
  return min;
};

const Results = props => {
  const { results } = props;

  let preProcess;
  let postProcess;
  let loss;
  if (results[1] && results[1][1]) {
    preProcess = results[1][1];
    postProcess = results[2][1];
    loss = results[3][1];
  } else {
    preProcess = [];
    postProcess = [];
    loss = [];
  }

  return (
    <div className="results">
      {preProcess.length > 0 && (
        <Graph
          name="PreProcess"
          data={preProcess}
          domain={{
            x: [0, preProcess.length - 1],
            y: [getMin(preProcess), getMax(preProcess)],
          }}
          xaxis="X Axis"
          yaxis="Y Axis"
        />
      )}
      {postProcess.length > 0 && (
        <Graph
          name="PostProcess"
          data={postProcess}
          domain={{
            x: [0, postProcess.length - 1],
            y: [getMin(postProcess), getMax(postProcess)],
          }}
        />
      )}
      {loss.length > 0 && (
        <Graph
          name="Loss"
          data={loss}
          domain={{
            x: [0, loss.length - 1],
            y: [getMin(loss), getMax(loss)],
          }}
        />
      )}
    </div>
  );
};

export default Results;
