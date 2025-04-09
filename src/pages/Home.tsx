import { useEffect, useState } from 'react';
import {
    Container,
    Typography,
    CircularProgress,
    Box,
    Stack,
    Grid,
    TextField,
    Button,
    Paper,
    MenuItem,
} from '@mui/material';
import { useAppStore } from '../store/useAppStore';
import TaskCard from '../components/TaskCard';
import { Task } from '../types';

const Home = () => {
    const tasks = useAppStore((state) => state.tasks);
    const isLoading = useAppStore((state) => state.isLoading);
    const fetchTasks = useAppStore((state) => state.fetchTasks);
    const addTask = useAppStore((state) => state.addTask);
    const updateTask = useAppStore((state) => state.updateTaskById);
    const deleteTask = useAppStore((state) => state.deleteTaskById);


    const [form, setForm] = useState({
        title: '',
        description: '',
        status: 'por hacer',
    });

    const [isEditing, setIsEditing] = useState(false);
    const [editId, setEditId] = useState<string | null>(null);

    useEffect(() => {
        fetchTasks();
    }, [fetchTasks]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (isEditing && editId) {
            await updateTask(editId, form);
        } else {
            await addTask(form);
        }

        // Reset
        setForm({ title: '', description: '', status: 'Por hacer' });
        setIsEditing(false);
        setEditId(null);
    };

    const handleEdit = (task: Task) => {
        setForm({
            title: task.title,
            description: task.description,
            status: task.status,
        });
        setEditId(task._id);
        setIsEditing(true);
    };

    const handleDelete = async (id: string) => {
        await deleteTask(id);
    };


    return (
        <Container maxWidth="lg" sx={{ mt: 5 }}>
            <Typography variant="h4" mb={4} align="center">
                Gestor de Tareas
            </Typography>

            <Grid container spacing={4} columns={{ xs: 1, md: 2 }}>
                {/* Lista de tareas */}
                <Grid size={{ xs: 1, md: 1 }}>
                    <Typography variant="h6" mb={2}>
                        Tus Tareas
                    </Typography>
                    {isLoading ? (
                        <Box display="flex" justifyContent="center" mt={4}>
                            <CircularProgress />
                        </Box>
                    ) : tasks.length === 0 ? (
                        <Typography variant="body1" mt={2} align="center">
                            No hay tareas registradas.
                        </Typography>
                    ) : (
                        <Stack spacing={2}>
                            {tasks.map((task) => (
                                <TaskCard
                                    key={task._id}
                                    task={task}
                                    onEdit={handleEdit}
                                    onDelete={handleDelete} />
                            ))}
                        </Stack>
                    )}
                </Grid>

                {/* Formulario */}
                <Grid size={{ xs: 1, md: 1 }}>
                    <Paper elevation={3} sx={{ p: 3 }}>
                        <Typography variant="h6" gutterBottom>
                            Nueva Tarea
                        </Typography>
                        <form onSubmit={handleSubmit}>
                            <TextField
                                label="Título"
                                name="title"
                                fullWidth
                                margin="normal"
                                value={form.title}
                                onChange={handleChange}
                                required
                            />
                            <TextField
                                label="Descripción"
                                name="description"
                                fullWidth
                                margin="normal"
                                multiline
                                rows={3}
                                value={form.description}
                                onChange={handleChange}
                                required
                            />
                            <TextField
                                select
                                label="Estado"
                                name="status"
                                fullWidth
                                margin="normal"
                                value={form.status}
                                onChange={handleChange}
                            >
                                <MenuItem value="por hacer">Por Hacer</MenuItem>
                                <MenuItem value="en progreso">En progreso</MenuItem>
                                <MenuItem value="completada">Completada</MenuItem>
                            </TextField>
                            <Button
                                variant="contained"
                                type="submit"
                                fullWidth
                                sx={{ mt: 2 }}
                            >
                                Agregar Tarea
                            </Button>
                        </form>
                    </Paper>
                </Grid>
            </Grid>
        </Container>
    );
};

export default Home;
