export default function BatchCourse({ course }) {
  return (
    <div>
      <p>Course Name: {course.title}</p>
      <p>Course Time: From {new Date(course.startDate).toLocaleDateString()} to {new Date(course.endDate).toLocaleDateString()}</p>
    </div>
  );
}