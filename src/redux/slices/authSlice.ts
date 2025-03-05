// redux/userSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserState {
    id?: string;
    email?: string;
    name?: string;
    img?: string;
    role?: string[];
}

const initialState: UserState = {
    id: '',
    email: '',
    name: '',
    img: '',
    role: [],
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<UserState>) => {
            state.id = action.payload.id;
            state.email = action.payload.email;
            state.name = action.payload.name;
            state.img = action.payload.img;
            state.role = action.payload.role;
        },
        clearUser: (state) => {
            state.id = '';
            state.email = '';
            state.name = '';
            state.img = '';
            state.role = [];
        },
    },
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;