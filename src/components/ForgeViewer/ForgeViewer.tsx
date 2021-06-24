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

import React, { Component, useEffect } from "react";
import "./ForgeViewer.css";
import Viewer from "../Viewer/Viewer";
import classnames from "classnames";
import scrollTo from "scroll-to";
import Properties from "../Properties";
import {
    viewerResize,
    viewerExplode,
    toggleExplosion,
    toggleRotation,
    stopMotion,
    modelRestoreState,
} from "../Viewer/Viewer-helpers";
import { useSelector } from "react-redux";

interface IForgeViewerProps {}

const ForgeViewer: React.FunctionComponent<IForgeViewerProps> = ({}) => {
    // State
    const [fullscreen, setFullscreen] = React.useState<boolean>(false);
    const [isExploding, setIsExploding] = React.useState<boolean>(false);
    const [expMotion, setExpMotion] = React.useState<boolean>(false);
    const [rotMotion, setRotMotion] = React.useState<boolean>(false);
    const [resetState, setResetState] = React.useState<boolean>(false);
    const [isPropertiesVisible, setIsPropertiesVisible] =
        React.useState<boolean>(false);
    const [value, setValue] = React.useState<number>(0);

    const onOrientationChange = () => {
        setTimeout(() => viewerResize(), 300);
    };

    // const componentDidMount = () => {
    //     window.addEventListener("orientationchange", onOrientationChange);
    // };

    // const componentWillUnmount = () => {
    //     window.removeEventListener("orientationchange", onOrientationChange);
    // };

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
            setExpMotion(false);
            setRotMotion(false);
            setResetState(false);
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

    const onExplodeAnimation = () => {
        setExpMotion(!expMotion);
    };

    useEffect(() => {
        if (expMotion) {
            document.body.classList.add("explode-motion");
            toggleExplosion(false);
        } else {
            document.body.classList.remove("explode-motion");
            toggleExplosion(true);
        }
    }, [expMotion]);

    const onRotateAnimation = () => {
        setRotMotion(!rotMotion);
    };

    useEffect(() => {
        if (rotMotion) {
            document.body.classList.add("rotate-motion");
            toggleRotation(false);
        } else {
            document.body.classList.remove("rotate-motion");
            toggleRotation(true);
        }
    }, [rotMotion]);

    const onResetState = () => {
        document.body.classList.remove(
            "explode",
            "explode-motion",
            "rotate-motion"
        );
        setIsExploding(false);
        setExpMotion(false);
        setRotMotion(false);
        stopMotion();
        modelRestoreState();
    };

    const onSelectionChange = () => {
        if (!isPropertiesVisible) {
            return;
        }
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

    const explodeMotionClass = classnames({
        fa: true,
        "fa-bomb": fullscreen,
    });

    const rotateMotionClass = classnames({
        fa: true,
        "fa-repeat": fullscreen,
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

    const explodeMotionBtnClass = classnames({
        "explode-motion-btn": true,
        "expbtn--active": expMotion,
        "expbtn--deactive": !expMotion,
    });

    const rotateMotionBtnClass = classnames({
        "rotate-motion-btn": true,
        "rotbtn--active": rotMotion,
        "rotbtn--deactive": !rotMotion,
    });

    const resetBtnClass = classnames({
        "reset-btn": true,
        "resetbtn--deactive": !rotMotion,
    });

    return (
        <div className="forge-forgeviewer">
            <Viewer />
            <div className="forge-logo">
                <img src="images/forge-logo.png" alt="Autodesk Forge" />
            </div>
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
                <button
                    className={explodeMotionBtnClass}
                    onClick={onExplodeAnimation}
                >
                    <i className={explodeMotionClass}></i>
                </button>
                <button
                    className={rotateMotionBtnClass}
                    onClick={onRotateAnimation}
                >
                    <i className={rotateMotionClass}></i>
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
