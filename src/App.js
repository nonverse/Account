import Logo from "./elements/Logo";
import Navigation from "./components/Navigation";
import {BrowserRouter} from "react-router-dom";
import Router from "./components/Router";

function App() {
    return (
        <div className="app">
            <Logo/>
            <BrowserRouter>
                <div className="container">
                    <Navigation/>
                    <div className="content-wrapper">
                        <Router/>
                    </div>
                </div>
            </BrowserRouter>
        </div>
    );
}

export default App;