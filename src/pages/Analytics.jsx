import { Box, Grid, Card, CardContent, Typography } from '@mui/material'
import { ResponsivePie } from '@nivo/pie'
import { ResponsiveBar } from '@nivo/bar'

// Mock data
const projectStatusData = [
  { id: 'Completed', value: 15, color: '#4caf50' },
  { id: 'In Progress', value: 10, color: '#2196f3' },
  { id: 'Planning', value: 5, color: '#ff9800' },
]

const taskCompletionData = [
  {
    month: 'Jan',
    completed: 45,
    pending: 15,
  },
  {
    month: 'Feb',
    completed: 55,
    pending: 20,
  },
  {
    month: 'Mar',
    completed: 40,
    pending: 25,
  },
  {
    month: 'Apr',
    completed: 50,
    pending: 10,
  },
  {
    month: 'May',
    completed: 60,
    pending: 15,
  },
  {
    month: 'Jun',
    completed: 48,
    pending: 12,
  },
]

const teamPerformanceData = [
  {
    team: 'Frontend',
    productivity: 85,
    tasks: 120,
    bugs: 15,
  },
  {
    team: 'Backend',
    productivity: 90,
    tasks: 150,
    bugs: 10,
  },
  {
    team: 'Design',
    productivity: 88,
    tasks: 90,
    bugs: 8,
  },
  {
    team: 'DevOps',
    productivity: 92,
    tasks: 80,
    bugs: 5,
  },
]

const Analytics = () => {
  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Analytics Dashboard
      </Typography>

      <Grid container spacing={3}>
        {/* Project Status Distribution */}
        <Grid item xs={12} md={6}>
          <Card sx={{ height: 400 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Project Status Distribution
              </Typography>
              <Box sx={{ height: 300 }}>
                <ResponsivePie
                  data={projectStatusData}
                  margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
                  innerRadius={0.5}
                  padAngle={0.7}
                  cornerRadius={3}
                  activeOuterRadiusOffset={8}
                  colors={{ datum: 'data.color' }}
                  borderWidth={1}
                  borderColor={{ from: 'color', modifiers: [['darker', 0.2]] }}
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

        {/* Task Completion Trends */}
        <Grid item xs={12} md={6}>
          <Card sx={{ height: 400 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Task Completion Trends
              </Typography>
              <Box sx={{ height: 300 }}>
                <ResponsiveBar
                  data={taskCompletionData}
                  keys={['completed', 'pending']}
                  indexBy="month"
                  margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
                  padding={0.3}
                  valueScale={{ type: 'linear' }}
                  indexScale={{ type: 'band', round: true }}
                  colors={['#4caf50', '#ff9800']}
                  borderColor={{ from: 'color', modifiers: [['darker', 1.6]] }}
                  axisTop={null}
                  axisRight={null}
                  axisBottom={{
                    tickSize: 5,
                    tickPadding: 5,
                    tickRotation: 0,
                    legend: 'Month',
                    legendPosition: 'middle',
                    legendOffset: 32,
                  }}
                  axisLeft={{
                    tickSize: 5,
                    tickPadding: 5,
                    tickRotation: 0,
                    legend: 'Tasks',
                    legendPosition: 'middle',
                    legendOffset: -40,
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

        {/* Team Performance Metrics */}
        <Grid item xs={12}>
          <Card sx={{ height: 500 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Team Performance Metrics
              </Typography>
              <Box sx={{ height: 400 }}>
                <ResponsiveBar
                  data={teamPerformanceData}
                  keys={['productivity', 'tasks', 'bugs']}
                  indexBy="team"
                  margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
                  padding={0.3}
                  valueScale={{ type: 'linear' }}
                  indexScale={{ type: 'band', round: true }}
                  colors={['#2196f3', '#4caf50', '#f44336']}
                  borderColor={{ from: 'color', modifiers: [['darker', 1.6]] }}
                  axisTop={null}
                  axisRight={null}
                  axisBottom={{
                    tickSize: 5,
                    tickPadding: 5,
                    tickRotation: 0,
                    legend: 'Team',
                    legendPosition: 'middle',
                    legendOffset: 32,
                  }}
                  axisLeft={{
                    tickSize: 5,
                    tickPadding: 5,
                    tickRotation: 0,
                    legend: 'Value',
                    legendPosition: 'middle',
                    legendOffset: -40,
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
                  animate={true}
                  motionStiffness={90}
                  motionDamping={15}
                />
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Key Performance Indicators */}
        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Project Completion Rate
              </Typography>
              <Typography variant="h3" color="primary">
                85%
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Average Task Duration
              </Typography>
              <Typography variant="h3" color="secondary">
                3.2 days
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Bug Resolution Time
              </Typography>
              <Typography variant="h3" sx={{ color: '#4caf50' }}>
                4.5 hrs
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Team Efficiency
              </Typography>
              <Typography variant="h3" sx={{ color: '#ff9800' }}>
                92%
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  )
}

export default Analytics
