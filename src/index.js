import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { Provider } from "react-redux";
import stroe from "./modules/configStore";
import { unstable_HistoryRouter as HistoryRouter } from "react-router-dom";
import { createBrowserHistory } from "history";


const history = createBrowserHistory({ window });

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
	<HistoryRouter history={history}>
		<Provider store={stroe}>
			<App />
		</Provider>
	</HistoryRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
