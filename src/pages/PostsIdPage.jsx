import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import PostService from '../components/API/PostService'
import { useFetching } from '../components/hooks/useFetching'
import Loader from '../components/UI/loader/Loader'

const PostsIdPage = () => {
	const params = useParams()
	const [post, setPost] = useState({})
	const [comments, setComments] = useState([])
	const [fetchPostById, isLoading, error] = useFetching(async id => {
		const response = await PostService.getById(id)
		setPost(response.data)
	})

	const [fetchComments, isComLoading, comError] = useFetching(async id => {
		const response = await PostService.getCommentByPostId(id)
		setComments(response.data)
	})

	useEffect(() => {
		fetchPostById(params.id)
		fetchComments(params.id)
	}, [])
	return (
		<div>
			<h1>You opened the post page with ID = {params.id} </h1>
			{isLoading ? (
				<Loader />
			) : (
				<div>
					{post.id}.{post.title}
				</div>
			)}
			<h1 style={{ marginTop: '30px' }}>Comments</h1>
			{isComLoading ? (
				<Loader />
			) : (
				<div>
					{comments.map(comm => (
						<div key={comm.id} style={{ marginTop: '25px', width: '1250px' }}>
							<h4>{comm.email}</h4>
							<div>{comm.body}</div>
						</div>
					))}
				</div>
			)}
		</div>
	)
}

export default PostsIdPage
