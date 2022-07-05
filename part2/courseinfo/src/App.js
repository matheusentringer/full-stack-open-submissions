const Header = ({ name }) => <h2>{name}</h2>

const Part = ({ part }) => 
  <div>
    {part.name} {part.exercises}
  </div>

const Total = ({ course }) => {
  let total = course.parts.map(part => part.exercises)
  total = total.reduce((sum, a) => sum + a)
  return(
    <b>total of {total} exercises</b>
  )
}

const Course = ({ course }) => {

  return (
    <div>
      <Header name={course.name} />
      <div>
        {course.parts.map(part => 
          <Part key={part.id} part={part} />
        )}
      </div>
      <Total course={course} />
    </div>
  )
}

const App = () => {
  const courses = [
    {
      name: 'Half Stack application development',
      id: 1,
      parts: [
        {
          name: 'Fundamentals of React',
          exercises: 10,
          id: 1
        },
        {
          name: 'Using props to pass data',
          exercises: 7,
          id: 2
        },
        {
          name: 'State of a component',
          exercises: 14,
          id: 3
        },
        {
          name: 'Redux',
          exercises: 11,
          id: 4
        }
      ]
    }, 
    {
      name: 'Node.js',
      id: 2,
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1
        },
        {
          name: 'Middlewares',
          exercises: 7,
          id: 2
        }
      ]
    }
  ]

  return (
    <div>
      <h1>Web development curriculum</h1>
      <div>
        {courses.map(course =>
          <Course key={course.id} course={course} />
        )}
      </div>
    </div>
  )
}

export default App