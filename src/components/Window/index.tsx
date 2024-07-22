import { useRef, useState } from 'react';
import { AiOutlineLine } from 'react-icons/ai';
import { IoIosSquareOutline, IoMdClose } from 'react-icons/io';
import { PiSubtractSquareDuotone } from 'react-icons/pi';
import { Rnd } from 'react-rnd';
import IWindow from '../../interfaces/IWindow';
import { useWindows } from '../../providers/WindowProvider';
import './window.scss';

interface IWindowProps {
    window: IWindow;
}

export default function Window({ window }: IWindowProps) {
    const clientWidth = document.body.clientWidth;
    const clientHeight = document.body.clientHeight;

    const { closeWindow, activeWindow, bringWindowToFront, windowOrder, minimizeWindow, minimizedWindows } = useWindows();
    const windowRef = useRef<HTMLDivElement>(null);

    const [isFullscreen, setIsFullscreen] = useState(false);
    const [windowSize, setWindowSize] = useState({ width: clientWidth / 2.3, height: clientHeight / 2 });
    const [windowPosition, setWindowPosition] = useState({ x: clientWidth / 2 - 400 + Math.random() * 100, y: clientHeight / 2 - 300 + Math.random() * 100 });

    const handleMinimize = () => {
        minimizeWindow(window);
    };

    const handleFullscreen = () => {
        if (isFullscreen) {
            // Restore to original size and position
            setWindowSize({ width: clientWidth / 2.3, height: clientHeight / 2 });
            setWindowPosition({ x: clientWidth / 2 - 400 + Math.random() * 100, y: clientHeight / 2 - 300 + Math.random() * 100 });
        } else {
            // Maximize window
            setWindowSize({ width: clientWidth, height: clientHeight });
            setWindowPosition({ x: 0, y: 0 });
        }

        setIsFullscreen(!isFullscreen);
    };

    const handleClose = () => {
        closeWindow(window);
    };

    const handleClick = () => {
        bringWindowToFront(window);
    };

    return (
        <Rnd
            size={{ width: windowSize.width, height: windowSize.height }}
            position={{ x: windowPosition.x, y: windowPosition.y }}
            onDragStop={(e, d) => {
                setWindowPosition({ x: d.x, y: d.y });
            }}
            onResizeStop={(e, direction, ref, delta, position) => {
                setWindowSize({
                    width: ref.style.width as unknown as number,
                    height: ref.style.height as unknown as number
                });
                setWindowPosition(position);
            }}
            minWidth={400}
            minHeight={300}
            dragHandleClassName='info'
            bounds={'parent'}
            className={`window-container ${activeWindow?.id === window.id ? 'active' : ''}`}
            onMouseDown={handleClick}
            style={{
                zIndex: windowOrder.findIndex(w => w.id === window.id),
                borderRadius: isFullscreen ? 0 : 10,
                display: minimizedWindows.includes(window) ? 'none' : 'block'
            }}
        >
            <div ref={windowRef} className="window">
                <div className="window-header">
                    <div className="info" onDoubleClick={handleFullscreen}>
                        <span>{window.name}</span>
                    </div>

                    <div className="actions">
                        <button onClick={handleMinimize}>
                            <AiOutlineLine />
                        </button>

                        <button onClick={handleFullscreen}>
                            {
                                isFullscreen
                                    ? <PiSubtractSquareDuotone />
                                    : <IoIosSquareOutline />
                            }
                        </button>

                        <button onClick={handleClose}>
                            <IoMdClose />
                        </button>
                    </div>
                </div>

                <div className="window-content">
                    Janela {window.name}
                </div>
            </div>
        </Rnd>
    );
}
