import { useState } from 'react'
import './App.css'
import EasyDiv from './components/EasyDiv';
import Header from './components/Header';

  const initState = [
    { id: 1, count: 0 },
    { id: 2, count: 0 },
    { id: 3, count: 0 },
    { id: 4, count: 0 },
    { id: 5, count: 0 },
    { id: 6, count: 0 },
    { id: 7, count: 0 },
    { id: 8, count: 0 },
    { id: 9, count: 0 },
    { id: 10, count: 0 },
    { id: 11, count: 0 },
    { id: 12, count: 0 }
  ];

function App() {
  const [easyMode, setEasyMode] = useState(false);
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);
  const [easyBtnContent, setEasyBtnContent] = useState(initState);

  function handleEasyBtnClick(id) {
    console.log("I click:" + id);
    let newContent = easyBtnContent.map(content => {
      if (content.id === id) {
        return {
            ...content,
            count: content.count+1
          };
      } else {
        return content
      }
    });

    if (newContent.some(item => item.count === 2)) {
      if (score > bestScore) {
        setBestScore(score);
      }

      setScore(0);
      setEasyBtnContent(initState);
    } else {
      setScore(score + 1);
      setEasyBtnContent(shuffleArray(newContent));
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
      <Header easyMode={easyMode} score={score} bestScore={bestScore} setEasyMode={setEasyMode} />
      <main className="cards">
        {easyMode ? (
          <EasyDiv easyBtnContent={easyBtnContent} handleEasyBtnClick={handleEasyBtnClick} />
        ) : (
          <h1>Use easy mode!</h1>
        )}
      </main>
    </>
  )
}

export default App
