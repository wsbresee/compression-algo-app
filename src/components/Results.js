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
  let freqPre;
  let freqPost;
  let freqLoss;
  let lossVsNumComponents;
  if (results[1] && results[1][1]) {
    preProcess = results[1][1];
    postProcess = results[2][1];
    loss = results[3][1];
    freqPre = results[4][1];
    freqPost = results[5][1];
    freqLoss = results[6][1];
    lossVsNumComponents = results[7][1];

  } else {
    preProcess = [];
    postProcess = [];
    loss = [];
    freqPre = [];
    freqPost = [];
    freqLoss = [];
    lossVsNumComponents = [];
  }

  return (
    <div className="results">
      {preProcess.length > 0 && (
        <Graph
          name="PreProcess"
          explanation="here is a generic explanation"
          data={preProcess}
          domain={{
            x: [0, preProcess.length - 1],
            y: [getMin(preProcess), getMax(preProcess)],
          }}
        />
      )}
      {postProcess.length > 0 && (
        <Graph
          name="PostProcess"
          explanation="here is a generic explanation"
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
          explanation="here is a generic explanation"
          data={loss}
          domain={{
            x: [0, loss.length - 1],
            y: [getMin(loss), getMax(loss)],
          }}
        />
      )}
      {loss.length > 0 && (
        <Graph
          name="PreProcessFFT"
          explanation="here is a generic explanation"
          data={freqPre}
          domain={{
            x: [0, freqPre.length - 1],
            y: [getMin(freqPre), getMax(freqPre)],
          }}
        />
      )}
      {loss.length > 0 && (
        <Graph
          name="PostProcessFFT"
          explanation="here is a generic explanation"
          data={freqPost}
          domain={{
            x: [0, freqPost.length - 1],
            y: [getMin(freqPost), getMax(freqPost)],
          }}
        />
      )}
      {loss.length > 0 && (
        <Graph
          name="FrequencyLoss"
          explanation="here is a generic explanation"
          data={freqLoss}
          domain={{
            x: [0, freqLoss.length - 1],
            y: [getMin(freqLoss), getMax(freqLoss)],
          }}
        />
      )}
      {loss.length > 0 && (
        <Graph
          name="LossVsNumComponents"
          explanation="here is a generic explanation"
          data={lossVsNumComponents}
          domain={{
            x: [0, lossVsNumComponents.length - 1],
            y: [getMin(lossVsNumComponents), getMax(lossVsNumComponents)],
          }}
        />
      )}
    </div>
  );
};

export default Results;
