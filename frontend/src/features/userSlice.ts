import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserModel } from "../models/userModel";

interface UserSlice {
  logInUser: UserModel | null;
}

const initialState: UserSlice = {
  logInUser: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    getAuthenticatedUser: (state, action: PayloadAction<UserModel>) => {
      state.logInUser = action.payload;
    },
    logOut_Delete: (state) => {
      state.logInUser = null;
    },
  },
});

export const { getAuthenticatedUser, logOut_Delete } = userSlice.actions;
export default userSlice.reducer;
