// import { types } from "../actions";

// const initialState = {
//     properties: [],
// };

// export default function viewer(
//     state = initialState,
//     action: { type?: any; properties?: any }
// ) {
//     switch (action.type) {
//         case types.GET_AGGREGATE_PROPERTIES:
//             const { properties } = action;
//             return {
//                 ...state,
//                 properties,
//             };
//         default:
//             return state;
//     }
// }

import { Reducer } from "@reduxjs/toolkit";
import { ISelectedProperties, SelectedPropertiesAction, SelectedPropertiesState } from "../type";
import * as actionTypes from "./viewerTypes";

const initialState: SelectedPropertiesState = {
    properties: 
        {
            dimensions: {
                length: 10,
                area: 100,
            },
            material: {
                name: "Carpet",
                cost: 5,
            },
        },
        // {
        //     dimensions: {
        //         length: 5,
        //         area: 25,
        //     },
        //     material: {
        //         name: "Hardwood",
        //         cost: 8,
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
