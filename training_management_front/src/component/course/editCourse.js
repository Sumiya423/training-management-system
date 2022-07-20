import React from "react";
import { AuthContext } from "../../App";
import Select from 'react-select';
import { useNavigate, useParams } from "react-router-dom";


function EditCourse() {
  const navigate = useNavigate()
  const { courseId } = useParams()

  const initialData = {
    isSubmitting: false,
    errorMessage: null
  };
  const [course, setCourse] = React.useState({})

  const { state: authState } = React.useContext(AuthContext)
  const [data, setData] = React.useState(initialData);
  const topics = [
    'OOP',
    'ReactJS',
    'Express',
    'NodeJS',
    'MongoDB',
    'MySQL',
    'SpringBoot',
    'CSS',
    'HTML',
    'SCSS',
    'DOM',
    'HOC',
    'Element',
    'EventListener'
  ]

  const getTopicOptions = (topicList) => {
    let topicOptions = [];
    topicList.map(topic => topicOptions.push({ 'label': topic, 'value': topic }));
    return topicOptions;
  }
  const topicOptions = getTopicOptions(topics);

  React.useEffect(() => {
    const url = `http://localhost:4000/admin/courses/${courseId}`;

    const fetchData = async () => {
      try {
        const response = await fetch(url, {
          method: "GET",
          headers: {
            'authorization': 'Bearer ' + authState.token,
          },
        });
        const json = await response.json();
        setCourse(json.results);
      } catch (error) {
        console.log("error", error);
      }
    };
    fetchData()
  }, [courseId])

  const handleInputChange = event => {
    setCourse({
      ...course,
      [event.target.name]: event.target.value
    });
  };

  const handleSubmit = event => {
    event.preventDefault();
    setData({
      ...data,
      // isSubmitting: true,
      errorMessage: null
    });
    let payload = {
      title: course.title,
      description: course.description,
      startDate: course.startDate,
      endDate: course.endDate,
      topics: course.topics.map(topic => topic.value?topic.value:topic)
    }

    const url = `http://localhost:4000/admin/edit-course/${courseId}`

    fetch(url, {
      method: 'put',
      headers: {
        'Content-type': 'application/json',
        'authorization': 'Bearer ' + authState.token,
      },
      body: JSON.stringify(payload),
    })
      .then(res => {
        if (res.ok) return res.json();
        throw res;
      })
      .then(resJson => {
        console.log(resJson)
        navigate(`/admin/courses/${courseId}`)
      })
      .catch(error => {
        setData({
          ...data,
          isSubmitting: false,
          errorMessage: error.message || error.statusText
        });
      });
  };

  return (
    <div className="container">
      <div>
        <form className="list" onSubmit={handleSubmit}>
          <h1 className="list__header">Create Course</h1>
          <hr className="list__hr"></hr>
          <div className="list__form">
            <div className="list__form__input">
              <p>Title</p>
              <input
                type="text"
                name="title"
                placeholder="Title"
                defaultValue={course.title}
                onChange={handleInputChange}
              />
            </div>

            <div className="list__form__input">
              <p>Description</p>
              <textarea
                type="text"
                name="description"
                placeholder="Descriptions"
                defaultValue={course.description}
                onChange={handleInputChange}
              />
            </div>
            <div className="list__form__input">
              <p>Start-Date</p>
              {course.startDate && <input
                type="date"
                name="startDate"
                defaultValue={JSON.stringify(new Date(course.startDate)).slice(1, 11)}
                onChange={handleInputChange}
              />}
            </div>
            <div className="list__form__input">
              <p>End-Date</p>
              {course.endDate && <input
                type="date"
                name="endDate"
                defaultValue={JSON.stringify(new Date(course.endDate)).slice(1, 11)}
                onChange={handleInputChange}
              />}
            </div>
            <div className="list__form__input">
              <p>Select Topics</p>
              {course.topics && <Select
                width='200px'
                name="topics"
                closeMenuOnSelect={false}
                isMulti
                options={topicOptions}
                defaultValue={getTopicOptions(course.topics)}
                onChange={(selected) => setCourse({
                  ...course,
                  ['topics']: selected
                })}
              />}
            </div>

            {data.errorMessage && <span>{data.errorMessage}</span>}
            <button disabled={data.isSubmitting}>
              {data.isSubmitting ? "Creating....." : "Create"}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}

export default EditCourse;
