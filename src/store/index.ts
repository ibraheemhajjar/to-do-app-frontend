import { configureStore, createSlice } from "@reduxjs/toolkit";

const initialState: UserState = {
  accessToken: localStorage.getItem("accessToken"),
  isLoggedIn: false,
  todos: []
};

const userSlice = createSlice({

  name: "user",
  initialState, 
  reducers: {
    login(state, action: { payload: string }) {
      state.isLoggedIn = true;
      state.accessToken = action.payload
      localStorage.setItem("accessToken", action.payload);
    },
    logout(state) {
      state.isLoggedIn = false;
    },
    setAccessToken(state, action: { payload: string }) {
      state.accessToken = action.payload;
    },
    setUserTodos(state, action: { payload: Todo[] }) {
      state.todos = action.payload
    },
    updateTodos(state, action: {payload: Todo}) {
      state.todos.push(action.payload)
    },
    updateOneTodo(state, action:{payload: Todo}){
      const indexToUpdate = state.todos.findIndex(item => item.id === action.payload.id)
      state.todos[indexToUpdate] = action.payload
    },
    deleteTodo(state, action:{payload: number | string}) {
      state.todos = state.todos.filter( todo => todo.id !== action.payload)
    },
  },
});

const store = configureStore({
  reducer: {
    user: userSlice.reducer,
  },
});

// Types for 'dispatch' and 'getState' are inferred automatically 
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>; 

export const userActions = userSlice.actions;
export default store;
