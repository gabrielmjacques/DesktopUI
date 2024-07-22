import React, { useCallback, useEffect, useState, FormEvent } from 'react';
import './lock-screen.scss';
import { AiFillCaretRight, AiOutlineLoading } from 'react-icons/ai';
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa';
import userImg from '../../assets/images/user.png';

interface LockScreenProps {
    logged: () => void;
}

const LockScreen: React.FC<LockScreenProps> = ({ logged }) => {
    const date = new Date();

    const [lockScreenProps, setLockScreenProps] = useState({
        className: 'lock-screen',
        isLocked: true,
    });

    const [unlockScreenProps, setUnlockScreenProps] = useState({
        className: 'unlock-screen',
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
        setUnlockScreenProps((prev) => ({
            ...prev,
            inputType: prev.inputType === 'password' ? 'text' : 'password',
        }));
    };

    const submitForm = (e: FormEvent) => {
        e.preventDefault();
        setUnlockScreenProps((prev) => ({
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
            if (lockScreenProps.isLocked && e.key === ' ') {
                setLockScreenProps((prev) => ({
                    ...prev,
                    className: 'lock-screen active',
                }));

                setTimeout(() => {
                    setUnlockScreenProps((prev) => ({
                        ...prev,
                        className: 'unlock-screen active',
                    }));
                }, 500);

                document.removeEventListener('keydown', handleKeyDown);
            }
        },
        [lockScreenProps.isLocked]
    );

    useEffect(() => {
        document.addEventListener('keydown', handleKeyDown);
        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [handleKeyDown]);

    return (
        <main className='main'>
            <div className={lockScreenProps.className}>
                <h1>{getFormattedTime()}</h1>
                <p>Welcome back, John Doe!</p>
            </div>

            <div className={unlockScreenProps.className}>
                <div className='container'>
                    <div>
                        <img src={userImg} alt='' className='user' />
                        <h2>John Doe</h2>
                    </div>

                    {!unlockScreenProps.submited ? (
                        <form className='input' onSubmit={submitForm}>
                            <input
                                type={unlockScreenProps.inputType}
                                id='login'
                                placeholder='Password'
                                autoComplete='off'
                            />

                            <button type='button' onClick={changeInputType} className='change-input-type-btn'>
                                {unlockScreenProps.inputType === 'password' ? (
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
