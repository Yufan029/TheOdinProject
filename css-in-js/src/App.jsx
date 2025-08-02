import './App.css'
import StyledButton from './Button.styled'

function App() {

  return (
    <div className="App">
      <StyledButton href="...">Default Call-to-action</StyledButton>
      <StyledButton primary href="...">Primary Call-to-action</StyledButton>
    </div>
  )
}

export default App
