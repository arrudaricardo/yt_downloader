import React from 'react'
const remote = require('electron').remote;
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  root:{
    position: "absolute",
    top: 5,
    right: 5,
  },
  btn: {
    filter: 'opacity(25%)',
    '&:hover': {
      filter: 'opacity(90%)',
    },
  }
});
export default function Close() {
  const classes = useStyles()

  const handleClose = () => {
    let window = remote.getCurrentWindow();
    window.close()
  }
  const handleMinimize = () => {
    let window = remote.getCurrentWindow();
    window.minimize()
    return 
  }

  return (
    <div className={classes.root}>
      <svg onClick={handleMinimize} className={classes.btn}
      xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M19 13H5v-2h14v2z" /></svg>
      <svg onClick={handleClose} className={classes.btn}
        xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
        <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" /></svg>
    </div>
  )
}