import { configureStore } from "@reduxjs/toolkit";
import propertiesReducer from "./reducers/viewerReducer";

// export const store = createStore(reducers);

const reducer = {
    properties: propertiesReducer,
};

const preloadedState = {
    properties: [
        {
            dimensions: {
                width: 10,
                length: 10,
                area: 100,
                unit: "ft",
            },
            material: {
                name: "Carpet",
                cost: "5",
            },
        },
        {
            dimensions: {
                width: 5,
                length: 5,
                area: 25,
                unit: "ft",
            },
            material: {
                name: "Hardwood",
                cost: "8",
            },
        },
    ],
};

export const store = configureStore({
    reducer,
    preloadedState,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
