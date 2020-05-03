import React from 'react';
import D3Graph from './D3Graph';

class Graph extends React.Component {
  constructor() {
    super();
    this.DOMNode = React.createRef(null);
  }
  componentDidMount() {
    const el = this.DOMNode.current;
    D3Graph.create(
      el,
      {
        width: '100%',
        height: '300px',
      },
      this.getGraphState()
    );
  }

  componentDidUpdate() {
    const el = this.DOMNode.current;
    D3Graph.update(el, this.getGraphState());
  }

  getGraphState() {
    return {
      data: this.props.data,
      domain: this.props.domain,
    };
  }

  componentWillUnmount() {
    const el = this.DOMNode.current;
    D3Graph.destroy(el);
  }

  render() {
    return <div className="graph" ref={this.DOMNode} />;
  }
}

export default Graph;
