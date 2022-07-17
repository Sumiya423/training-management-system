function UserCard({ component, onClick }) {
    return (
        <div style={{ backgroundColor: 'lightGray', display: 'flex', flexDirection: 'column', margin: '50px'}} onClick={event => onClick(event, component._id)}>
            <img src= {'http://localhost:4000/'+component.imageUrl} style={{ height: "100px", width: "100px" , borderRadius: '50%'}}></img>
            <h3>Name: {component.name}</h3>
            <p>Email: {component.email}</p>
            <div>
                <button>Edit</button>
                <button>Delete</button>
            </div>
        </div>
    )
}

export default UserCard;