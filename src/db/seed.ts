import dayjs from "dayjs";
import { client, db } from ".";
import { goalCompletions, goals } from "./schema";

async function Seed(){
  await db.delete(goalCompletions)
  await db.delete(goals)

  const result = await db.insert(goals).values([
    {title: 'Acordar Cedo', desiredWeeklyFrequency: 7},
    {title: 'Academia', desiredWeeklyFrequency: 5},
    {title: 'Ler Livros', desiredWeeklyFrequency: 7},
  ]).returning()

  const startOfWeek = dayjs().startOf('week')

  await db.insert(goalCompletions).values([
    {goalId: result[0].id , createdAt: startOfWeek.toDate()},
    {goalId: result[1].id, createdAt: startOfWeek.add(1, 'day').toDate()},
    {goalId: result[2].id, createdAt: startOfWeek.add(3, 'day').toDate()},
  ])
}

Seed().finally(() => {
  client.end()
})