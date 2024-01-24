import { createSlice } from "@reduxjs/toolkit";
import customFetch from "../Utils/customFetch";

const intitalState = {
  todos: [],
};

const todoSlice = createSlice({
  initialState: intitalState,
  name: "todos",

  reducers: {
    getTodos: async (state) => {
      try {
        const todos = await customFetch.get("/todos");
        if (todos.length > 0) {
         void( state.todos = todos)
        }
      } catch (error) {}
    },
    updateTodos: async (state, action) => {
      try {
        await customFetch.patch('/todos', action.payload)
      } catch (error) {
        
      }
    },
    deleteTodo: (state) => {
      
    },
    getTodo: (state) => {},
  },
});

export const { getTodo, updateTodo, deleteTodo } = todoSlice.actions;
export default todoSlice.reducer;
