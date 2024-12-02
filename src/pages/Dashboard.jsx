import { useState } from 'react'
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  LinearProgress,
  List,
  ListItem,
  ListItemText,
  Chip,
  IconButton,
} from '@mui/material'
import {
  Assignment as ProjectIcon,
  Group as TeamIcon,
  Timeline as TimelineIcon,
  CheckCircle as TaskIcon,
} from '@mui/icons-material'
import { ResponsivePie } from '@nivo/pie'
import { ResponsiveBar } from '@nivo/bar'

// Mock data
const projectStats = {
  total: 12,
  completed: 5,
  inProgress: 5,
  planned: 2,
}

const recentTasks = [
  { id: 1, title: 'Update user interface', status: 'In Progress', dueDate: '2024-01-20' },
  { id: 2, title: 'Fix navigation bug', status: 'Completed', dueDate: '2024-01-18' },
  { id: 3, title: 'Write documentation', status: 'Planned', dueDate: '2024-01-25' },
  { id: 4, title: 'Review pull requests', status: 'In Progress', dueDate: '2024-01-22' },
]

const projectProgress = [
  { id: 'Completed', value: 5, color: '#4caf50' },
  { id: 'In Progress', value: 5, color: '#2196f3' },
  { id: 'Planned', value: 2, color: '#ff9800' },
]

const teamPerformance = [
  {
    team: 'Frontend',
    completed: 15,
    inProgress: 8,
    planned: 5,
  },
  {
    team: 'Backend',
    completed: 12,
    inProgress: 6,
    planned: 4,
  },
  {
    team: 'Design',
    completed: 8,
    inProgress: 4,
    planned: 3,
  },
]

const Dashboard = () => {
  const getStatusColor = (status) => {
    switch (status) {
      case 'Completed':
        return '#4caf50'
      case 'In Progress':
        return '#2196f3'
      case 'Planned':
        return '#ff9800'
      default:
        return '#757575'
    }
  }

  return (
    <Box>
      <Grid container spacing={3}>
        {/* Stats Cards */}
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <ProjectIcon color="primary" sx={{ mr: 1 }} />
                <Typography variant="h6">Projects</Typography>
              </Box>
              <Typography variant="h4">{projectStats.total}</Typography>
              <LinearProgress
                variant="determinate"
                value={(projectStats.completed / projectStats.total) * 100}
                sx={{ mt: 2 }}
              />
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <TaskIcon color="secondary" sx={{ mr: 1 }} />
                <Typography variant="h6">Tasks</Typography>
              </Box>
              <Typography variant="h4">28</Typography>
              <LinearProgress
                variant="determinate"
                value={65}
                color="secondary"
                sx={{ mt: 2 }}
              />
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <TeamIcon color="success" sx={{ mr: 1 }} />
                <Typography variant="h6">Team Members</Typography>
              </Box>
              <Typography variant="h4">12</Typography>
              <LinearProgress
                variant="determinate"
                value={100}
                color="success"
                sx={{ mt: 2 }}
              />
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <TimelineIcon color="info" sx={{ mr: 1 }} />
                <Typography variant="h6">Progress</Typography>
              </Box>
              <Typography variant="h4">75%</Typography>
              <LinearProgress
                variant="determinate"
                value={75}
                color="info"
                sx={{ mt: 2 }}
              />
            </CardContent>
          </Card>
        </Grid>

        {/* Charts */}
        <Grid item xs={12} md={6}>
          <Card sx={{ height: 400 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Project Status Distribution
              </Typography>
              <Box sx={{ height: 300 }}>
                <ResponsivePie
                  data={projectProgress}
                  margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
                  innerRadius={0.5}
                  padAngle={0.7}
                  cornerRadius={3}
                  activeOuterRadiusOffset={8}
                  colors={{ datum: 'data.color' }}
                  borderWidth={1}
                  borderColor={{ from: 'color', modifiers: [['darker', 0.2]] }}
                  enableArcLinkLabels={true}
                  arcLinkLabelsSkipAngle={10}
                  arcLinkLabelsTextColor="#333333"
                  arcLinkLabelsThickness={2}
                  arcLinkLabelsColor={{ from: 'color' }}
                  arcLabelsSkipAngle={10}
                  arcLabelsTextColor={{ from: 'color', modifiers: [['darker', 2]] }}
                  legends={[
                    {
                      anchor: 'bottom',
                      direction: 'row',
                      justify: false,
                      translateX: 0,
                      translateY: 56,
                      itemsSpacing: 0,
                      itemWidth: 100,
                      itemHeight: 18,
                      itemTextColor: '#999',
                      itemDirection: 'left-to-right',
                      itemOpacity: 1,
                      symbolSize: 18,
                      symbolShape: 'circle',
                    },
                  ]}
                />
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Card sx={{ height: 400 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Team Performance
              </Typography>
              <Box sx={{ height: 300 }}>
                <ResponsiveBar
                  data={teamPerformance}
                  keys={['completed', 'inProgress', 'planned']}
                  indexBy="team"
                  margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
                  padding={0.3}
                  valueScale={{ type: 'linear' }}
                  indexScale={{ type: 'band', round: true }}
                  colors={{ scheme: 'nivo' }}
                  borderColor={{ from: 'color', modifiers: [['darker', 1.6]] }}
                  axisTop={null}
                  axisRight={null}
                  axisBottom={{
                    tickSize: 5,
                    tickPadding: 5,
                    tickRotation: 0,
                  }}
                  axisLeft={{
                    tickSize: 5,
                    tickPadding: 5,
                    tickRotation: 0,
                  }}
                  labelSkipWidth={12}
                  labelSkipHeight={12}
                  legends={[
                    {
                      dataFrom: 'keys',
                      anchor: 'bottom-right',
                      direction: 'column',
                      justify: false,
                      translateX: 120,
                      translateY: 0,
                      itemsSpacing: 2,
                      itemWidth: 100,
                      itemHeight: 20,
                      itemDirection: 'left-to-right',
                      itemOpacity: 0.85,
                      symbolSize: 20,
                    },
                  ]}
                />
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Recent Tasks */}
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Recent Tasks
              </Typography>
              <List>
                {recentTasks.map((task) => (
                  <ListItem
                    key={task.id}
                    secondaryAction={
                      <Chip
                        label={task.status}
                        size="small"
                        sx={{
                          bgcolor: getStatusColor(task.status),
                          color: 'white',
                        }}
                      />
                    }
                  >
                    <ListItemText
                      primary={task.title}
                      secondary={`Due: ${task.dueDate}`}
                    />
                  </ListItem>
                ))}
              </List>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  )
}

export default Dashboard
