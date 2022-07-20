export default function BatchCourse({ course }) {
  return (
    <div className="batch__course__container__card">
      <p>{course.title}</p>
      <p>From {new Date(course.startDate).toLocaleDateString()} to {new Date(course.endDate).toLocaleDateString()}</p>
    </div>
  );
}