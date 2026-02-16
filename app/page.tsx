import Image from "next/image";
import CarCard from "@/app/components/CarCard";
import { cars } from "@/app/data/cars";

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-100 p-10">
      <h1 className="text-3xl font-bold">Salom Next.js + Tailwind</h1>
      <button className="mt-6 rounded-xl bg-black px-5 py-3 text-white cursor-pointer active:">
        Tugma
      </button>
    </main>
  )
}