import React, { useEffect, useState } from "react";

export function Manager3() {
  const [form, setForm] = useState({ website: "", username: "", password: "" });
  const [passwords, setPasswords] = useState([]);
  const [visible, setVisible] = useState({});
  const [error, setError] = useState("");

  const fetchPasswords = async () => {
    try {
      const res = await fetch("http://localhost:3001");
      const data = await res.json();
      setPasswords(data);
    } catch (err) {
      setError("⚠️ Failed to fetch passwords. Is backend running?");
    }
  };

  useEffect(() => {
    fetchPasswords();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const savePassword = async () => {
    if (!form.website || !form.username || !form.password) return;

    try {
      await fetch("http://localhost:3001", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      setForm({ website: "", username: "", password: "" });
      fetchPasswords();
    } catch (err) {
      setError("Failed to save password.");
    }
  };

  const toggleVisibility = (id) => {
    setVisible((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center px-4 py-10">
      <div className="bg-white shadow-md rounded-lg p-6 sm:p-8 w-full max-w-md sm:max-w-lg md:max-w-xl">
        <h2 className="text-3xl font-bold text-center mb-6">
          <span className="text-indigo-600">Pass</span>
          <span className="text-emerald-500">Man</span>
        </h2>

        {error && <p className="text-red-500 text-center mb-4">{error}</p>}

        <div className="mb-4">
          <label className="block font-semibold mb-2" htmlFor="website">
            <span className="text-indigo-600">Website</span>{" "}
            <span className="text-emerald-500">URL</span>
          </label>
          <input
            type="text"
            id="website"
            name="website"
            placeholder="e.g. https://example.com"
            value={form.website}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />
        </div>

        <div className="flex flex-col sm:flex-row gap-4 mb-4">
          <div className="flex-1">
            <label className="block font-semibold mb-2" htmlFor="username">
              <span className="text-indigo-600">User</span>
              <span className="text-emerald-500">name</span>
            </label>
            <input
              type="text"
              id="username"
              name="username"
              placeholder="your_username"
              value={form.username}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
          </div>

          <div className="flex-1">
            <label className="block font-semibold mb-2" htmlFor="password">
              <span className="text-indigo-600">Pass</span>
              <span className="text-emerald-500">word</span>
            </label>
            <div className="relative">
              <input
                type="password"
                id="password"
                name="password"
                placeholder="********"
                value={form.password}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md px-3 py-2 pr-10 focus:outline-none focus:ring-2 focus:ring-indigo-400"
              />
            </div>
          </div>
        </div>

        <button
          onClick={savePassword}
          className="mt-4 w-full bg-indigo-500 text-white font-semibold py-2 px-4 rounded hover:bg-indigo-600 transition"
        >
          Save Password
        </button>
      </div>

      <div className="w-full max-w-md sm:max-w-lg md:max-w-xl mt-10">
        <h3 className="text-xl font-semibold mb-2">Saved Passwords</h3>
        {passwords.length === 0 ? (
          <p className="text-gray-500">No passwords saved.</p>
        ) : (
          passwords.map((cred) => (
            <div
              key={cred._id}
              className="bg-white border rounded-lg p-4 mb-4 shadow"
            >
              <p>
                <strong>Website:</strong> {cred.website}
              </p>
              <p>
                <strong>Username:</strong> {cred.username}
              </p>
              <p>
                <strong>Password:</strong>{" "}
                {visible[cred._id]
                  ? cred.password
                  : "*".repeat(cred.password.length)}
              </p>
              <button
                onClick={() => toggleVisibility(cred._id)}
                className="mt-2 bg-gray-200 px-3 py-1 rounded hover:bg-gray-300"
              >
                {visible[cred._id] ? "Hide" : "Show"}
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
