export default function EasyDiv({ easyBtnContent, handleEasyBtnClick}) {
    return (
        easyBtnContent.map(content => (
            <button
                key={content.id}
                className={`easyBtn btn-${content.id}`}
                onClick={() => handleEasyBtnClick(content.id)}>
                {content.id}
            </button>
        ))
    );
}