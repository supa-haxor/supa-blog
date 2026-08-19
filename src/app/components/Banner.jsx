import defaultIcon from '../../assets/images/Untitled_Artwork 2.gif'

const Banner = (({ onClick, icon = defaultIcon }) => {
    return (
        <div id="banner" onClick={onClick}>
            <div className="cover-background"></div>
            <svg width="200" height="200"
                xmlns="http://www.w3.org/2000/svg">
                <image href={icon} height="200" width="200"/>
            </svg>
        </div>
    )
})

export default Banner
