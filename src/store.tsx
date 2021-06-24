import { createStore, applyMiddleware, Store } from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import { DispatchType, SelectedPropertiesAction, SelectedPropertiesState } from "./type";
import reducer from "./actions/viewerReducer";

const store: Store<SelectedPropertiesState, SelectedPropertiesAction> & {
    dispatch: DispatchType;
} = createStore(reducer, applyMiddleware(thunk));

// export type RootState = ReturnType<typeof store.getState>;
// export type AppDispatch = typeof store.dispatch;

export default store;
