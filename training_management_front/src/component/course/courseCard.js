function Course({ course, onClick}) {
    return (
        <div onClick={event => onClick(event, course._id)}>
            <p>Title: {course.title}</p>
            <span>Desc: {course.description}</span>
        </div>
    )
}

export default Course;