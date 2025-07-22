export function DisplayExperience({ activeButton, experienceInfo }) {
    return (      
        <div className={activeButton==="submit" ? "hide" : ""}>
          <div className="displayExp">
            <p>Company: {experienceInfo.company}</p>
            <p>Start from: {experienceInfo.startDate} to: {experienceInfo.endDate}</p>
            <p>{experienceInfo.content}</p>
          </div>
        </div>
    );
}