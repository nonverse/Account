const User = ({isCurrent, name, email, uuid}) => {

    return (
        <div className={`user ${isCurrent ? 'user-current' : ''}`} onClick={() => {
            window.location = `https://auth.nonverse.test/login/switch-user?uuid=${uuid}`
        }}>
            <div className="user-account-info">
                <span className="user-name">{name}</span>
                <span className="user-email">{email}</span>
            </div>
        </div>
    )
}

export default User
