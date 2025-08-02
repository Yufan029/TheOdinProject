import cx from "classnames";
import styles from "./AButton.module.css";

export default function AButton({ href, name, variant }) {
    return (
        <a
            href={href ? href : "#"}
            className={cx(
                styles.btn,
                variant === "primary" && styles.btnPrimary
            )}
        >
            {name}
        </a>
    );
};