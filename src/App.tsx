import React, { useRef, useState } from 'react';
import NeySvg from './components/NeySvg';
import Menu from './components/Menu';
import html2canvas from 'html2canvas';
import './App.css';

const App: React.FC = () => {
  const svgRef = useRef<any>(null);
  const [clearTrigger, setClearTrigger] = useState<number>(0);

  const handleExport = async () => {
    const svgElement = document.querySelector('.centered-svg');
    if (svgElement) {
      try {
        const canvas = await html2canvas(svgElement as HTMLElement, {
          backgroundColor: null,
          scale: 2
        });
        const image = canvas.toDataURL('image/png');
        const link = document.createElement('a');
        link.download = 'ney-coloring.png';
        link.href = image;
        link.click();
      } catch (error) {
        console.error('Export failed:', error);
      }
    }
  };

  const handleClear = () => {
    setClearTrigger(prev => prev + 1);
  };

  return (
    <div className="App">
      <Menu 
        onExport={handleExport}
        onClear={handleClear} 
        onFillAll={function (): void {
          throw new Error('Function not implemented.');
        } }      />
      <NeySvg 
        clearTrigger={clearTrigger}
      />
    </div>
  );
};

export default App;
