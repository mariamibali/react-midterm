import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  name: "marim",
  surname: "baliashvili",
  age: 22,
  subscribed: false,
};

const userSlice = createSlice({
  name: "user",
  initialState: initialState,
  reducers: {
    updateUser: (state, action) => {
      state.name = action.payload.email;
      state.subscribed = true;
    },
    deleteUser: (state, action) => {},
  },
});

export const { updateUser } = userSlice.actions;

export default userSlice.reducer;
