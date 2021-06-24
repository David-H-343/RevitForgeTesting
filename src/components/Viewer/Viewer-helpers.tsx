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

/* global Autodesk, THREE */
import { debounce, uniq } from "lodash";

import Client from "../Client";

import { Dispatch } from "react";
import { getViewerProperties } from "../../actions/viewerActions";
import {
    IDimensions,
    IMaterial,
    IModelProperties,
    IModelPropertiesData,
    ISelectedProperties,
} from "../../type";
import store from "../../store";

var viewer: any;
const getToken = { accessToken: Client.getaccesstoken() };
var tileId = "";
export var properties = {};

function launchViewer(div: string, urn: string, id: string) {
    tileId = id;
    getToken.accessToken.then((token) => {
        var options = {
            document: urn,
            env: "AutodeskProduction",
            accessToken: token.access_token,
        };

        const viewerElement = document.getElementById(div);
        if (viewerElement) {
            viewer = new Autodesk.Viewing.Viewer3D(viewerElement, {});
        }

        Autodesk.Viewing.Initializer(options, function () {
            viewer.initialize();
            viewer.prefs.tag("ignore-producer");
            loadDocument(options.document);
        });
    });
}

function loadDocument(documentId: string) {
    Autodesk.Viewing.Document.load(
        documentId,
        function (doc) {
            // onLoadCallback
            var geometryItems =
                Autodesk.Viewing.Document.getSubItemsWithProperties(
                    doc.getRootItem(),
                    {
                        type: "geometry",
                        role: "3d",
                    },
                    true
                );
            if (geometryItems.length > 0) {
                geometryItems.forEach(function (item, index) {});
                viewer.addEventListener(
                    Autodesk.Viewing.GEOMETRY_LOADED_EVENT,
                    onGeometryLoaded
                );
                viewer.addEventListener(
                    Autodesk.Viewing.AGGREGATE_SELECTION_CHANGED_EVENT,
                    debounce(() => {
                        const dispatch: Dispatch<any> = store.dispatch;
                        getModelProperties()
                            .then((modelProperties) => {
                                const properties:
                                    | ISelectedProperties
                                    | undefined =
                                    getPropertiesFromModel(modelProperties);
                                dispatch(getViewerProperties(properties));
                            })
                            .catch(() => dispatch(getViewerProperties()));
                    }),
                    200
                );

                viewer.load(doc.getViewablePath(geometryItems[0])); // show 1st view on this document...
            }
        },
        function (errorMsg) {
            // onErrorCallback
            console.log(errorMsg);
        }
    );
}

const getPropertiesFromModel = (
    modelProperties: IModelProperties[]
): ISelectedProperties | undefined => {
    let dimensionsOfObject: IDimensions = {};
    let materialOfObject: IMaterial = {};
    let propertiesOfObject: ISelectedProperties = {
        dimensions: dimensionsOfObject,
        material: materialOfObject,
    };
    for (let i = 0; i < modelProperties.length; i++) {
        if (modelProperties[i].category === "Dimensions") {
            dimensionsOfObject = getDimensions(modelProperties[i].data);
        }
        propertiesOfObject = {
            dimensions: dimensionsOfObject,
            material: materialOfObject,
        };
    }
    return propertiesOfObject;
};

const getDimensions = (
    objectDimensions: IModelPropertiesData[]
): IDimensions => {
    let dimensions: IDimensions = {};
    for (let i = 0; i < objectDimensions.length; i++) {
        const val = objectDimensions[i].displayValue;
        if (objectDimensions[i].attributeName === "Length") {
            dimensions.length = val;
        } else if (objectDimensions[i].attributeName === "Width") {
            dimensions.width = val;
        } else if (objectDimensions[i].attributeName === "Height") {
            dimensions.height = val;
        } else if (objectDimensions[i].attributeName === "Perimeter") {
            dimensions.perimeter = val;
        } else if (objectDimensions[i].attributeName === "Area") {
            dimensions.area = val;
        } else if (objectDimensions[i].attributeName === "Volume") {
            dimensions.volume = val;
        }
    }
    return dimensions;
};

const getMaterial = (): IMaterial | null => {
    return null;
};

//////////////////////////////////////////////////////////////////////////
// Model Geometry loaded callback
//
//////////////////////////////////////////////////////////////////////////
function onGeometryLoaded(event: { target: any }) {
    var viewer = event.target;
    viewer.removeEventListener(
        Autodesk.Viewing.GEOMETRY_LOADED_EVENT,
        onGeometryLoaded
    );
    viewer.fitToView();
    viewer.setQualityLevel(false, false); // Getting rid of Ambientshadows to false to avoid blackscreen problem in Viewer.
}

function getModelProperties() {
    return new Promise<IModelProperties[]>((resolve, reject) => {
        const dbId = viewer.getSelection()[0];

        if (viewer.getSelectionCount() !== 1) {
            return reject("Invalid selection count");
        }

        return new Promise((resolve) => {
            viewer.model.getProperties(dbId, (model: { properties: any[] }) => {
                const properties = model.properties.filter(
                    (property) => !property.hidden
                );
                resolve(properties);
            });
        }).then((list: any) => {
            // Normalize displayCategory property in case it's falsy
            list = list.map((property: { displayCategory: string }) => ({
                ...property,
                displayCategory: property.displayCategory || "Miscellaneous",
            }));

            // Unique list of categories
            const categories: string[] = uniq(
                list.map(
                    (item: { displayCategory: string }) => item.displayCategory
                )
            );

            // Model data to be consumed
            // Ex: [ {category: 'Miscellaneous', data: []} ]
            const properties: IModelProperties[] = categories.map(
                (category) => ({
                    category,
                    data: list.filter(
                        (item: { displayCategory: string }) =>
                            item.displayCategory === category
                    ),
                })
            );

            resolve(properties);
        });
    });
}

export function viewerResize() {
    if (viewer) {
        viewer.resize();
    }
}

export function viewerExplode(num: number) {
    viewer.explode(num);
}

export function modelRestoreState() {
    // TODO: Not finished
    if (viewer) {
        var originalState = "";
        viewer.restoreState(originalState, false, false);
    }
}

const ViewerLaunchers = {
    launchViewer,
    loadDocument,
};

export default ViewerLaunchers;
