import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

// First, create the thunk
export const fetchAllUsers = createAsyncThunk(
    'users/fetchAllUsers', // này là 1 action, tên tự đặt
    async () => {
        const response = await axios.get("http://localhost:8080/users/all");
        return response.data;
    }
)

const initialState = {
    listUsers: [],
    isLoading: false,
    isError: false
}

export const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
   
  },
  extraReducers: (builder) => {
    builder
        .addCase(fetchAllUsers.pending, (state, action) => {
            state.isLoading = true;
            state.isError = false;
        })
        .addCase(fetchAllUsers.fulfilled, (state, action) => {
            state.listUsers = action.payload;
            state.isLoading = false;
            state.isError = false;
        })
        .addCase(fetchAllUsers.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
        })
    }
})

// export const { increment, decrement, incrementByAmount} = counterSlice.actions

export default counterSlice.reducer