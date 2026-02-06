import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type UserRole = "ADMIN" | "USER";

interface AuthState {
  isAuthenticated: boolean;
  role: UserRole | null;
  loading: boolean;
}

const initialState: AuthState = {
  isAuthenticated: localStorage.getItem("isAuth") === "true",
  role: (localStorage.getItem("role") as UserRole) || null,
  loading: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginStart(state) {
      state.loading = true;
    },
    loginSuccess(state, action: PayloadAction<UserRole>) {
      state.isAuthenticated = true;
      state.role = action.payload;
      state.loading = false;

      localStorage.setItem("isAuth", "true");
      localStorage.setItem("role", action.payload);
    },

    logout(state) {
      state.isAuthenticated = false;
      state.role = null;
      state.loading = false;

      localStorage.removeItem("isAuth");
      localStorage.removeItem("role");
    },
    loginFailure(state) {
  state.loading = false;
}

  },
});

export const { loginStart, loginSuccess, logout, loginFailure } = authSlice.actions;
export default authSlice.reducer;
