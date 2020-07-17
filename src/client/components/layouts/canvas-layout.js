import React from 'react';
import CanvasContainer from '../containers/canvas-container';

export default function(props) {
  return (
    <div className="canvas">
      <header className="canvas-header">
        {props.title} 
      </header>
      <div className="canvas-content">
        <CanvasContainer searchType={props.searchType} />
      </div>
      <footer className="canvas-footer">        
      </footer>
    </div>
    );
}
