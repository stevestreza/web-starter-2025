import Router from '@koa/router'
import { register, login, logout, getCurrentUser } from '../controllers/auth'
import { requireAuth } from '../middleware/auth'

const router = new Router({
	prefix: `/api/auth`
})

router.post(`/register`, register)
router.post(`/login`, login)
router.post(`/logout`, logout)
router.get(`/me`, requireAuth, getCurrentUser)

export default router 