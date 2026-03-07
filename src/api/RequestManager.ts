// Request mediator

type State = "OPEN" | "CLOSED" | "HALF_OPEN";

type RequestSubscriber = (token: string) => void;

class RequestManager {
  private static instance: RequestManager;
  private state: State = "CLOSED";
  private isRefreshing = false;
  private subscribers: RequestSubscriber[] = [];
  private lastErrorTime: number = 0;
  private readonly coolDown: number = 5000; // 5 seconds

  private constructor() {}

  public static getInstance(): RequestManager {
    if (!this.instance) this.instance = new RequestManager();
    return this.instance;
  }

  // Circuit Breaker Check
  public canRequest(): boolean {
    if (this.state === "OPEN") {
      if (Date.now() - this.lastErrorTime > this.coolDown) {
        this.state = "HALF_OPEN";
        return true;
      }
      return false;
    }
    return true;
  }

  public tripBreaker() {
    this.state = "OPEN";
    this.lastErrorTime = Date.now();
  }

  // Concurrent Refresh Management
  public async handleRefresh(
    refreshFn: () => Promise<string>,
  ): Promise<string> {
    if (this.isRefreshing) {
      return new Promise((resolve) => this.subscribers.push(resolve));
    }

    this.isRefreshing = true;
    try {
      const token = await refreshFn();
      this.state = "CLOSED"; // Reset breaker on success
      this.subscribers.forEach((sub) => sub(token));
      this.subscribers = [];
      return token;
    } finally {
      this.isRefreshing = false;
    }
  }
}

export const requestManager = RequestManager.getInstance();
