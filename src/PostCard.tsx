import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import CardHeader from '@mui/material/CardHeader';
import * as React from 'react';
import CardActions from '@mui/material/CardActions';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import FavoriteIcon from '@mui/icons-material/Favorite';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz'
import DeleteMenu from './DeleteMenu';

export default function PostCard(props: any) {
  const { post } = props;
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardHeader
        avatar={
          <Avatar src="https://source.unsplash.com/random" aria-label="author">
            {/* {post.authorName} */}
          </Avatar>
        }
        // For Deletion
        action={
          // <IconButton aria-label="settings">
          //   <MoreHorizIcon />
          // </IconButton>
          <DeleteMenu deleteHandler={() => {}} big/>
        }
        title={post.title}
        subheader={(new Date(post.date.seconds * 1000)).toLocaleDateString('en-US', {month: 'long', day:'numeric', year: 'numeric'})}
      />
      <CardMedia
        component="img"
        height="194"
        image="https://source.unsplash.com/random"
        alt="Random image"
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {post.description}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
          <FavoriteIcon />
        </IconButton>
        {/* Comment if time allows */}
        {/* <IconButton aria-label="share">
          <ShareIcon />
        </IconButton> */}
        {/* <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </ExpandMore> */}
      </CardActions>
    </Card>
  );
}
