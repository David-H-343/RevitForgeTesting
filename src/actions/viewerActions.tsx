import { IModelProperties } from "../components/Viewer/Viewer-helpers";
import * as types from "./viewerTypes";

export function getViewerProperties(properties: IModelProperties[] = []) {
    return {
        type: types.GET_AGGREGATE_PROPERTIES,
        properties,
    };
}
