import { useState, useEffect } from 'react';
import Router from 'Router';

import { PetRegistrationProvider } from './contexts/PetRegistrationContext';
import MaintenancePage from 'view/MaintenancePage';

export const MAINTENANCE = {
  startTime: '2025-07-06 22:00',
  endTime: '2025-07-06 23:00',
};

function App() {
  const [isMaintenanceTime, setIsMaintenanceTime] = useState(false);

  useEffect(() => {
    const checkMaintenanceTime = () => {
      const now = new Date().getTime();
      const start = new Date(MAINTENANCE.startTime).getTime();
      const end = new Date(MAINTENANCE.endTime).getTime();

      setIsMaintenanceTime(now >= start && now <= end);
    };

    checkMaintenanceTime();
    const timer = setInterval(checkMaintenanceTime, 10000);

    return () => clearInterval(timer);
  }, []);

  return (
    <PetRegistrationProvider>
      {isMaintenanceTime ? <MaintenancePage /> : <Router />}
    </PetRegistrationProvider>
  );
}

export default App;
