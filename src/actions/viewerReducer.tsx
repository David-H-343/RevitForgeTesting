import { SelectedPropertiesAction, SelectedPropertiesState } from "../type";
import * as actionTypes from "./viewerTypes";

const initialState: SelectedPropertiesState = {
    // properties: {
    //     dimensions: {
    //         length: 10,
    //         area: 100,
    //     },
    //     material: {
    //         name: "Carpet",
    //         cost: 5,
    //     },
    // },
};

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

// declare const reducer: Reducer<IModelProperties[]>;
export default reducer;
