import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { AxiosClient } from "@/middleware/api";
import { toast, ToastContainer } from "react-toastify";

const Profile = () => {
  const { getToken } = useAuth();
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const apiClient = new AxiosClient(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/user/update`,
    {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getToken()}`,
    }
  );

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const token = await getToken();
    const response = await apiClient.post("/login", {
      email: email,
      password: password,
      username: name,
      role: role,
    });
    if (response.status === 200) {
      toast("Profile updated successfully", {
        hideProgressBar: true,
        autoClose: 2000,
        type: "success",
      });
    } else {
      toast("Profile updated failed", {
        hideProgressBar: true,
        autoClose: 2000,
        type: "error",
      });
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">Profile</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block font-medium mb-1">
            Name
          </label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full border-gray-400 border-solid border-2 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
          />
        </div>
        <div>
          <label htmlFor="role" className="block font-medium mb-1">
            Role
          </label>
          <input
            id="role"
            type="text"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="w-full border-gray-400 border-solid border-2 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
          />
        </div>
        <div>
          <label htmlFor="email" className="block font-medium mb-1">
            Email
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border-gray-400 border-solid border-2 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
          />
        </div>
        <div>
          <label htmlFor="role" className="block font-medium mb-1">
            password
          </label>
          <input
            id="password"
            type="text"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border-gray-400 border-solid border-2 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
          />
        </div>
        <button
          type="submit"
          className="bg-purple-600 hover:bg-purple-700 text-white py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-opacity-50"
        >
          Save
        </button>
      </form>
      <ToastContainer />
    </div>
  );
};
export default Profile;
