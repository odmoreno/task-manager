import { z } from 'zod'


export const TaskSchema = z.object({
	_id: z.string(),
	title: z.string(),
	description: z.string(),
	status: z.string(),
})

export const TaskApiResponseSchema = z.array(TaskSchema)

export const taskSchemaPlain = z.object({
	title: z.string(),
	description: z.string(),
	status: z.string(),
})
