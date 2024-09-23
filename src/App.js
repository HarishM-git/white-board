import React, { useState, useRef } from 'react';
import ReactDOM from 'react-dom';
import CanvasDraw from 'react-canvas-draw';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDownload } from '@fortawesome/free-solid-svg-icons'; // 
import './App.css';

function App() {
  const [brushColor, setBrushColor] = useState("#444");
  const [brushSize, setBrushSize] = useState(12);
  const [savedDrawing, setSavedDrawing] = useState(null);
  const canvasRef = useRef(null);

  const handleColorChange = (e) => {
    setBrushColor(e.target.value);
  };

  const handleSizeChange = (e) => {
    setBrushSize(parseInt(e.target.value, 10));
  };

  const handleSave = () => {
    const data = canvasRef.current.getSaveData();
    setSavedDrawing(data);
    alert("YOUR DRAWING IS SAVED DONT WORRY!")
  };

  const handleClear = () => {
    if (window.confirm("ARE YOU SURE YOU WANT TO CLEAR ALL?")) {
      canvasRef.current.clear();
    }
  };
  

  const handleLoad = () => {
    if (savedDrawing) {
      canvasRef.current.loadSaveData(savedDrawing, true);
      alert("SUCESSFULLY LOADED !!!")
    }
    

  };

  const handleExport = () => {
    const dataURL = canvasRef.current.getDataURL(); 
    const link = document.createElement("a");
    link.href = dataURL;
    link.download = "drawing.png";
    link.click();
  };

  return (
    <div className='body'>
      <h1 className='chudi'>WhiteBoard</h1>
      <input 
        type="color" 
        value={brushColor} 
        onChange={handleColorChange}
        className='inpu'
      />
      <div
        className='brush-size-slider'
      >
        <div>
          <div
            className='brush-size-slider_2'
          >
            <input 
              type="range" 
              min="1" 
              max="50" 
              value={brushSize} 
              onChange={handleSizeChange}
            />
<label style={{ fontFamily: "Roboto Mono, monospace" }}>Brush Size: {brushSize}</label>
</div>
          <span className='expo' onClick={handleExport}>
            <FontAwesomeIcon className='iconn' icon={faDownload} size='xl'/>
            Download as PNG
          </span>
        </div>
        <div className="controls">
          <button className='hehe' onClick={handleSave}>Save Drawing</button>
          <button className='hehe' onClick={handleLoad}>Load Drawing</button>
          <button className='hehe' onClick={handleClear}>Clear Board</button>
        </div>
      </div>
      <CanvasDraw
        ref={canvasRef}
        brushColor={brushColor}
        brushRadius={brushSize}
        canvasWidth={1530}
        canvasHeight={700}
      />
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById('root'));

export default App;
