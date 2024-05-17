import React from 'react'
import services from '../appwrite/config'
import { Link } from 'react-router-dom'
const PostCard = (
    {
        $id,
        title,
        featuredImage
    }
) => {
    return (
       <Link to={`/posts/${$id}`}>
        <div class="max-w-sm rounded overflow-hidden shadow-lg">
            <img class="w-full" src={
                services.filePreview(featuredImage)
            } alt={title} />
                <div class="px-6 py-4">
                    <div class="font-bold text-xl mb-2">{title}</div>
                
                </div>
        </div></Link>

    )
}

export default PostCard