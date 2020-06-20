import React, { useEffect, useMemo, useState } from 'react';
import {
  Grid,
  Paper,
  makeStyles,
  Card,
  CardContent,
  Typography,
} from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    display: 'flex',
    justifyContent: 'center',
  },
  gridContainer: {
    width: '100%',
  },
  paper: {
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  skeleton: {
    minHeight: 210,
  },
  card: {
    minHeight: 210,
  },
  title: {
    fontSize: 14,
  },
}));

function App() {
  const names = useMemo(() => [
    'Eriq Dorminhoco',
    'Marcao Dorminhoco',
    'Portaluppi Dorminhoco',
    'Abbott Dorminhoco',
    'Gerente do Hiller',
    'Chumisgo',
  ], []);

  const [chars, setChars] = useState([]);
  const classes = useStyles();

  useEffect(() => {
    names.map(async name => {
      const newChar = await (await fetch(`/search?name=${ name }`)).json();

      setChars(prev => [
        ...prev,
        newChar,
      ]);
    });
  }, [names]);

  const vocationColor = (char) => {
      if (char.Vocation.toLowerCase().includes("druid")) {
        return 'textSecondary'
      }
      if (char.Vocation.toLowerCase().includes("knight")) {
        return 'primary'
      }
      if (char.Vocation.toLowerCase().includes("sorcerer")) {
        return 'error'
      }
      if (char.Vocation.toLowerCase().includes("paladin")) {
        return 'textPrimary'
      }
  }

  return (
    <div className={ classes.root }>
      <Grid container spacing={ 2 } className={ classes.gridContainer }>
        {
          names.map((name, i) => (
            <Grid
              item
              xs={ 12 } sm={ 12 } md={ 3 }
              key={ name }
            >
              <Paper className={ classes.paper }>
                {
                  chars[i]?.Name ? (
                    <Card className={ classes.card } variant="outlined">
                      <CardContent>
                      <Typography variant='h6' color={vocationColor(chars[i])} gutterBottom>
                          { chars[i].Name }
                        </Typography>
                        {
                          Object
                            .entries(chars[i])
                            .map(([key, val]) => (
                              key !== 'Name' &&
                              <Typography variant='body1' color="textSecondary" gutterBottom>
                                { key }: { val }
                              </Typography>
                            ))
                        }
                      </CardContent>
                    </Card>
                  ) : (
                    <Skeleton
                      className={ classes.skeleton }
                      variant='rect'
                    />
                  )
                }
              </Paper>
            </Grid>
          ))
        }
      </Grid>
    </div>
  );
}

export default App;
