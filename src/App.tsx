import Router from 'Router';

import { PetRegistrationProvider } from './contexts/PetRegistrationContext';
import { useMaintenance } from './hooks/useMaintenance';
import { useTDSUserAgent } from './hooks/useTDSUserAgent';
import MaintenancePage from 'view/MaintenancePage';
import { TDSMobileProvider } from '@toss/tds-mobile';

function App() {
  const isMaintenanceTime = useMaintenance();
  const userAgent = useTDSUserAgent();

  return (
    <>
      {isMaintenanceTime ? (
        <MaintenancePage />
      ) : (
        <TDSMobileProvider userAgent={userAgent}>
          <PetRegistrationProvider>
            <Router />
          </PetRegistrationProvider>
        </TDSMobileProvider>
      )}
    </>
  );
}

export default App;
