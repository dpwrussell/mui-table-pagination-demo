import React from 'react';
import moment from 'moment';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import './App.css';
import Regular from './tables/Regular';
import Reverse from './tables/Reverse';
import Overlap from './tables/Overlap';
import clsx from 'clsx';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
}));

const baseDate = moment('2020-01-01');
let balance = 0;
const transactions = [];
for (let i=0; i<20; i++) {
  balance += i;
  transactions.push(
    {
      id: i,
      date: baseDate.clone().add(i, 'days'),
      description: `Transaction ${i}`,
      amount: i,
      balance
    }
  );
}

function App() {
  const classes = useStyles();
  return (
    <div className={clsx("App", classes.root)}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Typography className={classes.title} variant="h6" noWrap>Regular</Typography>
          <Regular transactions={transactions}/>
        </Grid>
        <Grid item xs={12}>
          <Typography className={classes.title} variant="h6" noWrap>Reverse</Typography>
          <Reverse transactions={transactions}/>
        </Grid>
        <Grid item xs={12}>
          <Typography className={classes.title} variant="h6" noWrap>Overlap</Typography>
          <Overlap transactions={transactions}/>
        </Grid>
      </Grid>
    </div>
  );
}

export default App;
