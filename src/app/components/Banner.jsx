import defaultIcon from '../../assets/images/Untitled_Artwork 2.gif'

const BackHome = ({ onBack }) => (
    <button
        type="button"
        className="back-home"
        aria-label="home"
        onClick={(e) => {
            e.stopPropagation();
            onBack();
        }}
    >
        ←
    </button>
)

const Banner = (({ onClick, icon = defaultIcon, mini, onMiniClick, showBack, onBack }) => {
    return (
        <>
            <div id="banner" onClick={onClick}>
                <div className="cover-background"></div>
                {showBack && <BackHome onBack={onBack} />}
                <div className="banner-mark">
                    <svg width="200" height="200"
                        xmlns="http://www.w3.org/2000/svg">
                        <image href={icon} height="200" width="200"/>
                    </svg>
                </div>
            </div>
            {mini !== undefined && (
                <div
                    className={`mini-banner ${mini ? 'visible' : ''}`}
                    onClick={onMiniClick || onClick}
                >
                    {showBack && <BackHome onBack={onBack} />}
                    <svg width="36" height="36" xmlns="http://www.w3.org/2000/svg">
                        <image href={icon} height="36" width="36"/>
                    </svg>
                </div>
            )}
        </>
    )
})

export default Banner
