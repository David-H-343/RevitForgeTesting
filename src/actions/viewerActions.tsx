import * as actionTypes from "./viewerTypes";
import { ISelectedProperties, SelectedPropertiesAction } from "../type";
import { actions } from ".";
import { action } from "typesafe-actions";
import * as types from "./viewerTypes";

// export const viewerPropertiesAction = (properties: IModelProperties[]) =>
//     action(types.GET_AGGREGATE_PROPERTIES, properties);

export function getViewerProperties(properties?: ISelectedProperties) {
    const action: SelectedPropertiesAction = {
        type: actionTypes.GET_AGGREGATE_PROPERTIES,
        properties,
    };
    return action;
}

// export function getViewerProperties(modelProperties: IModelProperties[] = []) {
//     return {
//         // viewerPropertiesAction(modelProperties)
//         // type: types.GET_AGGREGATE_PROPERTIES,
//         // properties,
//     };
// }
