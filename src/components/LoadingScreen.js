import React, { useRef, useEffect } from 'react';
import Warp from 'warpjs';

import './LoadingScreen.css';

const LoadingScreen = () => {
  const styl1 = { fill: '#714bfa', 'mix-blend-mode': 'multiply' };
  const styl2 = { fill: '#000000', 'mix-blend-mode': 'multiply' };

  const ref = useRef(null);

  useEffect(() => {
    const svg = ref.current;
    const warp = new Warp(svg);

    warp.interpolate(4);
    warp.transform(([x, y]) => [x, y, y]);

    let offset = 0;
    const animate = () => {
      warp.transform(([x, y, oy]) => [
        x,
        oy + 4 * Math.sin(x / 16 + offset),
        oy,
      ]);
      offset += 0.1;
      requestAnimationFrame(animate);
    };

    animate();
  }, []);

  return (
    <div id="loading-screen">
      <svg id="svg-element" viewBox="0 0 303 251" ref={ref}>
        <path
          d="M278.078,26.195l-161.04,-26.195l-26.195,161.04l161.04,26.195l26.195,-161.04Z"
          style={styl1}
        />
      </svg>
    </div>
  );
};

export default LoadingScreen;
