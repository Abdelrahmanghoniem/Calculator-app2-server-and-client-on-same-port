import { useState } from 'react';
import './Calculator.css';

export default function Calculator() {
  const [display, setDisplay] = useState('');

  const appendToDisplay = (value) => {
    setDisplay(display + value);
  };

  const clearDisplay = () => {
    setDisplay('');
  };

  const calculate = async () => {
    try {
      const response = await fetch(`http://localhost:3000/api/calculate?expression=${encodeURIComponent(display)}`);
      const data = await response.json();
      
      if (data.error) {
        setDisplay('Error');
      } else {
        setDisplay(data.result.toString());
      }
    // eslint-disable-next-line no-unused-vars
    } catch (error) {
      setDisplay('Error');
    }
  };
  return (
    <div className="calculator">
      <input 
        type="text" 
        value={display}
        readOnly
        className="display"
      />
      <div className="buttons">
        <button onClick={() => appendToDisplay('7')}>7</button>
        <button onClick={() => appendToDisplay('8')}>8</button>
        <button onClick={() => appendToDisplay('9')}>9</button>
        <button onClick={() => appendToDisplay('/')}>/</button>
        
        <button onClick={() => appendToDisplay('4')}>4</button>
        <button onClick={() => appendToDisplay('5')}>5</button>
        <button onClick={() => appendToDisplay('6')}>6</button>
        <button onClick={() => appendToDisplay('*')}>*</button>
        
        <button onClick={() => appendToDisplay('1')}>1</button>
        <button onClick={() => appendToDisplay('2')}>2</button>
        <button onClick={() => appendToDisplay('3')}>3</button>
        <button onClick={() => appendToDisplay('-')}>-</button>
        
        <button onClick={() => appendToDisplay('0')}>0</button>
        <button onClick={() => appendToDisplay('.')}>.</button>
        <button onClick={calculate}>=</button>
        <button onClick={() => appendToDisplay('+')}>+</button>
        
        <button onClick={clearDisplay} className="clear">C</button>
      </div>
    </div>
  );
}