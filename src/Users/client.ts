import axios from "axios";
export const BASE_API = process.env.REACT_APP_API_BASE;
export const USERS_API = `${BASE_API}/api/users`;
export const api = axios.create({
    withCredentials: true
});
const axiosWithCredentials = axios.create({
  withCredentials: true,
});

export interface User {
  _id: string; username: string; password: string; role: string;
  firstName: string, lastName: string
};
  

export const fetchAllUsers = async () => {
  const response = await axiosWithCredentials.get(`${USERS_API}`);
  return response.data;
};

export const findUserById = async (id: string) => {
  const response = await axiosWithCredentials.get(`${USERS_API}/${id}`);  // Use backticks and correct variable
  return response.data;
};

export const findUsersByRole = async (role: string) => {
  const response = await axiosWithCredentials.get(`${USERS_API}?role=${role}`);  // Use axiosWithCredentials and template string
  return response.data;
};

export const registerUser = async (user: any) => {
  const response = await axiosWithCredentials.post(`${USERS_API}/register`, user);
  return response.data;
};

export const signin = async (credentials: User) => {
  try {
    const response = await axiosWithCredentials.post(`${USERS_API}/signin`, credentials);
    return response.data;
  } catch (error) {
    console.error('Signin error:', error);
    throw error;  // Throwing the error to handle it appropriately in the component if needed
  }
};



export const profile = async () => {
  const response = await axiosWithCredentials.post(`${USERS_API}/profile`);
  return response.data;
};

export const loginUser = async (user: any) => {
  const response = await axiosWithCredentials.post(`${USERS_API}/login`, user);
  return response.data;
};

export const logoutUser = async () => {
  const response = await axiosWithCredentials.post(`${USERS_API}/logout`);
  return response.data;
};

export const deleteUser = async (user: any) => {
  const response = await axiosWithCredentials.delete(
    `${USERS_API}/${user._id}`);
  return response.data;
};


export const updateUser = async (user: any) => {
  if (!user._id) {
    console.error('Error: Attempting to update a user without a valid ID');
    return;
  }
  const response = await axiosWithCredentials.put(
    `${USERS_API}/${user._id}`,
    user
  );
  return response.data;
};

export const createUser = async (user: any) => {
  console.log("Sending data to create user:", user);

  const response = await axiosWithCredentials.post(
    `${USERS_API}`,
    user
  );
  return response.data;
};

export const signup = async (user: any) => {
  const response = await axios.post(`${USERS_API}/signup`, user);
  return response.data;
};

export const signout = async () => {
  const response = await axios.post(`${USERS_API}/signout`);
  return response.data;
};
