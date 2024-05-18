import React, { useCallback } from 'react'
import services from '../../appwrite/config'
import {useNavigate} from 'react-router-dom'
import {useSelector} from 'react-redux'
import {Input , RTE} from '../index'
import { useForm } from 'react-hook-form'
import Select from '../Select'

const PostForm = ({post}) => {
    const {register , handleSubmit , watch , setValue , control, getValues} = useForm({
        defaultValues:{
            Title: post?.Title || '',
            slug:post?.slug||'',
            Content: post?.Content|| '',
            status : post?.status || 'active'
        }
    })

    const navigate = useNavigate()
    const userData = useSelector((state)=>state.auth.UserData)

    const submit = async (data) => {
        console.log(data, "@@@@@@@data");
        if (post) {
            const file = data.image[0] ? await services.uploadFile(data.image[0]) : null;
            if (file) {
                await services.deleteFile(post.featuredImage);
            }
    
            const dbUpdatePost = await services.updatePost(post.$id, {
                ...data,
                featuredImage: file ? file.$id : undefined
            });
            if (dbUpdatePost) {
                navigate(`/post/${dbUpdatePost.$id}`);
            }
        } else {
            const file = await services.uploadFile(data.image[0]);
            if (file) {
                const file_id = file.$id;
                console.log(file_id, "file@@@@@@@@@@@@@");
                data.featuredImage = file_id;
                console.log(data.featuredImage, '%%%%');
                const dbCreatePost = await services.createPost({
                    ...data,
                    userID: userData.$id
                });
                if (dbCreatePost) {
                    navigate(`/post/${dbCreatePost.$id}`);
                }
            }
        }
    };
    


    const slugHandle = useCallback((value)=>{
        if(value && typeof value === 'string'){
            return value.trim().toLowerCase().replace(/[^a-zA-Z\d\s]+/g, "-").replace(/\s/g, "-");
        }
        else{
            return ''
        }

    },[])

    React.useEffect(() => {
        const subscription = watch((value, { name }) => {
            if (name === "Title") {
                setValue("slug", slugHandle(value.Title), { shouldValidate: true });
            }
        });

        return () => subscription.unsubscribe();
    }, [watch, slugHandle, setValue]);
  return (
    <form onSubmit={handleSubmit(submit)} className="flex flex-wrap">
    <div className="w-2/3 px-2">
        <Input
            label="Title :"
            placeholder="Title"
            className="mb-4"
            {...register("Title", { required: true })}
        />
        <Input
            label="Slug :"
            placeholder="Slug"
            className="mb-4"
            {...register("slug", { required: true })}
            onInput={(e) => {
                setValue("slug", slugTransform(e.currentTarget.value), { shouldValidate: true });
            }}
        />
        <RTE label="Content :" name="Content" control={control} defaultValue={getValues("Content")} />
    </div>
    <div className="w-1/3 px-2">
        <Input
            label="Featured Image :"
            type="file"
            className="mb-4"
            accept="image/png, image/jpg, image/jpeg, image/gif"
            {...register("image", { required: !post })}
        />
        {post && (
            <div className="w-full mb-4">
                <img
                    src={services.filePreview(post.featuredImage)}
                    alt={post.title}
                    className="rounded-lg"
                />
            </div>
        )}
        <Select
            options={["active", "inactive"]}
            label="Status"
            className="mb-4"
            {...register("status", { required: true })}
        />
        <button type="submit" bgColor={post ? "bg-green-500" : undefined} className="w-full">
            {post ? "Update" : "Submit"}
        </button>
    </div>
</form>
  )
}

export default PostForm