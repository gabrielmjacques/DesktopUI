import { useWindows } from '../../providers/WindowProvider';
import IWindow from '../../interfaces/IWindow';
import './app-item.scss';

interface IAppItemProps {
    icon: JSX.Element;
    name: string;
}

function AppItem({ icon, name }: IAppItemProps) {
    const { openWindows, openWindow } = useWindows();

    const openApp = () => {
        const window: IWindow = {
            name,
            icon,
            id: `${name}-${Math.random().toString(36).substring(7)}`,
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