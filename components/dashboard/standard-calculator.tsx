"use client";

import { useState } from "react";

export function StandardCalculator() {
  const [display, setDisplay] = useState("0");
  const [equation, setEquation] = useState("");
  const [lastPressedEquals, setLastPressedEquals] = useState(false);

  const handleNumber = (number: string) => {
    if (lastPressedEquals) {
        setDisplay(number);
        setLastPressedEquals(false);
    } else {
        setDisplay(display === "0" ? number : display + number);
    }
  };

  const handleOperator = (operator: string) => {
    setLastPressedEquals(false);
    setEquation(display + " " + operator + " ");
    setDisplay("0");
  };

  const handleEqual = () => {
    try {
      const fullEquation = equation + display;
      // Replace visual operators with JS operators
      const evalString = fullEquation.replace(/×/g, "*").replace(/÷/g, "/");
      
      // eslint-disable-next-line
      const result =  new Function('return ' + evalString)();
      
      setDisplay(String(result));
      setEquation("");
      setLastPressedEquals(true);
    } catch (error) {
      setDisplay("Error");
      setEquation("");
    }
  };

  const handleClear = () => {
    setDisplay("0");
    setEquation("");
    setLastPressedEquals(false);
  };

  const handleDelete = () => {
    if (lastPressedEquals) {
        handleClear();
    } else {
        setDisplay(display.length > 1 ? display.slice(0, -1) : "0");
    }
  };

  const handleDot = () => {
    if (!display.includes(".")) {
      setDisplay(display + ".");
    }
  };

  const btnClass = "h-14 rounded-xl font-medium text-lg transition-all active:scale-95 flex items-center justify-center";
  const btnDark = "bg-white/5 hover:bg-white/10 text-white";
  const btnPrimary = "bg-primary text-white hover:bg-primary/90 shadow-lg shadow-primary/20";
  const btnOperator = "bg-accent-purple/20 text-accent-purple hover:bg-accent-purple/30";

  return (
    <div className="glass-panel p-6 rounded-3xl max-w-sm w-full mx-auto shadow-2xl">
      {/* Display */}
      <div className="bg-[#0B0E14] rounded-2xl p-6 mb-6 text-right relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-accent-purple"></div>
        <div className="text-gray-500 text-sm h-6 mb-1 font-mono">{equation}</div>
        <div className="text-4xl font-bold text-white tracking-wider font-mono overflow-x-auto scrollbar-hide">
          {display}
        </div>
      </div>

      {/* Keypad */}
      <div className="grid grid-cols-4 gap-3">
        <button onClick={handleClear} className={`${btnClass} ${btnOperator} col-span-2 text-red-400 bg-red-500/10 hover:bg-red-500/20`}>AC</button>
        <button onClick={handleDelete} className={`${btnClass} ${btnDark}`}>DEL</button>
        <button onClick={() => handleOperator("/")} className={`${btnClass} ${btnOperator}`}>÷</button>

        <button onClick={() => handleNumber("7")} className={`${btnClass} ${btnDark}`}>7</button>
        <button onClick={() => handleNumber("8")} className={`${btnClass} ${btnDark}`}>8</button>
        <button onClick={() => handleNumber("9")} className={`${btnClass} ${btnDark}`}>9</button>
        <button onClick={() => handleOperator("*")} className={`${btnClass} ${btnOperator}`}>×</button>

        <button onClick={() => handleNumber("4")} className={`${btnClass} ${btnDark}`}>4</button>
        <button onClick={() => handleNumber("5")} className={`${btnClass} ${btnDark}`}>5</button>
        <button onClick={() => handleNumber("6")} className={`${btnClass} ${btnDark}`}>6</button>
        <button onClick={() => handleOperator("-")} className={`${btnClass} ${btnOperator}`}>-</button>

        <button onClick={() => handleNumber("1")} className={`${btnClass} ${btnDark}`}>1</button>
        <button onClick={() => handleNumber("2")} className={`${btnClass} ${btnDark}`}>2</button>
        <button onClick={() => handleNumber("3")} className={`${btnClass} ${btnDark}`}>3</button>
        <button onClick={() => handleOperator("+")} className={`${btnClass} ${btnOperator}`}>+</button>

        <button onClick={() => handleNumber("0")} className={`${btnClass} ${btnDark} col-span-2`}>0</button>
        <button onClick={handleDot} className={`${btnClass} ${btnDark}`}>.</button>
        <button onClick={handleEqual} className={`${btnClass} ${btnPrimary}`}>=</button>
      </div>
    </div>
  );
}
