import React, { useEffect, useState } from 'react';
import { Router } from '@reach/router';
import { useAtom } from 'jotai';
import './custom.css';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';

import Home from 'views/home';
import Login from 'views/login';

import Channel from 'views/channel';
import ChannelPublic from 'views/channel-public';
import DirectMessage from 'views/direct-message';
import DirectMessagePublic from 'views/direct-message-public';
import Settings from 'views/settings';
import SettingsProfile from 'views/settings/profile';
import SettingsKeys from 'views/settings/keys';
import SettingsPassword from 'views/settings/password';
import SettingsRelays from 'views/settings/relays';
import SettingsPublicLinkPage from 'views/settings/public-link';
import { keysAtom } from 'atoms';
import Dashboard from 'views/dashboard';

import { RecoilRoot } from 'recoil';
import LockPage from 'views/lock';
import LoadingComponent from 'views/components/LoadingComponent';
import OtherPage from 'views/lock/OtherPage';
import Proposal from 'views/proposal';
function App() {
  const [keys] = useAtom(keysAtom);
  const [isLockInitialized, setIsLockInitialized] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    if (window.localStorage.getItem('auth') == 'true') {
      setIsAuthenticated(true);
    }
    if (window.localStorage.getItem('initLock')) {
      setIsLockInitialized(true);
    }
    setIsLoading(false);
  });
  return (
    <>
      <RecoilRoot>
        <ToastContainer position="bottom-right" />
        <>
          {isLoading ? (
            <LoadingComponent />
          ) : (
            <>
              <Router
                style={{
                  width: '100%',
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <LockPage path="/lock" />
                <Login path="/login" />
                {isLockInitialized && !isAuthenticated ? (
                  <>
                    <OtherPage path="*" />
                  </>
                ) : (
                  <>
                    <Home path="/" />
                    <Dashboard path="/home" />
                    <Proposal path="/proposal" />

                    <Channel path="/channel" />
                    {keys ? (
                      <Channel path="/channel/:channel" />
                    ) : (
                      <ChannelPublic path="/channel/:channel" />
                    )}
                        {/* to fix channel- dashboard  conflict , just  compire and check prev nostr  main repo channel component  */}
                    {keys ? (
                      <DirectMessage path="/dm/:npub" />
                    ) : (
                      <DirectMessagePublic path="/dm/:npub" />
                    )}
                    <Settings path="/settings" />
                    <SettingsProfile path="/settings/profile" />
                    <SettingsProfile path="/settings/profile" />
                    <SettingsKeys path="/settings/keys" />
                    <SettingsPassword path="/settings/password" />
                    <SettingsRelays path="/settings/relays" />
                    <SettingsPublicLinkPage path="/settings/public-link" />
                  </>
                )}
              </Router>
            </>
          )}
        </>
      </RecoilRoot>
    </>
  );
}

export default App;
