import * as React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Box from '@mui/material/Box';
import Switch from '@mui/material/Switch';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { ThemeProvider } from '@mui/material/styles';
import Footer from '../src/Footer';
import { collection, addDoc } from "@firebase/firestore";
import { firestore } from '../firebase/clientApp';
import { useAuth } from '../src/auth';
import { useRouter } from 'next/router';
import theme from '../src/theme';

export default function CreateHabit() {
  const { currentUser } = useAuth();
  const router = useRouter();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    await addDoc(collection(firestore, "habits"), {
      name: data.get('name'),
      description: data.get('description'),
      private: !! data.get('private'),
      userID: currentUser.uid,
    });
    router.push('/');
  };

  const [name, setName] = React.useState('');

  function SubmitButton() {
    if (name) {
      return <Button
        type="submit"
        fullWidth
        variant="contained"
        sx={{ mt: 3, mb: 2 }}
      >
        Done
      </Button>
    } else {
      return <Button
        type="submit"
        fullWidth
        variant="contained"
        sx={{ mt: 3, mb: 2 }}
        disabled
      >
        Done
      </Button>
    }
  }

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Typography component="h1" variant="h4">
            Create New Habit
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="name"
              label="Habit Name"
              name="name"
              autoFocus
              onChange={(e) => setName(e.target.value)}
            />
            <TextField
              margin="normal"
              fullWidth
              id="description"
              label="Description"
              name="description"
              multiline
              rows={4}
            />
            <FormControlLabel
              control={<Switch color="primary" />}
              label="Private"
              name="private"
              value="private"
              labelPlacement="start"
            />
            <SubmitButton />
          </Box>
        </Box>
      </Container>
      <Footer />
    </ThemeProvider>
  );
}
