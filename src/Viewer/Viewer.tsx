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

import React, { useEffect } from "react";
import ViewerLaunchers from "./Viewer-helpers";

interface IViewerProps {}

const Viewer: React.FunctionComponent<IViewerProps> = (props) => {
    const {} = props;

    useEffect(() => {
        var documentId =
            "urn:dXJuOmFkc2sub2JqZWN0czpvcy5vYmplY3Q6dGFrZW9mZi9yYWNfYmFzaWNfc2FtcGxlX3Byb2plY3QucnZ0";
        ViewerLaunchers.launchViewer("viewerDiv", documentId);
    }, []);

    return <div className="forge-viewer" id="viewerDiv" />;
};

export default Viewer;
