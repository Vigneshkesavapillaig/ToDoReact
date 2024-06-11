import React, { useState, useEffect, useCallback } from "react";
import { BsTrash } from "react-icons/bs";
import { InputGroup, FormControl, Button } from "react-bootstrap";
import axios from "axios";
import { useDispatch } from "react-redux";
import {
  addToDoItem,
  deleteToDoItem,
  updateToDoItem,
  setToDos,
} from "../slices/toDoSlice";

const ListItem = ({ list }) => {
  const [newItem, setNewItem] = useState("");
  const dispatch = useDispatch();

  const fetchData = useCallback(async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/additionalLists/getAdditionalLists`
      );
      dispatch(setToDos(response.data));
    } catch (error) {
      console.error("Error fetching additional lists:", error);
    }
  }, [dispatch]);

  useEffect(() => {
    const pollingInterval = setInterval(fetchData, 5000);
    return () => clearInterval(pollingInterval);
  }, [fetchData]);

  const handleAddNewListItem = async () => {
    try {
      if (!newItem.trim()) return;
      const updatedItems = [...list.items, { title: newItem }];
      const response = await axios.put(
        `http://localhost:5000/api/additionalLists/updateAdditionalList/${list.id}`,
        { items: updatedItems }
      );
      console.log("Server response:", response.data);
      dispatch(addToDoItem({ listId: list.id, item: { title: newItem } }));
      setNewItem("");
    } catch (error) {
      console.error("Error adding item to list:", error);
    }
  };

  const handleDeleteNewListItem = async (itemIndex) => {
    try {
      const updatedItems = list.items.filter((_, index) => index !== itemIndex);
      const response = await axios.put(
        `http://localhost:5000/api/additionalLists/updateAdditionalList/${list.id}`,
        { items: updatedItems }
      );
      console.log("Server response:", response.data);
      dispatch(deleteToDoItem({ listId: list.id, itemIndex }));
      fetchData();
    } catch (error) {
      console.error("Error deleting item from list:", error);
    }
  };

  const handleUpdateListItem = async (itemIndex, newTitle) => {
    try {
      const updatedItems = list.items.map((item, index) =>
        index === itemIndex ? { ...item, title: newTitle } : item
      );
      const response = await axios.put(
        `http://localhost:5000/api/additionalLists/updateAdditionalList/${list.id}`,
        { items: updatedItems }
      );
      console.log("Server response:", response.data);
      dispatch(updateToDoItem({ listId: list.id, itemIndex, newTitle }));
      fetchData();
    } catch (error) {
      console.error("Error updating item in list:", error);
    }
  };

  return (
    <div className="additional-list">
      <h2>{list.title}</h2>
      <InputGroup className="mb-3">
        <FormControl
          placeholder={`Add new item to ${list.title}`}
          value={newItem}
          onChange={(e) => setNewItem(e.target.value)}
        />
        <Button className="addButton" onClick={handleAddNewListItem}>
          Add
        </Button>
      </InputGroup>
      <div className="additional-list-items">
        {list.items &&
          list.items.map((item, index) => (
            <div key={index} className="additional-item">
              <textarea
                value={item.title}
                onChange={(e) => handleUpdateListItem(index, e.target.value)}
              />
              <div className="additional-icons">
                <BsTrash
                  className="cursor-pointer"
                  onClick={() => handleDeleteNewListItem(index)}
                />
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default ListItem;
