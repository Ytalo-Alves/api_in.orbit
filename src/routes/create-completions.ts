import type { FastifyPluginAsync } from 'fastify'
import { CreateGoal } from '../functions/createGoalCompletion'
import z from 'zod'

export const createCompletionsRoutes: FastifyPluginAsync = async app => {
  app.post(
    '/completions',
    {
      schema: {
        body: z.object({
          goalId: z.string(),
        }),
      },
    },
    async request => {
      const { goalId } = request.body

      await CreateGoal({ goalId })
    }
  )
}
