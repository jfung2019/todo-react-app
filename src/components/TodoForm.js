import React, {useState} from 'react'

function TodoForm() {
  const [input, setInput] = useState("");

  const handleSubmit = e => {
    e.preventDefault();
  }

  
  return (
    <div>
      <form className="" onSubmit={handleSubmit}>
        <input type="text" className="" placeholder="type here" value={input}/>
        <button>Add to do</button>
      </form>
    </div>
  )
}

export default TodoForm