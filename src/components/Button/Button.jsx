/* eslint-disable react/prop-types */
const Button = ({ btnClickHandler, btnLabel, isDisabled, btnStyle}) => {
  return (
    <button
      className={btnStyle}
      onClick={()=>btnClickHandler()}            // if there is no parameter u can directly pass the callback in childer
      disabled={isDisabled}
    >
      {btnLabel}
    </button> 
  );
};
export default Button;
