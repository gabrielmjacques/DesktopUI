import React, { FormEvent, useCallback, useEffect, useState } from 'react';
import { AiFillCaretRight, AiOutlineLoading } from 'react-icons/ai';
import { FaRegEye, FaRegEyeSlash, FaRegLightbulb } from 'react-icons/fa';
import { PiUser } from 'react-icons/pi';
import './lock-screen.scss';

interface LockScreenProps {
    logged: () => void;
}

const LockScreen: React.FC<LockScreenProps> = ({ logged }) => {
    const date = new Date();

    const [lockScreenProps, setLockScreenProps] = useState({
        className: 'lock-screen',
    });

    const [passwordScreenProps, setPasswordScreenProps] = useState({
        className: 'password-screen',
        inputType: 'password' as 'password' | 'text',
        submited: false,
    });

    // Get time in 00:00 format
    const getFormattedTime = () => {
        const hours = date.getHours().toString().padStart(2, '0');
        const minutes = date.getMinutes().toString().padStart(2, '0');
        return `${hours}:${minutes}`;
    };

    const changeInputType = () => {
        setPasswordScreenProps((prev) => ({
            ...prev,
            inputType: prev.inputType === 'password' ? 'text' : 'password',
        }));
    };

    const submitForm = (e: FormEvent) => {
        e.preventDefault();
        setPasswordScreenProps((prev) => ({
            ...prev,
            submited: true,
            className: prev.className + ' submited',
        }));

        setTimeout(() => {
            logged();
        }, 1000);
    };

    const handleKeyDown = useCallback(
        (e: KeyboardEvent) => {
            if (e.key === ' ') {
                setLockScreenProps((prev) => ({
                    ...prev,
                    className: 'lock-screen active',
                }));

                setTimeout(() => {
                    setPasswordScreenProps((prev) => ({
                        ...prev,
                        className: 'password-screen active',
                    }));
                }, 500);

                document.removeEventListener('keydown', handleKeyDown);
            }
        },
        []
    );

    useEffect(() => {
        document.addEventListener('keydown', handleKeyDown);
        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [handleKeyDown]);

    return (
        <main className='main'>
            <div className="hint">
                <p>Press <strong>space</strong> to unlock</p>

                <FaRegLightbulb className='icon' />
            </div>

            <div className={lockScreenProps.className}>
                <h1>{getFormattedTime()}</h1>
                <p>Welcome back, John Doe!</p>
            </div>

            <div className={passwordScreenProps.className}>
                <div className='container'>
                    <div>
                        <PiUser className='user' />
                        <h2>John Doe</h2>
                    </div>

                    {!passwordScreenProps.submited ? (
                        <form className='input' onSubmit={submitForm}>
                            <input
                                type={passwordScreenProps.inputType}
                                id='login'
                                placeholder='Password'
                                autoComplete='off'
                            />

                            <button type='button' onClick={changeInputType} className='change-input-type-btn'>
                                {passwordScreenProps.inputType === 'password' ? (
                                    <FaRegEyeSlash className='icon' size={15} />
                                ) : (
                                    <FaRegEye className='icon' size={15} />
                                )}
                            </button>

                            <button type='submit' className='login-btn'>
                                <AiFillCaretRight className='icon' size={20} />
                            </button>
                        </form>
                    ) : (
                        <AiOutlineLoading className='loading' size={50} />
                    )}
                </div>
            </div>
        </main>
    );
};

export default LockScreen;
