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
            return () => clearInterval(timerCountDown);
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

   


  return (
    <main>
        <form onSubmit={handleStart}>
            <div className="inputs">

                <input type="number" id="hours" 
                    onChange={handleChange} 
                    value={timer.hours}
                    min={0}
                />
                <label for='hours'>hours</label>

                <input type="number" id="mins" 
                    onChange={handleChange} 
                    value={timer.mins}
                    min={0}
                    max={60}
                />
                <label for='mins'>mins</label>

                <input type="number" id="sec" 
                    onChange={handleChange} 
                    value={timer.sec}
                    min={0}
                    max={60}   
                />
                <label for='sec'>sec</label>    
            </div>
            <input type="submit" value="Start" disabled={start} />
        </form>
        {start && 
            <>
                <button onClick={handlePause}>
                    {paused ? 'Resume' : 'Pause'}
                </button>
                
                <button onClick={handleReset}>Restart</button>
            </>
        }
        {finish && 
        <div className='message'>Timer Done</div>}
    </main>
  )
}

export default Timer