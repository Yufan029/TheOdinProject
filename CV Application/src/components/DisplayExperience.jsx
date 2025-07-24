export function DisplayExperience({ activeButton, experienceInfo }) {
    return (      
        <div className={activeButton==="submit" ? "hide" : ""}>
          {experienceInfo.map(experience => (
            <div key={experience.id} className="displayExp">
              <p>Company: {experience.company}</p>
              <p>Start from: {experience.startDate} to: {experience.endDate}</p>
              <p>{experience.content}</p>
              <br />
            </div>
          ))}
        </div>
    );
}