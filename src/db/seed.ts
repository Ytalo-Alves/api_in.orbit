import { db } from ".";
import { goalCompletions, goals } from "./schema";

async function Seed(){
  await db.delete(goalCompletions)
  await db.delete(goals)
}