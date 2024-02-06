import { Router } from 'express'
import { createNewAuthor } from './createNewAuthor'
import { deleteAuthor } from './deleteAuthor'
import { getAuthorData } from './getAuthorData'
import { getAllAuthors } from './getAllAuthors'
import { getBlogsByAuthor } from './getBlogsByAuthor'

const authorRouters: Router = Router()

authorRouters.post('/', createNewAuthor)
authorRouters.delete('/', deleteAuthor)
authorRouters.get('/', getAuthorData)
authorRouters.get('/blogs', getBlogsByAuthor)
authorRouters.get('/all', getAllAuthors)


export default authorRouters