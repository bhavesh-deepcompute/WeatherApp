import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import './Styles/style.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { createMuiTheme, ThemeProvider } from '@material-ui/core';


const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#00CECB",
      dark: "#00CEFB",
      contrastText: "#FFFFFF",
    }
  }
});


ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
