import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import api from '../services/api';
import socket from '../services/websocketService';

// Patient data type
export interface Patient {
  id: number;
  name: string;
  age: number;
  heartRate: number;
  oxygenSaturation: number;
  bloodPressure: string;
  temperature: number;
  lastUpdated: string;
}

// React Query hook to fetch patient data with WebSocket updates
export const usePatients = () => {
  const queryClient = useQueryClient();
  const [isConnected, setIsConnected] = useState(false);


  const query = useQuery({
    queryKey: ['patients'],
    queryFn: async (): Promise<Patient[]> => {
      const response = await api.get('');
      return response.data;
    },
    staleTime: 0,
    gcTime: 10 * 60 * 1000,
    refetchInterval: false, // Disable polling, use WebSocket instead
  });

  // WebSocket integration
  useEffect(() => {
    // Connection status
    const onConnect = () => {
      console.log('WebSocket connected');
      setIsConnected(true);
    };

    const onDisconnect = () => {
      console.log('WebSocket disconnected');
      setIsConnected(false);
    };

    socket.on('connect', onConnect);
    socket.on('disconnect', onDisconnect);
    socket.on('patients:update', (patients: Patient[]) => {
      queryClient.setQueryData(['patients'], patients);
    });

    // Set initial connection status
    setIsConnected(socket.connected);

    return () => {
      socket.off('connect', onConnect);
      socket.off('disconnect', onDisconnect);
      socket.off('patients:update');
    };
  }, [queryClient]);

  return { ...query, isConnected };
};
