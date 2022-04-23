import { useRouter } from 'next/router'
import { addDoc, collection, query, limit, getDocs, where, doc, getDoc } from '@firebase/firestore';
import { firestore } from '../../../firebase/clientApp';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { useAuth } from '../../../src/auth';
import { useState } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { ThemeProvider } from '@mui/material/styles';
import Footer from '../../../src/Footer';
import theme from '../../../src/theme';

export async function getStaticPaths() {
  const communityCollection = collection(firestore, 'communities');
  const communitiesQuery = query(communityCollection);
  const querySnapshot = await getDocs(communitiesQuery);
  const paths = querySnapshot.docs.map(community => ({ params: { communityID: community.id } }));
  return {
    paths,
    fallback: true // false or 'blocking'
  };
}

export const getStaticProps = async ({ params }: { params: any }) => {
  return {
    props: { communityID: params.communityID },
    revalidate: 10
  }
}

export default function CreateHabit(props: any) {
  const { communityID } = props;
  const router = useRouter();
  const { currentUser, protectedRoute } = useAuth();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    protectedRoute();
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    await addDoc(collection(firestore, "posts"), {
      communityID: communityID,
      date: new Date(),
      description: data.get('description'),
      title: data.get('title'),
      likes: 0,
      userID: currentUser.uid,
    });
    router.back();
  }

  const [name, setName] = useState('');

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
            Creat New Post
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="title"
              label="Title"
              name="title"
              autoFocus
              onChange={(e) => setName(e.target.value)}
              inputProps={{
                maxLength: 30
              }}
            />
            <TextField
              margin="normal"
              fullWidth
              id="description"
              label="Description"
              name="description"
              multiline
              rows={4}
              inputProps={{
                maxLength: 140
              }}
            />
            <SubmitButton />
          </Box>
        </Box>
      </Container>
      <Footer />
    </ThemeProvider>
  );
}
