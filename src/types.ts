export type User = {
  username: string;
  password?: string;
};

type picture = { url?: string; name?: string; uid?: string };

export type Profile = { name: string; age?: number; email?: string; picture?: picture };
