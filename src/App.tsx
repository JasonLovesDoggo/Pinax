import "./App.css";
import ViewCount from "@components/ViewCount";
import CommitInfo from "@components/CommitInfo";
import WakaTime from "@components/WakaTime";
// import {ThemeProvider} from "@suid/material";
import {createContext} from "solid-js";

createContext()

// export const [theme, setTheme] = createSignal(BaseTheme);


function App() {


    return (
        <>
            {/*<ThemeProvider theme={theme()}>*/}

                <div>
                    <h1>Portfolio</h1>
                    <p>My personal portfolio website</p>
                    <WakaTime/>
                    <ViewCount duration={1.1}/>
                    <CommitInfo/>
                </div>
            {/*</ThemeProvider>*/}
        </>
    );
}

export default App;
