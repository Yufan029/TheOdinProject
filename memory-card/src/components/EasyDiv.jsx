export default function EasyDiv({ content, onClick }) {
    return (
        content.map(c => (
            <button
                    key={c.id}
                    className={`card-content btn-${c.id}`}
                    onClick={() => onClick(content, c.id)}>
                {c.id}
            </button>
        ))
    );
}