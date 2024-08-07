// NOT IMPLEMENTED YET

import React, { useState } from 'react';
import './navigator-app.scss';
import { FaAngleLeft, FaAngleRight, FaSearch } from 'react-icons/fa';

export default function NavigatorAPP() {
    const [url, setUrl] = useState<string>('');
    const [inputValue, setInputValue] = useState<string>(url);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value);
    };

    const handleNavigate = () => {
        setUrl(inputValue);
    };

    return (
        <div className="navigator-app">
            <div className="navigator-header">
                <button onClick={() => window.history.back()}>
                    <FaAngleLeft />
                </button>
                <button onClick={() => window.history.forward()}>
                    <FaAngleRight />
                </button>

                <input
                    type="text"
                    value={inputValue}
                    onChange={handleInputChange}
                    onKeyDown={(e) => e.key === 'Enter' && handleNavigate()}
                />

                <button className='search-btn' onClick={handleNavigate}>
                    <FaSearch />
                </button>
            </div>

            <div className="navigator-content">
                <iframe src={url} title="Browser" sandbox="allow-scripts allow-same-origin" />
            </div>
        </div>
    );
}
