// Copyright 2021 Gravitational, Inc.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

import Client, { TdpClientEvent } from './client';

enum Action {
  TOGGLE_PLAY_PAUSE = 'play/pause',
  // TODO: MOVE = 'move'
}

export enum PlayerClientEvent {
  TOGGLE_PLAY_PAUSE = 'play/pause',
}

export class PlayerClient extends Client {
  constructor(socketAddr: string) {
    super(socketAddr);
  }

  // togglePlayPause toggles the playback system between "playing" and "paused" states.
  togglePlayPause() {
    this.socket?.send(JSON.stringify({ action: Action.TOGGLE_PLAY_PAUSE }));
    this.emit(PlayerClientEvent.TOGGLE_PLAY_PAUSE);
  }

  handleClientScreenSpec(buffer: ArrayBuffer) {
    this.emit(
      TdpClientEvent.TDP_CLIENT_SCREEN_SPEC,
      this.codec.decodeClientScreenSpec(buffer)
    );
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  handleMouseButton(buffer: ArrayBuffer) {
    this.logger.warn('TODO: handleMouseButton');
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  handleMouseMove(buffer: ArrayBuffer) {
    this.logger.warn('TODO: handleMouseMove');
  }
}
