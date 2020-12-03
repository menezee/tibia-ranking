import React, { useEffect, useMemo, useState, Fragment } from 'react';
import {
  Grid,
  Paper,
  makeStyles,
} from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';

import { CharCard } from './components/char-card';
import DaysHillerOffline from './components/days-hiller-offline';

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
    'Avalanchin Dorminhoco',
    'Marvo Dorminhoco',
    'Chumisgo Dorminhoco',
    'Limac Dorminhoco',
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

  useEffect(() => {
    const homenagemChumisgo = {
      "Name": "Chumisgo",
      "Vocation": "Beloved Elder Druid",
      "Level": "125",
      "Residence": "Our ❤️",
      "Last Login": "9/23/2020, 11:22:33 AM (RIP)"
    }

    setTimeout(() => {
      setChars(prev => [
        ...prev,
        homenagemChumisgo,
      ]);
    }, 1000);
  }, []);

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
    if (names.length + 1 !== chars.length) return true; //noop

    const char1 = findCharByName(name1);
    const char2 = findCharByName(name2);

    return Number(char1.Level) > Number(char2.Level) ? -1 : 1
  };

  const hasCharBeenLoaded = (char = {}) => Object.keys(char).length > 0;
  
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const hiller = useMemo(() => findCharByName('Chumisgo Dorminhoco') ?? null, [chars]);
  
  return (
    <div className={ classes.root }>
      <Grid container>
        <DaysHillerOffline hiller={hiller} />
        <Grid>
          <Grid container spacing={ 2 } className={ classes.gridContainer }>
            {
              names
                .concat('Chumisgo')
                .sort(sortByLevel)
                .map((name) => {
                  const char = findCharByName(name);
          
                  return (
                    <Fragment key={name}>
                      <Grid
                        item
                        xs={ 12 } sm={ 12 } md={ 3 }
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
                    </Fragment>
                  )
                })
            }
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}

export default App;
