import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import CardActionArea from '@mui/material/CardActionArea';
import Avatar from '@mui/material/Avatar';
import CardHeader from '@mui/material/CardHeader';
import { DocumentSnapshot, DocumentData } from '@firebase/firestore';
import Link from 'next/link';
import { useAuth } from './auth';

export default function CommunityCard({ community, expand, userID }: { community: any, expand: boolean, userID: string }) {
  const communityData = {
    name: community.name,
    description: community.description,
    id: community.id,
  };

  if (communityData) {
    return (
      <Card sx={{ maxWidth: 744 }}>
        <Link href={`/communities/${communityData['id']}`} passHref>
          <CardActionArea>
            {
              expand ? (
                <>
                  <CardMedia
                    component="img"
                    height="140"
                    image="https://source.unsplash.com/random"
                    alt="green iguana"
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      {communityData['name']}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {communityData['description']}
                    </Typography>
                  </CardContent>
                </>
              ) : (
                <CardHeader
                  avatar={<Avatar src="https://source.unsplash.com/random" variant="rounded" />}
                  title={communityData['name']}
                />
              )
            }
          </CardActionArea>
        </Link>
      </Card>
    );
  } else {
    return null;
  }
}