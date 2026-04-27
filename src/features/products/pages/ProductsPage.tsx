"use client";

import { Button, Input, InputNumber, Modal, Select, Space, Table, Tag, message } from "antd";
import type { TableProps } from "antd";
import { useEffect, useState } from "react";
import type { Product, ProductStatus } from "../../../config/mockData";
import useProducts from "../hooks/useProducts";


const STATUS_OPTIONS: Array<{ value: ProductStatus; label: string }> = [
  { value: "approved", label: "Tasdiqlangan" },
  { value: "pending", label: "Kutilmoqda" },
  { value: "rejected", label: "Rad etilgan" },
  { value: "sold", label: "Sotilgan" },
  { value: "archived", label: "Arxiv" },
];

const STATUS_COLORS: Record<ProductStatus, string> = {
  approved: "green",
  pending: "gold",
  rejected: "red",
  sold: "blue",
  archived: "default",
};

function yangiMahsulotBoshlangichi(): Product {
  return {
    id: Date.now(),
    title: "",
    price: 0,
    brand: "",
    model: "",
    year: new Date().getFullYear(),
    mileage: 0,
    status: "pending",
  };
}

export default function ProductsPage() {
  const { products: serverdan, isLoading } = useProducts();


  const [products, setProducts] = useState<Product[]>([]);
  const [search, setSearch] = useState("");

  const [modalOchiq, setModalOchiq] = useState(false);
  const [tahrirlanayotganId, setTahrirlanayotganId] = useState<number | null>(null);
  const [form, setForm] = useState<Product>(yangiMahsulotBoshlangichi());


  useEffect(() => {
    setProducts(serverdan);
  }, [serverdan]);


  const qidiruv = search.trim().toLowerCase();
  const filtrlangan =
    qidiruv === ""
      ? products
      : products.filter((p) =>
          `${p.title} ${p.brand} ${p.model}`.toLowerCase().includes(qidiruv),
        );

  function ochirish(id: number) {
    setProducts((old) => old.filter((p) => p.id !== id));
  }

  function tahrirlash(p: Product) {
    setTahrirlanayotganId(p.id);
    setForm({ ...p });
    setModalOchiq(true);
  }

  function qoshish() {
    setTahrirlanayotganId(null);
    setForm(yangiMahsulotBoshlangichi());
    setModalOchiq(true);
  }

  function saqlash() {
    if (!form.title.trim()) {
      message.error("Sarlavha majburiy");
      return;
    }
    if (!form.brand.trim() || !form.model.trim()) {
      message.error("Brend va model majburiy");
      return;
    }
    if (form.price <= 0) {
      message.error("Narx 0 dan katta bo'lishi kerak");
      return;
    }

    if (tahrirlanayotganId !== null) {
      setProducts((old) =>
        old.map((p) => (p.id === tahrirlanayotganId ? { ...form, id: tahrirlanayotganId } : p)),
      );
    } else {
      setProducts((old) => [...old, { ...form, id: Date.now() }]);
    }
    setModalOchiq(false);
  }

  function statusOzgarishi(id: number, status: ProductStatus) {
    setProducts((old) => old.map((p) => (p.id === id ? { ...p, status } : p)));
  }

  const ustunlar: TableProps<Product>["columns"] = [
    { title: "Sarlavha", dataIndex: "title" },
    { 
      title: "Narx",
      dataIndex: "price",
      render: (price: number) => `$${price.toLocaleString()}`,
    },
    { title: "Brend", dataIndex: "brand" },
    { title: "Model", dataIndex: "model" },
    { title: "Yil", dataIndex: "year" },
    {
      title: "Yurgan masofasi",
      dataIndex: "mileage",
      render: (km: number) => `${km.toLocaleString()} km`,
    },
    {
      title: "Holat",
      dataIndex: "status",
      render: (status: ProductStatus, row: Product) => (
        <Space wrap>
          <Tag color={STATUS_COLORS[status]}>{STATUS_OPTIONS.find((o) => o.value === status)?.label}</Tag>
          <Select<ProductStatus>
            value={status}
            style={{ width: 140 }}
            onChange={(v) => statusOzgarishi(row.id, v)}
            options={STATUS_OPTIONS}
          />
        </Space>
      ),
    },
    {
      title: "Amallar",
      render: (_, row) => (
        <Space>
          <Button onClick={() => tahrirlash(row)}>Tahrirlash</Button>
          <Button danger onClick={() => ochirish(row.id)}>
            O'chirish
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <div>
      <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <Input
          placeholder="Qidiruv: sarlavha / brend / model"
          className="w-full sm:w-[280px]"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <Button type="primary" onClick={qoshish}>
          Mahsulot qo'shish
        </Button>
      </div>

      <Table
        dataSource={filtrlangan}
        columns={ustunlar}
        rowKey="id"
        loading={isLoading}
        pagination={{ pageSize: 10 }}
      />

      <Modal
        title={tahrirlanayotganId !== null ? "Mahsulotni tahrirlash" : "Yangi mahsulot"}
        open={modalOchiq}
        onOk={saqlash}
        onCancel={() => setModalOchiq(false)}
        okText="Saqlash"
      >
        <div className="space-y-3">
          <Input
            placeholder="Sarlavha"
            value={form.title}
            onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
          />
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <Input
              placeholder="Brend"
              value={form.brand}
              onChange={(e) => setForm((f) => ({ ...f, brand: e.target.value }))}
            />
            <Input
              placeholder="Model"
              value={form.model}
              onChange={(e) => setForm((f) => ({ ...f, model: e.target.value }))}
            />
          </div>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <InputNumber
              className="w-full"
              min={1}
              placeholder="Narx"
              value={form.price}
              onChange={(v) => setForm((f) => ({ ...f, price: Number(v ?? 0) }))}
            />
            <InputNumber
              className="w-full"
              min={0}
              placeholder="Probeg (km)"
              value={form.mileage}
              onChange={(v) => setForm((f) => ({ ...f, mileage: Number(v ?? 0) }))}
            />
          </div>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <InputNumber
              className="w-full"
              min={1950}
              max={new Date().getFullYear() + 1}
              placeholder="Ishlab chiqarilgan yil"
              value={form.year}
              onChange={(v) => setForm((f) => ({ ...f, year: Number(v ?? 0) }))}
            />
            <Select<ProductStatus>
              className="w-full"
              placeholder="Holat"
              value={form.status}
              options={STATUS_OPTIONS}
              onChange={(v) => setForm((f) => ({ ...f, status: v }))}
            />
          </div>
        </div>
      </Modal>
    </div>
  );
}
