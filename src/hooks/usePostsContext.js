import { useContext } from "react";
import { PostsContext } from "../context/PostsContext";


export const usePostsContext = () => {
    const context = useContext(PostsContext);
    if (!context) throw Error('usePostContext must be used inside a PostsContext Provider');
    return context;
}