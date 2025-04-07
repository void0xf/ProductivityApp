declare module "*/firebase/auth" {
  export function registerWithEmailAndPassword(
    email: string,
    password: string
  ): Promise<boolean>;
  export function loginUser(email: string, password: string): Promise<boolean>;
  export function logOutUser(): Promise<boolean>;
  export function signInWithGoogle(): Promise<boolean>;
  export function signInWithGithub(): Promise<boolean>;
}

declare module "*/utils/firebase/handleErrors" {
  export function errorCodeToMessage(errorCode: string): string;
}
