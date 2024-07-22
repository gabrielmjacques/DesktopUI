import { FcCommandLine, FcGoogle, FcSteam, FcTodoList } from "react-icons/fc";
import AppItem from "../AppItem";
import { FcHome } from "react-icons/fc";
import IWindow from "../../interfaces/IWindow";

import './desktop.scss';
import { AiFillSetting } from "react-icons/ai";
import { useWindows } from "../../providers/WindowProvider";
import Window from "../Window";

function Desktop() {
    const { openWindows, minimizedWindows, minimizeWindow, maximizeWindow } = useWindows();

    const handleTaskBarClick = (window: IWindow) => {
        if (minimizedWindows.includes(window)) {
            maximizeWindow(window);
            return;
        }

        minimizeWindow(window);
    };

    return (
        <main className="desktop">
            <div className="items">
                <AppItem name={"Google"} icon={<FcGoogle className="icon" />} />
                <AppItem name={"ToDoApp"} icon={<FcTodoList className="icon" />} />
                <AppItem name={"Steam"} icon={<FcSteam className="icon" />} />
                <AppItem name={"Terminal"} icon={<FcCommandLine className="icon" />} />
            </div>

            <div className="task-bar">
                <button><FcHome className="icon" /></button>
                <button><AiFillSetting className="icon" /></button>

                {/* Add a button for each open window */}
                {
                    openWindows.map(window => (
                        <button key={window.id} onClick={() => handleTaskBarClick(window)}>
                            {window.icon}
                        </button>
                    ))
                }
            </div>

            {
                openWindows.map(window => (
                    <Window key={window.id} window={window} />
                ))
            }
        </main>
    );
}

export default Desktop;