import { createSlice } from '@reduxjs/toolkit';

type initialType = {
    username: string;
};

const initialState: initialType = {
    username: 'GUEST',
};

export const userSlice = createSlice({
    name: 'counter',
    initialState,
    reducers: {
        setUsername: (state, action) => {
            state.username = action.payload;
        },
    },
});

export const { setUsername } = userSlice.actions;

export default userSlice.reducer;
