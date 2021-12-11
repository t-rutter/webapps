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
import { EventEmitter } from 'events';
import Codec, {
  MessageType,
  MouseButton,
  ButtonState,
  ScrollAxis,
} from './codec';
import Logger from 'shared/libs/logger';

// Client is the TDP client. It is responsible for connecting to a websocket serving the tdp server,
// sending client commands, and recieving and processing server messages.
export default class Client extends EventEmitter {
  codec: Codec;
  socket: WebSocket;
  socketAddr: string;
  username: string;
  logger = Logger.create('TDPClient');
  private connected = false;
  private disconnected = false;

  // Set record to true and each websocket message will be stored in recordArray,
  // which will be printed to the console on disconnect (used for dev/testing purposes only).
  saveMessages = true;
  messages: ArrayBuffer[] = [];

  constructor(socketAddr: string, username: string) {
    super();
    this.socketAddr = socketAddr;
    this.codec = new Codec();
    this.username = username;
  }

  // Connect to the websocket and register websocket event handlers.
  init() {
    this.socket = new WebSocket(this.socketAddr);
    this.socket.binaryType = 'arraybuffer';

    this.socket.onopen = () => {
      this.logger.info('websocket is open');
      this.emit('init');
    };

    this.socket.onmessage = !this.saveMessages
      ? (ev: MessageEvent<ArrayBuffer>) => {
          this.processMessage(ev.data);
        }
      : (ev: MessageEvent<ArrayBuffer>) => {
          this.messages.push(ev.data);
          this.processMessage(ev.data);
        };

    // The 'error' event will only ever be emitted by the socket
    // prior to a 'close' event (https://stackoverflow.com/a/40084550/6277051).
    // Therefore, we can rely on our onclose handler to account for any websocket errors.
    this.socket.onerror = null;
    this.socket.onclose = () => {
      this.logger.info('websocket is closed');

      // Clean up all of our socket's listeners and the socket itself.
      this.socket.onopen = null;
      this.socket.onmessage = null;
      this.socket.onclose = null;
      this.socket = null;

      if (this.disconnected) {
        this.emit('disconnect');
      } else {
        this.handleError(new Error('websocket connection failed'));
      }
    };
  }

  processMessage(buffer: ArrayBuffer) {
    const messageType = this.codec.decodeMessageType(buffer);
    try {
      if (messageType === MessageType.PNG_FRAME) {
        if (!this.connected) {
          // The first png frame signals a successful connection.
          this.connected = true;
          this.emit('connect');
        }
        this.processFrame(buffer);
      } else {
        this.handleError(
          new Error(`recieved unsupported message type ${messageType}`)
        );
      }
    } catch (err) {
      this.handleError(err);
    }
  }

  // Assuming we have a message of type PNG_FRAME, extract its
  // bounds and png bitmap and emit a render event.
  processFrame(buffer: ArrayBuffer) {
    const { left, top } = this.codec.decodeRegion(buffer);
    const image = new Image();
    image.onload = () => this.emit('render', { image, left, top });
    image.src = this.codec.decodePng(buffer);
  }

  sendUsername(username: string) {
    this.socket?.send(this.codec.encodeUsername(username));
  }

  sendMouseMove(x: number, y: number) {
    this.socket.send(this.codec.encodeMouseMove(x, y));
  }

  sendMouseButton(button: MouseButton, state: ButtonState) {
    this.socket.send(this.codec.encodeMouseButton(button, state));
  }

  sendMouseWheelScroll(axis: ScrollAxis, delta: number) {
    this.socket.send(this.codec.encodeMouseWheelScroll(axis, delta));
  }

  sendKeyboardInput(code: string, state: ButtonState) {
    // Only send message if key is recognized, otherwise do nothing.
    const msg = this.codec.encodeKeyboardInput(code, state);
    if (msg) this.socket.send(msg);
  }

  resize(w: number, h: number) {
    this.socket?.send(this.codec.encodeScreenSpec(w, h));
  }

  // Called to cleanup websocket when the connection is intentionally
  // closed by the end user (customer). Causes 'disconnect' event to be emitted
  disconnect() {
    this.disconnected = true;
    this.socket?.close();

    // Convert all the saved ArrayBuffer messages to Uint8Array's so that their values will be logged
    // (because logging and then copying an ArrayBuffer just results in "{}").
    if (this.saveMessages) {
      const uint8arrays: Uint8Array[] = [];
      this.messages.forEach(arraybuffer => {
        uint8arrays.push(new Uint8Array(arraybuffer));
      });
      // eslint-disable-next-line no-console
      console.log(uint8arrays);
    }
  }

  // Ensures full cleanup of this object.
  // Note that it removes all listeners first and then cleans up the socket,
  // so don't call this if your calling object is relying on listeners.
  nuke() {
    this.removeAllListeners();
    this.socket?.close();
  }

  handleError(err: Error) {
    this.emit('error', err);
    this.logger.error(err);
  }
}

export type ImageData = {
  image: HTMLImageElement;
  left: number;
  top: number;
};
