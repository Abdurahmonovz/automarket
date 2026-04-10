"use client";
import React, { useState } from "react";
import useLogin from "../hooks/useLogin";
export default function Login() {
  const { login, isPending } = useLogin()


  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    login({ phone, password },{
      onSuccess:(data)=>{
       
        if(data?.role=="ADMIN"){
           window.location.href="/"
           localStorage.setItem("autocrmtoken",data?.token)
        }
        
      }
    })

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
      </form>
    </div>
  );
}