import "./css/body.css";
import "./css/app.css";
import "./css/header.css";

import ReactDOM from 'react-dom';
import App from "./App.jsx";
import { HashRouter } from "react-router-dom/cjs/react-router-dom.js";
import { Provider } from "react-redux";
import {store} from "./services/store.js";

ReactDOM.render(
    <Provider store={store}>
        <HashRouter>
            <App />
        </HashRouter>
    </Provider>,
    document.getElementById("root")
);
