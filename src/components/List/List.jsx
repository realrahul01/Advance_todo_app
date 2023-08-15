import Button from "../Button/Button";
import Input from "../Input/Input";
import styles from "./List.module.css";

/* eslint-disable react/prop-types */
const List = ({
  tasks,
  swapListHandler,
  isDoneHandler,
  deleteHandler,
  editHandler,
  cancelHandler,
  itemListChangeHandler,
  saveHandler,
  searchItem,
}) => {
  const listItem = tasks.filter((task)=>{
    return task.item.includes(searchItem)
  }).map((task, index) => {
    return (
      <li key={index} className={task.isDone ? styles.itemDoneStyle : ""}>
        {!task.isEditing && (
          <>
          {task.item}
          <Button
            btnLabel="Edit"
            btnStyle={styles.itemBtn}
            btnClickHandler={() => editHandler(index)}
          />
          </>
          )}
        {task.isEditing && (
          <>
            <Input 
              inputValue={task.editItem}
              onChangeHandler={(value)=>itemListChangeHandler(index,value)}
            />  
            <Button 
              btnLabel="Save" 
              btnStyle={styles.itemBtn}
              btnClickHandler={()=>saveHandler(index)}
              isDisabled={task.editItem.trim().length===0}
            />
            <Button 
              btnLabel="Cancel" 
              btnStyle={styles.itemBtn} 
              btnClickHandler={()=>cancelHandler(index)}
            />
          </>
        )}

        <Button
          btnClickHandler={() => swapListHandler(index, index - 1)}
          btnStyle={index === 0 ? styles.itemUp : styles.itemBtn}
          btnLabel="Up"
          isDisabled={index === 0}
        />
        <Button
          btnClickHandler={() => swapListHandler(index, index + 1)}
          btnStyle={index === tasks.length - 1 ? styles.itemDown : styles.itemBtn}
          btnLabel="Down"
          isDisabled={index === tasks.length - 1}
        />
        {task.isDone && (
          <Button
            btnStyle={styles.itemBtn}
            btnClickHandler={() => deleteHandler(index)}
            btnLabel="Delete"
          />
        )}
        {!task.isDone && (
          <Button
            // btnStyle={styles.itemBtn}
            btnStyle={!task.isEditing? styles.itemBtn: styles.notDoneBtn}
            btnLabel="Done"
            btnClickHandler={() => isDoneHandler(index)}
            isDisabled={task.isEditing === true}
          />
        )}
      </li>
    );
  });

  return (
    <div className={styles.listContainer}>
      <ul className={styles.list}>{listItem}</ul>
    </div>
  );
};
export default List;
