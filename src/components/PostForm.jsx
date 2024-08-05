import { useForm } from 'react-hook-form';
import { usePostsContext } from '../hooks/usePostsContext';
import styles from '../styles/styles.module.scss';


const PostForm = () => {
    const { register, handleSubmit, setError, reset, formState: { errors } } = useForm();
    const { dispatch } = usePostsContext();

    const onSubmit = async data => {
        const post = {
            date: data.date,
            title: data.title,
            content: data.content
        };
        try {
            const response = await fetch('http://localhost:4000/api/posts', {
                method: 'POST',
                body: JSON.stringify(post),
                headers: {
                    'Content-Type': 'application/json'
                }
            })

            const body = await response.text();
            const newPost = JSON.parse(body);

            if (!response.ok) setError('something wrong', { type: 400 });

            if (response.ok) {
                reset({ title: '', date: '', content: '' });
                dispatch({ type: 'CREATE_POST', payload: newPost })
                console.log('new post created', newPost);
            }
        } catch (err) {
            console.log(err)
        }
    }


    return (
        <>
            <form className={styles.postForm} onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <h3>Create A Post</h3>
                </div>
                <input type="text" {...register("title", { required: 'required field' })} placeholder="Title"></input>
                <p>{errors.title?.message}</p>
                <input type="date" {...register("date", { required: 'required field' })}></input>
                <p>{errors.date?.message}</p>
                <textarea rows="25" className={styles.content} {...register("content", { required: 'required field' })} placeholder="Enter journal content"></textarea>
                <p>{errors.content?.message}</p>
                <button type="submit" value="submit">POST</button>
            </form >
        </>
    )
}

export default PostForm;