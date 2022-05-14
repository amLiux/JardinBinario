import { createContext } from "react";

const defaultContext = {
    markdownText: '',
    setMarkdownText: (string:string) => {}
};

export default createContext(defaultContext)