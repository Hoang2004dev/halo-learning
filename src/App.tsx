// src/App.tsx
import { AuthProvider } from './hooks/AuthProvider';
import AppRoutes from './routes';

function App() {
  return (
    <AuthProvider>
      <AppRoutes />
    </AuthProvider>
  );
}

export default App;