import fastify from 'fastify'
import { CreateGoalsRouts } from '../routes/create_goals'
import {
  serializerCompiler,
  validatorCompiler,
  type ZodTypeProvider,
} from 'fastify-type-provider-zod'
import { getPendingGoalsRoutes } from '../routes/get-pending-goals'
import { createCompletionsRoutes } from '../routes/create-completions'
import { getWeekSummaryRoutes } from '../routes/get-week-summary'
import fastifyCors from '@fastify/cors'

const app = fastify().withTypeProvider<ZodTypeProvider>()
const PORT = 3333

app.register(fastifyCors, {
  origin: '*',
})

app.setValidatorCompiler(validatorCompiler)
app.setSerializerCompiler(serializerCompiler)

app.register(CreateGoalsRouts)
app.register(getPendingGoalsRoutes)
app.register(createCompletionsRoutes)
app.register(getWeekSummaryRoutes)

app.listen({ port: PORT }).then(() => {
  console.log(`Server is running on ${PORT}`)
})
