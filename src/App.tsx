import { Dashboard } from './pages';
import './styles/global.scss';
import 'antd/dist/antd.css';

import { AppProvider } from '@/providers';
import { makeServer } from '@/services/mirage';

const isDev = process.env.NODE_ENV === 'development';

if (isDev) {
  makeServer();
}

function App() {
  return (
    <AppProvider>
      <Dashboard />
    </AppProvider>
  );
}

export default App;
