import React from 'react';
import { RegulationHub } from './RegulationHub';

interface CaseSimulatorProps {
  initialTab?: 'cases' | 'articles' | 'procedures' | 'due_process';
}

export const CaseSimulator: React.FC<CaseSimulatorProps> = ({ initialTab = 'cases' }) => {
  return <RegulationHub initialTab={initialTab} />;
};
