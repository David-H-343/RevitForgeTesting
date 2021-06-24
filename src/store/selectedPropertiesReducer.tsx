import { SelectedPropertiesAction, SelectedPropertiesState } from "../type";
import { GET_AGGREGATE_PROPERTIES } from "./selectedPropertiesActions";

const initialState: SelectedPropertiesState = {};

const reducer = (
    state: SelectedPropertiesState = initialState,
    action: SelectedPropertiesAction
): SelectedPropertiesState => {
    switch (action.type) {
        case GET_AGGREGATE_PROPERTIES:
            const { properties } = action;
            return {
                ...state,
                properties,
            };
    }
    return state;
};

export default reducer;
