import { z } from 'zod'
import {
	TaskApiResponseSchema,
	TaskSchema,
	taskSchemaPlain,
} from "../utils/task-schema"

export type TaskPlain = z.infer<typeof taskSchemaPlain>
export type Task = z.infer<typeof TaskSchema>
export type Tasks = z.infer<typeof TaskApiResponseSchema>
