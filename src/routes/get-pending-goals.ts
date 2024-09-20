import { getWeekPendingGoals } from '../functions/getWeekPendingGoals'
import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'

export const getPendingGoalsRoutes: FastifyPluginAsyncZod = async app => {
  app.get('/pending-goals', async () => {
    const { pendingGoals } = await getWeekPendingGoals()

    return { pendingGoals }
  })
}
