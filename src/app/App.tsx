import { RouterProvider } from 'react-router';
import { router } from './routes';
import { PreloaderProvider } from './context/PreloaderContext';
import { AppProvider } from './context/AppContext';

export default function App() {
  return (
    <AppProvider>
      <PreloaderProvider>
        <RouterProvider router={router} />
      </PreloaderProvider>
    </AppProvider>
  );
}
