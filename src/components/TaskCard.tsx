import { Card, CardContent, Typography, Box, IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { Task } from "../types";

type TaskCardProps = {
    task: Task;
    onEdit: (task: Task) => void;
    onDelete: (id: string) => void;
};

export default function TaskCard({ task, onEdit, onDelete }: TaskCardProps) {
    return (
        <Card>
            <CardContent>
                <Box display="flex" justifyContent="space-between" alignItems="center">
                    <Box>
                        <Typography variant="h6">{task.title}</Typography>
                        <Typography variant="body2" mb={1}>
                            {task.description}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                            Estado: {task.status}
                        </Typography>
                    </Box>

                    <Box>
                        <IconButton aria-label="editar" onClick={() => onEdit(task)} color="primary">
                            <EditIcon />
                        </IconButton>
                        <IconButton aria-label="eliminar" onClick={() => onDelete(task._id)} color="error">
                            <DeleteIcon />
                        </IconButton>
                    </Box>
                </Box>
            </CardContent>
        </Card>
    );
}
