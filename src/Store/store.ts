import {configureStore} from "@reduxjs/toolkit";
import themeControl from "./slices/themeControl.ts";
import langControl from "./slices/langControl.ts";

const store = configureStore({
    reducer: {
        lang: langControl,
        theme: themeControl
    }
})


export type RootState = ReturnType<typeof store.getState>
export type Dispatch = typeof store.dispatch;

export default store;