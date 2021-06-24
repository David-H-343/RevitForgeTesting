import { SelectedPropertiesAction, SelectedPropertiesState } from "../type";
import * as actionTypes from "./viewerTypes";

const initialState: SelectedPropertiesState = {};

const reducer = (
    state: SelectedPropertiesState = initialState,
    action: SelectedPropertiesAction
): SelectedPropertiesState => {
    switch (action.type) {
        case actionTypes.GET_AGGREGATE_PROPERTIES:
            const { properties } = action;
            return {
                ...state,
                properties,
            };
    }
    return state;
};

export default reducer;
