import React from 'react'
import MyButton from './UI/button/MyButton'
import MyInput from './UI/input/MyInput'
import { useState } from 'react'

const PostForm = ({ create }) => {
	const [post, setPost] = useState({ title: '', body: '' })

	const addNewPost = e => {
		e.preventDefault()
		// setPosts([...posts, { ...post, id: Date.now() }])
		const newPost = {
			...post,
			id: Date.now(),
		}
		create(newPost)
		setPost({ title: '', body: '' })
	}

	return (
		<form>
			<MyInput
				onChange={e => setPost({ ...post, title: e.target.value })}
				value={post.title}
				type='text'
				placeholder='Name Post'
			/>
			<MyInput
				onChange={e => setPost({ ...post, body: e.target.value })}
				value={post.body}
				type='text'
				placeholder='Post Description'
			/>
			<MyButton onClick={addNewPost}>Publish</MyButton>
		</form>
	)
}

export default PostForm
