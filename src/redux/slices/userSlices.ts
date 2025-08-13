import { createSlice } from '@reduxjs/toolkit';

type initialType = {
    username: string;
    user_id: string;
};

const initialState: initialType = {
    user_id: "",
    username: 'GUEST',
};

export const userSlice = createSlice({
    name: 'counter',
    initialState,
    reducers: {
        setUsername: (state, action) => {
            state.username = action.payload;
        },
        setUserID: (state, action) => {
            state.user_id = action.payload;
        },
    },
});

export const { setUsername, setUserID } = userSlice.actions;

export default userSlice.reducer;
