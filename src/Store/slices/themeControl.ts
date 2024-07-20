import {createSlice, PayloadAction} from "@reduxjs/toolkit";

export type ModeTheme = 'light' | 'dark';
const themeControl = createSlice({
    name: "themeControl",
    initialState: {
        mode: "dark",
    },
    reducers: {
        changeTheme: (state, action : PayloadAction<ModeTheme>) => {
            state.mode = action.payload;
        }
    }
})

export const {changeTheme} = themeControl.actions;
export default themeControl.reducer;