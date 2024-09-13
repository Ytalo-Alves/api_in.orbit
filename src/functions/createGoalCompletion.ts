import { count, and, gte, lte, eq, sql } from 'drizzle-orm'
import { db } from '../db'
import { goalCompletions, goals } from '../db/schema'
import dayjs from 'dayjs'

interface CreateGoalCompletion {
  goalId: string
}

export async function CreateGoal({ goalId }: CreateGoalCompletion) {
  const firstDayOfWeek = dayjs().startOf('week').toDate()
  const lastDayWeek = dayjs().endOf('week').toDate()

  const goalCompletionCounts = db.$with('goal_completion_counts').as(
    db
      .select({
        goalId: goalCompletions.goalId,
        completionCount: count(goalCompletions.id).as('completionCount'),
      })
      .from(goalCompletions)
      .where(
        and(
          gte(goalCompletions.createdAt, firstDayOfWeek),
          lte(goalCompletions.createdAt, lastDayWeek)
        )
      )
      .groupBy(goalCompletions.goalId)
  )

  const result = await db
    .with(goalCompletionCounts)
    .select({
      desiredWeeklyFrequency: goals.desiredWeeklyFrequency,
      completionCount: sql`
    COALESCE(${goalCompletionCounts.completionCount}, 0)
    `,
    })
    .from(goals)
    .leftJoin(goalCompletionCounts, eq(goalCompletionCounts.goalId, goals.id))

  // const result = await db
  //   .insert(goalCompletions)
  //   .values({
  //     goalId,
  //   })
  //   .returning()

  // const goalCompletion = result[0]

  return {
    result,
  }
}
