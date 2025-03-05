import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ConfigState {
    maxSize?: string; 
}

const initialState: ConfigState = {
    maxSize: undefined, 
};

const configSlice = createSlice({
    name: "config",
    initialState,
    reducers: {
        setMaxSize: (state, action: PayloadAction<string>) => {
            state.maxSize = action.payload;
        },
        clearConfig: (state) => {
            state.maxSize = undefined;
        },
    },
});

export const { setMaxSize, clearConfig } = configSlice.actions;
export default configSlice.reducer;
