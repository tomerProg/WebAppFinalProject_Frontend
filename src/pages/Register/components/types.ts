export interface RegisterInput {
    userName: string;
    email: string;
    password: string;
    confirmPassword: string;
  }
  
export type RegisterError = Partial<RegisterInput>
