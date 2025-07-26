export default function PokemanDiv({ content, handleBtnClick }) {
    return (
        content.map(pokeman => (
            <button 
                    key={pokeman.id}
                    className={`easyBtn btn-${pokeman.id}`}
                    onClick={() => handleBtnClick(content, pokeman.id)}>
                <img 
                    key={pokeman.id}
                    src={pokeman.src==="" ? null : pokeman.src} />
            </button>
        ))
    );
}