import { StateCreator } from "zustand"
import { getTasks } from "../services/TaskServices"
import { Tasks } from "../types"

export type TaskSliceType = {
    tasks: Tasks
    isLoading: boolean
    fetchTasks: () => Promise<void>
}

export const createTaskSlice: StateCreator<TaskSliceType> = (set) => ({
    tasks: {
        tasks: []
    },
    isLoading: false,
    fetchTasks: async () => {
        set({ isLoading: true })
        const tasks = await getTasks()
        set({
            tasks: tasks,
            isLoading: false,
        })
    }
})