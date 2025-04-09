import { z } from 'zod'
import { TaskSchema, TaskApiResponseSchema } from '../utils/task-schema'

export type Task = z.infer<typeof TaskSchema>
export type Tasks = z.infer<typeof TaskApiResponseSchema>
