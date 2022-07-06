import { useState } from 'react'

const Person = ({person}) => {
  return (
    <div>{person.name}</div>
  )
}

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ]) 
  const [newName, setNewName] = useState('')

  const addNewName = (event) => {
    event.preventDefault()
    const personObj = {
      name: newName
    }

    if (persons.find(person => person.name === personObj.name)) {
      alert(`${newName} is already added to phonebook`)
    }else{
      setPersons(persons.concat(personObj))
    }
    setNewName('')
  }

  const handleNameInputChange = (event) => {
    setNewName(event.target.value)
    console.log(newName)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addNewName} >
        <div>
          name: <input value={newName} onChange={handleNameInputChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {
        persons.map(person => <Person key={person.name} person={person} />)
      }
    </div>
  )
}

export default App
