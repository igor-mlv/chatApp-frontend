import { createSlice } from "@reduxjs/toolkit";

interface displayedRoomType {
    id: string,
}

const initialState: displayedRoomType = {
    id: "",
};

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