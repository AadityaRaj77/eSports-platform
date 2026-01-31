import { useNavigate } from "react-router-dom";
import { removeToken } from "../auth/auth";
import type { JSX } from "react";

export default function Dashboard(): JSX.Element {
  const navigate = useNavigate();

  const logout = (): void => {
    removeToken();
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-white p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <button
          onClick={logout}
          className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded"
        >
          Logout
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-zinc-900 p-4 rounded">Teams</div>
        <div className="bg-zinc-900 p-4 rounded">Tournaments</div>
        <div className="bg-zinc-900 p-4 rounded">Friends</div>
      </div>
    </div>
  );
}
