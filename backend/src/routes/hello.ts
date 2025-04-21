import Router from '@koa/router'
import { getHello } from '../controllers/hello'
import { logRequest } from '../middleware/logger'

const router = new Router({
	prefix: `/api`
})

router.get(`/hello`, logRequest, getHello)

export default router
