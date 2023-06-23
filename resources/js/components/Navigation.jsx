import NavLink from "../elements/NavLink";

const Navigation = () => {

    return (
        <nav className="navigation">
            <NavLink to={'/'}>Home</NavLink>
            <NavLink to={'/personal-info'}>Personal Info</NavLink>
            <NavLink to={'/data-and-privacy'}>Data & Privacy</NavLink>
            <NavLink to={'/security'}>Security</NavLink>
            <NavLink to={'/settings'}>Settings</NavLink>
        </nav>
    )
}

export default Navigation
