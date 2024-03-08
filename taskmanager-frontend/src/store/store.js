import { configureStore } from '@reduxjs/toolkit'
import utilsSliceFunc from '../slices/utilsSlice'
import createTaskModalSliceFunc from '../slices/createTaskModalSlice'
import updateTaskModalSliceFunc from '../slices/updateTaskModalSlice'


export const store = configureStore({
  reducer: {
    utilsObj: utilsSliceFunc,
    createTaskModalObj: createTaskModalSliceFunc,
    updateTaskModalObj: updateTaskModalSliceFunc
  },
})