export interface SeedUser {
    email: string;
    password: string;
    username: string;
    isActive: boolean;
    roles?: string[]
  }
