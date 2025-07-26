import { useEffect, useState } from 'react'
import './App.css'
import EasyDiv from './components/EasyDiv';
import Header from './components/Header';
import { initialState } from './assets/InitialState';
import GifyDiv from './components/GifyDiv';
import { gifs } from './assets/gifs';

function App() {
  const [easyMode, setEasyMode] = useState(false);
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);
  const [content, setContent] = useState(easyMode ? initialState : gifs);
  const [loaded, setLoaded] = useState(false);
  
  function handleEasyModeClicked(checked) {
    setEasyMode(checked);
    setContent(checked ? initialState : gifs);
    setScore(0);
    setBestScore(0);
  }

  async function fetchRandomGifs(count = 12) {
    const promises = [];

    for (let i = 0; i < count; i++) {
      const url = `https://api.giphy.com/v1/gifs/random?api_key=g1l0d0WVaR6XcOWLGvaq0em0w1B7BG2a&tag=&rating=g`;
      promises.push(fetch(url).then(res => res.json()));
    }

    const results = await Promise.all(promises);

    console.log(results);
    for (let i = 0; i < count; i++) {
      gifs[i].src = results[i].data.images.fixed_width.url;
    }

    setLoaded(true);
  }

  useEffect(() => {
    fetchRandomGifs();
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
      setContent(easyMode ? initialState : gifs);
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
              <div className="loading">Loading...    <p>Or "Too Many Requests", please check console log, or enjoy the game via <b>Easy Mode</b>, thanks. (👉ﾟヮﾟ)👉</p></div>
            ) : (
              <GifyDiv content={content} handleBtnClick={handleBtnClick} />
            )
        }
      </main>
    </>
  )
}

export default App
