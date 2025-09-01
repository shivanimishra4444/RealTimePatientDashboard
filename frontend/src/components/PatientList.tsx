import React from 'react';
import PatientListItem from './PatientListItem';

interface Patient {
  id: number;
  name: string;
  age: number;
  heartRate: number;
  oxygenSaturation: number;
  bloodPressure: string;
  temperature: number;
  lastUpdated: string;
}

interface PatientListProps {
  patients: Patient[];
  isLoading?: boolean;
  error?: string | null;
}

const PatientList = ({ patients, isLoading, error }: PatientListProps) => {
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-gray-600">Loading patients...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-red-600">Error: {error}</div>
      </div>
    );
  }

  if (!patients || patients.length === 0) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-gray-600">No patients found</div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 p-8 max-w-7xl mx-auto">
      {patients.map((patient) => (
        <PatientListItem
          key={patient.id}
          patient={patient}
        />
      ))}
    </div>
  );
};

export default PatientList;
