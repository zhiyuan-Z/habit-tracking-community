import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import GitHubIcon from '@mui/icons-material/GitHub';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import { ThemeProvider } from '@mui/material/styles';
import Hero from '../../src/Hero';
import Sidebar from '../../src/Sidebar';
import Footer from '../../src/Footer';
import { QueryDocumentSnapshot, DocumentSnapshot, DocumentData, collection, query, limit, getDocs, where, doc, getDoc } from '@firebase/firestore';
import { firestore } from '../../firebase/clientApp';
import CommunityCard from '../../src/CommunityCard';
import Layout from '../../src/Layout';
import theme from '../../src/theme';

const mainFeaturedPost = {
  title: "Habit Communities",
  description:
    "Join habit communities or create your own communities. Share your progress on your habits with others!",
  image: 'https://source.unsplash.com/random',
  imageText: 'main image description',
  linkText: 'Continue reading…',
};

const sidebar = {
  title: 'General Guidelines',
  description:
    `Be supportive.\nBe friendly.\nPost relevant contents.`,
  archives: [
    { title: 'March 2020', url: '#' },
    { title: 'February 2020', url: '#' },
    { title: 'January 2020', url: '#' },
    { title: 'November 1999', url: '#' },
    { title: 'October 1999', url: '#' },
    { title: 'September 1999', url: '#' },
    { title: 'August 1999', url: '#' },
    { title: 'July 1999', url: '#' },
    { title: 'June 1999', url: '#' },
    { title: 'May 1999', url: '#' },
    { title: 'April 1999', url: '#' },
  ],
  social: [
    { name: 'GitHub', icon: GitHubIcon },
    { name: 'Twitter', icon: TwitterIcon },
    { name: 'Facebook', icon: FacebookIcon },
  ],
};

export async function getStaticPaths() {
  const communityCollection = collection(firestore, 'users');
  const communitiesQuery = query(communityCollection, limit(100));
  const querySnapshot = await getDocs(communitiesQuery);
  // console.log(querySnapshot.docs)
  let paths = querySnapshot.docs.map(user => ({ params: { userID: user.id } }));
//   const paths = Object.keys(querySnapshot.docs).map((eventId) => ({
//     params: { userID: eventId },
// }))
  console.log(paths)
  // paths = JSON.stringify(paths)
  return {
    paths,
    fallback: true // false or 'blocking'
  };
}

export const getStaticProps = async ({ params }: { params: any }) => {
  const communityCollection = collection(firestore, 'communities');

  const getCommunities = async () => {
    const communitiesQuery = query(communityCollection, limit(10));
    const querySnapshot = await getDocs(communitiesQuery);
    // const result: QueryDocumentSnapshot<DocumentData>[] = [];
    const result: any[] = [];
    querySnapshot.forEach((snapshot) => {
      result.push(snapshot);
    });
    return result.filter(doc => doc.exists()).map(doc => ({ id: doc.id, ...doc.data() }));
  }

  const userCommunityCollection = collection(firestore, 'user_community');

  const getUserCommunities = async (userID: string) => {
    const userCommunitiesQuery = query(userCommunityCollection, where("userID", "==", userID));
    const querySnapshot = await getDocs(userCommunitiesQuery);
    const result = await Promise.all(
      querySnapshot.docs
        .filter(document => document.exists)
        .map(async document => await getDoc(doc(communityCollection, `${document.data().communityID}`)))
    );
    return result.filter(doc => doc.exists).map(doc => ({ id: doc.id, ...doc.data() }));
  }
  
  const communities = await getCommunities();
  const userCommunities = await getUserCommunities(params.userID);
  const userID = params.userID;
  console.log(userID)

  return {
    props: { communities, userCommunities, userID },
    revalidate: 10
  }
}

export default function Community(props: any) {
  console.log(props)
  return (
    <Layout>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Container maxWidth="lg">
          <main>
            <Hero post={mainFeaturedPost} specific={false} currentUser={null} communityID={null} />
            <Grid container spacing={4}>
            {/* {featuredPosts.map((post) => (
              <FeaturedPost key={post.title} post={post} />
            ))} */}
          </Grid>
            <Grid container spacing={5} sx={{ mt: 3 }}>
              {/* <Main title="From the firehose" posts={posts} /> */}
              <Grid container item spacing={2} xs={12} md={8} sx={{ '& .markdown': { py: 3, }, }} >
                {
                  // communities.map((community: QueryDocumentSnapshot<DocumentData>) => {
                    props.communities.map((community: any, i: any) => {
                    return (
                      <Grid item key={i} xs={12}>
                        <CommunityCard community={community} expand={true} userID={props.userID} />
                      </Grid>
                    )
                  })
                }
              </Grid>
              <Sidebar
                title={sidebar.title}
                description={sidebar.description}
                archives={sidebar.archives}
                social={sidebar.social}
                communityPage={true}
                userCommunities={props.userCommunities}
                userID={props.userID}
              />
            </Grid>
          </main>
        </Container>
        <Footer
          title="Footer"
          description="SI 579 Winter 2022 Project using Next.js + Firebase + MUI"
        />
      </ThemeProvider>
    </Layout>
  );
}