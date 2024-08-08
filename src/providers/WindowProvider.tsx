import React, { useState, createContext, useContext, ReactNode } from 'react';
import IWindow from '../interfaces/IWindow';

interface IWindowContextProps {
    openWindows: IWindow[];
    openWindow: (window: IWindow) => void;
    closeWindow: (window: IWindow) => void;
    activeWindow: IWindow | null;
    setActiveWindow: (window: IWindow | null) => void;
    windowOrder: IWindow[];
    bringWindowToFront: (window: IWindow) => void;
    minimizeWindow: (window: IWindow) => void;
    minimizedWindows: IWindow[];
    maximizeWindow: (window: IWindow) => void;
}

const WindowContext = createContext<IWindowContextProps | undefined>(undefined);

export const WindowProvider: React.FC<{ children: ReactNode; }> = ({ children }) => {
    const [openWindows, setOpenWindows] = useState<IWindow[]>([]);
    const [minimizedWindows, setMinimizedWindows] = useState<IWindow[]>([]);
    const [activeWindow, setActiveWindow] = useState<IWindow | null>(null);
    const [windowOrder, setWindowOrder] = useState<IWindow[]>([]);

    /**
     * Open a new window
     * @param window Window to be opened
     */
    const openWindow = (window: IWindow) => {
        setOpenWindows([...openWindows, window]);
        setActiveWindow(window);
        setWindowOrder([...windowOrder, window]);
    };

    /**
     * Close a window
     * @param window Window to be closed
     */
    const closeWindow = (window: IWindow) => {
        setOpenWindows(openWindows.filter(w => w.windowID !== window.windowID));
        setWindowOrder(windowOrder.filter(w => w.windowID !== window.windowID));
        setMinimizedWindows(minimizedWindows.filter(w => w.windowID !== window.windowID));
    };

    /**
     * Bring a window to front
     * @param window Window to be brought to front
     */
    const bringWindowToFront = (window: IWindow) => {
        setWindowOrder(windowOrder.filter(w => w.windowID !== window.windowID).concat(window));
        setActiveWindow(window);
    };

    /**
     * Minimize a window (add to minimized windows)
     * @param window Window to be minimized
     */
    const minimizeWindow = (window: IWindow) => {
        setMinimizedWindows([...minimizedWindows, window]);
    };

    /**
     * Maximize a window (remove from minimized windows)
     * @param window Window to be maximized
     */
    const maximizeWindow = (window: IWindow) => {
        setMinimizedWindows(minimizedWindows.filter(w => w.windowID !== window.windowID));
        bringWindowToFront(window);
    };

    return (
        <WindowContext.Provider value={{
            openWindows,
            openWindow,
            closeWindow,
            activeWindow,
            setActiveWindow,
            windowOrder,
            bringWindowToFront,
            minimizeWindow,
            minimizedWindows,
            maximizeWindow
        }}>
            {children}
        </WindowContext.Provider>
    );
};

export const useWindows = (): IWindowContextProps => {
    const context = useContext(WindowContext);
    if (!context) {
        throw new Error('useWindows must be used within a WindowProvider');
    }
    return context;
};
