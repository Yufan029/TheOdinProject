import { useEffect, useState } from 'react'
import './App.css'
import EasyDiv from './components/EasyDiv';
import Header from './components/Header';
import { initialState } from './assets/InitialState';
import PokemanDiv from './components/PokemanDiv';

function App() {
  const [easyMode, setEasyMode] = useState(false);
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);
  const [initialPokeman, SetInitialPokeman] = useState(null);
  const [content, setContent] = useState(easyMode ? initialState : initialPokeman);
  const [loaded, setLoaded] = useState(false);
  
  function handleEasyModeClicked(checked) {
    setEasyMode(checked);
    setContent(checked ? initialState : initialPokeman);
    setScore(0);
    setBestScore(0);
  }

  async function fetchPokeman() {
    try {
      const response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=12");
      const data = await response.json();

      const details = await Promise.all(
        data.results.map(pokemon => fetch(pokemon.url).then(res => res.json()))
      );

      const results = details.map((detail, i) => ({
        id: i,
        src: detail.sprites.front_default,
        name: detail.name,
        count: 0
      }));

      SetInitialPokeman(results);
      console.log(results);
      setContent(results);
      setLoaded(true);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchPokeman();
  }, []);

  function handleBtnClick(contents, id) {
    let newContent = contents.map(c => {
      if (c.id === id) {
        return {
            ...c,
            count: c.count+1
          };
      } else {
        return c;
      }
    });

    if (newContent.some(item => item.count === 2)) {
      if (score > bestScore) {
        setBestScore(score);
      }

      setScore(0);
      setContent(easyMode ? initialState : initialPokeman);
    } else {
      setScore(score + 1);
      console.log("this is newContent:");
      console.log(newContent);
      setContent(shuffleArray(newContent));
    }
  }

  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }

    return array;
  }

  return (
    <>
      <Header easyMode={easyMode} score={score} bestScore={bestScore} setEasyMode={handleEasyModeClicked} />
      <main className="cards">
        {easyMode ? (
          <EasyDiv content={content} handleBtnClick={handleBtnClick} />
        ) : !loaded ? (
              <div className="loading">Loading...    <p>Or enjoy the game via <b>Easy Mode</b>, thanks. (👉ﾟヮﾟ)👉</p></div>
            ) : (
              <PokemanDiv content={content} handleBtnClick={handleBtnClick} />
            )
        }
      </main>
    </>
  )
}

export default App
