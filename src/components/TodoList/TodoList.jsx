import { useEffect, useState } from "react";
import Button from "../Button/Button";
import Input from "../Input/Input";
import List from "../List/List";
import styles from "./TodoList.module.css";

const TodoList = () => {
  const [text, setText] = useState("");
  const [list, setList] = useState([]);
  const [searchItem,setSearchItem] = useState('')

  const onChangeHandler = (str) => setText(str);

  const btnClickHandler = () => {
    // let itemList = [...list]    //state is immutable we cant push in list so that why i created a variable called itemList, using spread operator we copyed list array and push it in itemList then change the state using setList
    // itemList.push(text)          // you can also write this to push text in array and update the list
    // setList(itemList)      
         //using spread operator here copy the list array by using [...list] and put input value which is text into the array setlist([...list,text])
    const trimText = text.trim();
    if (trimText) {
      setList([
        ...list,
        {
          item: trimText,
          editItem:trimText,
          isDone: false,
          isEditing:false,
        },
      ]);
      setText("");
    }
  };

  //this is the function to search the todo
  const searchHandler = (e)=>{
    setSearchItem(e.target.value) 
  }

  //create todo on click enter button
  const onKeyHandler = (e) => {
    if (e.key === "Enter") {
      btnClickHandler();
    }
  };

  //store data in local storage
  const todoList = "todoList";
  useEffect(() => {
    const listItems = JSON.parse(localStorage.getItem(todoList)) || []; //json.parse convert string into array
    setList(listItems);
  }, []);

  useEffect(() => {
    localStorage.setItem(todoList, JSON.stringify(list));
  }, [list]);

  //after clicking the list should move up and down by this function
  const swapListHandler = (initialIndex, finalIndex) => {
    const items = [...list];
    let temp = items[initialIndex];
    items[initialIndex] = items[finalIndex];
    items[finalIndex] = temp;
    setList(items);
  };

  //done function
  const isDoneHandler = (index) => {
    let items = [...list];
    items[index].isDone = true;
    setList(items);
  };

  //   delete function
  const deleteHandler = (index) => {
    let items = [...list];
    items.splice(index, 1);
    setList(items);
  };

  //Edit function 
  const editHandler = (index)=>{
    let items = [...list]
    items[index].isEditing = true
    setList(items)
  }

  // cancel function
  const cancelHandler = (index)=>{
    let items = [...list]
    items[index].isEditing = false
    items[index].editItem = items[index].item  
    setList(items)
  }

  //item list change handler
  const itemListChangeHandler =(index,value)=>{
    let items = [...list]
    items[index].editItem = value
    setList(items)
  }
  //save edit function
  const saveHandler = (index)=>{
    let items = [...list]
    items[index].item = items[index].editItem
    items[index].isEditing = false
    setList(items)
  }

  //clear all item function
  const clearAllItems= ()=>{
    setList([])
  }

  //delete all done items
  const deleteAllDoneItems = ()=>{
    const filterOut = list.filter((e)=>{
      return (e.isDone==false)
    })
    setList(filterOut)
  }

  return (
    <div className={styles.todo_container}>
      <h3 style={{color:'#fff',fontWeight:'700'}}>Todo-List</h3>
      <Input
        onChangeHandler={onChangeHandler}
        inputValue={text}
        onKeyHandler={onKeyHandler}
      />
      <Button
        isDisabled={text.trim().length === 0}
        btnClickHandler={btnClickHandler}
        btnStyle={text.trim().length === 0 ? styles.length0Style : styles.parentBtn}
        btnLabel="Add Todo"
        />
      <Button
        btnLabel="clear All"
        btnStyle={list.length === 0 ? styles.length0Style : styles.parentBtn}
        btnClickHandler={clearAllItems}
        isDisabled={list.length==0}
        />
      <Button
        btnLabel="Delete all done items"
        btnStyle={list.length === 0 ? styles.length0Style : styles.parentBtn}
        isDisabled={list.length==0}
        btnClickHandler={deleteAllDoneItems}
        />
        <div className={styles.search_input}>
          <input type="text" placeholder="Search..." onChange={searchHandler} value={searchItem}/>
        </div>
      <List
        swapListHandler={swapListHandler}
        tasks={list}
        isDoneHandler={isDoneHandler}
        deleteHandler={deleteHandler}
        editHandler={editHandler}
        cancelHandler={cancelHandler}
        itemListChangeHandler={itemListChangeHandler}
        saveHandler={saveHandler}
        searchHandler={searchHandler}
        searchItem={searchItem}
        />
    </div>

  );
};
export default TodoList;
