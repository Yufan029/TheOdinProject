import './App.css';
import { DisplayInfo } from './components/DisplayInfo';
import { Info } from './components/info';
import { useState } from 'react';
import { Experience } from './components/Experience';
import { DisplayExperience } from './components/DisplayExperience';

function App() {
  const [activeButton, setActiveButton] = useState("submit");
  const [info, setInfo] = useState({
    firstName: '',
    lastName: '',
    tel: '',
    email: ''
  });

  const [experienceInfo, setExperienceInfo] = useState({
    company: '',
    startDate: '',
    endDate: '',
    content: ''
  })

  function onInfoChange(e) {
    const { name, value } = e.target;
    setInfo(prev => (
      {...prev, [name]: value}
    ));
  }

  function OnExperienceChange(e) {
    const { name, value } = e.target;
    setExperienceInfo(prev => (
      {...prev, [name]: value}
    ));
  }

  function handleSubmit() {
    setActiveButton("edit");
  }

  function handleEdit() {
    setActiveButton("submit");
  }

  return (
    <>
      <form onSubmit={e => e.preventDefault()}>
        <section>Personal Info:</section>
        <hr />
        <Info activeButton={activeButton} info={info} onChange={onInfoChange}/>        
        <DisplayInfo info={info} activeButton={activeButton} />
        
        <br /><br />
        <section>Experiences:</section>
        <hr />
        <Experience activeButton={activeButton} experienceInfo={experienceInfo} onChange={OnExperienceChange}/>
        <DisplayExperience activeButton={activeButton} experienceInfo={experienceInfo} />

        <div className="buttons">
          <button
          id="edit"
          disabled={activeButton==="submit"}
          onClick={handleEdit}>
            Edit
          </button>

          <button
          id="submit"
          type="submit"
          disabled={activeButton==="edit"}
          onClick={handleSubmit}>
            Submit
          </button>
        </div>
      </form>
    </>
  )
}

export default App
