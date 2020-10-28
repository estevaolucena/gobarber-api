import { Router } from 'express'

import enrureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated'
import ProfileController from '../controllers/ProfileController'

const profileRouter = Router()
const profileController = new ProfileController()

profileRouter.use(enrureAuthenticated)

profileRouter.get('/', profileController.show)
profileRouter.put('/', profileController.update)

export default profileRouter
