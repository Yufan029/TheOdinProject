import { useEffect, useState } from 'react'
import './App.css'
import EasyDiv from './components/EasyDiv';
import Header from './components/Header';
import { initialState } from './assets/InitialState';
import PokemonDiv from './components/PokemonDiv';

function App() {
  const [easyMode, setEasyMode] = useState(false);
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);
  const [initialPokemon, SetInitialPokemon] = useState(null);
  const [content, setContent] = useState(easyMode ? initialState : initialPokemon);
  const [loaded, setLoaded] = useState(false);
  
  useEffect(() => {
    fetchPokemons();
  }, []);

  async function fetchPokemons() {
    try {
      setLoaded(false);
      const ids = getIds();
      const promises = Array.from(ids).map(async (id) => {
          const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
          const data = await response.json();

          return {
            id: id,
            name: data.name,
            src: data.sprites.front_default,
            count: 0
          };
      });

      const results = await Promise.all(promises);

      // Store the initial value for all pokemons, count to 0
      SetInitialPokemon(results);
      setContent(results);
      setLoaded(true);
    } catch (error) {
      console.log(error);
    }
  }

  function getIds() {
    const maxNumber = 1000;
    const count = 12;

    const randomIds = new Set();
    while (randomIds.size < count) {
      const id = Math.floor(Math.random() * maxNumber) + 1;
      randomIds.add(id);
    }
    
    return randomIds;
  }

  function handleEasyModeClicked(checked) {
    setEasyMode(checked);
    setContent(checked ? initialState : initialPokemon);
    setScore(0);
    setBestScore(0);
  }

  function handleClick(contents, id) {
    let newContents = contents.map(c => {
      if (c.id === id) {
        return {
            ...c,
            count: c.count+1
          };
      } else {
        return c;
      }
    });

    // Check if any one of the new contents has count equals to 2
    if (newContents.some(item => item.count === 2)) {
      if (score > bestScore) {
        setBestScore(score);
      }

      setScore(0);
      setContent(easyMode ? initialState : initialPokemon);
    } else {
      setScore(score + 1);
      console.log("this is newContent:");
      console.log(newContents);
      setContent(shuffleArray(newContents));
    }
  }

  // Fisher–Yates shuffle algorithm
  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }

    return array;
  }

  return (
    <>
      <Header 
        easyMode={easyMode}
        score={score} 
        bestScore={bestScore} 
        setEasyMode={handleEasyModeClicked}
        getNewBatch={fetchPokemons} />
      <main className="cards">
        {easyMode ? (
          <EasyDiv content={content} onClick={handleClick} />
        ) : !loaded ? (
              <div className="loading">Loading...    <p>Or enjoy the game via <b>Easy Mode</b>, thanks. (👉ﾟヮﾟ)👉</p></div>
            ) : (
              <PokemonDiv content={content} onClick={handleClick} />
            )
        }
      </main>
    </>
  )
}

export default App
