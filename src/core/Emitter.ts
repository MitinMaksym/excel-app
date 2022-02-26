type ListenersType = {
  [event: string]: Array<(data: any) => void>;
};

export class Emitter {
  listeners: ListenersType = {};

  emit = <T>(event: string, data: T) => {
    if (!Array.isArray(this.listeners[event])) return false;
    this.listeners[event].forEach((listener) => {
      listener(data);
    });

    return true;
  };

  subscribe = <T>(event: string, handler: (data: T) => void) => {
    this.listeners[event] = this.listeners[event] || [];
    this.listeners[event].push(handler);

    return () => {
      this.listeners[event] = this.listeners[event].filter(
        (listener) => listener !== handler
      );
    };
  };
}
