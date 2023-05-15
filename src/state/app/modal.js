import {createSlice} from "@reduxjs/toolkit";

export const modalSlice = createSlice({
    name: 'modal',
    initialState: {},
    reducers: {
        renderModal: (state, action) => {
            state.value = action.payload
        },
    }
})

export const { renderModal } = modalSlice.actions
export default modalSlice.reducer