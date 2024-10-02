import React, { useState, useRef, useEffect } from 'react';
import ReactDOM from 'react-dom';
import CanvasDraw from 'react-canvas-draw';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDownload, faUndo } from '@fortawesome/free-solid-svg-icons'; 
import './App.css';

function App() {
  const [brushColor, setBrushColor] = useState("#444");
  const [brushSize, setBrushSize] = useState(12);
  const canvasRef = useRef(null);

  const handleColorChange = (e) => {
    setBrushColor(e.target.value);
  };

  const handleSizeChange = (e) => {
    setBrushSize(parseInt(e.target.value, 10));
  };

  const handleSave = () => {
    try {
      const data = canvasRef.current.getSaveData();
      localStorage.setItem("savedDrawing", data);
      alert("YOUR DRAWING IS SAVED IN LOCAL STORAGE!");
    } catch (error) {
      console.error("Error saving drawing:", error);
    }
  };

  const handleLoad = () => {
    const savedData = localStorage.getItem("savedDrawing");
    if (savedData) {
      try {
        canvasRef.current.loadSaveData(savedData, true);
        alert("SUCCESSFULLY LOADED!");
      } catch (error) {
        console.error("Error loading saved drawing:", error);
      }
    } else {
      alert("NO SAVED DRAWING FOUND!");
    }
  };

  const handleClear = () => {
    if (window.confirm("ARE YOU SURE YOU WANT TO CLEAR ALL?")) {
      try {
        canvasRef.current.clear();
        localStorage.removeItem("savedDrawing");
      } catch (error) {
        console.error("Error clearing drawing:", error);
      }
    }
  };

  const handleExport = () => {
    try {
      const dataURL = canvasRef.current.getDataURL(); 
      const link = document.createElement("a");
      link.href = dataURL;
      link.download = "drawing.png";
      link.click();
    } catch (error) {
      console.error("Error exporting drawing:", error);
    }
  };

  const handleUndo = () => {
    try {
      canvasRef.current.undo();
    } catch (error) {
      console.error("Error performing undo:", error);
    }
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.ctrlKey && e.key === 'z') {
        e.preventDefault();
        handleUndo();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return (
    <div className='body'>
      <h1 className='chudi'>WhiteBoard</h1>
      <input 
        type="color" 
        value={brushColor} 
        onChange={handleColorChange}
        className='inpu'
      />
      <div className='brush-size-slider'>
        <div>
          <div className='brush-size-slider_2'>
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
          <button className='hehe' onClick={handleUndo}>
            <FontAwesomeIcon icon={faUndo} /> Undo
          </button>
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
