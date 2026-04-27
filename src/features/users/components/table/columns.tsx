export const columns = [
  {
    title: 'ID',
    dataIndex: 'id',
    key: 'id',
  },
  {
    title: 'Full Name',
    dataIndex: 'fullName',
    key: 'fullName',
    sorter: (a, b) => a.fullName.localeCompare(b.fullName),

  },
  {
    title: 'Phone',
    dataIndex: 'phone',
    key: 'phone',
  },
  {
    title: 'Region',
    dataIndex: 'region',
    key: 'region',
        sorter: (a:any, b:any) => a.fullName.localeCompare(b.fullName),

  },
  {
    title: 'City',  
    dataIndex: 'city',
    key: 'city',
  },
  {
    title: 'Role',
    dataIndex: 'role',
    key: 'role',
  },
  {
    title: 'Status',
    dataIndex: 'active',
    key: 'active',
    render: (active: boolean) => (
      <span
        style={{
          padding: "4px 10px",
          borderRadius: "8px",
          color: "#fff",
          background: active ? "rgb(71 110 51)" : "rgb(188 96 96)",
          fontSize: "12px",
        }}
      >
        {active ? "Active" : "Inactive"}
      </span>
    )
  },
  {
    title: 'Action',
    dataIndex: 'action',
    key: 'action',
    render: (active: boolean, row: any) => (
      <span
        style={{
          padding: "4px 10px",
          borderRadius: "4px",
          color: "#fff",
          cursor: "pointer",
          background: row?.active ? "rgb(188 96 96)" : "rgb(71 110 51)",
          fontSize: "12px",
        }}
      >
        {row?.active ? "Block" : "Un Block"}
      </span>
    )
  },
];