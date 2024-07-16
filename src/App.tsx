import "./App.css";
import ViewCount from "@components/widgets/ViewCount";
// import CommitInfo from "@components/widgets/CommitInfo";
import WakaTime from "@components/widgets/WakaTime";
// import {ThemeProvider} from "@suid/material";
import {createContext, JSX} from "solid-js";
import {Container, CssBaseline} from "@suid/material";
import NavBar from "@components/NavBar";
import Footer from "@components/Footer";

createContext()

// export const [theme, setTheme] = createSignal({});


const Layout = (props: {
    children: JSX.Element;
}) => {
    return (
        <>
            <CssBaseline/>
            <NavBar/>
            <Container sx={{height: "100vh", width: "100vw"}} as={"main"} disableGutters  maxWidth={false}>
                    {props.children}
            </Container>
            <Footer/>
        </>
    )
}

function App() {
    return (
        <>
            <Layout>
                <WakaTime/>
                <ViewCount duration={1.1}/>
                {/*<CommitInfo/>*/}
            </Layout>
        </>
    );
}

export default App;
