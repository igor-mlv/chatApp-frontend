import { createSlice } from "@reduxjs/toolkit";

export interface RoomDataBaseType {
    id: string,
    users: string[],
}

const initialState: RoomDataBaseType[] = [];

const roomsDatabaseSlice = createSlice({
    name: 'roomsDatabase',
    initialState,
    reducers: {
        setRooms(state, action) {
            return action.payload;
        },
    },
});

export const { setRooms } = roomsDatabaseSlice.actions;

export default roomsDatabaseSlice.reducer;