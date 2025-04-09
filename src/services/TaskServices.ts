import axios from "axios"
import { TaskApiResponseSchema } from "../utils/task-schema"
import { TaskPlain } from "../types"

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

	console.error("Respuesta de la API no válida:", result.error)
	return []
}

export async function createTask(task: TaskPlain) {
	const url = `${import.meta.env.VITE_API_URL}/tasks`
	try {
		const { data } = await axios.post(url, task, {
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${import.meta.env.VITE_API_KEY}`,
			},
		})

		console.log("Tarea creada:", data)
		return data
	} catch (error) {
		console.error("Error al crear la tarea:", error)
		throw error
	}
}

export async function updateTask(
	id: string,
	task: {
		title: string
		description: string
		status: string
	}
) {
	const url = `${import.meta.env.VITE_API_URL}/tasks/${id}`
	const { data } = await axios.put(url, task, {
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${import.meta.env.VITE_API_KEY}`,
		},
	})
	return data
}

export async function deleteTask(id: string) {
	const url = `${import.meta.env.VITE_API_URL}/tasks/${id}`
	const { data } = await axios.delete(url, {
		headers: {
			Authorization: `Bearer ${import.meta.env.VITE_API_KEY}`,
		},
	})
	return data
}
