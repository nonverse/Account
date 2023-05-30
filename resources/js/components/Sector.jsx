const Sector = ({heading, children}) => {

    return (
        <div className="sector-container">
            <h1>{heading}</h1>
            <div className="sector">
                {children}
            </div>
        </div>
    )
}

export default Sector