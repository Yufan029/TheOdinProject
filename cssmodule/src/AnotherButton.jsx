import styles from "./AnotherButton.module.css";
import cx from "classnames"

export default function Button(props) {
  return (
    <a
      href={props.href ? props.href : '#'}
      className={cx(
        styles.btn,
        props.variant == 'primary' && styles.btnPrimary
      )}
    >
      {props.name}
    </a>
  );
}
