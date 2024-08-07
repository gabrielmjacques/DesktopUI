import { ReactElement } from 'react';
import IWindow from '../../interfaces/IWindow';
import { useWindows } from '../../providers/WindowProvider';
import './app-item.scss';

interface IAppItemProps {
    icon: JSX.Element;
    name: string;
    application: ReactElement;
    defaultSize?: { width: number, height: number; };
    isResizable?: boolean;
}

function AppItem({ icon, name, application }: IAppItemProps) {
    const { openWindow } = useWindows();

    const openApp = () => {
        const window: IWindow = {
            name,
            icon,
            windowID: `${name.toLowerCase()}-${Date.now()}-${Math.random().toString(36).substring(2)}`,
            application: application
        };

        openWindow(window);
    };

    return (
        <button className="app-item" onDoubleClick={openApp}>
            {icon}

            <span>{name}</span>
        </button>
    );
}

export default AppItem;