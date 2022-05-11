import React from 'react';
import { createRoot } from 'react-dom/client';

const Button = React.lazy(() => import('remote/Button'))

const rootElement = document.getElementById('root');
const root = createRoot(rootElement)
const App = function() {
  return <>
    <div style={{ fontSize: '30px' ,width: '100%', display: 'flex', height: '300px', justifyContent: 'center', alignItems: 'center', backgroundColor: 'pink'}}>host: 你是哪来的Button</div>
    <Button description='你是我请来的救兵吗 ? '/>
  </>
}

root.render(<App />);
