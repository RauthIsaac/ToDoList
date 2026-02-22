export interface UserTodos {
  userEmail: string;
  password: string;
  todos: string[]; 
}

export const initialUsersData: UserTodos[] = [
  {
    userEmail: "user1@mail.com",
    password: "pass123",
    todos: [
      "Do something nice for someone you care about",
      "Go Shopping for groceries",
      "Finish React project"
    ]
  },
  {
    userEmail: "user2@mail.com",
    password: "pass123",
    todos: [
      "Memorize a poem",
      "Solve a Rubik's cube",
      "Read a new book"
    ]
  }
];