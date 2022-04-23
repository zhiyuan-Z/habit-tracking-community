import * as React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';

function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://www.zhiyuanz.com/">
        Zhiyuan Zhang
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

interface FooterProps {
  description: string;
  title: string;
}

export default function Footer({title="Footer", description="SI 579 Winter 2022 Project using Next.js + Firebase + MUI"}) {
  // const { description, title } = props;

  return (
    <Box component="footer" sx={{ pt: 4 }}>
      <Container maxWidth="lg">
        {/* <Typography variant="h6" align="center" gutterBottom>
          {title}
        </Typography> */}
        <Typography
          variant="subtitle1"
          align="center"
          color="text.secondary"
          component="p"
        >
          {description}
        </Typography>
        <Copyright />
      </Container>
    </Box>
  );
}