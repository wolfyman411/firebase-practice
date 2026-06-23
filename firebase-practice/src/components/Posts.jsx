import React from 'react'

export default function Posts({createPost,getAllPosts}) {
  return (
    <div className='container'>
        <div className="row">
            <button className='btn' onClick={createPost}>Create Post</button>
        </div>
    </div>
  )
}
