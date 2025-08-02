import './App.css'
import Button from './component/Button/Button.jsx';
import styles from "./App.module.css";
import AButton from './AButton.jsx';
import AnotherButton from './AnotherButton.jsx';

function App() {

  return (
    <>
      <button className={styles.btn}>Submit</button>
      <hr />
      <Button />
      <hr />
      <AButton name="AButtonNotPrim" />
      <AButton name="AButton" variant="primary" />
      <hr />
      <AnotherButton name="AnotherBtnNoPrim" />
      <AnotherButton name="Another Prim" variant="primary" />
    </>
  )
}

export default App
