import "./App.css";
import { useState, useEffect } from "react";
import axios from "axios"

function App() {
  const [listUsers, setListUsers] = useState([]);
  const [name, setName] = useState("");
  const [age, setAge] = useState(0);
  const [username, setUsername] = useState("");

  useEffect(() => {
    axios.get("http://localhost:5000/getUsers").then((response) => {
      setListUsers(response.data)
    })
  }, []);

  const createUser = () => {
    axios.post("http://localhost:5000/createUsers", {
      name,
      age,
      username,
    }).then((response) => {
      alert("user created");
      setListUsers([...listUsers, { name, age, username }])
    })
  }


  return (
    <div className="App">
      <div className="input">
        <input type="text" placeholder="name.." onChange={(event) => { setName(event.target.value) }}></input>
        <input type="number" placeholder="Age.." onChange={(event) => { setAge(event.target.value) }}></input>
        <input type="text" placeholder="username.." onChange={(event) => { setUsername(event.target.value) }}></input>
        <button onClick={createUser}>Create User</button>
      </div>
      <br></br>
      <div className="userDisplay">
        <table border="2px solid">
          <thead>

            <th>name</th>
            <th>age</th>
            <th>username</th>

          </thead>

          {listUsers.map((item) => {
            return (
              <tbody>
                <tr>
                  <td>{item.name}</td>
                  <td>   {item.age}</td>
                  <td>  {item.username}</td>
                </tr>
              </tbody>
            )

          })}
        </table>
      </div>
      <br></br>

    </div>
  );
}

export default App;
