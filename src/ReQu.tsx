import * as React from "react";
import { HandlerSettings, ReQuContext, Handler } from "./types";



const defaultHandlerSettings: HandlerSettings = {
  isCallInPast: true
};

const { Provider, Consumer } = React.createContext<ReQuContext>({});

export {Consumer}

export class ReQuProvider extends React.Component<{
  children: React.ReactNode;
}> {

  handlers: {
    handler: Handler;
    settings: HandlerSettings;
    lastNow: number;
  }[] = [];
  animationId?: number;

  componentWillUnmount() {
    this.clearLoop();
    this.handlers = [];
  }

  clearLoop() {
    cancelAnimationFrame(this.animationId);
    delete this.animationId;
  }
  startLoop() {
    this.clearLoop();
    window.requestAnimationFrame(this.loop);
  }
  /**
   * @property handler - Handler need be pass by link, we can't not pass new function
   */
  registerHandler = (
    handler: Handler,
    settings: HandlerSettings = defaultHandlerSettings
  ) => {
    if (!this.handlers.find(item => item.handler === handler)) {
      const now = +new Date();
      if (settings.date && now >= settings.date && settings.isCallInPast) {
        handler(now, now - +settings.date);
      }
      if (!settings.date || (settings.date && now >= settings.date)) {
        this.handlers.push({
          handler: handler,
          settings,
          lastNow: +new Date()
        });
      }
    }
    if (this.handlers.length === 1) {
      this.startLoop();
    }
  };
  removeHandler = (handler: Handler) => {
    this.handlers = this.handlers.filter(item => item.handler !== handler);

    if (this.handlers.length === 0) {
      this.clearLoop();
    }
  };

  loop = (now: number) => {
    for (const item of this.handlers) {
      if (item.settings.date) {
        if (now >= item.settings.date) {
          item.handler(now);
          this.removeHandler(item.handler);
        }
      } else if (item.settings.delay) {
        if (now - item.lastNow >= item.settings.delay) {
          item.handler(now, now - item.lastNow);
          this.removeHandler(item.handler);
        }
      } else if (item.settings.interval) {
        if (now - item.lastNow >= item.settings.delay) {
          item.lastNow = now;
          item.handler(now, now - item.lastNow);
        }
      }
      if (item.settings.endDate >= now) {
        this.removeHandler(item.handler);
      }
    }
  };

  render() {
    return (
      <Provider
        value={{
          registerHandler: this.registerHandler,
          removeHandler: this.removeHandler
        }}
      >
        {this.props.children}
      </Provider>
    );
  }
}
