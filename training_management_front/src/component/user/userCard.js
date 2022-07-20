function UserCard({ component, onClick }) {
    return (
        <div className="batch__trainee__container__body">
            <div className="batch__trainee__container__body__details" onClick={event => onClick(event, component._id)}>
                <img src={'http://localhost:4000/' + component.imageUrl}></img>
                <p>{component.name}</p>
            </div>
        </div>

    )
}

export default UserCard;