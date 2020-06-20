import React from 'react';
import {
  makeStyles,
  Card,
  CardContent,
  Typography,
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  card: {
    minHeight: 210,
  },
}));

function CharCard({ color, char }) {
  const classes = useStyles();

  return (
    <Card className={ classes.card } variant="outlined">
      <CardContent>
      <Typography variant='h6' color={color} gutterBottom>
          { char.Name }
        </Typography>
        {
          Object
            .entries(char)
            .map(([key, val]) => (
              key !== 'Name' &&
              <Typography variant='body1' color="textSecondary" gutterBottom key={`${char.Name}-${key}`}>
                { key }: { val }
              </Typography>
            ))
        }
      </CardContent>
    </Card>
  );
}

export { CharCard };
