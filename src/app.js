import React, { useEffect, useMemo, useState } from 'react';
import {
  Grid,
  Paper,
  makeStyles,
} from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';

import { CharCard } from './components/char-card';

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
    '&:hover': {
      boxShadow: '0px 0px 7px 6px rgba(0, 0, 0, 0.29)',
    },
  },
  skeleton: {
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
    'Chumisgo',
    'Avalanchin Dorminhoco',
    'Guizon Dorminhoco',
    'Marvo Dorminhoco',
    'Siozinho Dorminhoco',
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

  const findCharByName = name => chars.find(c => c.Name.includes(name));

  const sortByLevel = (name1, name2) => {
    if (names.length !== chars.length) return true; //noop

    const char1 = findCharByName(name1);
    const char2 = findCharByName(name2);

    return Number(char1.Level) > Number(char2.Level) ? -1 : 1
  };

  const hasCharBeenLoaded = (char = {}) => Object.keys(char).length > 0;

  return (
    <div className={ classes.root }>
      <Grid container spacing={ 2 } className={ classes.gridContainer }>
        {
          names
          .sort(sortByLevel)
          .map((name) => {
            const char = findCharByName(name);

            return (
              <Grid
                item
                xs={ 12 } sm={ 12 } md={ 3 }
                key={ name }
              >
                <Paper className={ classes.paper }>
                  {
                    hasCharBeenLoaded(char) ? (
                      <CharCard
                        char={char}
                        color={vocationColor(char)}
                      />
                    ) : (
                      <Skeleton
                        className={ classes.skeleton }
                        variant='rect'
                      />
                    )
                  }
                </Paper>
              </Grid>
            )
          })
        }
      </Grid>
    </div>
  );
}

export default App;
