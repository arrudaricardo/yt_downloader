//  * This file will automatically be loaded by webpack and run in the "renderer" context.
//  * To learn more about the differences between the "main" and the "renderer" context in
//  * Electron, visit:
//  *
//  * https://electronjs.org/docs/tutorial/application-architecture#main-and-renderer-processes

import App from './components/App'
import { render } from 'react-dom'


document.addEventListener('DOMContentLoaded', () => {
  render( App() ,document.getElementById('root'))
})
