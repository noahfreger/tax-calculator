import { createRoot } from 'react-dom/client';
import { TaxCalculator } from './components/TaxCalculator.tsx';

//Commented for development purposes (double rerendering was not needed)

// createRoot(document.getElementById("root")!).render(
//   <StrictMode>
//     <TaxCalculator />
//   </StrictMode>
// );

createRoot(document.getElementById('root')!).render(<TaxCalculator />);
