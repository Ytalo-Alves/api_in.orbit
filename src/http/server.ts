import fastify from 'fastify'
import { CreateGoals } from '../routes/create_goals'
import {
  serializerCompiler,
  validatorCompiler,
  type ZodTypeProvider,
} from 'fastify-type-provider-zod'
import { getPendingGoalsRoutes } from '../routes/get-pending-goals'
import { createCompletionsRoutes } from '../routes/create-completions'

const app = fastify().withTypeProvider<ZodTypeProvider>()
const PORT = 3333

app.setValidatorCompiler(validatorCompiler)
app.setSerializerCompiler(serializerCompiler)

app.register(CreateGoals)
app.register(getPendingGoalsRoutes)
app.register(createCompletionsRoutes)

app.listen({ port: PORT }).then(() => {
  console.log(`Server is running on ${PORT}`)
})
