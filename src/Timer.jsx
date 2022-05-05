import { Alert, Box, Button,  Stack, TextField, } from '@mui/material';
import { useState, useEffect } from 'react'



const Timer = () => {
    const [timer, setTimer] = useState({
        hours:0, mins: 0,sec:0    });
    const [start, setStart] = useState(false);
    const [paused, setPaused] = useState(false);
    const [finish, setFinish] = useState(false);
    
    const handleOnChange = (key, newValue) => {
        setTimer(values => ({...values, [key]: newValue}))
    }

    const handleStart = (e) => {
        e.preventDefault();

        setPaused(false);
        setFinish(false);
        setStart(true);
    }
    const handlePause = () => {
        setPaused((prevState) => !prevState);
    }
    const handleReset = () => {
        setTimer({hours:0, mins: 0,sec:0 });;
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
        bgcolor:'#D9D7F1',
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
       }

      const btnsStack = {
       justifyContent:"end",
       width: '100%',
       p: 3,
        
      }

      const inputStyle = {
         width:100,
         input: {
             ml: 1,
             textAlign: "center",
             fontWeight: "bold",
             fontSize:30,
         }, 
      };
      

  return (
    <Box 
        component="form" 
        onSubmit={handleStart}
        sx={boxStyle}
    >
        <Stack direction="row" spacing={1} sx={inputsStack}>
            <TextField required 
                id='hours'
                type="number"
                variant="outlined"
                onChange={(e) => handleOnChange(e.target.id, e.target.value)}
                value={timer.hours}
                InputProps={{ inputProps: { min: 0 } }}
                disabled={start}
                sx={inputStyle}
            />
            <label htmlFor='hours'>H</label>
            <TextField required
                id="mins"
                type="number"
                variant="outlined"
                onChange={(e) => handleOnChange(e.target.id, e.target.value)}
                value={timer.mins}
                InputProps={{ inputProps: { min: 0, max: 60 } }}
                disabled={start}
                sx={inputStyle}
            />
            <label htmlFor='mins'>M</label>
            <TextField required
                id="sec"
                type="number"
                variant="outlined"
                onChange={(e) => handleOnChange(e.target.id, e.target.value)}
                value={timer.sec}
                InputProps={{ inputProps: { min: 0, max: 60 } }}
                disabled={start}
                sx={inputStyle}
            />
            <label htmlFor='sec'>S</label>    
        </Stack>

        <Stack direction="row" spacing={1} sx={btnsStack}>
            <Button
                type="submit"
                variant="outlined"
                value="Start"
                disabled={start}
            > Start </Button>

            <Button
                onClick={handlePause}
                variant="outlined"
                disabled={!start}
            > {paused ? 'Resume' : 'Pause'} </Button>

            <Button
                size="small"
                onClick={handleReset}
                variant="outlined"
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