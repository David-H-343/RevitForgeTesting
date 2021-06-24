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

import React, { Component } from "react";
import "antd/dist/antd.css";
// import "bootstrap/dist/css/bootstrap.css";
import "./App.css";
import "font-awesome/css/font-awesome.css";
import ForgeViewer from "./ForgeViewer/ForgeViewer";
import Viewer from "./Viewer/Viewer";

import { ISelectedProperties, SelectedPropertiesState } from "./type";
import { useSelector } from "react-redux";
import { Col, Row } from "antd";

interface IAppProps {}

const App: React.FunctionComponent<IAppProps> = () => {
    const selectedProperties: ISelectedProperties | undefined = useSelector(
        (state: SelectedPropertiesState) => state.properties
    );
    return (
        <div>
            <ForgeViewer />
        </div>
    );
};

export default App;
