import React from 'react';
import {auth} from './firebase/init'
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import Nav from './components/Nav';

function App() {
  const [user, setUser] = React.useState(null)
  const [loading, setLoading] = React.useState(true)

  // Log user back in on page refresh
  React.useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setLoading(false)
      if (user) {
        setUser(user)
      }
    })
  },[])

  function register() {
    createUserWithEmailAndPassword(auth, 'email@gmail.com',"test123")
      .then((data) => {
        console.log(data)
      })
      .catch((error) => {
        console.log(error)
      })
  }

  function login() {
    signInWithEmailAndPassword(auth, 'email@gmail.com',"test123")
      .then((data) => {
        console.log(data)
        setUser(data.user)
      })
      .catch((error) => {
        console.log(error)
      })
  }

  function logout() {
    console.log("logout")
    signOut(auth)
    setUser(null)
  }

  // Recreate navbar
  // Login and Register
  // When logged in replace buttons with circle and first letter
  // When name button pressed log out
  // Skeleton loading state while logged out

  return (
    <div className="App">
      <Nav loading={loading} user={user} register={register} login={login} logout={logout}/>
    </div>
  );
}

export default App;
