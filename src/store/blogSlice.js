import {createSlice} from '@reduxjs/toolkit'
const initialState ={
    Blogs:[]
}

const blogSlice = createSlice({
    name:'blog',
    initialState,
    reducers:{
        createPost:(state, action)=>{},
        updatePost:(state, action)=>{},
        deletePost:(state, action)=>{},
        getPost:(state, action)=>{},
        getallPost:(state, action)=>{},

    }
})
export const {createPost,updatePost,deletePost,getPost,getallPost} = blogSlice.actions
export default blogSlice.reducer