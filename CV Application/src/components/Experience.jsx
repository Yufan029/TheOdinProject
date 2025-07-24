export function Experience({ experienceInfo, onChange, activeButton, onDeleteExperience }) {
    return (
        <div className={activeButton==="edit" ? "hide" : ""}>
            {experienceInfo.map(experience => (
                <div key={experience.id} className="experience">
                    <div key={experience.id}>
                        <label htmlFor={`company-${experience.id}`}>Company:</label>
                        <input 
                            id={`company-${experience.id}`}
                            type="text"
                            name="company"
                            value={experience.company}
                            onChange={e => onChange(e, experience.id)}/>
                    </div>

                    {experienceInfo.length > 1 && (
                        <button 
                                key={experience.id} 
                                className={`deleteExp-${experience.id}`} 
                                onClick={() => onDeleteExperience(experience.id)}>
                            Delete
                        </button>
                    )}

                    <div className="date">
                        <label htmlFor={`start-${experience.id}`}>Start date:</label>
                        <input
                            type="date"
                            id={`start-${experience.id}`}
                            name="startDate"
                            value={experience.startDate}
                            onChange={e => onChange(e, experience.id)} />
                        <label htmlFor={`end-${experience.id}`}>End date:</label>
                        <input
                            type="date"
                            id={`end-${experience.id}`}
                            name="endDate"
                            value={experience.endDate}
                            onChange={e => onChange(e, experience.id)}/>
                    </div>

                    <textarea 
                        name="content" 
                        placeholder="Working Experiences"
                        value={experience.content}
                        onChange={e => onChange(e, experience.id)}>
                    </textarea>

                    {experienceInfo.length > 1 && (
                        <p className="delimit">∽∽∽∽∽∽∽∽∽∽∽∽∽∽∽∽∽∽∽∽∽∽∽∽∽∽∽∽∽∽∽∽</p>
                    )}
                </div>
            ))}
        </div>
    );
}