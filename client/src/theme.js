import { createMuiTheme } from '@material-ui/core/styles';
import blue from '@material-ui/core/colors/blue';
import blueGrey from '@material-ui/core/colors/blueGrey';
import red from '@material-ui/core/colors/red';

const theme = createMuiTheme({
    direction: 'rtl',
    palette: {
        primary: blue,
        secondary: blueGrey,
        error: red
      }
  });

  export default theme;