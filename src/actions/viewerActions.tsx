import * as actionTypes from "./viewerTypes";
import { ISelectedProperties, SelectedPropertiesAction } from "../type";

export function getViewerProperties(properties?: ISelectedProperties) {
    const action: SelectedPropertiesAction = {
        type: actionTypes.GET_AGGREGATE_PROPERTIES,
        properties,
    };
    return action;
}
