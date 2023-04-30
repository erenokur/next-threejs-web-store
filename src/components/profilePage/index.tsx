import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { AxiosClient } from "@/middleware/api";
import { toast, ToastContainer } from "react-toastify";
import { useTranslation } from "next-i18next";

const Profile = () => {
  const { getToken } = useAuth();
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { t, i18n } = useTranslation("translation", { useSuspense: false });
  const apiClient = new AxiosClient(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/user/`,
    {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getToken()}`,
    }
  );
  useEffect(() => {
    console.log("get request" + getToken());
    if (getToken()) {
      apiClient
        .get("/get")
        .then((response) => {
          console.log(response.data);
          setName(response.data.username);
          setRole(response.data.role);
          setEmail(response.data.email);
          setPassword(response.data.password);
        })
        .catch((error) => {});
    }
  }, []);
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!getToken() || !email || !password || !name || !role) {
      const response = await apiClient.put("/update", {
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
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">Profile</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block font-medium mb-1">
            {t("username")}
          </label>
          <input
            id="name"
            type="text"
            value={name}
            placeholder={t("enterUsername") || "Enter username"}
            onChange={(e) => setName(e.target.value)}
            className="w-full border-gray-400 text-gray-700 border-solid border-2 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
          />
        </div>
        <div>
          <label htmlFor="email" className="block font-medium mb-1">
            {t("email")}
          </label>
          <input
            id="email"
            type="email"
            value={email}
            placeholder={t("enterEmail") || "Enter Email"}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border-gray-400 text-gray-700 border-solid border-2 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
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
            placeholder={t("enterPassword") || "Enter Password"}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border-gray-400 text-gray-700 border-solid border-2 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
          />
        </div>
        {role === "admin" ? null : (
          <div className="mb-6">
            <label className="block font-medium mb-1" htmlFor="user-type">
              {t("userType")}
            </label>
            <select
              id="user-type"
              name="user-type"
              className="form-select appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              required
            >
              <option value="">{t("selectUserType")}</option>
              <option value="buyer">{t("buyer")}</option>
              <option value="seller">{t("seller")}</option>
            </select>
          </div>
        )}

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
