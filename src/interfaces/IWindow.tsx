import { ReactElement } from "react";

export default interface Window {
    name: string;
    icon: JSX.Element;
    windowID: string;
    application: ReactElement;
    defaultSize?: { width: number, height: number; };
    isResizable?: boolean;
}