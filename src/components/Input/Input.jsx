/* eslint-disable react/prop-types */
import styles from './Input.module.css'
const Input = ({ onChangeHandler, inputValue, onKeyHandler }) => {
  const changeHandler = (e) => {
    onChangeHandler(e.target.value);
  };

  return (
        <input
        className={styles.input_container}
        type="text"
        placeholder="enter a todo"
        value={inputValue}
        onKeyUp={onKeyHandler}
        onChange={changeHandler}
        />
  );
};
export default Input;
