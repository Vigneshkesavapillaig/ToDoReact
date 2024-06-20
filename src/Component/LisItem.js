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
  const [items, setItems] = useState([]);
  const dispatch = useDispatch();

  // Debounce function to limit the rate of function calls
  const debounce = useCallback((func, delay) => {
    let timer;
    return function (...args) {
      clearTimeout(timer);
      timer = setTimeout(() => func(...args), delay);
    };
  }, []);

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
    // Ensure list.items is an array before setting items state
    if (Array.isArray(list.items)) {
      setItems(list.items);
    }
  }, [list.items]);

  useEffect(() => {
    const pollingInterval = setInterval(fetchData, 5000);
    return () => clearInterval(pollingInterval);
  }, [fetchData]);

  const debouncedUpdateListItem = useCallback(
    debounce(async (index, newTitle) => {
      try {
        const updatedItems = [...items];
        updatedItems[index] = { ...updatedItems[index], title: newTitle };
        const response = await axios.put(
          `http://localhost:5000/api/additionalLists/updateAdditionalList/${list.id}`,
          { items: updatedItems }
        );
        console.log("Server response:", response.data);
        dispatch(
          updateToDoItem({ listId: list.id, itemIndex: index, newTitle })
        );
      } catch (error) {
        console.error("Error updating item in list:", error);
      }
    }, 500),
    [items, list.id, dispatch, debounce]
  );

  const handleAddNewListItem = async () => {
    try {
      if (!newItem.trim()) return;
      const updatedItems = [...items, { title: newItem }];
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
      const updatedItems = items.filter((_, index) => index !== itemIndex);
      const response = await axios.put(
        `http://localhost:5000/api/additionalLists/updateAdditionalList/${list.id}`,
        { items: updatedItems }
      );
      console.log("Server response:", response.data);
      dispatch(deleteToDoItem({ listId: list.id, itemIndex }));
    } catch (error) {
      console.error("Error deleting item from list:", error);
    }
  };

  const handleUpdateListItem = useCallback(
    (index, newTitle) => {
      setItems((prevItems) => {
        const updatedItems = [...prevItems];
        updatedItems[index] = { ...updatedItems[index], title: newTitle };
        return updatedItems;
      });
      debouncedUpdateListItem(index, newTitle);
    },
    [debouncedUpdateListItem]
  );

  // Log list to verify its structure
  useEffect(() => {
    console.log("List received:", list);
  }, [list]);

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
        {items.map((item, index) => (
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
