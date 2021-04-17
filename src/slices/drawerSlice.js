import { createSlice } from "@reduxjs/toolkit"

const drawerSlice = createSlice({
  name: "drawer",
  initialState: {
    isOpen_drawer: true,
  },
  reducers: {
    openDrawer(state, action) {
      state.isOpen_drawer = action.payload
    },
  },
})

export const {openDrawer} = drawerSlice.actions
export default drawerSlice.reducer
