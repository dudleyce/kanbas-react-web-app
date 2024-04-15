import React, { useState, useEffect } from "react";
import { BsFillCheckCircleFill, BsPencil, BsTrash3Fill, BsPlusCircleFill } from "react-icons/bs";
import * as client from "./client";
import { User } from "./client";

export default function UserTable() {
  const [users, setUsers] = useState<User[]>([]);
  
  const [user, setUser] = useState<User>({
    _id: "", username: "", password: "", firstName: "",
    lastName: "", role: "USER"
  });

  const createUser = async () => {
    try {
      const newUser = await client.createUser(user);
      setUsers([newUser, ...users]);
    } catch (err) {
      console.log(err);
    }
  };


  const deleteUser = async (user: User) => {
    try {
      await client.deleteUser(user);
      setUsers(users.filter((u) => u._id !== user._id));
    } catch (err) {
      console.log(err);
    }
  };


  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const newUser = await client.createUser(user);
      setUsers([newUser, ...users]);
      // Reset form
      setUser({ _id: "", username: "", password: "", firstName: "", lastName: "", role: "USER" });
    } catch (err) {
      console.error(err);
    }
  };

  const selectUser = async (user: User) => {
    try {
      const u = await client.findUserById(user._id);
      setUser(u);
    } catch (err) {
      console.log(err);
    }
  };
  const updateUser = async () => {
    try {
      const status = await client.updateUser(user);
      setUsers(users.map((u) =>
        (u._id === user._id ? user : u)));
    } catch (err) {
      console.log(err);
    }
  };


  const fetchUsers = async () => {
    const fetchedUsers = await client.fetchAllUsers();
    setUsers(fetchedUsers);
  };

  useEffect(() => { fetchUsers(); }, []);

  const [role, setRole] = useState("USER");
  const fetchUsersByRole = async (role: string) => {
    const users = await client.findUsersByRole(role);
    setRole(role);
    setUsers(users);
  };


  return (
    <div>
      <select
        onChange={(e) => fetchUsersByRole(e.target.value)}
        value={role || "USER"}
        className="form-control w-25 float-end"
      >
        <option value="USER">User</option>
        <option value="ADMIN">Admin</option>
        <option value="FACULTY">Faculty</option>
        <option value="STUDENT">Student</option>
      </select>
      <h1>User Table</h1>
      <form onSubmit={handleSubmit}>
        <input name="username" value={user.username} onChange={handleChange} placeholder="Username" />
        <input name="password" value={user.password} onChange={handleChange} placeholder="Password" />
        <input name="firstName" value={user.firstName} onChange={handleChange} placeholder="First Name" />
        <input name="lastName" value={user.lastName} onChange={handleChange} placeholder="Last Name" />
        <select name="role" value={user.role} onChange={handleChange}>
          <option value="USER">User</option>
          <option value="ADMIN">Admin</option>
          <option value="FACULTY">Faculty</option>
          <option value="STUDENT">Student</option>
        </select>
        
        <td className="text-nowrap">
    <BsFillCheckCircleFill
      onClick={updateUser}
      className="me-2 text-success fs-1 text"
    />
    <BsPlusCircleFill
      onClick={createUser}
      className="text-success fs-1 text"
    />
  </td>
      </form>
      <table className="table">
        <thead>
          <tr>
            <th>Username</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Role</th>
            <th>&nbsp;</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id}>
              <td>{user.username}</td>
              <td>{user.firstName}</td>
              <td>{user.lastName}</td>
              <td>{user.role}</td>
              <td>
                <button onClick={() => deleteUser(user)}>
                  <BsTrash3Fill />
                </button>
                <button className="btn btn-warning me-2">
                <BsPencil onClick={() => selectUser(user)} />
            </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
