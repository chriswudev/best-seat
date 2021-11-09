import React, { Fragment } from 'react';
import { makeStyles } from '@mui/styles';
import { Box } from '@mui/material';
const useStyles = makeStyles((theme) => ({
  row: {
    display: 'flex',
    justifyContent: 'center',
    width: '100%',
  },
  seat: {
    cursor: 'pointer',
    color: 'rgba(255,255,255,0.7)',
    borderRadius: 2,
    padding: theme.spacing(0.5),
    margin: theme.spacing(0.5),
    fontWeight: 600,
    '&:hover': {
      background: 'rgb(120, 205, 4)',
    },
    width: 80,
    textAlign: 'center',
  },
  seatInfoContainer: {
    width: '50%',
    margin: 'auto',
    display: 'flex',
    alignItems: 'center',
    textAlign: 'center',
    color: '#000',
  },

  seatInfo: { marginRight: theme.spacing(2) },

  seatInfoLabel: {
    marginRight: theme.spacing(1),
    display: 'inline-block',
    width: 10,
    height: 10,
  },

  [theme.breakpoints.down('sm')]: {
    seat: { padding: theme.spacing(1.2), margin: theme.spacing(0.5) },
    seatInfoContainer: { width: '100%', display: 'block' },
    seatInfo: { marginTop: theme.spacing(2) },
  },
}));

export default function Seat(props) {
  const classes = useStyles(props);
  const { onSelectSeat } = props;
  const seats = [];
  const rowKeys = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L'];
  for (let i = 0; i < 12; i++) {
    const row = [];
    for (let j = 0; j < 10; j++) {
      row.push(Math.floor(Math.random() * 4));
    }
    seats.push([...row]);
  }

  return (
    <Fragment>
      <Box width={1} pt={4}>
        {seats.length > 0 &&
          seats.map((seatRows, indexRow) => (
            <div key={indexRow} className={classes.row}>
              {seatRows.map((seat, index) => (
                <Box
                  key={`seat-${index}`}
                  onClick={() => onSelectSeat(indexRow, index)}
                  className={classes.seat}
                  bgcolor={
                    seat === 1
                      ? 'rgb(65, 66, 70)'
                      : seat === 2
                      ? 'rgb(120, 205, 4)'
                      : seat === 3
                      ? 'rgb(14, 151, 218)'
                      : 'rgb(96, 93, 169)'
                  }
                >
                  {rowKeys[indexRow]} - {index + 1}
                </Box>
              ))}
            </div>
          ))}
      </Box>
      <Box width={1} mt={10}>
        <div className={classes.seatInfoContainer}>
          <div className={classes.seatInfo}>
            <div
              className={classes.seatInfoLabel}
              style={{ background: 'rgb(96, 93, 169)' }}
            ></div>
            Seat Available
          </div>
          <div className={classes.seatInfo}>
            <div
              className={classes.seatInfoLabel}
              style={{ background: 'rgb(65, 66, 70)' }}
            ></div>
            Reserved Seat
          </div>
          <div className={classes.seatInfo}>
            <div
              className={classes.seatInfoLabel}
              style={{ background: 'rgb(120, 205, 4)' }}
            ></div>
            Selected Seat
          </div>
          <div className={classes.seatInfo}>
            <div
              className={classes.seatInfoLabel}
              style={{ background: 'rgb(14, 151, 218)' }}
            ></div>
            Recommended Seat
          </div>
        </div>
      </Box>
    </Fragment>
  );
}
