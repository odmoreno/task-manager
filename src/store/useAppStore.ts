import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { createTaskSlice, TaskSliceType } from "./taskSlice";

export const useAppStore = create<TaskSliceType>()(devtools((...a) => ({
    ...createTaskSlice(...a)
})))