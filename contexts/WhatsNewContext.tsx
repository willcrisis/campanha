import Constants from 'expo-constants';
import * as Updates from 'expo-updates';
import { createContext, useCallback, useContext, useEffect, useState } from 'react';
import usePersistedState from '@/hooks/usePersistedState';

type WhatsNewContextType = {
  showDialog: boolean;
  dontShowUpdates: boolean;
  currentVersion: string;
  dismissDialog: () => void;
  toggleDontShowUpdates: () => void;
};

const WhatsNewContext = createContext<WhatsNewContextType>({
  showDialog: false,
  dontShowUpdates: false,
  currentVersion: '',
  dismissDialog: () => {},
  toggleDontShowUpdates: () => {},
});

const WhatsNewProvider = ({ children }: { children: React.ReactNode }) => {
  const [showDialog, setShowDialog] = useState(false);
  const [lastSeenAppVersion, setLastSeenAppVersion] = usePersistedState<string | null>('lastSeenAppVersion', null);
  const [lastSeenUpdateId, setLastSeenUpdateId] = usePersistedState<string | null>('lastSeenUpdateId', null);
  const [dontShowUpdates, setDontShowUpdates] = usePersistedState<boolean>('dontShowUpdates', false);

  const currentVersion = Constants.expoConfig?.version || '0.0.0';
  const currentUpdateId = Updates.updateId || null;

  const checkForVersionChange = useCallback(() => {
    // Don't show if user opted out
    if (dontShowUpdates) {
      return;
    }

    // First install - just save the version and don't show
    if (lastSeenAppVersion === null) {
      setLastSeenAppVersion(currentVersion);
      if (currentUpdateId) {
        setLastSeenUpdateId(currentUpdateId);
      }
      return;
    }

    // Check if app version changed (store update)
    const appVersionChanged = lastSeenAppVersion !== currentVersion;

    // Check if OTA update received
    const otaUpdateReceived = currentUpdateId && lastSeenUpdateId !== currentUpdateId;

    // Show dialog if either version changed
    if (appVersionChanged || otaUpdateReceived) {
      setShowDialog(true);
      // Update stored versions
      setLastSeenAppVersion(currentVersion);
      if (currentUpdateId) {
        setLastSeenUpdateId(currentUpdateId);
      }
    }
  }, [
    currentVersion,
    currentUpdateId,
    lastSeenAppVersion,
    lastSeenUpdateId,
    dontShowUpdates,
    setLastSeenAppVersion,
    setLastSeenUpdateId,
  ]);

  useEffect(() => {
    // Check for version changes when context mounts
    checkForVersionChange();
  }, [checkForVersionChange]);

  const dismissDialog = useCallback(() => {
    setShowDialog(false);
  }, []);

  const toggleDontShowUpdates = useCallback(() => {
    setDontShowUpdates(!dontShowUpdates);
  }, [dontShowUpdates, setDontShowUpdates]);

  return (
    <WhatsNewContext.Provider
      value={{
        showDialog,
        dontShowUpdates,
        currentVersion,
        dismissDialog,
        toggleDontShowUpdates,
      }}
    >
      {children}
    </WhatsNewContext.Provider>
  );
};

export const useWhatsNew = () => useContext(WhatsNewContext);

export default WhatsNewProvider;
