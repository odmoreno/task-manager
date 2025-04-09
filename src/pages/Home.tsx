import { useEffect } from 'react'

import {
    Container,
    Typography,
    CircularProgress,
    Box,
} from '@mui/material'
import Grid from '@mui/material/Grid'
import { useAppStore } from '../store/useAppStore'
import TaskCard from '../components/TaskCard'


const Home = () => {
    const { tasks } = useAppStore((state) => state.tasks)
    const isLoading = useAppStore((state) => state.isLoading)
    const fetchTasks = useAppStore((state) => state.fetchTasks)

    useEffect(() => {
        fetchTasks()
    }, [])

    return (
        <Container maxWidth="md">
            <Typography variant="h4" mt={5} mb={3}>
                Lista de Tareas
            </Typography>

            {isLoading ? (
                <Box display="flex" justifyContent="center" mt={4}>
                    <CircularProgress />
                </Box>
            ) : (
                <Grid container spacing={2}>
                    {tasks.length === 0 ? (
                        <Typography variant="body1" mt={2}>
                            No hay tareas registradas.
                        </Typography>
                    ) : (
                        tasks.map((task) => (
                            <Grid key={task.id}>
                                <TaskCard task={task} />
                            </Grid>
                        ))
                    )}
                </Grid>
            )}
        </Container>
    )
}

export default Home