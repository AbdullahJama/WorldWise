import Styles from "./Button.module.css";

export default function Button({ type, onClick, children }) {
  return (
    <button className={`${Styles.btn} ${Styles[type]}`} onClick={onClick}>
      {children}
    </button>
  );
}
