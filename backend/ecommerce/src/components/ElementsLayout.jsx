import { Elements } from '@stripe/react-stripe-js';
import { Outlet } from 'react-router-dom';
Elements
const ElementsLayout = ({ stripe }) => (
  <Elements stripe={stripe}>
    <Outlet />
  </Elements>
);

export default ElementsLayout;