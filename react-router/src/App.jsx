import './App.css'
import { Link } from 'react-router-dom';

function App() {

  return (
    <div>
      <h1>Hello from <b>Main</b> page.</h1>
      <nav>
        <ul>
          <li>
            <Link to="profile">Profile page</Link>
          </li>
        </ul>
      </nav>
    </div>
  )
}

export default App
