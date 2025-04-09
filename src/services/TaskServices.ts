import axios from "axios";
import { TaskApiResponseSchema } from "../utils/task-schema";

export async function getTasks() {
    const url = `${import.meta.env.VITE_API_URL}/tasks`
    const { data } = await axios(url, {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${import.meta.env.VITE_API_KEY}`,
        },
    })

    const result = TaskApiResponseSchema.safeParse(data)

    if (result.success) {
        return result.data
    }

    console.error('Respuesta de la API no válida:', result.error)
    return []

}