import * as React from 'react';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { User } from 'firebase/auth';
import { QueryDocumentSnapshot, DocumentSnapshot, addDoc, collection, query, limit, getDocs, where, doc, deleteDoc } from '@firebase/firestore';
import { firestore } from '../firebase/clientApp';
import { useAuth } from './auth';
import { useRouter } from 'next/router';

interface MainFeaturedPostProps {
  post: {
    description: any;
    image: string;
    imageText: string;
    linkText: string;
    title: any;
  };
  specific: boolean
  currentUser: User | null
  communityID: any
  joined?: any
  setJoined?: any
  userCommunity?: any
}

export default function Hero(props: MainFeaturedPostProps) {
  const { post, specific, currentUser, communityID, joined, setJoined, userCommunity } = props;
  const { protectedRoute } = useAuth();
  const router = useRouter()

  const joinCommunity = async (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.preventDefault();
    protectedRoute(router);
    if (currentUser) {
      await addDoc(collection(firestore, "user_community"), {
        userID: currentUser.uid,
        communityID: communityID,
      });
    }
    setJoined(true);
  };

  const leaveCommunity = async (event: React.MouseEvent<HTMLButtonElement, MouseEvent>, currentUser: any) => {
    event.preventDefault();
    protectedRoute(router);
    const q = query(collection(firestore, "user_community"), where("userID", "==", currentUser.uid), where("communityID", "==", communityID));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach(async doc => {
      await deleteDoc(doc.ref);
    });
    setJoined(false);
  };

  if (!!userCommunity) {
    userCommunity();
  }

  React.useEffect(
    () => { }
    , [joined])

  return (
    <Paper
      sx={{
        position: 'relative',
        backgroundColor: 'grey.800',
        color: '#fff',
        mb: 4,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        backgroundImage: `url(${post.image})`,
      }}
    >
      {/* Increase the priority of the hero background image */}
      {<img style={{ display: 'none' }} src={post.image} alt={post.imageText} />}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          bottom: 0,
          right: 0,
          left: 0,
          backgroundColor: 'rgba(0,0,0,.3)',
        }}
      />
      <Grid container>
        <Grid item md={6}>
          <Box
            sx={{
              position: 'relative',
              p: { xs: 3, md: 6 },
              pr: { md: 0 },
            }}
          >
            <Typography component="h1" variant="h3" color="inherit" gutterBottom>
              {post.title}
            </Typography>
            <Typography variant="h5" color="inherit" paragraph>
              {post.description}
            </Typography>
            {/* <Link variant="subtitle1" href="#">
              {post.linkText}
            </Link> */}
            {specific && (
              joined ?
                <Button variant='outlined' color='primary' onClick={async (e) => { await leaveCommunity(e, currentUser) }}>Joined</Button>
                :
                <Button variant='contained' color='primary' onClick={async (e) => { await joinCommunity(e) }}>Join</Button>
            )
            }
          </Box>
        </Grid>
      </Grid>
    </Paper>
  );
}