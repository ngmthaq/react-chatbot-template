export class EventBus {
  private events: Map<string, Set<CallableFunction>>;

  public constructor() {
    this.events = new Map();
  }

  public on(event: string, listener: CallableFunction) {
    if (!this.events.has(event)) this.events.set(event, new Set());
    this.events.get(event)?.add(listener);
    return () => this.off(event, listener);
  }

  public off(event: string, listener: CallableFunction) {
    this.events.get(event)?.delete(listener);
  }

  public emit(event: string, ...args: unknown[]) {
    this.events.get(event)?.forEach((listener) => {
      listener(...args);
    });
  }
}

export const eventBus = new EventBus();
