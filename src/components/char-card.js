import React from 'react';
import {
  makeStyles,
  Card,
  CardContent,
  Typography,
  Link,
} from '@material-ui/core';
import sadnessBackground from '../assets/sadness.png';

const useStyles = makeStyles((theme) => ({
  card: {
    minHeight: 210,
  },
  chumisgo: {
    backgroundImage: `url(${sadnessBackground})`,
    backgroundSize: 'cover',
  }
}));

function CharCard({ color, char }) {
  const classes = useStyles();

  const buildCharUrl = name => {
    const BASE_URL = 'https://www.tibia.com/community/?subtopic=characters&name=';
    const formattedName = name.trim().replace(/ /g, '+');

    return `${BASE_URL}${formattedName}`;
  };

  const chumisgoStyle = {
    ...(char.Name === 'Chumisgo' ? {
      style: {
        color: 'white',
      },
    } : null),
  }

  return (
    <Link href={`${buildCharUrl(char.Name)}`} >
      <Card className={ classes.card } variant="outlined">
        <CardContent className={classes[char.Name.toLowerCase()]}>
          <Typography variant='h6' color={color} {...chumisgoStyle} gutterBottom>
              { char.Name }
          </Typography>
          {
            Object
              .entries(char)
              .map(([key, val]) => (
                key !== 'Name' &&
                <Typography variant='body1' color="textSecondary" {...chumisgoStyle} gutterBottom key={`${char.Name}-${key}`}>
                  { key }: { val }
                </Typography>
              ))
          }
        </CardContent>
      </Card>
    </Link>
  );
}

export { CharCard };
