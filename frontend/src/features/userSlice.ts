import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserModel } from "../models/userModel";

interface initialUserState {
  logInUser: UserModel | null;
}

const initialState: initialUserState = {
  logInUser: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setAuthenticatedUser: (state, action: PayloadAction<UserModel>) => {
      state.logInUser = action.payload;
    },
    logOut_Delete: (state) => {
      state.logInUser = null;
    },
  },
});

export const { setAuthenticatedUser, logOut_Delete } = userSlice.actions;
export default userSlice.reducer;
export type UserSlice = ReturnType<typeof userSlice.reducer>;
