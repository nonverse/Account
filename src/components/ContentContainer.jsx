const ContentContainer = ({heading, subHeading, doesScroll=false, children}) => {

    return (
        <div className="content-container">
            <div className="content-heading">
                <h1>{heading}</h1>
                <h2>{subHeading}</h2>
            </div>
            <div className="content" style={{overflowY: doesScroll ? 'auto' : 'hidden'}}>
                {children}
            </div>
        </div>
    )
}

export default ContentContainer