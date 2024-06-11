import React, { useState } from "react";
import { BsTrash } from "react-icons/bs";
import { InputGroup, FormControl, Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import axios from "axios";
import {
  addToDoItem,
  deleteToDoItem,
  updateToDoItem,
} from "../slices/toDoSlice";

const ListItem = ({ list }) => {
  const [newItem, setNewItem] = useState("");
  const dispatch = useDispatch();

  const handleAddNewListItem = async (listId) => {
    try {
      if (!newItem.trim()) return;
      const updatedItems = [...list.items, { title: newItem }];
      await axios.put(
        `http://localhost:5000/api/additionalLists/updateAdditionalList/${listId}`,
        { items: updatedItems }
      );
      dispatch(addToDoItem({ listId, item: { title: newItem } }));
      setNewItem("");
    } catch (error) {
      console.error("Error adding item to list:", error);
    }
  };

  const handleDeleteNewListItem = async (listId, itemIndex) => {
    try {
      const updatedItems = list.items.filter((_, index) => index !== itemIndex);
      await axios.put(
        `http://localhost:5000/api/additionalLists/updateAdditionalList/${listId}`,
        { items: updatedItems }
      );
      dispatch(deleteToDoItem({ listId, itemIndex }));
    } catch (error) {
      console.error("Error deleting item from list:", error);
    }
  };

  const handleUpdateListItem = async (listId, itemIndex, newTitle) => {
    try {
      const updatedItems = list.items.map((item, index) =>
        index === itemIndex ? { ...item, title: newTitle } : item
      );
      await axios.put(
        `http://localhost:5000/api/additionalLists/updateAdditionalList/${listId}`,
        { items: updatedItems }
      );
      dispatch(updateToDoItem({ listId, itemIndex, newTitle }));
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
        <Button
          className="addButton"
          onClick={() => handleAddNewListItem(list._id)}
        >
          Add
        </Button>
      </InputGroup>
      <div className="additional-list-items">
        {list.items.map((item, index) => (
          <div key={index} className="additional-item">
            <textarea
              value={item.title}
              onChange={(e) =>
                handleUpdateListItem(list._id, index, e.target.value)
              }
            />
            <div className="additional-icons">
              <BsTrash
                className="cursor-pointer"
                onClick={() => handleDeleteNewListItem(list._id, index)}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ListItem;
