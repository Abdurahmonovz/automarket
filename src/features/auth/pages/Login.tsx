"use client";
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import useLogin from "../hooks/useLogin";
import { privateRoutes } from "../../../utils/navigate";
import { useSession } from "../../../context/SessionContext";

const normalizePhone = (value: string) => {
  const cleaned = value.replace(/\s+/g, "").trim();
  if (!cleaned) return cleaned;
  if (cleaned.startsWith("+")) return cleaned;
  if (cleaned.startsWith("998")) return `+${cleaned}`;
  return cleaned;
};

export default function Login() {
  const { login, isPending } = useLogin();
  const navigate = useNavigate();
  const { setIsAuth } = useSession();

  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");
    const normalizedPhone = normalizePhone(phone);

    login(
      { phone: normalizedPhone, password: password.trim() },
      {
        onSuccess: (data) => {
          const token = data?.token ?? data?.accessToken ?? data?.data?.token;
          const role = String(
            data?.role ?? data?.user?.role ?? data?.data?.role ?? "",
          ).trim();

          if (!token) {
            setErrorMessage("Server token qaytarmadi.");
            return;
          }

          localStorage.setItem("autocrmtoken", token);
          setIsAuth(true);

          const firstAllowedRoute = privateRoutes.find((route) =>
            route.roles.some(
              (allowedRole) =>
                allowedRole.toLowerCase() === role.toLowerCase(),
            ),
          );

          navigate(firstAllowedRoute?.path ?? "/", { replace: true });
        },
        onError: (error: unknown) => {
          if (axios.isAxiosError(error)) {
            const payload = error.response?.data;
            if (typeof payload === "string" && payload.trim()) {
              setErrorMessage(payload);
              return;
            }

            if (
              payload &&
              typeof payload === "object" &&
              "message" in payload &&
              typeof payload.message === "string" &&
              payload.message.trim()
            ) {
              setErrorMessage(payload.message);
              return;
            }
          }

          setErrorMessage("Login yoki parol noto‘g‘ri");
        },
      },
    );
  };

  return (
    <div className="w-full h-screen flex items-center justify-center bg-blue-100">
      <form
        onSubmit={handleLogin}
        className="bg-white py-8 px-6 shadow-md rounded-2xl w-[350px] flex flex-col gap-5"
      >
        <h1 className="text-2xl font-semibold text-center">Login</h1>

        {/* Phone */}
        <div className="flex flex-col gap-1">
          <label className="text-sm text-gray-500">Phone number</label>
          <input
            type="text"
            placeholder="+998..."
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="border rounded-lg px-3 py-2 outline-none focus:border-blue-500"
          />
        </div>

        {/* Password */}
        <div className="flex flex-col gap-1">
          <label className="text-sm text-gray-500">Password</label>
          <input
            type="password"
            placeholder="••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border rounded-lg px-3 py-2 outline-none focus:border-blue-500"
          />

        
        </div>



        {/* Button */}
        <button
          type="submit"
          disabled={isPending}
          className="bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-lg transition flex items-center justify-center"
        >
          {isPending ? (
            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
          ) : (
            "Login"
          )}
        </button>
        {errorMessage && (
          <p className="text-sm text-red-500 text-center">{errorMessage}</p>
        )}
      </form>
    </div>
  );
}
