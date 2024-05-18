import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import services from "../appwrite/config";
import parse from "html-react-parser";
import { useSelector } from "react-redux";

export default function Post() {
    const [post, setPost] = useState(null);
    const { slug } = useParams();
    const navigate = useNavigate();
    const userData = useSelector((state) => state.auth.UserData);
    const isAuthor = post && userData ? post.userID === userData.$id : false;

    useEffect(() => {
        if (slug) {
            services.getPost(slug)
                .then((post) => {
                    if (post) setPost(post);
                    else navigate("/");
                })
                .catch((error) => {
                    console.error("Error fetching post:", error);
                    navigate("/"); // Redirect to homepage in case of error
                });
        } else {
            navigate("/");
        }
    }, [slug, navigate]);

    const deletePost = () => {
        services.deletePost(post.$id)
            .then((status) => {
                if (status) {
                    services.deleteFile(post.featuredImage);
                    navigate("/");
                }
            })
            .catch((error) => {
                console.error("Error deleting post:", error);
            });
    };

    return (
        <div className="py-8">
            {post && (
                <div className="w-full flex justify-center mb-4 relative border rounded-xl p-2">
                    <img
                        src={services.filePreview(post.featuredImage)}
                        alt={post.title}
                        className="rounded-xl"
                    />
                    {isAuthor && (
                        <div className="absolute right-6 top-6">
                            <Link to={`/edit-post/${post.$id}`}>
                                <button className="mr-3 bg-green-500">Edit</button>
                            </Link>
                            <button onClick={deletePost} className="bg-red-500">Delete</button>
                        </div>
                    )}
                </div>
            )}
            {post && (
                <div className="w-full mb-6">
                    <h1 className="text-2xl font-bold">{post.Title}</h1>
                </div>
            )}
            {post && (
                <div className="browser-css">{parse(post.Content)}</div>
            )}
        </div>
    );
}
