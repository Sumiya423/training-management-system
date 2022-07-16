function Card({ component, onClick }) {
    return (
        <div style={{ backgroundColor: 'lightBlue', display: 'flex', flexDirection: 'column', margin: '50px'}} onClick={event => onClick(event, component._id)}>
            <p>Title: {component.title}</p>
            <span>Desc: {component.description}</span>
            <div>
                <button>Edit</button>
                <button>Delete</button>
            </div>
        </div>
    )
}

export default Card;