import { StateCreator } from "zustand"
import {
	createTask,
	getTasks,
	updateTask,
	deleteTask,
} from "../services/TaskServices"
import { TaskPlain, Tasks } from "../types"

export type TaskSliceType = {
	tasks: Tasks
	isLoading: boolean
	fetchTasks: () => Promise<void>
	addTask: (task: TaskPlain) => Promise<void>
	updateTaskById: (id: string, task: TaskPlain) => Promise<void>
	deleteTaskById: (id: string) => Promise<void>
}

export const createTaskSlice: StateCreator<TaskSliceType> = (set, get) => ({
	tasks: [],
	isLoading: false,
	fetchTasks: async () => {
		set({ isLoading: true })
		const tasks = await getTasks()
		console.log("Tareas obtenidas:", tasks)
		set({
			tasks: tasks,
			isLoading: false,
		})
	},
	addTask: async (task) => {
		set({ isLoading: true })
		const newTask = await createTask(task)
		const currentTasks = get().tasks

		set({
			tasks: [...currentTasks, newTask],
			isLoading: false,
		})
	},
	updateTaskById: async (id, updatedData) => {
		set({ isLoading: true })
		const updatedTask = await updateTask(id, updatedData)
		const tasks = get().tasks.map((t) => (t._id === id ? updatedTask : t))
		set({ tasks, isLoading: false })
	},

	deleteTaskById: async (id) => {
		set({ isLoading: true })
		await deleteTask(id)
		const tasks = get().tasks.filter((t) => t._id !== id)
		set({ tasks, isLoading: false })
	},
})

