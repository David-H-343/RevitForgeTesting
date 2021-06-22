import * as types from "./viewerTypes";

export function getViewerProperties(properties = []) {
    return {
        type: types.GET_AGGREGATE_PROPERTIES,
        properties,
    };
}
