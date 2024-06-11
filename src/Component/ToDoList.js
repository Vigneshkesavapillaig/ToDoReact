import React, { useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setToDos } from "../slices/toDoSlice";
import AddList from "./AddList";
import ListItem from "./LisItem";
import "../ToDoList.css";

const TodoList = () => {
  const dispatch = useDispatch();
  const additionalLists = useSelector((state) => state.toDo);

  useEffect(() => {
    const fetchAdditionalLists = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/additionalLists/getAdditionalLists"
        );
        dispatch(setToDos(response.data));
      } catch (error) {
        console.error("Error fetching additional lists:", error);
      }
    };

    fetchAdditionalLists();
  }, [dispatch]);

  return (
    <div className="todo-container">
      <h1 className="todo-header">Todo List</h1>
      <AddList />
      <div className="list-container">
        {additionalLists.map((list) => (
          <ListItem key={list._id} list={list} />
        ))}
      </div>
    </div>
  );
};

export default TodoList;
