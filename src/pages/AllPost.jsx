import React, { useEffect, useState } from 'react';
import services from '../appwrite/config';
import { PostCard } from '../components';

const AllPost = () => {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        // Fetch posts when the component mounts
        services.getallPosts([]).then((response) => {
            if (response && response.documents) {
                setPosts(response.documents);
            }
        });
    }, []); 

    return (
        <div>
            {posts.map((post) => (
                <div key={post.$id}>
                    <PostCard {...post} />
                </div>
            ))}
        </div>
    );
};

export default AllPost;
