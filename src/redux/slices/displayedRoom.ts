import { createSlice } from "@reduxjs/toolkit";

const initialState: string = '';

const displayedRoomSlice = createSlice({
    name: 'displayedRoom',
    initialState,
    reducers: {
        setDisplayedRoom(state, action) {
            return action.payload;
        },
    },
});

export const { setDisplayedRoom } = displayedRoomSlice.actions;

export default displayedRoomSlice.reducer;