import { useEffect, useState } from 'react';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Grid';
import ListItem from '@mui/material/ListItem';
import Button from '@mui/material/Button';
import Title from './Title';
import { styled } from '@mui/material/styles';
import { collection, QueryDocumentSnapshot, DocumentData, query, where, limit, getDocs, getDoc, doc, deleteDoc } from "@firebase/firestore";
import { firestore } from '../firebase/clientApp';
import DeleteMenu from './DeleteMenu';
import { NextRouter, useRouter } from 'next/router';
import { useAuth } from './auth';
import AddIcon from '@mui/icons-material/Add';

export default function Habits(props: any) {
  const { habits, setHabits } = props;
  const habitsCollection = collection(firestore, 'habits');

  const {currentUser, protectedRoute} = useAuth();
  console.log(useAuth())
  const router = useRouter();
  const [refresh, setRefresh] = useState<boolean>(false);

  const getHabits = async () => {
    if (!!!currentUser) {
      router.push('/login')
    } else {
      const habitsQuery = query(habitsCollection, where('userID', '==', currentUser.uid));
      const querySnapshot = await getDocs(habitsQuery);
      // map through habits adding them to an array
      const result: QueryDocumentSnapshot<DocumentData>[] = [];
      querySnapshot.forEach((snapshot) => {
        result.push(snapshot);
      });
      setHabits(result.filter(doc => doc.exists).map(doc => ({ id: doc.id, ...doc.data() })));
    }
  };

  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'start',
    color: theme.palette.text.secondary,
  }));

  const deleteItem = async (item: any, protectedRoute: any, currentUser: any, router: NextRouter) => {
    if (!!!currentUser) {
      router.push('/login')
    }
    const itemRef = doc(firestore, "habits", item.id);
    await deleteDoc(itemRef);
    setRefresh(!refresh);
  };

  useEffect(
    () => { getHabits() }
    , [refresh])

  return (
    <>
    <Grid container gap={2}>
      <Grid item><Title>Your Habits</Title></Grid>
      <Grid item>
        <Button variant='contained' color='primary' size='small' onClick={() => { router.push('/createHabit')}}><AddIcon /></Button>
      </Grid>
    </Grid>
      
      {habits.length === 0 && <h2>Start a habit now!</h2>}
      <Stack spacing={1}>
        {
          habits.map((habit: any) => {
            return (
              <Item key={habit.id}>
                <Grid container alignItems={'center'} spacing={2}>
                  <Grid item>
                    {habit['name']}
                  </Grid>
                  <Grid item>
                    <DeleteMenu deleteHandler={() => {deleteItem(habit, protectedRoute, currentUser, router)}} />
                  </Grid>
                </Grid>
              </Item>
            )
          })
        }
      </Stack>
    </>
  );
}