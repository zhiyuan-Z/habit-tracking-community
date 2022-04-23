import * as React from 'react';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import { DocumentSnapshot, DocumentData} from '@firebase/firestore';
import CommunityCard from './CommunityCard'

interface SidebarProps {
  archives: ReadonlyArray<{
    url: string;
    title: string;
  }>;
  description: string;
  social: ReadonlyArray<{
    icon: React.ElementType;
    name: string;
  }>;
  title: string;
  communityPage: boolean;
  userCommunities: DocumentSnapshot<DocumentData>[];
  userID: string;
}

export default function Sidebar(props: SidebarProps) {
  const { archives, description, social, title, communityPage, userCommunities, userID } = props;
  return (
    <Grid item xs={12} md={4}>
      <Paper elevation={0} sx={{ p: 2, bgcolor: 'grey.200' }}>
        <Typography variant="h6" gutterBottom>
          {title}
        </Typography>
        <Typography>{description}</Typography>
      </Paper>
      {communityPage ? (
        <>
          <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
            Your Communities
          </Typography>
          <Stack>
            {
              userCommunities.map((community: DocumentSnapshot<DocumentData>, i) => {
                return (
                  <Grid item key={i} xs={12}>
                    <CommunityCard community={community} expand={false} userID={userID} />
                  </Grid>
                )
              })
            }
          </Stack>
        </>
      ) : (
        <>
          <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
            Archives
          </Typography>
          {archives.map((archive) => (
            <Link display="block" variant="body1" href={archive.url} key={archive.title}>
              {archive.title}
            </Link>
          ))}
        </>
      )}
      {/* <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
        Social
      </Typography>
      {social.map((network) => (
        <Link
          display="block"
          variant="body1"
          href="#"
          key={network.name}
          sx={{ mb: 0.5 }}
        >
          <Stack direction="row" spacing={1} alignItems="center">
            <network.icon />
            <span>{network.name}</span>
          </Stack>
        </Link>
      ))} */}
    </Grid>
  );
}
