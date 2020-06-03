import React from 'react'
import { Container } from '@material-ui/core'
import { createStyles, makeStyles } from '@material-ui/core/styles';
import Download from './Download'
import '../style/global.css'

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      position: 'fixed',
      top: '40%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
    }
  }
  )
)

export default function Input() {
  const classes = useStyles()

  return (
    <Container className={classes.root} maxWidth="md">
      <Download />
    </Container>
  )
}