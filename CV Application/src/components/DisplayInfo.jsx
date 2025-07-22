export function DisplayInfo({ info, activeButton}) {
    return (      
        <div className={activeButton==="submit" ? "hide" : ""}>
          <div className="displayInfo">
            <label>Name:</label>
            <p>{info.firstName} {info.lastName}</p>
            <label>Telephone:</label>
            <p>{info.tel}</p>
            <label>Email:</label>
            <p>{info.email}</p>
          </div>
        </div>
    );
}