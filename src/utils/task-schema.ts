import { z } from 'zod'


export const TaskSchema = z.object({
    id: z.string(),
    title: z.string(),
    description: z.string(),
    status: z.string()
})

export const TaskApiResponseSchema = z.object({
    tasks: z.array(TaskSchema)
})


