import './App.css';
import { DisplayInfo } from './components/DisplayInfo';
import { Info } from './components/info';
import { useState } from 'react';
import { Experience } from './components/Experience';
import { DisplayExperience } from './components/DisplayExperience';

let nextId = 1;

function App() {
  const [activeButton, setActiveButton] = useState("submit");
  const [info, setInfo] = useState({
    firstName: '',
    lastName: '',
    tel: '',
    email: ''
  });

  const [experienceInfo, setExperienceInfo] = useState([{
    id: 0,
    company: '',
    startDate: '',
    endDate: '',
    content: ''
  }])

  function onInfoChange(e) {
    const { name, value } = e.target;
    setInfo(prev => (
      {...prev, [name]: value}
    ));
  }

  function OnExperienceChange(e, id) {
    const { name, value } = e.target;    
    setExperienceInfo(experienceInfo.map(experience => {
      if (experience.id === id) {
        return {
          ...experience,
          [name]: value
        }
      } else {
        return experience;
      }
    }));
  }

  function handleAddExperience() {
    setExperienceInfo([
      ...experienceInfo,
      {
        id: nextId++,
        company: '',
        startDate: '',
        endDate: '',
        content: ''
      }
    ])
  }

  function handleDeleteExperience(id) {
    setExperienceInfo(experienceInfo.filter(experience => experience.id !== id));
  }

  function handleSubmit() {
    setActiveButton("edit");
  }

  function handleEdit() {
    setActiveButton("submit");
  }

  return (
    <>
      <header>
        <h1>CV Application</h1>
      </header>
      <form onSubmit={e => e.preventDefault()}>
        <section>Personal Info:</section>
        <hr />
        <Info activeButton={activeButton} info={info} onChange={onInfoChange}/>        
        <DisplayInfo info={info} activeButton={activeButton} />
        
        <br /><br />
        <section>Experiences:</section>
        <hr />
        <Experience 
          activeButton={activeButton} 
          experienceInfo={experienceInfo} 
          onChange={OnExperienceChange}
          onDeleteExperience={handleDeleteExperience} />
        <button 
          style={{display: activeButton === "edit" ? "none" : ""}}
          className="addExp" 
          onClick={handleAddExperience}>Add Experience</button>

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
