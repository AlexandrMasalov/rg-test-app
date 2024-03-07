import { Comment, Post } from '@/types';
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import style from './style.module.css';

function CommentsPage() {
	const [comments, setComments] = useState<Comment[]>([]);
	const [post, setPost] = useState<Post>();
	const { id } = useParams();

	useEffect(() => {
		fetch(`https://jsonplaceholder.typicode.com/posts/${id}`)
			.then(response => response.json())
			.then(data => setPost(data))
			.catch(error => console.log(error));
		fetch(`https://jsonplaceholder.typicode.com/posts/${id}/comments`)
			.then(response => response.json())
			.then(data => setComments(data))
			.catch(error => console.log(error));
	}, [id]);

	return (
		<>
			<h2>ПОСТ</h2>
			<div>ID пользователя: { post?.userId }</div>
			<div>ID поста: { post?.id }</div>
			<h3>{ post?.title }</h3>
			<div>{post?.body}</div>
			<h4>КОММЕНТАРИИ</h4>
			{comments.map((comment: Comment) => (
				<div key={ comment.id } className={style.post_page_wrapper}>
					<div>ID поста: { comment.postId }</div>
					<div>ID комментария:{ comment.id }</div>
					<h3>{ comment.name }</h3>
					<div>{ comment.body }</div>
					<div>{ comment.email }</div>
				</div>
			))}
			<button><Link to={'/'}>К списку постов</Link></button>
		</>
	);
}

export { CommentsPage };
