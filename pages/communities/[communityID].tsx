import { useRouter } from 'next/router'
import { QueryDocumentSnapshot, DocumentSnapshot, addDoc, collection, query, limit, getDocs, where, doc, getDoc } from '@firebase/firestore';
import { firestore } from '../../firebase/clientApp';
import PostCard from '../../src/PostCard';
import Community from '../community/[userID]';
import Layout from '../../src/Layout';
import Masonry from '@mui/lab/Masonry';
import Hero from '../../src/Hero';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid'
import AddIcon from '@mui/icons-material/Add';
import { useAuth } from '../../src/auth';
import { useState } from 'react';
import Alert from '@mui/material/Alert';

const Posts = (props: any) => {
  const { posts, communityData, communityID } = props;
  const router = useRouter();
  const {currentUser, protectedRoute} = useAuth();
  const [joined, setJoined] = useState<boolean>(false);

  const userCommunity = async () => {
    if (currentUser) {
      const q = query(collection(firestore, "user_community"), where("userID", "==", currentUser.uid));
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        if (doc.data()['communityID'] === communityID)
          setJoined(true);
        setShow('hidden');
      })
    }
  }

  const [show, setShow] = useState<string>('hidden');

  const newPost = (protectedRoute: any) => {
    protectedRoute(router);
    if (joined) {
      router.push(`./${communityID}/createPost`);
    } else {
      setShow('visible');
    }
  }

  const TitleButton = () => {
    return (
      <Grid container spacing={2} alignItems='center'>
        <Grid item><Typography variant='h5'>Posts</Typography></Grid>
        <Grid item><Button variant='contained' color='primary' onClick={() => newPost(protectedRoute)}><AddIcon /></Button></Grid>
        <Grid item><Alert onClose={() => { setShow('hidden') }} sx={{ visibility: show }} severity='error'>Join the community first!</Alert></Grid>
      </Grid>
    )
  }

  const postsContent = () => {
    if (router.isFallback) {
      return (
        <div>Loading...</div>
      )
    } else {
      if (posts) {
        return (
          <>
            <Hero post={communityData} specific={true} currentUser={currentUser} communityID={communityID} joined={joined} setJoined={setJoined} userCommunity={userCommunity} />
            <TitleButton />
            <Masonry columns={3} spacing={2} sx={{ mt: 2 }}>
              {
                posts.map((post: any, i: any) => <PostCard key={i} post={post} />)
              }
            </Masonry>
          </>
        );
      } else {
        return (
          <div>No posts</div>
        )
      }
    }
  }

  return (
    <Layout>
      {postsContent()}
    </Layout>
  )

};

export async function getStaticPaths() {
  const communityCollection = collection(firestore, 'communities');
  const communitiesQuery = query(communityCollection, limit(10));
  const querySnapshot = await getDocs(communitiesQuery);
  const paths = querySnapshot.docs.map(community => ({ params: { communityID: community.id } }));
  const userCollection = collection(firestore, 'users');
  const usersQuery = query(userCollection, limit(10));
  const userQuerySnapshot = await getDocs(usersQuery);
  userQuerySnapshot.docs.map(user => {
    
  });
  return {
    paths,
    fallback: true // false or 'blocking'
  };
}

export const getStaticProps = async ({ params }: { params: any }) => {
  const postCollection = collection(firestore, 'posts');

  const getPosts = async (communityID: string) => {
    const postQuery = query(postCollection, where("communityID", "==", communityID));
    const querySnapshot = await getDocs(postQuery);
    const result: any[] = [];
    querySnapshot.forEach((snapshot) => {
      result.push(snapshot);
    });
    return result.filter(doc => doc.exists).map(doc => ({ id: doc.id, ...doc.data() }));
  }

  const posts = await getPosts(params.communityID);

  const communityDescription = async () => {
    const community = await getDoc(doc(firestore, 'communities', params.communityID))
    if (community.exists()) {
      return {
        title: community.data()['name'],
        description: community.data()['description'],
        image: 'https://source.unsplash.com/random',
        imageText: 'main image description',
        linkText: 'Continue reading…',
      }
    }
  };

  const communityData = await communityDescription();

  if (posts) {
    return {
      props: { posts: JSON.parse(JSON.stringify(posts)), communityData: communityData, communityID: params.communityID },
      revalidate: 10
    }
  } else {
    return {
      props: { communityData: communityData, communityID: params.communityID },
    }
  }
}

export default Posts;
