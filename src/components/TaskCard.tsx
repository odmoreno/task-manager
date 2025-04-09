import { Card, CardContent, Typography, Box, IconButton } from '@mui/material'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'

import { Task } from "../types"

type TaskCardProps = {
    task: Task
}

export default function TaskCard({ task }: TaskCardProps) {
    return (
        <div>
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
                            <IconButton
                                aria-label="editar"
                                //onClick={() => ()}
                                color="primary"
                            >
                                <EditIcon />
                            </IconButton>

                            <IconButton
                                aria-label="eliminar"
                                //onClick={() => ()}
                                color="error"
                            >
                                <DeleteIcon />
                            </IconButton>
                        </Box>
                    </Box>
                </CardContent>
            </Card>
        </div>
    )
}
