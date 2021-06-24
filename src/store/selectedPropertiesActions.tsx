import { ISelectedProperties, SelectedPropertiesAction } from "../type";

export const GET_AGGREGATE_PROPERTIES = "GET_AGGREGATE_PROPERTIES";

export function getSelectedProperties(properties?: ISelectedProperties) {
    const action: SelectedPropertiesAction = {
        type: GET_AGGREGATE_PROPERTIES,
        properties,
    };
    return action;
}
