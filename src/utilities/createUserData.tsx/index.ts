import { User } from "@prisma/client";
interface UpdateData {
  email?: User["email"];
  username?: User["username"];
  password?: User["password"];
  role?: User["role"];
}

export const createUserData = (data: UpdateData) => {
  const userData: UpdateData = {};
  if (data.email) {
    userData.email = data.email;
  }
  if (data.username) {
    userData.username = data.username;
  }
  if (data.password) {
    userData.password = data.password;
  }
  if (data.role) {
    userData.role = data.role;
  }
  return userData;
};
