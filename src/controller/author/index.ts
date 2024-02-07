import { Router } from 'express'
import { createNewAuthor } from './createNewAuthor.controller'
import { deleteAuthor } from './deleteAuthor.controller'
import { getAuthorData } from './getAuthorData.controller'
import { getAllAuthors } from './getAllAuthors.controller'
import { getBlogsByAuthor } from './getBlogsByAuthor.controller'

const authorRouters: Router = Router()

authorRouters.post('/', createNewAuthor)
authorRouters.delete('/', deleteAuthor)
authorRouters.get('/', getAuthorData)
authorRouters.get('/blogs', getBlogsByAuthor)
authorRouters.get('/all', getAllAuthors)

export default authorRouters
