export default function Header({ easyMode, score, bestScore, setEasyMode, getNewBatch}) {
    return (
      <header className="header">
        <div className="headerInfo">
          <h3>Memory Card</h3>
          <p className="rule">Get points by clicking on an image but don't click on any more than once!</p>
        </div>
        <div className="scoreBoard">
          <div className="customiseSelector">
            <div className="easySelector">
              <input
                id="easyModeInput"
                type="checkbox"
                checked={easyMode}
                onChange={e => setEasyMode(e.target.checked)} />
              <label htmlFor="easyModeInput">Easy Mode</label>
            </div>
            <div className="New batch">
              <button onClick={getNewBatch} disabled={easyMode}>Get new batch</button>
            </div>
          </div>
          <div className="scoreInfo">
            <label className="score">Score: {score}</label>
            <label className="bestScore">Best score: {bestScore}</label>
          </div>
        </div>
      </header>
    );
}