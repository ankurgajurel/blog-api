import { Router } from 'express'
import { createNewBlog } from './createNewBlog'
import { getAllBlogs } from './getAllBlogs'
import { deleteBlog } from './deleteBlog'
import { getEachBlog } from './getEachBlog'

const blogRouters: Router = Router()

blogRouters.post('/', createNewBlog)
blogRouters.get('/all', getAllBlogs)
blogRouters.delete('/', deleteBlog)
blogRouters.get('/', getEachBlog)


export default blogRouters