import { createSlice } from "@reduxjs/toolkit";
interface UserState {
    id: string,
    userName: string;
    isOnline: boolean;
    socketID: string;
    rooms: string[];
}

const initialState: UserState = {
    id: "",
    userName: "",
    isOnline: false,
    socketID: "",
    rooms: []
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser(state, action) {
            return action.payload;
        },
        updateUserRooms(state, action) {
            state.rooms = action.payload;
        }
    },
});

export const { setUser, updateUserRooms } = userSlice.actions;

export default userSlice.reducer;