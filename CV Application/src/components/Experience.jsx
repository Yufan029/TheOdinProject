export function Experience({ experienceInfo, onChange, activeButton }) {
    return (
        <div className={activeButton==="edit" ? "hide" : ""}>
            <div className="experience">
                <div className="company">
                    <label htmlFor="company">Company:</label>
                    <input 
                        id="company"
                        type="text"
                        name="company"
                        value={experienceInfo.company}
                        onChange={onChange}/>
                </div>
                
                <div className="date">
                    <label htmlFor="start">Start date:</label>
                    <input
                        type="date"
                        id="start"
                        name="startDate"
                        value={experienceInfo.startDate}
                        onChange={onChange} />
                    <label htmlFor="end">End date:</label>
                    <input
                        type="date"
                        id="end"
                        name="endDate"
                        value={experienceInfo.endDate}
                        onChange={onChange}/>
                </div>

                <textarea 
                    name="content" 
                    placeholder="Working Experiences"
                    value={experienceInfo.content}
                    onChange={onChange}>
                </textarea>
            </div>
        </div>
    );
}