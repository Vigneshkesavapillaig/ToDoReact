import { createSlice } from "@reduxjs/toolkit";

const toDoSlice = createSlice({
  name: "toDo",
  initialState: [],
  reducers: {
    setToDos: (state, action) => {
      return action.payload;
    },
    addToDo: (state, action) => {
      state.push(action.payload);
    },
    addToDoItem: (state, action) => {
      const { listId, item } = action.payload;
      const list = state.find((list) => list._id === listId);
      if (list) {
        list.items.push(item);
      }
    },
    deleteToDoItem: (state, action) => {
      const { listId, itemIndex } = action.payload;
      const list = state.find((list) => list._id === listId);
      if (list) {
        list.items.splice(itemIndex, 1);
      }
    },
    updateToDoItem: (state, action) => {
      const { listId, itemIndex, newTitle } = action.payload;
      const list = state.find((list) => list._id === listId);
      if (list && list.items[itemIndex]) {
        list.items[itemIndex].title = newTitle;
      }
    },
  },
});

export const {
  setToDos,
  addToDo,
  addToDoItem,
  deleteToDoItem,
  updateToDoItem,
} = toDoSlice.actions;
export default toDoSlice.reducer;
