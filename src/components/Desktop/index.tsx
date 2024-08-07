import AppItem from "../AppItem";
import Window from "../Window";
import IWindow from "../../interfaces/IWindow";
import { FcHome } from "react-icons/fc";
import { AiFillSetting } from "react-icons/ai";
import { RiNetflixFill } from "react-icons/ri";
import { useWindows } from "../../providers/WindowProvider";
import { FaCalculator } from "react-icons/fa";
import './desktop.scss';
import NetflixAPP from "../../Applications/Netlfix";
import CalculatorAPP from "../../Applications/Calculator";

function Desktop() {
    const { openWindows, minimizedWindows, minimizeWindow, maximizeWindow, bringWindowToFront } = useWindows();

    /**
     * Handle the click on the task bar button
     * @param window Window to be minimized or maximized
     */
    const handleTaskBarClick = (window: IWindow): void => {
        if (minimizedWindows.includes(window)) {
            bringWindowToFront(window);
            maximizeWindow(window);
            return;
        }

        minimizeWindow(window);
    };

    return (
        <main className="desktop">

            {/* Applications that will be displayed on the desktop */}
            <div className="items">
                <AppItem name={"Netflix"} icon={<RiNetflixFill className="icon" />} application={<NetflixAPP />} />
                <AppItem name="Calculator" icon={<FaCalculator className="icon" />} application={<CalculatorAPP />} />
            </div>

            {/* TaskBar */}
            <div className="task-bar">
                <button><FcHome className="icon" /></button>
                <button><AiFillSetting className="icon" /></button>

                {
                    // Add a button for each open window
                    openWindows.map(window => (
                        <button
                            key={window.windowID}
                            onClick={() => handleTaskBarClick(window)}
                            className={`${minimizedWindows.includes(window) ? 'minimized' : ''}`}
                        >
                            {window.icon}
                        </button>
                    ))
                }
            </div>

            {
                // Display each open window
                openWindows.map(window => (
                    <Window key={window.windowID} windowData={window} />
                ))
            }

        </main>
    );
}

export default Desktop;