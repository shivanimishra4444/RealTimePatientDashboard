import React, { useState, useDeferredValue } from 'react';
import PatientList from './PatientList';
import PatientControls from './PatientControls';
import { usePatients } from '../hooks/usePatients';

type SortField = 'name' | 'age' | 'heartRate' | 'oxygenSaturation' | 'temperature' | 'lastUpdated';
type SortOrder = 'asc' | 'desc';

const PatientDashboard = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortField, setSortField] = useState<SortField>('name');
  const [sortOrder, setSortOrder] = useState<SortOrder>('asc');
  const deferredSearchQuery = useDeferredValue(searchQuery);
  const { data: patients, isLoading, error, isConnected } = usePatients();

  // Filter and sort patients
  const filteredAndSortedPatients = patients
    ?.filter(patient =>
      patient.name.toLowerCase().includes(deferredSearchQuery.toLowerCase()) ||
      patient.id.toString().includes(deferredSearchQuery)
    )
    .sort((a, b) => {
      let aValue: string | number;
      let bValue: string | number;

      switch (sortField) {
        case 'name':
          aValue = a.name.toLowerCase();
          bValue = b.name.toLowerCase();
          break;
        case 'age':
          aValue = a.age;
          bValue = b.age;
          break;
        case 'heartRate':
          aValue = a.heartRate;
          bValue = b.heartRate;
          break;
        case 'oxygenSaturation':
          aValue = a.oxygenSaturation;
          bValue = b.oxygenSaturation;
          break;
        case 'temperature':
          aValue = a.temperature;
          bValue = b.temperature;
          break;
        case 'lastUpdated':
          aValue = new Date(a.lastUpdated).getTime();
          bValue = new Date(b.lastUpdated).getTime();
          break;
        default:
          aValue = a.name.toLowerCase();
          bValue = b.name.toLowerCase();
      }

      if (sortOrder === 'asc') {
        return aValue < bValue ? -1 : aValue > bValue ? 1 : 0;
      } else {
        return aValue > bValue ? -1 : aValue < bValue ? 1 : 0;
      }
    }) || [];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="py-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">
          Patient Dashboard
        </h1>
        
        <PatientControls
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          sortField={sortField}
          onSortFieldChange={(field) => setSortField(field as SortField)}
          sortOrder={sortOrder}
          onSortOrderChange={setSortOrder}
        />

        <PatientList 
          patients={filteredAndSortedPatients} 
          isLoading={isLoading} 
          error={error?.message || null} 
        />
      </div>
    </div>
  );
};

export default PatientDashboard;
