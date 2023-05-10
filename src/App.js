import Logo from "./elements/Logo";
import Navigation from "./components/Navigation";
import {BrowserRouter} from "react-router-dom";

function App() {
    return (
        <div className="app">
            <Logo/>
            <BrowserRouter>
                <div className="container">
                    <Navigation/>
                </div>
            </BrowserRouter>
        </div>
    );
}

export default App;