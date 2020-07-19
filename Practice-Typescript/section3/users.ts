interface User {
  id: number;
  created_at: string;
  profile: {
    name: {
      first: string;
      last: string;
    };
    age: number;
    gender: string;
    enabled: boolean;
  };
}

// UsersとUsersFromJsonは同じ定義
// Jsonから定義を読み込むことができる
type Users = User[];

import UsersJson from './users.json';
type UsersFromJson = typeof UsersJson;
