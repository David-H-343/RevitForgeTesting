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
import "./properties.css";
import { useSelector } from "react-redux";
import { ISelectedProperties, SelectedPropertiesState } from "../type";

interface IPropertiesProps {
    onClose: () => void;
}

const Properties: React.FunctionComponent<IPropertiesProps> = (props) => {
    const { onClose } = props;
    const selectedProperties: ISelectedProperties | undefined = useSelector(
        (state: SelectedPropertiesState) => state.properties
    );

    return (
        <div className="model-properties">
            <div>
                <button className="close-btn" onClick={onClose}>
                    <i className="fa fa-close" />
                </button>
                <h3>Properties</h3>

                {!selectedProperties ? (
                    <p>
                        <em>Select a part to get started</em>
                    </p>
                ) : (
                    <div>
                        <div>
                            {Object.keys(selectedProperties.dimensions).length >
                                0 && <h4>Dimensions</h4>}
                            <ul>
                                {selectedProperties.dimensions?.length && (
                                    <li>
                                        Length:{" "}
                                        {Math.round(
                                            selectedProperties.dimensions.length
                                        )}
                                    </li>
                                )}
                                {selectedProperties.dimensions?.width && (
                                    <li>
                                        Width:{" "}
                                        {Math.round(
                                            selectedProperties.dimensions.width
                                        )}
                                    </li>
                                )}
                                {selectedProperties.dimensions?.height && (
                                    <li>
                                        Height:{" "}
                                        {Math.round(
                                            selectedProperties.dimensions.height
                                        )}
                                    </li>
                                )}
                                {selectedProperties.dimensions?.perimeter && (
                                    <li>
                                        Perimeter:{" "}
                                        {Math.round(
                                            selectedProperties.dimensions
                                                .perimeter
                                        )}
                                    </li>
                                )}
                                {selectedProperties.dimensions?.area && (
                                    <li>
                                        Area:{" "}
                                        {selectedProperties.dimensions.area.toFixed(
                                            3
                                        )}
                                    </li>
                                )}
                                {selectedProperties.dimensions?.volume && (
                                    <li>
                                        Volume:{" "}
                                        {selectedProperties.dimensions.volume.toFixed(
                                            3
                                        )}
                                    </li>
                                )}
                            </ul>

                            {Object.keys(selectedProperties.material).length >
                                0 && <h4>Material</h4>}
                            <ul>
                                {selectedProperties.material?.name && (
                                    <li>
                                        Material:{" "}
                                        {selectedProperties.material?.name}
                                    </li>
                                )}
                                {selectedProperties.material?.cost && (
                                    <li>
                                        Cost:{" "}
                                        {Math.round(
                                            selectedProperties.material?.cost ||
                                                0
                                        )}
                                    </li>
                                )}
                            </ul>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Properties;
