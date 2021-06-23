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
declare const reducer: Reducer<{}>;
export default reducer;
