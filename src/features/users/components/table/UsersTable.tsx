import { Input, Table } from "antd";
import { columns } from "./columns";
import useUsers from "../../hooks/useUsers";
import { useState } from "react";

export default function UsersTable() {
  const { users, isLoading } = useUsers();
  const [search, setSearch] = useState("");

  const filteredData = users?.filter((item) =>
    item.fullName.toLowerCase().includes(search.toLowerCase())||
    item.phone.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <div className="flex items-center justify-end">
        <div className="w-[200px] py-5">
          <Input size="large" placeholder="Search ..." 
          onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>
      <Table
        className="dark-table"
        loading={isLoading}
        dataSource={filteredData || []}
        columns={columns}
        pagination={{
          pageSize: 11,
          showSizeChanger: true,
        }}
      />
    </div>
  );
}