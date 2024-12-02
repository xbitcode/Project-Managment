import { useState } from 'react'
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  MenuItem,
  IconButton,
  LinearProgress,
  Avatar,
  AvatarGroup,
  Chip,
} from '@mui/material'
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Flag as PriorityIcon,
} from '@mui/icons-material'

// Mock data
const initialProjects = [
  {
    id: 1,
    title: 'E-commerce Platform',
    description: 'Building a modern e-commerce platform with React and Node.js',
    status: 'In Progress',
    priority: 'High',
    progress: 75,
    team: [
      { id: 1, name: 'John Doe', avatar: 'J' },
      { id: 2, name: 'Jane Smith', avatar: 'JS' },
      { id: 3, name: 'Mike Johnson', avatar: 'M' },
    ],
    deadline: '2024-03-15',
  },
  {
    id: 2,
    title: 'Mobile App Development',
    description: 'Creating a fitness tracking mobile application',
    status: 'Planning',
    priority: 'Medium',
    progress: 25,
    team: [
      { id: 4, name: 'Sarah Wilson', avatar: 'S' },
      { id: 5, name: 'Tom Brown', avatar: 'T' },
    ],
    deadline: '2024-04-01',
  },
  {
    id: 3,
    title: 'Website Redesign',
    description: 'Redesigning company website with modern UI/UX',
    status: 'Completed',
    priority: 'Low',
    progress: 100,
    team: [
      { id: 6, name: 'Emily Davis', avatar: 'E' },
      { id: 7, name: 'Chris Lee', avatar: 'C' },
    ],
    deadline: '2024-02-28',
  },
]

const statusOptions = ['Planning', 'In Progress', 'Completed']
const priorityOptions = ['Low', 'Medium', 'High']

const ProjectCard = ({ project, onEdit, onDelete }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case 'Completed':
        return '#4caf50'
      case 'In Progress':
        return '#2196f3'
      case 'Planning':
        return '#ff9800'
      default:
        return '#757575'
    }
  }

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'High':
        return '#f44336'
      case 'Medium':
        return '#ff9800'
      case 'Low':
        return '#4caf50'
      default:
        return '#757575'
    }
  }

  return (
    <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <CardContent sx={{ flexGrow: 1 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
          <Typography variant="h6" component="div">
            {project.title}
          </Typography>
          <Box>
            <IconButton size="small" onClick={() => onEdit(project)}>
              <EditIcon />
            </IconButton>
            <IconButton size="small" onClick={() => onDelete(project.id)}>
              <DeleteIcon />
            </IconButton>
          </Box>
        </Box>

        <Typography color="text.secondary" paragraph>
          {project.description}
        </Typography>

        <Box sx={{ mb: 2 }}>
          <Chip
            label={project.status}
            size="small"
            sx={{ mr: 1, bgcolor: getStatusColor(project.status), color: 'white' }}
          />
          <Chip
            icon={<PriorityIcon />}
            label={project.priority}
            size="small"
            sx={{ bgcolor: getPriorityColor(project.priority), color: 'white' }}
          />
        </Box>

        <Typography variant="body2" color="text.secondary" gutterBottom>
          Progress
        </Typography>
        <LinearProgress
          variant="determinate"
          value={project.progress}
          sx={{ mb: 2, height: 8, borderRadius: 4 }}
        />

        <Typography variant="body2" color="text.secondary" gutterBottom>
          Team Members
        </Typography>
        <AvatarGroup max={4} sx={{ mb: 2 }}>
          {project.team.map((member) => (
            <Avatar key={member.id} sx={{ width: 32, height: 32 }}>
              {member.avatar}
            </Avatar>
          ))}
        </AvatarGroup>

        <Typography variant="body2" color="text.secondary">
          Deadline: {project.deadline}
        </Typography>
      </CardContent>
    </Card>
  )
}

const Projects = () => {
  const [projects, setProjects] = useState(initialProjects)
  const [open, setOpen] = useState(false)
  const [editingProject, setEditingProject] = useState(null)
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    status: '',
    priority: '',
    deadline: '',
  })

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
    setEditingProject(null)
    setFormData({
      title: '',
      description: '',
      status: '',
      priority: '',
      deadline: '',
    })
  }

  const handleEdit = (project) => {
    setEditingProject(project)
    setFormData({
      title: project.title,
      description: project.description,
      status: project.status,
      priority: project.priority,
      deadline: project.deadline,
    })
    setOpen(true)
  }

  const handleDelete = (projectId) => {
    setProjects(projects.filter((project) => project.id !== projectId))
  }

  const handleSubmit = () => {
    if (editingProject) {
      setProjects(
        projects.map((project) =>
          project.id === editingProject.id
            ? {
                ...project,
                ...formData,
              }
            : project
        )
      )
    } else {
      setProjects([
        {
          id: Date.now(),
          ...formData,
          progress: 0,
          team: [],
        },
        ...projects,
      ])
    }
    handleClose()
  }

  return (
    <Box>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          mb: 4,
        }}
      >
        <Typography variant="h4">Projects</Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={handleClickOpen}
        >
          Add Project
        </Button>
      </Box>

      <Grid container spacing={3}>
        {projects.map((project) => (
          <Grid item xs={12} md={6} lg={4} key={project.id}>
            <ProjectCard
              project={project}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          </Grid>
        ))}
      </Grid>

      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogTitle>
          {editingProject ? 'Edit Project' : 'Add New Project'}
        </DialogTitle>
        <DialogContent>
          <TextField
            label="Project Title"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Description"
            value={formData.description}
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
            fullWidth
            margin="normal"
            multiline
            rows={3}
          />
          <TextField
            select
            label="Status"
            value={formData.status}
            onChange={(e) => setFormData({ ...formData, status: e.target.value })}
            fullWidth
            margin="normal"
          >
            {statusOptions.map((option) => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            select
            label="Priority"
            value={formData.priority}
            onChange={(e) =>
              setFormData({ ...formData, priority: e.target.value })
            }
            fullWidth
            margin="normal"
          >
            {priorityOptions.map((option) => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            type="date"
            label="Deadline"
            value={formData.deadline}
            onChange={(e) =>
              setFormData({ ...formData, deadline: e.target.value })
            }
            fullWidth
            margin="normal"
            InputLabelProps={{ shrink: true }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button
            onClick={handleSubmit}
            variant="contained"
            disabled={!formData.title || !formData.status || !formData.priority}
          >
            {editingProject ? 'Update' : 'Add'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  )
}

export default Projects
