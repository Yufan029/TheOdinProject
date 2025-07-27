export default function PokemanDiv({ content, handleBtnClick }) {
    return (
        content.map(pokeman => (
            <div className="card">
                <img 
                    key={pokeman.id}
                    className={`easyBtn img-${pokeman.id}`}
                    onClick={() => handleBtnClick(content, pokeman.id)}                    
                    src={pokeman.src==="" ? null : pokeman.src} />
                <h4>{pokeman.name}</h4>
            </div>
        ))
    );
}