import React from 'react';
import {auth, db} from './firebase/init'
import {collection, addDoc, getDocs, getDoc, doc, query, where, updateDoc, deleteDoc} from 'firebase/firestore'
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import Nav from './components/Nav';
import Posts from './components/Posts';

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
    getAllPosts()
  },[])

  async function updatePost(postID = "Dqyk7HvnYMvUNst0qxOH") {
    const post = await getPostById(postID)
    const postRef = doc(db,"posts",postID)
    const newPost = {...post, title:"Land a job."}
    updateDoc(postRef,newPost)
    console.log(newPost)
  }

  async function getAllPosts() {
    const {docs} = await getDocs(collection(db, "posts"))
    const posts = docs.map(post => ({...post.data(), id: post.id}))
    console.log(posts)
  }

  async function getPostById(postID = "Dqyk7HvnYMvUNst0qxOH") {
    const postRef = doc(db,"posts",postID)
    const postSnap = await getDoc(postRef)
    return postSnap.data()
  }

  async function getPostByUid() {
    const postCollectionRef = await query (
      collection(db, "posts"),
      where("uid","==",user.uid)
    )
    const {docs} = await getDocs(postCollectionRef)
    const posts = docs.map(post => ({...post.data(), id: post.id}))
    console.log(posts)
  }

  async function deletePost(postID = "Dqyk7HvnYMvUNst0qxOH") {
    const postRef = doc(db,"posts",postID)
    deleteDoc(postRef)
  }

  function createPost() {
    const post = {
      title: "Land a job",
      description: "Finish FES",
      uid: user.uid,
    }
    addDoc(collection(db,"posts"), post)
  }

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

  return (
    <div className="App">
      <Nav loading={loading} user={user} register={register} login={login} logout={logout}/>
      {user && (<Posts createPost={createPost} getAllPosts={getAllPosts}/>)}
      <button className='btn' onClick={() => getPostById(undefined)}>Get Post By ID</button>
      <button className='btn' onClick={() => getPostByUid()}>Get User Posts</button>
      <button className='btn' onClick={() => updatePost(undefined)}>Update Post</button>
      <button className='btn' onClick={() => deletePost(undefined)}>Delete Post</button>
    </div>
  );
}

export default App;
