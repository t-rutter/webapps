/*
Copyright 2021 Gravitational, Inc.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/

import { useRef, useState, useEffect } from 'react';
import useAttempt from 'shared/hooks/useAttemptNext';
import TdpClient from 'teleport/lib/tdp/client';
import useConnectionString from './useConnectionString';

export default function useDesktopSession() {
  const { attempt, setAttempt } = useAttempt('processing');
  const { addr, username } = useConnectionString();
  const tdpClientRef = useRef<TdpClient>();
  // Flag for alerting the DesktopSession component that the TdpClient is initialized.
  const [tdpClientInitialized, setTdpClientInitialized] = useState(false);

  useEffect(() => {
    // Create the TdpClient reference with the ws address and the username from the route url.
    tdpClientRef.current = new TdpClient(addr, username);

    // Alert the DesktopSession that the TdpClient is ready to connect.
    setTdpClientInitialized(true);
  }, []);

  return {
    attempt,
    setAttempt,
    tdpClientRef,
    tdpClientInitialized,
  };
}

export type State = ReturnType<typeof useDesktopSession>;
