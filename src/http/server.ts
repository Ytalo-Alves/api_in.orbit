import fastify from "fastify"
import { CreateGoals } from "../routes/create_goals";
import {serializerCompiler, validatorCompiler, type ZodTypeProvider} from 'fastify-type-provider-zod'
import { getWeekPendingGoals } from "../functions/getWeekPendingGoals";

const app = fastify().withTypeProvider<ZodTypeProvider>();
const PORT = 3333

app.setValidatorCompiler(validatorCompiler);
app.setSerializerCompiler(serializerCompiler);

app.get('/pending-goals', async () => {
  const { pendingGoals } = await getWeekPendingGoals()

  return { pendingGoals }
 
})

app.register(CreateGoals)

app.listen({port: PORT,
}).then(() => {
  console.log(`Server is running on ${PORT}`);
}) 