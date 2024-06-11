import React, { useEffect, useCallback } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setToDos } from "../slices/toDoSlice";
import AddList from "../Component/AddList";
import ListItem from "../Component/LisItem";
import "../ToDOList.css";

const TodoList = () => {
  const dispatch = useDispatch();
  const additionalLists = useSelector((state) => state.toDo);

  const fetchData = useCallback(async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/additionalLists/getAdditionalLists"
      );
      dispatch(setToDos(response.data));
    } catch (error) {
      console.error("Error fetching additional lists:", error);
    }
  }, [dispatch]);

  useEffect(() => {
    fetchData();
    const intervalId = setInterval(fetchData, 4000);
    return () => clearInterval(intervalId);
  }, [fetchData]);

  return (
    <div className="todo-container">
      <h1 className="todo-header">Todo List</h1>
      <AddList />
      <div className="list-container">
        {additionalLists.map((list) => (
          <ListItem key={list.id} list={list} />
        ))}
      </div>
    </div>
  );
};

export default TodoList;
