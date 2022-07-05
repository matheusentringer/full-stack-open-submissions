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

export default Course