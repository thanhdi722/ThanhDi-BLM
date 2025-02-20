import React from 'react';
import './style.scss';

const AnimationPlane = () => {
	return (
        <div className="animation-container">
          <div className="cloud-wrapper">
            <div className="cloud-element"></div>
            <div className="cloud-element"></div>
            <div className="cloud-element"></div>
            <div className="cloud-element"></div>
          </div>

          <div className="airplane-wrapper">
            <div className="airplane-head"></div>
            <div className="airplane-body">
              <div className="airplane-window"></div>
              <div className="airplane-window"></div>
              <div className="airplane-window"></div>
            </div>
            <div className="airplane-wing-left"></div>
            <div className="airplane-wing-right"></div>
            <div className="airplane-tail"></div>
          </div>

          <div className="ground-wrapper">
            <div className="tree-element">
              <div className="tree-leaves"></div>
            </div>
            <div className="tree-element">
              <div className="tree-leaves"></div>
            </div>
            <div className="tree-element">
              <div className="tree-leaves"></div>
            </div>
            <div className="tree-element">
              <div className="tree-leaves"></div>
            </div>
            <div className="tree-element">
              <div className="tree-leaves"></div>
            </div>
          </div>
        </div>
	);
};

export default AnimationPlane;
