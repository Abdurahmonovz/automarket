"use client";

import { useMemo, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";

import {
  Layers,
  CheckCircle,
  Clock,
  XCircle,
  ShoppingCart,
  Archive,
  DollarSign,
  Building2,
  Car,
} from "lucide-react";

import useStates from "../hooks/useStates";

type Period = "today" | "lastWeek" | "lastMonth";

const COLORS = ["#22c55e", "#eab308", "#ef4444", "#3b82f6"];

export default function DashboardPage() {
  const [period, setPeriod] = useState<Period>("today");
  const { data, isLoading } = useStates();

  // ✅ SAFE DATA (prevent crash)
  const safeData = data ?? {
    today: { approved: 0, pending: 0, rejected: 0, sold: 0 },
    lastWeek: { approved: 0, pending: 0, rejected: 0, sold: 0 },
    lastMonth: { approved: 0, pending: 0, rejected: 0, sold: 0 },
    totalAds: 0,
    totalApproved: 0,
    totalPending: 0,
    totalRejected: 0,
    totalSold: 0,
    totalArchived: 0,
    averagePriceApproved: 0,
    topBrand: "-",
    topModel: "-",
  };

  const current = safeData?.[period];

  // ✅ hooks ALWAYS same order (FIXED)
  const chartData = useMemo(() => {
    return [
      { name: "Approved", value: current?.approved ?? 0 },
      { name: "Pending", value: current?.pending ?? 0 },
      { name: "Rejected", value: current?.rejected ?? 0 },
      { name: "Sold", value: current?.sold ?? 0 },
    ];
  }, [current]);

  const total = chartData.reduce((a, b) => a + b.value, 0);

  // loading AFTER hooks (IMPORTANT FIX)
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-500">
        Loading...
      </div>
    );
  }

  const gradientCards = [
    {
      title: "Total Ads",
      value: safeData.totalAds,
      icon: Layers,
      gradient: "from-indigo-500 to-blue-500",
    },
    {
      title: "Approved",
      value: safeData.totalApproved,
      icon: CheckCircle,
      gradient: "from-green-500 to-emerald-500",
    },
    {
      title: "Pending",
      value: safeData.totalPending,
      icon: Clock,
      gradient: "from-yellow-500 to-orange-500",
    },
    {
      title: "Rejected",
      value: safeData.totalRejected,
      icon: XCircle,
      gradient: "from-red-500 to-rose-500",
    },
    {
      title: "Sold",
      value: safeData.totalSold,
      icon: ShoppingCart,
      gradient: "from-purple-500 to-violet-500",
    },
    {
      title: "Archived",
      value: safeData.totalArchived,
      icon: Archive,
      gradient: "from-slate-500 to-gray-600",
    },
  ];

  return (
    <div className="min-h-screen  dark:bg-gray-950 text-gray-900 dark:text-gray-100 p-6 space-y-6">

      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <h1 className="text-2xl font-bold text-(--text-base)">Dashboard</h1>

        <div className="flex bg-(--text-white) dark:bg-gray-900  border-gray-100 dark:border-gray-800 p-1 rounded-xl">
          {(["today", "lastWeek", "lastMonth"] as Period[]).map((p) => (
            <button
              key={p}
              onClick={() => setPeriod(p)}
              className={`px-4 py-2 rounded-lg text-sm transition cursor-pointer ${
                period === p
                  ? "bg-black text-white dark:bg-white dark:text-black"
                  : "text-(--text-base) dark:text-gray-300 hover:opacity-60"
              }`}
            >
              {p === "today"
                ? "Today"
                : p === "lastWeek"
                ? "Last Week"
                : "Last Month"}
            </button>
          ))}
        </div>
      </div>

      {/* GRADIENT CARDS */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {gradientCards.map((item, i) => {
          const Icon = item.icon;

          return (
            <div
              key={i}
              className="relative overflow-hidden rounded-2xl p-4 text-white shadow-lg hover:scale-[1.03] transition"
            >
              <div
                className={`absolute inset-0 bg-gradient-to-r ${item.gradient}`}
              />
              <div className="absolute inset-0 bg-black/20" />

              <div className="relative flex items-center justify-between">
                <div>
                  <p className="text-xs opacity-80">{item.title}</p>
                  <h2 className="text-2xl font-bold mt-1">{item.value}</h2>
                </div>

                <div className="p-3 rounded-xl bg-white/20">
                  <Icon className="w-5 h-5 text-white" />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* CHARTS */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* BAR */}
        <div className="bg-(--text-white)  rounded-xl p-4 lg:col-span-2">
          <h3 className="font-semibold mb-4 flex items-center gap-2 text-(--text-base)">
            
            Ads Performance
          </h3>

          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <XAxis stroke="#9ca3af" />
                <YAxis stroke="#9ca3af" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#111827",
                    border: "1px solid #374151",
                    borderRadius: "10px",
                    color: "#fff",
                  }}
                />
                <Bar dataKey="value" fill="#3b82f6" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* PIE */}
        <div className=" rounded-xl p-4 bg-(--text-white)">
          <h3 className="font-semibold mb-4 flex items-center gap-2 text-(--text-base)">
            Distribution
          </h3>

          <div className="h-[300px] relative">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={chartData}
                  dataKey="value"
                  outerRadius={90}
                  label={({ name, value }) => `${name}: ${value}`}
                >
                  {chartData.map((_, i) => (
                    <Cell key={i} fill={COLORS[i]} />
                  ))}
                </Pie>

                <Tooltip
                  contentStyle={{
                    backgroundColor: "#111827",
                    border: "1px solid #374151",
                    color: "#fff",
                    borderRadius: "10px",
                  }}
                />

                <Legend />
              </PieChart>
            </ResponsiveContainer>

            {/* CENTER TOTAL */}
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
              <p className="text-gray-500">Total</p>
              <p className="text-2xl font-bold text-(--text-base)">{total}</p>
            </div>
          </div>
        </div>
      </div>

      {/* BOTTOM */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

        <div className="rounded-2xl p-5 text-white bg-gradient-to-r from-blue-600 to-blue-500">
          <div className="flex items-center gap-2 opacity-80">
            <DollarSign className="w-4 h-4" />
            Average Price
          </div>
          <h2 className="text-2xl font-bold mt-2">
            ${safeData.averagePriceApproved||0}
          </h2>
        </div>

        <div className="rounded-2xl p-5 text-white bg-gradient-to-r from-green-600 to-green-500">
          <div className="flex items-center gap-2 opacity-80">
            <Building2 className="w-4 h-4" />
            Top Brand
          </div>
          <h2 className="text-2xl font-bold mt-2">{safeData.topBrand||0}</h2>
        </div>

        <div className="rounded-2xl p-5 text-white bg-gradient-to-r from-purple-600 to-purple-500">
          <div className="flex items-center gap-2 opacity-80">
            <Car className="w-4 h-4" />
            Top Model
          </div>
          <h2 className="text-2xl font-bold mt-2">{safeData.topModel||0}</h2>
        </div>

      </div>
    </div>
  );
}