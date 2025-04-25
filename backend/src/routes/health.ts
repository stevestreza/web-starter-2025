import Router from '@koa/router'
import { getHealth } from '../controllers/health'
import { logRequest } from '../middleware/logger'

const router = new Router({
  prefix: `/api`
})

router.get(`/health`, logRequest, getHealth)

export default router 