import React, { useState } from 'react';
import './App.css';
import { AnimatedMusicNotes, NeySvg, Menu } from './components';

const App: React.FC = () => {
  const [clearTrigger, setClearTrigger] = useState<number>(0);

  const handleExport = () => {
    const svgElement = document.querySelector('.centered-svg');
    if (!svgElement) return;
  
    try {
      const svg = svgElement as unknown as SVGSVGElement;
      const svgData = new XMLSerializer().serializeToString(svg);
      const svgBlob = new Blob([svgData], { type: 'image/svg+xml;charset=utf-8' });
      const svgUrl = URL.createObjectURL(svgBlob);
  
      const img = new Image();
      img.onload = () => {
        const viewBox = svg.viewBox.baseVal;
        const rect = svg.getBoundingClientRect();
        
        const canvas = document.createElement('canvas');
        canvas.width = viewBox.width;
        canvas.height = viewBox.height;
        
        const ctx = canvas.getContext('2d');
        if (!ctx) return;
  
        const scale = Math.min(
          viewBox.width / rect.width,
          viewBox.height / rect.height
        );
        
        ctx.scale(scale, scale);
        ctx.drawImage(img, 0, 0, rect.width, rect.height);
        
        const pngUrl = canvas.toDataURL('image/png');
        const downloadLink = document.createElement('a');
        downloadLink.href = pngUrl;
        downloadLink.download = 'ney-coloring.png';
        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);
        URL.revokeObjectURL(svgUrl);
      };
      
      img.onerror = (error) => {
        console.error('Image loading failed:', error);
      };
      
      img.src = svgUrl;
    } catch (error) {
      console.error('Export failed:', error);
    }
  };

  const handleClear = () => {
    setClearTrigger(prev => prev + 1);
  };

  return (
    <div className="App">
      <AnimatedMusicNotes />
      <Menu 
        onExport={handleExport}
        onClear={handleClear} 
           />
      <NeySvg 
        clearTrigger={clearTrigger}
      />
    </div>
  );
};

export default App;
