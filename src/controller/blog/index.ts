import { Router } from 'express'
import { createNewBlog } from './createNewBlog.controller'
import { getAllBlogs } from './getAllBlogs.controller'
import { deleteBlog } from './deleteBlog.controller'
import { getEachBlog } from './getEachBlog.controller'

const blogRouters: Router = Router()

blogRouters.post('/', createNewBlog)
blogRouters.get('/all', getAllBlogs)
blogRouters.delete('/', deleteBlog)
blogRouters.get('/', getEachBlog)

export default blogRouters
