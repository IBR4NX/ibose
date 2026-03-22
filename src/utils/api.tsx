import * as React from 'react'
type Status = "loading" | "success" | "error";

const messages: Record<Status, string> = {
  loading: "Please wait...",
  success: "Done!",
  error: "Failed"
};
const getMessage = (status: Status) => messages[status];


function getMessageFunction(status: Status) {
  switch (status) {
    case "loading": return "Loading...";
    case "success": return "Done";
    case "error": return "Failed";
  }
}

type User = {
  name: string;
  age: number;
};

// This is a TYPE (disappears at runtime)
type UserKeys = keyof User; 

// This is an OBJECT (exists at runtime)
const sampleUser: User = { name: "Alice", age: 30 };

// Correct way to log keys at runtime:
console.log(Object.keys(sampleUser)); 

const labels: Record<UserKeys, string> = {
  name: "User Name",
  age: "User Age"
};
type prp = React.ComponentProps<"div">& {
	className?:string;
	setState: React.Dispatch<React.SetStateAction<boolean>>;
}