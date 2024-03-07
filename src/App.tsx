import { useEffect, useState } from 'react'
import style from './App.module.css'
import { Post } from './types';
import { Link } from 'react-router-dom';

function App() {
	const [posts, setPosts] = useState<Post[]>([]);

	useEffect(() => {
		fetch('https://jsonplaceholder.typicode.com/posts')
			.then(response => response.json())
			.then(data => data.slice(0, 10))
			.then(arrayPosts => setPosts(arrayPosts))
			.catch(error => console.log(error));
	}, []);

	const handleOnClick = (numberOfPosts: number) => {
		fetch(`https://jsonplaceholder.typicode.com/posts/`)
			.then(response => response.json())
			.then(data => data.slice(0, numberOfPosts))
			.then(arrayPosts => setPosts(arrayPosts))
			.catch(error => console.log(error));
	}

	return (<>
		<h3>СПИСОК ПОСТОВ</h3>
		<button onClick={() => handleOnClick(10)}>10</button>
		<button onClick={() => handleOnClick(20)}>20</button>
		<button onClick={() => handleOnClick(50)}>50</button>
		{posts.map((post: Post) => (
		<div key={post.userId + post.id + post.title}
			className={style.post_wrapper}>
			<Link to={`/post/${post.id}`}
			className={style.link_wrapper}>
				<div>ID пользователя: { post.userId }</div>
				<div>ID поста: { post.id }</div>
				<h3>{ post.title }</h3>
				<div>{ post.body }</div>
			</Link></div>
		))}
	</>
	)

}

export default App
