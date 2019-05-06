import React from 'react'
import Post from './Post.js'


const PostList = ({data, sprite}) => (
	<div> 
	{	
		data.map((element,index)=> <Post key={index+1} name={element.name} sprite={sprite[index]}/>)
	}
	</div>
)

export default PostList