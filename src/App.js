import { useState } from 'react';
import './App.css';
import calls from './Fetches';
import Main from './components/Main';
import Form from './components/Form';



function App() {

  const [stats, setStats] = useState(undefined)
  const [server, setServer] = useState(undefined)
  const [profile, setProfile] = useState(undefined)


  const getData = (server, name) => {
    setServer(server)
    console.log('getData called: ', server, name)
    fetch(calls.fetchBySummonerName(server, name))
      .then(response => response.json())
      .then(data => {
        console.log(data)
        setStats(data)
        getProfile(server, data.id)
      })
      .catch(error => console.error(error))
    }
  
  const getProfile = (server, id) => {
    fetch(calls.fetchRankedDetails(server, id))
      .then(response => response.json())
      .then(data => {
        console.log('getProfile called: ', data)
        setProfile(data)
      })

  }


  return (
    <div className="App">
      <header className="App-header">
      <Form getData={getData}/>
      </header>
      { profile && <Main stats={stats} profile={profile} region={server}/> }

      <footer></footer>
    </div>
  );
}

export default App;
