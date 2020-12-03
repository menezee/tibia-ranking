import React, { useState, useMemo, useCallback } from 'react';
import { Typography, Button, Grid } from '@material-ui/core';
import { differenceInDays } from 'date-fns';

function DaysHillerOffline({ hiller = null }) {
  const [hidden, setHidden] = useState(true);
  
  const brToUSDate = brDate => {
    // only works in heroku bc of the US date format lol
    const extractFromBrDate = /(?<month>[0-9]{1,2})\/(?<day>[0-9]{1,2})\/(?<year>[0-9]{4})/;
    const res = extractFromBrDate.exec(brDate);
    
    if (res !== null) {
      const { year, month, day } = res.groups;
      return new Date(Number(year), Number(month - 1), Number(day));
    }
    
    console.error('[DaysHillerOffline] failed parsing extractFromBrDate', {brDate});
    return new Date();
  };
  
  const calculateHowManyDaysHillerIsOffline = useCallback(() => {
    const lastLogin = brToUSDate(hiller['Last Login']);
    return differenceInDays(
      new Date(),
      lastLogin,
    );
  }, [hiller]);
  
  const daysHillerIsOffline = useMemo(() => (
    hiller !== null ?
      calculateHowManyDaysHillerIsOffline() :
      'erro'
    // eslint-disable-next-line react-hooks/exhaustive-deps
  ), [hidden, hiller, calculateHowManyDaysHillerIsOffline]);
  
  const handleClick = () => {
    setHidden(h => !h);
  };
  
  if (hiller === null) return null;
  
  return (
    <Grid container>
      <Grid item xs={6}>
        <Button variant='contained' color='primary' onClick={handleClick} fullWidth>
          Quantos dias o hiller tá off?  <span role='img' aria-label='surprised'>😮</span>
        </Button>
      </Grid>
      <Grid item xs={6}>
        <Typography variant='h5' hidden={hidden} align='center'>
          { daysHillerIsOffline }
        </Typography>
      </Grid>
    </Grid>
  );
}

export default DaysHillerOffline;
