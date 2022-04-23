import { useState, createContext } from 'react';
import { QueryDocumentSnapshot, DocumentData } from "@firebase/firestore";
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Link from '@mui/material/Link';
import Chart from '../src/Chart';
import Deposits from '../src/Deposits';
import Habits from '../src/Habits';
import Layout from '../src/Layout';
import Footer from '../src/Footer';

function DashboardContent(props: any) {
  return (
    <Layout>
      <Grid container spacing={3}>
        {/* Chart */}
        {/* <Grid item xs={12} md={8} lg={9}>
          <Paper
            sx={{
              p: 2,
              display: 'flex',
              flexDirection: 'column',
              height: 240,
            }}
          >
            <Chart />
          </Paper>
        </Grid> */}
        {/* Recent Deposits */}
        {/* <Grid item xs={12} md={4} lg={3}>
          <Paper
            sx={{
              p: 2,
              display: 'flex',
              flexDirection: 'column',
              height: 240,
            }}
          >
            <Deposits />
          </Paper>
        </Grid> */}
        {/* Recent Orders */}
        <Grid item xs={12}>
          <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
            <Habits habits={props.habits} setHabits={props.setHabits} />
          </Paper>
        </Grid>
      </Grid>
      <Footer
        title="Footer"
        description="SI 579 Winter 2022 Project using Next.js + Firebase + MUI"
      />
    </Layout>
  );
}

export default function Dashboard() {
  const [habits, setHabits] = useState<QueryDocumentSnapshot<DocumentData>[]>([]);
  return <DashboardContent habits={habits} setHabits={setHabits} />;
}
