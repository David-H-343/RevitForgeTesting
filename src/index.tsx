import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import "antd/dist/antd.css";
import { Col, Row } from "antd";

ReactDOM.render(
    <React.StrictMode>
        Hello
        <Row justify="center" style={{ height: 600 }}>
            <Col span="8">
                Hello
                <App />
            </Col>
        </Row>
    </React.StrictMode>,
    document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
