/////////////////////////////////////////////////////////////////////////////////
// Copyright (c) Autodesk, Inc. All rights reserved
// Written by Jaime Rosales 2016 - Forge Developer Partner Services
//
// Permission to use, copy, modify, and distribute this software in
// object code form for any purpose and without fee is hereby granted,
// provided that the above copyright notice appears in all copies and
// that both that copyright notice and the limited warranty and
// restricted rights notice below appear in all supporting
// documentation.
//
// AUTODESK PROVIDES THIS PROGRAM "AS IS" AND WITH ALL FAULTS.
// AUTODESK SPECIFICALLY DISCLAIMS ANY IMPLIED WARRANTY OF
// MERCHANTABILITY OR FITNESS FOR A PARTICULAR USE.  AUTODESK, INC.
// DOES NOT WARRANT THAT THE OPERATION OF THE PROGRAM WILL BE
// UNINTERRUPTED OR ERROR FREE.
/////////////////////////////////////////////////////////////////////////////////

import React from "react";
import "antd/dist/antd.css";
import "./App.css";
import "font-awesome/css/font-awesome.css";
import ForgeViewer from "./ForgeViewer/ForgeViewer";

import { ISelectedProperties, SelectedPropertiesState } from "./type";
import { useSelector } from "react-redux";
import { Col, Row } from "antd";
import Viewer from "./Viewer/Viewer";
import Properties from "./Properties/Properties";

interface IAppProps {}

const App: React.FunctionComponent<IAppProps> = () => {
    const selectedProperties: ISelectedProperties | undefined = useSelector(
        (state: SelectedPropertiesState) => state.properties
    );
    return (
        <div>
            <Row justify="center" className="header">
                <Col span={24}></Col>
            </Row>
            <Row justify="center">
                <Col span={12} offset={6}>
                    <Row justify="center">
                        <Col span={24} className="forgeviewer">
                            <Viewer />
                        </Col>
                    </Row>
                    <Row className="footer">
                        <Col></Col>
                    </Row>
                </Col>
                <Col span={6} className="properties">
                    {/* <Properties onClose={() => {}} /> */}
                </Col>
            </Row>
        </div>
    );
};

export default App;
