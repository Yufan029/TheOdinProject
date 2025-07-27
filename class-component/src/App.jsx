import FunctionalInput from './FunctionalInput';
import ClassInput from './ClassInput';

export default function App() {
  return (
    <>
      <FunctionalInput name="Functional component!" />
      <div className="divider" />
      <ClassInput name="Class based component!" />
    </>
  );
}
