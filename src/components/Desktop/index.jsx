import { FcCommandLine, FcGoogle, FcSteam, FcTodoList } from "react-icons/fc";
import AppItem from "../AppItem";
import { FcHome } from "react-icons/fc";

import './desktop.scss';
import { AiFillSetting } from "react-icons/ai";

function Desktop() {
    return (
        <main className="desktop">
            <div className="items">
                <AppItem name={"Google"} icon={<FcGoogle className="icon" size={50} />} />
                <AppItem name={"ToDoApp"} icon={<FcTodoList className="icon" size={50} />} />
                <AppItem name={"Steam"} icon={<FcSteam className="icon" size={60} />} />
                <AppItem name={"Terminal"} icon={<FcCommandLine className="icon" size={50} />} />
            </div>

            <div className="task-bar">
                <button><FcHome size={35} className="icon" /></button>
                <button><AiFillSetting size={30} className="icon" /></button>
            </div>
        </main>
    );
}

export default Desktop;