import NewTab from "./NewTab";
import {HashRouter as Router, Routes} from "react-router-dom";
import {Route} from "react-router";

const Main = () => {

    return <div>
        <Router>
            <Routes>
                <Route path="/" element={<NewTab />} />
            </Routes>
        </Router>
    </div>
}

export default Main