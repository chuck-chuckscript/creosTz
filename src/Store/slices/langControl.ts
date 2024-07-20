import {createSlice, PayloadAction} from "@reduxjs/toolkit";

export type LangType = 'ru' | 'en';
const langControl = createSlice({
    name: "langControl",
    initialState: {
        lang: 'en',
    },
    reducers: {
        changeLang: (state, action : PayloadAction<LangType>) => {
            state.lang = action.payload;
        }
    }
})

export const {changeLang} = langControl.actions;
export default langControl.reducer;