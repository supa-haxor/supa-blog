const BackToTop = (({ visible, onClick }) => {
    return (
        <button
            type="button"
            className={`back-to-top ${visible ? 'visible' : ''}`}
            onClick={onClick}
            aria-label="back to top"
            tabIndex={visible ? 0 : -1}
        >
            ↑
        </button>
    )
})

export default BackToTop
