export default function EasyDiv({ content, handleBtnClick }) {
    return (
        content.map(c => (
            <button
                    key={c.id}
                    className={`easyBtn btn-${c.id}`}
                    onClick={() => handleBtnClick(content, c.id)}>
                {c.id}
            </button>
        ))
    );
}