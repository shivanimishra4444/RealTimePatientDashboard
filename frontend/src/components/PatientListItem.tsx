import React from 'react';
import Card from './Card';
import { useValueHighlight } from '../hooks/useValueHighlight';

interface PatientListItemProps {
  patient: {
    id: number;
    name: string;
    age: number;
    heartRate: number;
    oxygenSaturation: number;
    bloodPressure: string;
    temperature: number;
    lastUpdated: string;
  };
}

const PatientListItem = ({ patient }: PatientListItemProps) => {
  const { id, name, age, heartRate, oxygenSaturation, bloodPressure, temperature, lastUpdated } = patient;
  
  // Track which values are changing
  const isHeartRateHighlighted = useValueHighlight(heartRate);
  const isOxygenHighlighted = useValueHighlight(oxygenSaturation);
  const isTemperatureHighlighted = useValueHighlight(temperature);
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString();
  };

  const getVitalStatus = (value: number, type: 'heartRate' | 'oxygen' | 'temperature') => {
    switch (type) {
      case 'heartRate':
        return value < 60 || value > 100 ? 'critical' : value < 70 || value > 90 ? 'warning' : 'normal';
      case 'oxygen':
        return value < 95 ? 'critical' : value < 98 ? 'warning' : 'normal';
      case 'temperature':
        return value < 36 || value > 37.5 ? 'critical' : value < 36.5 || value > 37 ? 'warning' : 'normal';
      default:
        return 'normal';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'critical':
        return 'text-red-600 bg-red-100';
      case 'warning':
        return 'text-yellow-600 bg-yellow-100';
      case 'normal':
        return 'text-green-600 bg-green-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  const getHighlightStyle = (isHighlighted: boolean) => {
    return isHighlighted 
      ? 'animate-pulse bg-blue-200 border-2 border-blue-400 shadow-lg transform scale-105' 
      : '';
  };

  return (
    <Card>
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-xl font-semibold text-gray-800">{name}</h3>
          <p className="text-gray-600">ID: {id} | Age: {age}</p>
        </div>
        <div className="text-right">
          <p className="text-sm text-gray-500">Last Updated</p>
          <p className="text-xs text-gray-400">{formatDate(lastUpdated)}</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium text-gray-700">Heart Rate</span>
            <span className={`px-2 py-1 rounded-full text-xs font-medium transition-all duration-300 ${getStatusColor(getVitalStatus(heartRate, 'heartRate'))} ${getHighlightStyle(isHeartRateHighlighted)}`}>
              {heartRate} bpm
            </span>
          </div>
          
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium text-gray-700">Oxygen Saturation</span>
            <span className={`px-2 py-1 rounded-full text-xs font-medium transition-all duration-300 ${getStatusColor(getVitalStatus(oxygenSaturation, 'oxygen'))} ${getHighlightStyle(isOxygenHighlighted)}`}>
              {oxygenSaturation}%
            </span>
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium text-gray-700">Blood Pressure</span>
            <span className="text-sm text-gray-600">{bloodPressure}</span>
          </div>
          
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium text-gray-700">Temperature</span>
            <span className={`px-2 py-1 rounded-full text-xs font-medium transition-all duration-300 ${getStatusColor(getVitalStatus(temperature, 'temperature'))} ${getHighlightStyle(isTemperatureHighlighted)}`}>
              {temperature}°C
            </span>
          </div>
        </div>
      </div>

      <div className="mt-6 pt-4 border-t border-gray-100">
        <button className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-3 px-4 rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-200 text-sm font-semibold shadow-md hover:shadow-lg">
          View Details
        </button>
      </div>
    </Card>
  );
};

export default PatientListItem;
