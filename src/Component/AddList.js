import React, { useState, useEffect } from "react";
import { InputGroup, FormControl, Button } from "react-bootstrap";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addToDo, setToDos } from "../slices/toDoSlice";

const AddList = () => {
  const [newListTitle, setNewListTitle] = useState("");
  const dispatch = useDispatch();

  const handleAddNewList = async () => {
    if (!newListTitle) return;
    try {
      const response = await axios.post(
        "http://localhost:5000/api/additionalLists/addAdditionalList",
        {
          title: newListTitle,
          items: [],
        }
      );
      dispatch(addToDo(response.data));
      setNewListTitle("");
    } catch (error) {
      console.error("Error adding new list:", error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/additionalLists/getAdditionalLists"
        );
        dispatch(setToDos(response.data));
      } catch (error) {
        console.error("Error fetching additional lists:", error);
      }
    };
    fetchData();
  }, [dispatch]);

  return (
    <InputGroup className="mb-3">
      <FormControl
        placeholder="New List Title"
        value={newListTitle}
        onChange={(e) => setNewListTitle(e.target.value)}
      />
      <Button className="addListButton" onClick={handleAddNewList}>
        Add List
      </Button>
    </InputGroup>
  );
};
export default AddList;
