import { useEffect, useState } from 'react'
import PostService from '../components/API/PostService'
import { useFetching } from '../components/hooks/useFetching'
import { usePosts } from '../components/hooks/usePosts'
import { getPageCount } from '../utils/pages'
import PostFilter from '../components/PostFilter'
import PostForm from '../components/PostForm'
import PostList from '../components/PostList'
import MyButton from '../components/UI/button/MyButton'
import Loader from '../components/UI/loader/Loader'
import MyModal from '../components/UI/modal/MyModal'
import Pagination from '../components/UI/pagination/Pagination'

function Posts() {
	const [posts, setPosts] = useState([])
	const [filter, setFilter] = useState({ sort: '', query: '' })
	const [modal, setModal] = useState(false)
	const [totalPages, setTotalPages] = useState(0)
	const [limit, setLimit] = useState(10)
	const [page, setPage] = useState(1)

	const sortedAndSearchedPosts = usePosts(posts, filter.sort, filter.query)

	const [fetchPosts, isPostsLoading, postError] = useFetching(
		async (limit, page) => {
			const response = await PostService.getAll(limit, page)
			setPosts(response.data)
			const totalCount = response.headers['x-total-count']
			setTotalPages(getPageCount(totalCount, limit))
		}
	)

	useEffect(() => {
		fetchPosts(limit, page)
	}, [])

	const createPost = newPost => {
		setPosts([...posts, newPost])
		setModal(false)
	}

	// Получаем post из дочернего компонента //
	const removePost = post => {
		setPosts(posts.filter(p => p.id !== post.id))
	}

	const changePage = page => {
		setPage(page)
		fetchPosts(limit, page)
	}

	return (
		<div className='App'>
			<MyButton style={{ marginTop: '30px' }} onClick={() => setModal(true)}>
				Create new post
			</MyButton>
			<MyModal visible={modal} setVisible={setModal}>
				<PostForm create={createPost} />
			</MyModal>

			<hr style={{ margin: '15px 0', backgroundColor: 'black' }}></hr>
			<PostFilter filter={filter} setFilter={setFilter} />
			{postError && <h1>An error has occurred ${postError}</h1>}
			{isPostsLoading ? (
				<div
					style={{
						display: 'flex',
						justifyContent: 'center',
						marginTop: '30px',
					}}
				>
					<Loader />
				</div>
			) : (
				<PostList
					remove={removePost}
					posts={sortedAndSearchedPosts}
					title='Posts List'
				/>
			)}
			<Pagination page={page} changePage={changePage} totalPages={totalPages} />
		</div>
	)
}

export default Posts
