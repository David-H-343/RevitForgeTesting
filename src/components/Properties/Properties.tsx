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
import { connect } from "react-redux";
import "./properties.css";
import { properties as objectProps } from "../Viewer/Viewer-helpers";

interface IPropertiesProps {
    properties: any[];
    onClose: () => void;
}

const Properties: React.FunctionComponent<IPropertiesProps> = (props) => {
    const { properties, onClose } = props;

    // State
    const [collapsed, setCollapsed] = React.useState<Map<number, boolean>>(
        new Map()
    );

    const toggleProperty = (
        // propertyIndex: number,
        evt: { preventDefault: () => void }
    ) => {
        evt.preventDefault();
        const propertyIndex = 1;
        const isCollapsed: boolean | undefined = collapsed.get(propertyIndex);

        setCollapsed(collapsed.set(propertyIndex, !isCollapsed));
    };

    useEffect(() => {
        if (properties.length === 1) {
            setCollapsed(collapsed.set(0, true));
            // this.setPropertyByIndex(0, true);
        }
    }, []);

    // const setPropertyByIndex = (index: number, isCollapsed: boolean) => {
    //     setCollapsed(collapsed.set(index, true));
    // };

    // const componentDidMount = () => {
    //     if (properties.length === 1) {
    //         setCollapsed(collapsed.set(0, true));
    //         // this.setPropertyByIndex(0, true);
    //     }
    // };

    // const componentDidUpdate = (prevProps: IPropertiesProps) => {
    //     if (prevProps.properties === properties) {
    //         return;
    //     }

    //     if (properties.length === 1) {
    //         setCollapsed(collapsed.set(0, true));
    //         // this.setPropertyByIndex(0, true);
    //     }
    // };

    // const objectprops = getModelProperties();
    console.log("PROPS");
    console.log(objectProps);

    return (
        <div className="model-properties">
            <div>
                <button className="close-btn" onClick={onClose}>
                    <i className="fa fa-close" />
                </button>
                <h3>Properties</h3>

                {!properties.length ? (
                    <p>
                        <em>Select a part to get started</em>
                    </p>
                ) : null}
                <div>
                    <div>
                        {properties.map(
                            (
                                property: {
                                    category:
                                        | boolean
                                        | React.ReactChild
                                        | React.ReactFragment
                                        | React.ReactPortal
                                        | null
                                        | undefined;
                                    data: any[];
                                },
                                i: number
                            ) => (
                                <ul key={i}>
                                    <div>
                                        <h4>
                                            <a
                                                data-toggle="collapse"
                                                onClick={toggleProperty}
                                            >
                                                {property.category}
                                            </a>
                                        </h4>
                                    </div>
                                    {collapsed.get(i) ? (
                                        <div>
                                            <ul>
                                                {property.data.map(
                                                    (
                                                        item: {
                                                            displayName:
                                                                | string
                                                                | number
                                                                | boolean
                                                                | {}
                                                                | React.ReactElement<
                                                                      any,
                                                                      | string
                                                                      | React.JSXElementConstructor<any>
                                                                  >
                                                                | React.ReactNodeArray
                                                                | React.ReactPortal
                                                                | null
                                                                | undefined;
                                                            displayValue:
                                                                | string
                                                                | number
                                                                | boolean
                                                                | {}
                                                                | React.ReactElement<
                                                                      any,
                                                                      | string
                                                                      | React.JSXElementConstructor<any>
                                                                  >
                                                                | React.ReactNodeArray
                                                                | React.ReactPortal
                                                                | null
                                                                | undefined;
                                                        },
                                                        itemIndex:
                                                            | React.Key
                                                            | null
                                                            | undefined
                                                    ) => (
                                                        <li key={itemIndex}>
                                                            <strong>
                                                                {
                                                                    item.displayName
                                                                }
                                                                :
                                                            </strong>{" "}
                                                            {item.displayValue}
                                                        </li>
                                                    )
                                                )}
                                            </ul>
                                        </div>
                                    ) : null}
                                </ul>
                            )
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

// const mapStateToProps = function(state) {
//     return {
//       profile: state.user.profile,
//       loggedIn: state.auth.loggedIn
//     }
//   }

// const PropertiesComponent = connect((state) => ({
//     properties: state.properties,
// }))(Properties);

export default Properties;
