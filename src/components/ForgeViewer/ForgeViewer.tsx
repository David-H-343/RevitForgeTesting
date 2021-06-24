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
import "./ForgeViewer.css";
import Viewer from "../Viewer/Viewer";
import classnames from "classnames";
import scrollTo from "scroll-to";
import Properties from "../Properties";
import {
    viewerResize,
    viewerExplode,
    modelRestoreState,
} from "../Viewer/Viewer-function-helpers";

interface IForgeViewerProps {}

const ForgeViewer: React.FunctionComponent<IForgeViewerProps> = () => {
    // State
    const [fullscreen, setFullscreen] = React.useState<boolean>(false);
    const [isExploding, setIsExploding] = React.useState<boolean>(false);
    const [isPropertiesVisible, setIsPropertiesVisible] =
        React.useState<boolean>(false);
    const [value, setValue] = React.useState<number>(0);

    const handleValueChange = (event: { target: { value: any } }) => {
        setValue(event.target.value);
        viewerExplode(value / 100);
    };

    const onFullscreen = () => {
        setFullscreen(!fullscreen);
    };

    useEffect(() => {
        if (fullscreen) {
            scrollTo(0, 0, {
                ease: "inQuad",
                duration: 300,
            });
            document.body.classList.add("fullscreen");
        } else {
            document.body.classList.remove("fullscreen");
            onResetState();
            if (isExploding) {
                document.body.classList.remove("explode");
            }

            setFullscreen(false);
            setIsExploding(false);
            setIsPropertiesVisible(false);
            setValue(0);
        }

        // resize viewer after css animation
        setTimeout(() => viewerResize(), 300);
    }, [fullscreen]);

    const onPropertiesDisplay = () => {
        setIsPropertiesVisible(!isPropertiesVisible);
    };

    useEffect(() => {
        if (isPropertiesVisible) {
            document.body.classList.add("properties-show");
        } else {
            document.body.classList.remove("properties-show");
        }
    }, [isPropertiesVisible]);

    const onExplode = () => {
        setIsExploding(!isExploding);
    };

    useEffect(() => {
        if (isExploding) {
            document.body.classList.add("explode");
        } else {
            document.body.classList.remove("explode");
        }
    }, [isExploding]);

    const onResetState = () => {
        document.body.classList.remove(
            "explode",
            "explode-motion",
            "rotate-motion"
        );
        setIsExploding(false);
        modelRestoreState();
    };

    const handlePropertiesClose = () => {
        setIsPropertiesVisible(false);
    };

    const buttonClass = classnames({
        fa: true,
        "fa-expand": !fullscreen,
        "fa-compress": fullscreen,
    });

    const propertiesClass = classnames({
        fa: true,
        "fa-list": fullscreen,
    });

    const explodeClass = classnames({
        fa: true,
        "fa-cubes": fullscreen,
    });

    const resetClass = classnames({
        fa: true,
        "fa-refresh": fullscreen,
    });

    const propertiesBtnClass = classnames({
        "properties-btn": true,
        "btn--active": isPropertiesVisible,
        "btn--deactive": !isPropertiesVisible,
    });

    const explodeBtnClass = classnames({
        "explode-btn": true,
        "btn--active": isExploding,
        "btn--deactive": !isExploding,
    });

    const resetBtnClass = classnames({
        "reset-btn": true,
    });

    return (
        <div className="forge-forgeviewer">
            <Viewer />
            <div className="container safari-only">
                <button className="forge-btn" onClick={onFullscreen}>
                    <i className={buttonClass}></i>
                </button>
                <button
                    className={propertiesBtnClass}
                    onClick={onPropertiesDisplay}
                >
                    <i className={propertiesClass}></i>
                </button>
                <button className={explodeBtnClass} onClick={onExplode}>
                    <i className={explodeClass}></i>
                </button>
                <button className={resetBtnClass} onClick={onResetState}>
                    <i className={resetClass}></i>
                </button>

                {isPropertiesVisible ? (
                    <Properties onClose={handlePropertiesClose} />
                ) : null}

                <input
                    type="range"
                    className="range-style"
                    min="0"
                    max="100"
                    value={value}
                    onChange={handleValueChange}
                />
            </div>
        </div>
    );
};

export default ForgeViewer;
