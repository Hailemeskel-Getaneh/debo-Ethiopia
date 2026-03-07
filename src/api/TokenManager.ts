// A single place for managing tokens

class TokenManager {
  private static readonly instance: TokenManager = new TokenManager();
  private readonly ACCESS_KEY = "access_token";

  private constructor() {}

  public static getInstance(): TokenManager {
    return TokenManager.instance;
  }

  public getToken(): string | null {
    return localStorage.getItem(this.ACCESS_KEY);
  }

  public setToken(token: string): void {
    localStorage.setItem(this.ACCESS_KEY, token);
  }

  public clearToken(): void {
    localStorage.removeItem(this.ACCESS_KEY);
  }

  public isAuthenticated(): boolean {
    return !!this.getToken();
  }
}

export const tokenManager = TokenManager.getInstance();
