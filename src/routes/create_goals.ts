import type { FastifyInstance } from "fastify";
import { CreateGoal } from "../functions/createGoal";
import z from 'zod'
import type { ZodTypeProvider } from "fastify-type-provider-zod";

export async function CreateGoals(app: FastifyInstance){
  app.withTypeProvider<ZodTypeProvider>().post('/goals', {
    schema: {
      body: z.object({
      title: z.string(),
      desiredWeeklyFrequency: z.number().int().min(1).max(7)
    }),
  }
  }, async request => {
      const {title, desiredWeeklyFrequency} = request.body
    await CreateGoal({
      title,
      desiredWeeklyFrequency,
    })

    return ({title, desiredWeeklyFrequency})
  })
  
    
  
}