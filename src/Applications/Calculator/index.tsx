import { useEffect, useRef } from 'react';
import { FaDeleteLeft } from 'react-icons/fa6';
import IWindow from '../../interfaces/IWindow';
import './calculator-app.scss';
import { useWindows } from '../../providers/WindowProvider';

export default function CalculatorAPP({ windowData }: { windowData?: IWindow; }) {
    const nums = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
    const ops = ['+', '-', '*', '/'];

    const inputRef = useRef<HTMLInputElement>(null);
    const { activeWindow } = useWindows();

    const handleClick = (v: string) => {
        const trueValue = inputRef.current!.value.replaceAll('x', '*').replaceAll('÷', '/');
        inputRef.current!.value = trueValue;

        const lastChar = inputRef.current!.value.slice(-1);

        function canAddOperator() {
            return !ops.includes(lastChar) && inputRef.current!.value !== '';
        }

        // If the input is empty and the button is =, return
        if (v === '=' && !inputRef.current!.value) return;

        // If the input is 0 and the button is a number and , clear the input
        if (inputRef.current!.value === '0' && nums.includes(v)) {
            inputRef.current!.value = '';
        }

        // If the button is C, clear the input
        if (v === 'C') {
            inputRef.current!.value = '0';

            // If the button is del, delete the last character
        } else if (v === 'del') {
            inputRef.current!.value = inputRef.current!.value.slice(0, -1);

            // If the button is =, calculate the result
        } else if (v === '=') {
            const result = eval(inputRef.current!.value);
            inputRef.current!.value = result;

            // If the button is an operator, add it to the input
        } else if (ops.includes(v) && canAddOperator()) {
            inputRef.current!.value += v;

            // If the button is a number, add it to the input
        } else if (nums.includes(v)) {
            inputRef.current!.value += v;

            // If the button is a dot, add it to the input
        } else if (v === '.') {
            if (!inputRef.current!.value.includes('.')) {
                inputRef.current!.value += v;
            }
        }

        const formattedValue = inputRef.current!.value.replaceAll('*', 'x').replaceAll('/', '÷');
        inputRef.current!.value = formattedValue;
    };

    useEffect(()=>{
        inputRef.current!.value = '0';
    }, []);

    // Add event listener to the document to listen for keyboard events
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            const key = e.key;

            if (key === 'Enter') {
                handleClick('=');
            } else if (key === 'Backspace') {
                handleClick('del');
            } else if (key === 'Escape') {
                handleClick('C');
            } else if (key === '.') {
                handleClick('.');
            } else if (key === '+' || key === '-' || key === '*' || key === '/') {
                handleClick(key);
            } else if (nums.includes(key)) {
                handleClick(key);
            }
        };

        document.removeEventListener('keydown', handleKeyDown);

        if (activeWindow?.windowID === windowData?.windowID) {
            document.addEventListener('keydown', handleKeyDown);
        }

        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [activeWindow, windowData?.windowID]);


    return (
        <div className='calculator'>
            <input type="text" ref={inputRef} readOnly />

            <div className="buttons">
                <button onClick={() => handleClick("C")} className='double-size'>C</button>
                <button onClick={() => handleClick("del")} className='double-size'><FaDeleteLeft /></button>
                <button onClick={() => handleClick("7")}>7</button>
                <button onClick={() => handleClick("8")}>8</button>
                <button onClick={() => handleClick("9")}>9</button>
                <button onClick={() => handleClick("+")}>+</button>
                <button onClick={() => handleClick("4")}>4</button>
                <button onClick={() => handleClick("5")}>5</button>
                <button onClick={() => handleClick("6")}>6</button>
                <button onClick={() => handleClick("-")}>-</button>
                <button onClick={() => handleClick("1")}>1</button>
                <button onClick={() => handleClick("2")}>2</button>
                <button onClick={() => handleClick("3")}>3</button>
                <button onClick={() => handleClick("*")}>X</button>
                <button onClick={() => handleClick("0")}>0</button>
                <button onClick={() => handleClick(".")}>.</button>
                <button onClick={() => handleClick("=")}>=</button>
                <button onClick={() => handleClick("/")}>÷</button>
            </div>
        </div>
    );
};
