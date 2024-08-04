import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import profileSlice from "./profileSlice";
import AsyncStorage from "@react-native-async-storage/async-storage";
import logger from "redux-logger";
import thunk from "redux-thunk";
import { request } from "../util/request";
const persistConfig = {
    storage: AsyncStorage,
    key: "root",
}
const rootReduceer = combineReducers({ profile: profileSlice });

export const persistedReducer = persistReducer(persistConfig, rootReduceer);
export const store = configureStore({
    reducer: persistedReducer,
    //Disable serializable
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: {
        extraArgument: request,
      },
      serializableCheck: false,
    }),
    //Disable serializable
});
export const persistor = persistStore(store);

// export const store =  configureStore({
//     reducer:{profile: profileSlice, //create reducer profile
//     },
// });