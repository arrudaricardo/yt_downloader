import React, { createElement, } from 'react'
import CssBaseline from '@material-ui/core/CssBaseline';
import Main from './Main'
import Close from './Close'

export default function App() {
  return (
    createElement('div', null,
      <CssBaseline>
        <Close/>
        <Main />
      </CssBaseline>
    )
  )
}