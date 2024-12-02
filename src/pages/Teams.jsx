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
  IconButton,
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  ListItemSecondaryAction,
  Chip,
  Divider,
} from '@mui/material'
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Mail as MailIcon,
  Phone as PhoneIcon,
  Star as StarIcon,
} from '@mui/icons-material'

// Mock data
const initialTeams = [
  {
    id: 1,
    name: 'Frontend Development',
    description: 'Responsible for user interface and experience',
    members: [
      {
        id: 1,
        name: 'John Doe',
        role: 'Team Lead',
        email: 'john@example.com',
        phone: '+1 234-567-8901',
        avatar: 'J',
        skills: ['React', 'TypeScript', 'CSS'],
      },
      {
        id: 2,
        name: 'Jane Smith',
        role: 'Senior Developer',
        email: 'jane@example.com',
        phone: '+1 234-567-8902',
        avatar: 'JS',
        skills: ['Vue', 'JavaScript', 'Sass'],
      },
    ],
  },
  {
    id: 2,
    name: 'Backend Development',
    description: 'API and server-side development team',
    members: [
      {
        id: 3,
        name: 'Mike Johnson',
        role: 'Team Lead',
        email: 'mike@example.com',
        phone: '+1 234-567-8903',
        avatar: 'M',
        skills: ['Node.js', 'Python', 'MongoDB'],
      },
      {
        id: 4,
        name: 'Sarah Wilson',
        role: 'Backend Developer',
        email: 'sarah@example.com',
        phone: '+1 234-567-8904',
        avatar: 'S',
        skills: ['Java', 'Spring', 'PostgreSQL'],
      },
    ],
  },
]

const TeamCard = ({ team, onEdit, onDelete }) => {
  return (
    <Card sx={{ height: '100%' }}>
      <CardContent>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
          <Typography variant="h6" component="div">
            {team.name}
          </Typography>
          <Box>
            <IconButton size="small" onClick={() => onEdit(team)}>
              <EditIcon />
            </IconButton>
            <IconButton size="small" onClick={() => onDelete(team.id)}>
              <DeleteIcon />
            </IconButton>
          </Box>
        </Box>

        <Typography color="text.secondary" paragraph>
          {team.description}
        </Typography>

        <Typography variant="subtitle2" gutterBottom>
          Team Members ({team.members.length})
        </Typography>

        <List>
          {team.members.map((member) => (
            <Box key={member.id}>
              <ListItem alignItems="flex-start">
                <ListItemAvatar>
                  <Avatar sx={{ bgcolor: member.role === 'Team Lead' ? 'primary.main' : 'secondary.main' }}>
                    {member.avatar}
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary={
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      {member.name}
                      {member.role === 'Team Lead' && (
                        <StarIcon sx={{ ml: 1, fontSize: 18, color: 'primary.main' }} />
                      )}
                    </Box>
                  }
                  secondary={
                    <Box>
                      <Typography variant="body2" component="span">
                        {member.role}
                      </Typography>
                      <Box sx={{ mt: 1 }}>
                        <IconButton size="small" href={`mailto:${member.email}`}>
                          <MailIcon fontSize="small" />
                        </IconButton>
                        <IconButton size="small" href={`tel:${member.phone}`}>
                          <PhoneIcon fontSize="small" />
                        </IconButton>
                      </Box>
                    </Box>
                  }
                />
                <ListItemSecondaryAction>
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
                    {member.skills.map((skill) => (
                      <Chip
                        key={skill}
                        label={skill}
                        size="small"
                        variant="outlined"
                        sx={{ minWidth: 80 }}
                      />
                    ))}
                  </Box>
                </ListItemSecondaryAction>
              </ListItem>
              <Divider variant="inset" component="li" />
            </Box>
          ))}
        </List>
      </CardContent>
    </Card>
  )
}

const Teams = () => {
  const [teams, setTeams] = useState(initialTeams)
  const [open, setOpen] = useState(false)
  const [editingTeam, setEditingTeam] = useState(null)
  const [formData, setFormData] = useState({
    name: '',
    description: '',
  })

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
    setEditingTeam(null)
    setFormData({
      name: '',
      description: '',
    })
  }

  const handleEdit = (team) => {
    setEditingTeam(team)
    setFormData({
      name: team.name,
      description: team.description,
    })
    setOpen(true)
  }

  const handleDelete = (teamId) => {
    setTeams(teams.filter((team) => team.id !== teamId))
  }

  const handleSubmit = () => {
    if (editingTeam) {
      setTeams(
        teams.map((team) =>
          team.id === editingTeam.id
            ? {
                ...team,
                ...formData,
              }
            : team
        )
      )
    } else {
      setTeams([
        {
          id: Date.now(),
          ...formData,
          members: [],
        },
        ...teams,
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
        <Typography variant="h4">Teams</Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={handleClickOpen}
        >
          Add Team
        </Button>
      </Box>

      <Grid container spacing={3}>
        {teams.map((team) => (
          <Grid item xs={12} lg={6} key={team.id}>
            <TeamCard
              team={team}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          </Grid>
        ))}
      </Grid>

      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogTitle>
          {editingTeam ? 'Edit Team' : 'Add New Team'}
        </DialogTitle>
        <DialogContent>
          <TextField
            label="Team Name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
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
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button
            onClick={handleSubmit}
            variant="contained"
            disabled={!formData.name}
          >
            {editingTeam ? 'Update' : 'Add'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  )
}

export default Teams
