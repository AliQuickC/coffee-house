import '../sass/index.sass';
import './burger-menu';

console.log(`
- The layout of the pages aligns the design at a screen width of 1440px: +14
- The layout of the pages aligns the design at a screen width of 768px: +14
- The layout of the pages aligns the design at a screen width of 380px: +14
- There is no horizontal scrollbar at all screen width up to 380px inclusive: +20
- During smooth resizing of the browser window from 1440px to 380px, the layout occupies the full width of the window (including specified margins): +8
- At screen widths of 768px and below, the menu and navigation buttons in the header are concealed on both pages, and a burger menu icon is displayed: +4
- Hover effects are active on desktop devices and are disabled for mobile devices on both pages: +4
- The layout for both pages is validated and error-free according to the W3C Validator (https://validator.w3.org/): +12

Total: 90
`);
