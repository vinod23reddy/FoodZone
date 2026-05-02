import React from 'react'
import { useParams } from 'react-router'

function BlogPost() {

    const {slug}=useParams();
    const blogPost = {
        'first-post':{
            title:'First-Blog-Post',
            content: 'This is the content of the first post',
            name:'Mounika'
        },
        'second-post':{
            title:'Second-Blog-Post',
            content:'This is the content of the second post',
            name:'Sindhu'
        },
        'third-post':{
            title:'Third-Blog-Post',
            content:'This is the content of Third post',
            name:'Sadhana'
        }
    };

    const post= blogPost[slug];

  return (
    <>
      {
        post && <h1> 
        {post.name} - 
        {post.title} - 
        {post.content}

        </h1>
      }
    </>
  )
}

export default BlogPost;
