// src/pages/FakeLogin.jsx
import React from "react";
import { useNavigate } from "react-router-dom";

const samples = {
  exporter: { name: "Demo Exporter", email: "exporter@demo.com", role: "exporter" },
  qa: { name: "Demo QA", email: "qa@demo.com", role: "qa" },
  verifier: { name: "Demo Verifier", email: "verifier@demo.com", role: "verifier" },
};

export default function FakeLogin() {
  const nav = useNavigate();

  const login = (role) => {
    localStorage.setItem("user", JSON.stringify(samples[role]));
    // short redirect for convenience
    if (role === "exporter") nav("/exporter/dashboard");
    else if (role === "qa") nav("/qa/dashboard");
    else nav("/verify");
  };

  return (
    <div className="max-w-md mx-auto mt-16 p-6 bg-white rounded shadow text-center">
      <h2 className="text-xl font-semibold mb-4">Quick Role Login (Dev only)</h2>
      <p className="text-sm text-gray-600 mb-4">Use to test navbar, protected routes and role flows.</p>
      <div className="flex gap-3 justify-center">
        <button onClick={() => login("exporter")} className="px-4 py-2 bg-green-600 text-white rounded">Exporter</button>
        <button onClick={() => login("qa")} className="px-4 py-2 bg-indigo-600 text-white rounded">QA</button>
        <button onClick={() => login("verifier")} className="px-4 py-2 bg-emerald-800 text-white rounded">Verifier</button>
      </div>
      <p className="mt-4 text-xs text-gray-500">Remove this page in production.</p>
    </div>
  );
}
