export interface Handler {
    (now: number, realDelay?: number): void;
  }
  
  export interface HandlerSettings {
    /**
     * setTimeout functionl
     * we can pass `delay` in ms, for call `Handler` one
     * ofter call, handler will be removed
     */
    delay?: number;
    /**
     * setIterval function
     * we can pass `interval` in ms, for call Handler onemore
     *
     */
    interval?: number;
    /**
     * You can pass the date after which the `Handler` will be removed
     *
     * Working only for delay and interval model,
     */
    endDate?: Date | number;
    /**
     * We can pass date in future, for call `Handler`
     */
    date?: Date | number;
    /**
     * Only work for `date`
     * if `isCallInPast` true and `date <= now`, `Handler` will be called
     *
     * @default true
     */
    isCallInPast?: boolean;
  }
  
  export interface ReQuContext {
    registerHandler?: (handler: Handler, settings?: HandlerSettings) => void;
    removeHandler?: (Handler: Handler) => void;
  }