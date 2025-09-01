
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import PatientDashboard from './components/PatientDashboard';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <PatientDashboard />
    </QueryClientProvider>
  );
}

export default App
