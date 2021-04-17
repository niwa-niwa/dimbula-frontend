import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import { useSelector } from 'react-redux';


const useStyles = makeStyles((theme) => ({
  root: {
    position:"fixed",
    display: 'flex',
    zIndex:9999,
    height:"100vh",
    width:"100vw",
    top:0,
    left:0,
    justifyContent:"center",
    alignItems:"center",
    flexFlow:"column",
    backgroundColor:"#0000004a",
  },
  circleInBox: {
    height:"240px",
    width:"240px",
    display: 'flex',
    justifyContent:"center",
    alignItems:"center",
    flexFlow:"column",
    backgroundColor:"#ffffffe0",
    borderRadius:"12px",
  },
  message:{
    fontSize:"1.25rem",
    fontWeight:"bold",
    marginBottom:"34px",
  }
  
}));

export default function ProgressCircle() {
  const classes = useStyles();
  const isOpen = useSelector((state)=>(state.progressCircle.isOpen));


  const render = ()=>{
    if(isOpen){
      return(
        <div className={classes.root}>
          <div className={classes.circleInBox}>
            <p className={classes.message}>Loading...</p>
            <CircularProgress />
          </div>
        </div>
      )
    }
    return isOpen
  };

  return (
    <React.Fragment>
      {render()}
    </React.Fragment>
  );
}
