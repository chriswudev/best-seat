import React, { Fragment, useEffect, useState } from 'react';
import { makeStyles } from '@mui/styles';
import { Box, TextField, Button } from '@mui/material';
import { getSeats, getBestSeats, addSeats, resetSeats } from '../utils/api';

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
  reserved: {
    cursor: 'not-allowed !important',
    '&:hover': {
      background: 'rgb(65, 66, 70) !important',
    },
  },
  toolbarContainer: {
    display: 'flex',
    justifyContent: 'center',
  },
  button: {
    marginLeft: 16,
  },
  seatInfoContainer: {
    width: '50%',
    margin: 'auto',
    display: 'flex',
    justifyContent: 'center',
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

const initialSeats = [];
const rowKeys = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];
for (let i = 0; i < 10; i++) {
  const row = [];
  for (let j = 0; j < 12; j++) {
    row.push(0);
  }
  initialSeats.push([...row]);
}

export default function Seat(props) {
  const classes = useStyles(props);
  const [seats, setSeats] = useState(initialSeats);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [bestSeats, setBestSeats] = useState([]);
  const [seatCount, setSeatCount] = useState(1);

  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    const count = parseInt(value);
    if (name === 'seatCount' && count > 0 && count <= 120) {
      setSeatCount(value);
    }
  };

  const handleSelectSeat = (row, col) => {
    const pair = `${row}-${col}`;
    if (selectedSeats.includes(pair)) {
      selectedSeats.splice(selectedSeats.indexOf(pair), 1);
    } else {
      selectedSeats.push(pair);
    }
    setSelectedSeats([...selectedSeats]);
  };

  const handleSaveSeats = () => {
    if (selectedSeats.length) {
      const data = [];
      selectedSeats.forEach((selectedSeat) => {
        const seat = selectedSeat.split('-');
        data.push(seat);
      });
      addSeats(data)
        .then((res) => {
          if (res.ok) {
            fetchSeats();
          } else {
            throw new Error('Something went wrong.');
          }
        })
        .catch((err) => console.error('Error: ' + err));
    }
  };

  const handleResetSeats = () => {
    resetSeats()
      .then((res) => {
        console.log(res);
        if (res.ok) {
          fetchSeats();
        } else {
          throw new Error('Something went wrong.');
        }
      })
      .catch((err) => console.error('Error: ' + err));
  };

  const handleGetBestSeats = () => {
    setSelectedSeats([]);
    getBestSeats(seatCount)
      .then((data) => {
        if (data.ok) {
          return data.json();
        }
        throw new Error('Something went wrong.');
      })
      .then((data) => {
        const tempBestSeats = [];
        data.forEach((seat) => {
          const pair = `${seat[0]}-${seat[1]}`;
          if (!tempBestSeats.includes(pair)) {
            tempBestSeats.push(pair);
          }
        });
        setBestSeats([...tempBestSeats]);
      })
      .catch((err) => console.error('Error: ' + err));
  };

  const fetchSeats = () => {
    getSeats()
      .then((data) => {
        if (data.ok) {
          return data.json();
        }
        throw new Error('Something went wrong.');
      })
      .then((data) => {
        const clonedSeats = initialSeats.map((seat) => [...seat]);
        data.forEach((seat) => {
          try {
            clonedSeats[seat.row][seat.column] = 1;
          } catch (error) {
            console.error(error);
          }
        });
        setBestSeats([]);
        setSelectedSeats([]);
        setSeats([...clonedSeats]);
      })
      .catch((err) => console.error('Error: ' + err));
  };
 
  useEffect(() => {
    fetchSeats();
  }, []);

  return (
    <Fragment>
      <Box width={1} pt={4}>
        <div className={classes.toolbarContainer}>
          <TextField
            name="seatCount"
            size="small"
            label="Required Seats"
            inputProps={{ type: 'number' }}
            variant="outlined"
            value={seatCount}
            onChange={handleChangeInput}
          />
          <Button
            onClick={handleGetBestSeats}
            className={classes.button}
            variant="outlined"
          >
            Get Best Seats
          </Button>
          <Button
            onClick={handleSaveSeats}
            className={classes.button}
            variant="outlined"
          >
            Save Seats
          </Button>
          <Button
            onClick={handleResetSeats}
            className={classes.button}
            variant="outlined"
          >
            Reset Seats
          </Button>
        </div>
      </Box>
      <Box width={1} pt={4}>
        {seats.length > 0 &&
          seats.map((seatRows, indexRow) => (
            <div key={indexRow} className={classes.row}>
              {seatRows.map((seat, index) => {
                const pair = `${indexRow}-${index}`;
                return (
                  <Box
                    key={`seat-${indexRow}-${index}`}
                    onClick={() => handleSelectSeat(indexRow, index)}
                    className={`${classes.seat} ${
                      seat === 1 ? classes.reserved : ''
                    }`}
                    bgcolor={
                      seat === 1
                        ? 'rgb(65, 66, 70)'
                        : selectedSeats.includes(pair)
                        ? 'rgb(120, 205, 4)'
                        : bestSeats.includes(pair)
                        ? 'rgb(14, 151, 218)'
                        : 'rgb(96, 93, 169)'
                    }
                  >
                    {rowKeys[indexRow]} - {index + 1}
                  </Box>
                );
              })}
            </div>
          ))}
      </Box>
      <Box width={1} mt={8}>
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
            Best Seat
          </div>
        </div>
      </Box>
    </Fragment>
  );
}
