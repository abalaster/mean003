import numeral from 'numeral';
import './index.css';

const courseValue = numeral(1000).format('$0,0.00');
// debugger; // adding a breakpoint.
console.log(`I would pay ${courseValue} for this awesome course!`); // eslint-disable-line no-console
// backticks tell JS to parse any variable placeholders it finds inside.
