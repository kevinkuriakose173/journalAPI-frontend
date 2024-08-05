import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import styles from '../styles/styles.module.scss'

const JournalPost = () => {
    const { id } = useParams();

    const [post, setPost] = useState(null);

    useEffect(() => {
        const fetchPosts = async () => {
            const response = await fetch(`http://localhost:4000/api/posts/${id}`);

            const json = await response.json();

            if (response.ok) setPost(json);
        }

        fetchPosts();
    }, [id]);

    if (!post) return null;

    return (
        <div className={styles.journalPost}>
            <h2> {post.title} </h2>
            <div> {post.date} </div>
            <p> {post.content} </p>
        </div>
    )
}

export default JournalPost;