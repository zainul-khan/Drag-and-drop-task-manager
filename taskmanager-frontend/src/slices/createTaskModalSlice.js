import { createSlice } from "@reduxjs/toolkit";

const createTaskModalSliceFunc = createSlice({
    name: 'createTaskModalSliceName',
    initialState:{
        isCreateTaskModalSliceModalOpen: false,
        taskDets: null
    },
    reducers: {
        openCreateTaskModal: (state, action) => {
            console.log('action', action);
            state.isCreateTaskModalSliceModalOpen = true
            state.taskDets = action.payload
        },
        closeCreateTaskModal: (state, action) => {
            state.isCreateTaskModalSliceModalOpen = false
            // state.taskDetails = action.payload
        }
    }
});

export const {openCreateTaskModal, closeCreateTaskModal} = createTaskModalSliceFunc.actions;

export default createTaskModalSliceFunc.reducer;