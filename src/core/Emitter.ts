type ListenersType = { [event: string]: Array<(data?: string) => void> };

export class Emitter {
  listeners: ListenersType = {};

  emit = (event: string, data?: string) => {
    if (!Array.isArray(this.listeners[event])) return false;
    this.listeners[event].forEach((listener) => {
      listener(data);
    });

    return true;
  };

  subscribe = (event: string, handler: (data?: string) => void) => {
    this.listeners[event] = this.listeners[event] || [];
    this.listeners[event].push(handler);

    return () => {
      this.listeners[event] = this.listeners[event].filter(
        (listener) => listener !== handler
      );
    };
  };
}
