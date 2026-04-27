"use client";

import { Button, Input, Modal, Select, Space, Table, message } from "antd";
import type { TableProps } from "antd";
import { useEffect, useState } from "react";
import type { Model } from "../../../config/mockData";
import useBrands from "../../brands/hooks/useBrands";
import useModels from "../hooks/useModels";

function yangiModelBoshlangichi(): Model {
  return {
    id: 0,
    name: "",
    brandId: 0,
    brandName: "",
  };
}

export default function ModelsPage() {
  const { models: serverdan, isLoading } = useModels();
  const { brands, isLoading: brendlarYuklanmoqda } = useBrands();

  const [models, setModels] = useState<Model[]>([]);
  const [search, setSearch] = useState("");

  const [modalOchiq, setModalOchiq] = useState(false);
  const [tahrirlanayotganId, setTahrirlanayotganId] = useState<number | null>(null);
  const [form, setForm] = useState<Model>(yangiModelBoshlangichi());

  useEffect(() => {
    setModels(serverdan);
  }, [serverdan]);

  const qidiruv = search.trim().toLowerCase();
  const filtrlangan =
    qidiruv === ""
      ? models
      : models.filter((m) => m.name.toLowerCase().includes(qidiruv));

  function brendTanlash(brandId: number) {
    const tanlangan = brands.find((b) => b.id === brandId);
    setForm((f) => ({
      ...f,
      brandId,
      brandName: tanlangan?.name ?? "",
    }));
  }

  function qoshish() {
    setTahrirlanayotganId(null);
    setForm(yangiModelBoshlangichi());
    setModalOchiq(true);
  }

  function tahrirlash(m: Model) {
    setTahrirlanayotganId(m.id);
    setForm({ ...m });
    setModalOchiq(true);
  }

  function saqlash() {
    if (!form.name.trim()) {
      message.error("Model nomi majburiy");
      return;
    }
    if (!form.brandId) {
      message.error("Brendni tanlang");
      return;
    }

    if (tahrirlanayotganId !== null) {
      setModels((old) =>
        old.map((m) => (m.id === tahrirlanayotganId ? { ...form, id: tahrirlanayotganId } : m)),
      );
    } else {
      setModels((old) => [...old, { ...form, id: Date.now() }]);
    }
    setModalOchiq(false);
  }

  function ochirish(id: number) {
    setModels((old) => old.filter((m) => m.id !== id));
  }

  const ustunlar: TableProps<Model>["columns"] = [
    { title: "Model nomi", dataIndex: "name" },
    { title: "Brend", dataIndex: "brandName" },
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
          placeholder="Model bo'yicha qidiruv"
          className="w-full sm:w-[280px]"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <Button type="primary" onClick={qoshish}>
          Model qo'shish
        </Button>
      </div>

      <Table
        dataSource={filtrlangan}
        columns={ustunlar}
        rowKey="id"
        loading={isLoading || brendlarYuklanmoqda}
        pagination={{ pageSize: 10 }}
      />

      <Modal
        title={tahrirlanayotganId !== null ? "Modelni tahrirlash" : "Yangi model"}
        open={modalOchiq}
        onOk={saqlash}
        onCancel={() => setModalOchiq(false)}
        okText="Saqlash"
      >
        <div className="space-y-3">
          <Input
            placeholder="Model nomi"
            value={form.name}
            onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
          />
          <Select
            className="w-full"
            placeholder="Brendni tanlang"
            value={form.brandId || undefined}
            onChange={brendTanlash}
            options={brands.map((b) => ({ value: b.id, label: b.name }))}
          />
        </div>
      </Modal>
    </div>
  );
}
