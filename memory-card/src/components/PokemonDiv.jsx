export default function PokemonDiv({ content, onClick }) {
    return (
        content.map(pokemon => (
            <div key={pokemon.id} className="card">
                <img 
                    key={pokemon.id}
                    className={`card-content img-${pokemon.id}`}
                    onClick={() => onClick(content, pokemon.id)}                    
                    src={pokemon.src==="" ? null : pokemon.src} />
                <h4>{pokemon.name}</h4>
            </div>
        ))
    );
}