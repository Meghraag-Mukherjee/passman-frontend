import React, { useEffect, useState } from "react";

export function Manager2() {
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
      setError("Failed to fetch passwords. Is backend running?");
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
    <div className="p-6 max-w-xl mx-auto">
      <h2 className="text-3xl font-bold text-center mb-6">
        <span className="text-indigo-600">Pass</span><span className="text-emerald-500">Man</span>
      </h2>

      {error && <p className="text-red-500 mb-4 text-center">{error}</p>}

      <div className="space-y-4 mb-6">
        <input
          type="text"
          name="website"
          placeholder="Website URL"
          value={form.website}
          onChange={handleChange}
          className="w-full border px-4 py-2 rounded"
        />
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={form.username}
          onChange={handleChange}
          className="w-full border px-4 py-2 rounded"
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          className="w-full border px-4 py-2 rounded"
        />
        <button
          onClick={savePassword}
          className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
        >
          Save Password
        </button>
      </div>

      <h3 className="text-xl font-semibold mb-2">Saved Passwords</h3>
      <div className="space-y-2">
        {passwords.length === 0 ? (
          <p className="text-gray-500">No passwords saved.</p>
        ) : (
          passwords.map((cred) => (
            <div
              key={cred._id}
              className="border rounded p-3 bg-white flex flex-col sm:flex-row justify-between items-center"
            >
              <div>
                <p><strong>Website:</strong> {cred.website}</p>
                <p><strong>Username:</strong> {cred.username}</p>
                <p>
                  <strong>Password:</strong>{" "}
                  {visible[cred._id] ? cred.password : "*".repeat(cred.password.length)}
                </p>
              </div>
              <button
                onClick={() => toggleVisibility(cred._id)}
                className="mt-2 sm:mt-0 bg-gray-200 px-3 py-1 rounded hover:bg-gray-300"
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


