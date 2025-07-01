import { createSlice } from '@reduxjs/toolkit';

const initialUser = JSON.parse(localStorage.getItem('user')) || null;

const userSlice = createSlice({
    name: 'user',
    initialState: { user: initialUser },
    reducers: {
        loginUser: (state, action) => {
            state.user = action.payload;
            localStorage.setItem('user', JSON.stringify(action.payload));
        },
        logout: (state) => {
            state.user = null;
            localStorage.removeItem('user');
        },
    },
});

export const { loginUser, logout } = userSlice.actions;
export default userSlice.reducer; 