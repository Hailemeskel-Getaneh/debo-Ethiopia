// For handling exceptions in one central place(Observer pattern)

export interface AppError {
  message: string;
  status?: number;
  code?: string;
  type: "error" | "warning" | "info";
}

type Subscriber = (error: AppError) => void;

class GlobalExceptionHandler {
  private static instance: GlobalExceptionHandler;
  private subscribers: Subscriber[] = [];

  private constructor() {}

  public static getInstance(): GlobalExceptionHandler {
    if (!this.instance) this.instance = new GlobalExceptionHandler();
    return this.instance;
  }

  public subscribe(callback: Subscriber) {
    this.subscribers.push(callback);
    return () => {
      this.subscribers = this.subscribers.filter((s) => s !== callback);
    };
  }

  public emit(error: AppError) {
    this.subscribers.forEach((cb) => cb(error));
  }
}

export const exceptionHandler = GlobalExceptionHandler.getInstance();
