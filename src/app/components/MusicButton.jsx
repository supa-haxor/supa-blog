const MusicButton = (({ href }) => {
    return (
        <a 
            className="music-button"
            target="_blank"
            rel="noopener noreferrer"
            href={href}
        >
            <span className="fa fa-play"></span>
            <span>Play</span>
        </a>
    )
})

export default MusicButton