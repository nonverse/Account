const User = ({isCurrent, name, email}) => {

    return (
        <div className={`user ${isCurrent ? 'user-current' : ''}`}>
            <div className="user-account-info">
                <span className="user-name">{name}</span>
                <span className="user-email">{email}</span>
            </div>
        </div>
    )
}

export default User
