// import { configureStore } from "@reduxjs/toolkit";
// import propertiesReducer, { IObjectProperties } from "./actions/viewerReducer";

// // export const store = createStore(reducers);

// const reducer = {
//     properties: propertiesReducer,
// };

// export const store = configureStore({
//     reducer,
//     // preloadedState,
// });

// export default store;

// import { createStore, Store } from "@reduxjs/toolkit";
import { createStore, applyMiddleware, Store } from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import { DispatchType, SelectedPropertiesAction, SelectedPropertiesState } from "./type";
import reducer from "./actions/viewerReducer";

// const store: Store<PropertyState, PropertyAction> & {
//     dispatch: DispatchType;
// } = createStore(reducer, applyMiddleware(thunk));

const store: Store<SelectedPropertiesState, SelectedPropertiesAction> & {
    dispatch: DispatchType;
} = createStore(reducer, applyMiddleware(thunk));

// export type RootState = ReturnType<typeof store.getState>;
// export type AppDispatch = typeof store.dispatch;

export default store;
