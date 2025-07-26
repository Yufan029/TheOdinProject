export default function GifyDiv({ content, handleBtnClick }) {
    return (
        content.map(gif => (
            <button 
                    key={gif.id}
                    className={`easyBtn btn-${gif.id}`}
                    onClick={() => handleBtnClick(content, gif.id)}>
                <img key={gif.id} src={gif.src==="" ? null : gif.src} />
            </button>
        ))
    );
}