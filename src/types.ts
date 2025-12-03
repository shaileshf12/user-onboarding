export type User = {
  username: string;
  password?: string;
};

type picture = { url?: string; name?: string; uid?: string };

export type Profile = { name: string; age?: number; email?: string; picture?: picture };

export type Payment = { cardNumber?: string; expiry?: string; cvv?: string };

export type OnboardingState = {
  currentStep: number;
  completed: boolean;
  profile: Profile;
  songs: string[];
  payment: Payment;
};

export type AuthState = {
  isLoggedIn: boolean;
  user?: User;
};