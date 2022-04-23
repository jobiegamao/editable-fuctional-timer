import { Alert, Box, Button,  Stack, TextField, } from '@mui/material';

import { useState, useEffect } from 'react'



const Timer = () => {
    const [timer, setTimer] = useState({
        hours: 0,
        mins: 0,
        sec: 0
    });
    const [start, setStart] = useState(false);
    const [paused, setPaused] = useState(false);
    const [finish, setFinish] = useState(false);
    
    const handleChange = (event) => {
        const id = event.target.id;
        const value = event.target.value;
        setTimer(values => ({...values, [id]: value}))
    }

    const handleStart = (event) => {
        event.preventDefault();
        setPaused(false);
        setFinish(false);
        setStart(true);
    }
    const handlePause = () => {
        setPaused((paused) => !paused);
    }
    const handleReset = () => {
        setTimer({
            hours: 0,
            mins: 0,
            sec: 0
        });
        setPaused(false);
        setFinish(false);
        setStart(false);
    };

    
    useEffect(() => {
        if(start){
            let timerCountDown = setInterval(() => updateTime(), 1000);
            return () => clearInterval(timerCountDown); //cleanup
        }
      
    });

    const updateTime = () => {
        if (paused || finish) return;
    
        // Times up
        if (timer.hours === 0 && timer.mins === 0 && timer.sec === 0) {
            setFinish(true);
            setStart(false); 
          
        }else if (timer.hours > 0 && timer.mins === 0 && timer.sec === 0 ) {
            setTimer({// decrement hour
                hours: timer.hours - 1,
                mins: 59,
                sec: 59
            });
        }else if (timer.mins > 0 && timer.sec === 0) {
          setTimer({ // decrement minute
            hours: timer.hours,
            mins: timer.mins - 1,
            sec: 59
          });
        }else {
          if(timer.sec !== 0){
            setTimer({// decrement sec
                hours: timer.hours,
                mins: timer.mins,
                sec: timer.sec - 1
              });
          }
        }
      };

      //sx prop
      const boxStyle = {
        my: 20,
        bgcolor:"pink",
        p: 5,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        borderRadius: 5,
        maxWidth: 500
      };

      const inputsStack = {
        width: '100%',
        alignItems: "flex-end",
        justifyContent:"space-between",
        p: 3,
        //backgroundColor:"white",
      }

      const btnsStack = {
       justifyContent:"end",
       //backgroundColor:"white",
       width: '100%',
       p: 3,
        
      }

      const inputStyle = {
         width:80,
         input: {
             textAlign: "center",
             fontWeight: "bold",
             fontSize:"large",
         }
      };

  return (
    <Box 
        component="form" 
        onSubmit={handleStart}
        sx={boxStyle}
    >
        <Stack direction="row" spacing={1} sx={inputsStack}>
            <TextField
                id="hours"
                type="number"
                variant="filled"
                onChange={handleChange} 
                value={timer.hours}
                InputProps={{ inputProps: { min: 0 } }}
                disabled={start}
                sx={inputStyle}
            />
            <label for='hours'>hours</label>
            <TextField
                id="mins"
                type="number"
                variant="filled"
                onChange={handleChange} 
                value={timer.mins}
                InputProps={{ inputProps: { min: 0, max: 60 } }}
                disabled={start}
                sx={inputStyle}
            />
            <label for='mins'>mins</label>
            <TextField
                id="sec"
                type="number"
                variant="filled"
                onChange={handleChange} 
                value={timer.sec}
                InputProps={{ inputProps: { min: 0, max: 60 } }}
                disabled={start}
                sx={inputStyle}
            />
            <label for='sec'>sec</label>    
        </Stack>

        <Stack direction="row" spacing={1} sx={btnsStack}>
            <Button
                type="submit"
                variant="contained"
           
                value="Start"
                disabled={start}
               
            > Start </Button>

            <Button
                onClick={handlePause}
                variant="contained"
                disabled={!start}
            > {paused ? 'Resume' : 'Pause'} </Button>

            <Button
                size="small"
                onClick={handleReset}
                variant="contained"
                disabled={!start}
            > Restart </Button>
            
        </Stack>

        {finish && 
            <Alert severity="info" sx={{ width: 1 }}>
                Time is up!
            </Alert>
        }
    </Box>
    
  )
}

export default Timer;