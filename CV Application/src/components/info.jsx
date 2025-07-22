export function Info({ info, onChange, display, activeButton }) {
    return (
        <div className={activeButton==="edit" ? "hide" : ""}>
            <div className="info">
                <label htmlFor='firstName'>First Name:</label>
                <input 
                    required
                    id='firstName'
                    name="firstName"
                    type='text'
                    placeholder='First name'  
                    onChange={onChange}
                    value={info.firstName} />
                <label htmlFor='lastName'>Last Name:</label>
                <input
                    required 
                    id='lastName' 
                    name="lastName"
                    type='text' 
                    placeholder='Last name' 
                    onChange={onChange} 
                    value={info.lastName}/>
                <label htmlFor='tel'>Telephone:</label>
                <input 
                    id='phone'
                    name="tel"
                    type='tel' 
                    placeholder='12345678'
                    onChange={onChange}
                    value={info.tel} />
                <label htmlFor='email'>Email:</label>
                <input 
                    id='email' 
                    type='email'
                    name="email"
                    placeholder="example@gmail.com"
                    onChange={onChange}
                    value={info.email} />
            </div>
        </div>
    );
}