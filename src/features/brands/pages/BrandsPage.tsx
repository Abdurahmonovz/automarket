"use client";

import { Button, Input, Modal, Space, Spin, Table, Upload, message } from "antd";
import type { TableProps, UploadFile } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import axios from "axios";
import { useEffect, useState } from "react";
import type { Brand, Model } from "../../../config/mockData";
import useBrandModels from "../hooks/useBrandModels";
import useBrands from "../hooks/useBrands";

/** Backend `logoUrl` nisbiy bo‘lsa (masalan `/api/...`), to‘liq manzil uchun origin qo‘shiladi */
const LOGO_ORIGIN = "https://procuratorial-phrenetically-yessenia.ngrok-free.dev";
const MAX_LOGO_MB = 2;

function resolveLogoSrc(url?: string): string | undefined {
  if (!url) return undefined;
  if (url.startsWith("data:") || /^https?:\/\//i.test(url)) return url;
  return LOGO_ORIGIN + url;
}

function fileToDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result));
    reader.onerror = () => reject(reader.error);
    reader.readAsDataURL(file);
  });
}

function yangiBrendBoshlangichi(): Brand {
  return {
    id: 0,
    name: "",
    logoUrl: "",
  };
}

export default function BrandsPage() {
  const { brands: serverdan, isLoading } = useBrands();

  const [brands, setBrands] = useState<Brand[]>([]);
  const [search, setSearch] = useState("");

  const [modalOchiq, setModalOchiq] = useState(false);
  const [tahrirlanayotganId, setTahrirlanayotganId] = useState<number | null>(null);
  const [form, setForm] = useState<Brand>(yangiBrendBoshlangichi());

  const [koRishBrend, setKoRishBrend] = useState<Brand | null>(null);
  const { models: brendModellari, isLoading: modellarYuklanmoqda, isError, error } =
    useBrandModels(koRishBrend?.id ?? null, koRishBrend !== null);

  useEffect(() => {
    if (!isError || !koRishBrend || !error) return;
    const msg = axios.isAxiosError(error)
      ? (typeof error.response?.data === "string"
          ? error.response.data
          : (error.response?.data as { message?: string } | undefined)?.message) ??
        error.message
      : error instanceof Error
        ? error.message
        : "Modellarni yuklab bo'lmadi";
    message.error(String(msg) || "Modellarni yuklab bo'lmadi");
  }, [isError, error, koRishBrend]);

  useEffect(() => {
    setBrands(serverdan);
  }, [serverdan]);

  const qidiruv = search.trim().toLowerCase();
  const filtrlangan =
    qidiruv === ""
      ? brands
      : brands.filter((b) => b.name.toLowerCase().includes(qidiruv));

  function qoshish() {
    setTahrirlanayotganId(null);
    setForm(yangiBrendBoshlangichi());
    setModalOchiq(true);
  }

  function tahrirlash(b: Brand) {
    setTahrirlanayotganId(b.id);
    setForm({ ...b });
    setModalOchiq(true);
  }

  function saqlash() {
    if (!form.name.trim()) {
      message.error("Brend nomi majburiy");
      return;
    }

    const logoUrl = form.logoUrl?.trim() || undefined;

    if (tahrirlanayotganId !== null) {
      setBrands((old) =>
        old.map((b) =>
          b.id === tahrirlanayotganId
            ? { ...b, name: form.name.trim(), logoUrl }
            : b,
        ),
      );
    } else {
      setBrands((old) => [
        ...old,
        {
          id: Date.now(),
          name: form.name.trim(),
          logoUrl,
        },
      ]);
    }
    setModalOchiq(false);
  }

  function ochirish(id: number) {
    setBrands((old) => old.filter((b) => b.id !== id));
  }

  const ustunlar: TableProps<Brand>["columns"] = [
    {
      title: "Photo",
      dataIndex: "logoUrl",
      key: "logoUrl",
      width: 72,
      render: (url: string | undefined) => {
        const src = resolveLogoSrc(url);
        return src ? (
          <img
            src={src}
            alt=""
            width={50}
            height={50}
            style={{ objectFit: "contain", display: "block" }}
          />
        ) : (
          <span style={{ color: "#bfbfbf" }}>—</span>
        );
      },
    },
    { title: "Brend nomi", dataIndex: "name" },
    {
      title: "Amallar",
      render: (_, row) => (
        <Space>
          <Button type="link" onClick={() => setKoRishBrend(row)}>
            Ko'rish
          </Button>
          <Button onClick={() => tahrirlash(row)}>Tahrirlash</Button>
          <Button danger onClick={() => ochirish(row.id)}>
            O'chirish
          </Button>
        </Space>
      ),
    },
  ];

  const korishUstunlar: TableProps<Model>["columns"] = [
    { title: "ID", dataIndex: "id", width: 72 },
    { title: "Model", dataIndex: "name" },
    { title: "Brend ID", dataIndex: "brandId", width: 88 },
    { title: "Brend", dataIndex: "brandName" },
  ];

  
  return (
    <div>
      <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <Input
          placeholder="Brend bo'yicha qidiruv"
          className="w-full sm:w-[280px]"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <Button type="primary" onClick={qoshish}>
          Brend qo'shish
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
        title={tahrirlanayotganId !== null ? "Brendni tahrirlash" : "Yangi brend"}
        open={modalOchiq}
        onOk={saqlash}
        onCancel={() => setModalOchiq(false)}
        okText="Saqlash"
      >
        <div className="space-y-3">
          <Input
            placeholder="Brend nomi"
            value={form.name}
            onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
          />

          <div>
            <div className="mb-1 text-sm text-neutral-500">Logo</div>
            <div className="flex items-center gap-3">
              {resolveLogoSrc(form.logoUrl) ? (
                <img
                  src={resolveLogoSrc(form.logoUrl)}
                  alt=""
                  width={64}
                  height={64}
                  style={{
                    objectFit: "contain",
                    border: "1px solid #f0f0f0",
                    borderRadius: 6,
                    background: "#fff",
                  }}
                />
              ) : (
                <div
                  style={{
                    width: 64,
                    height: 64,
                    border: "1px dashed #d9d9d9",
                    borderRadius: 6,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#bfbfbf",
                    fontSize: 12,
                  }}
                >
                  yo'q
                </div>
              )}

              <Upload
                accept="image/*"
                maxCount={1}
                showUploadList={false}
                beforeUpload={async (file: UploadFile & File) => {
                  const isImg = (file.type ?? "").startsWith("image/");
                  if (!isImg) {
                    message.error("Faqat rasm fayl tanlang");
                    return Upload.LIST_IGNORE;
                  }
                  const sizeMb = (file.size ?? 0) / 1024 / 1024;
                  if (sizeMb > MAX_LOGO_MB) {
                    message.error(`Rasm ${MAX_LOGO_MB}MB dan kichik bo'lsin`);
                    return Upload.LIST_IGNORE;
                  }
                  try {
                    const dataUrl = await fileToDataUrl(file as File);
                    setForm((f) => ({ ...f, logoUrl: dataUrl }));
                  } catch {
                    message.error("Rasmni o'qib bo'lmadi");
                  }
                  return false;
                }}
              >
                <Button icon={<UploadOutlined />}>Fayl tanlash</Button>
              </Upload>

              {form.logoUrl && (
                <Button
                  type="text"
                  danger
                  onClick={() => setForm((f) => ({ ...f, logoUrl: "" }))}
                >
                  O'chirish
                </Button>
              )}
            </div>
          </div>
        </div>
      </Modal>

      <Modal
        title={
          koRishBrend
            ? `Ko'rish: ${koRishBrend.name} (brandId: ${koRishBrend.id})`
            : ""
        }
        open={koRishBrend !== null}
        onCancel={() => setKoRishBrend(null)}
        footer={null}
        width={720}
        destroyOnClose
      >
        <Spin spinning={modellarYuklanmoqda}>
          {isError ? (
            <p className="text-red-500">Yuklashda xato yuz berdi.</p>
          ) : (
            <Table<Model>
              dataSource={brendModellari}
              columns={korishUstunlar}
              rowKey="id"
              pagination={false}
              size="small"
              scroll={{ x: "max-content" }}
              locale={{ emptyText: "Bu brend uchun modellar topilmadi" }}
            />
          )}
        </Spin>
      </Modal>
    </div>
  );
}
