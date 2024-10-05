import { Payment, columns } from "./columns"
import { DataTable } from "./data-table"

async function getData(): Promise<Payment[]> {
  // Fetch data from your API here.
  return [
    {
        id: "1a2b3c4d",
        amount: 100,
        status: "pending",
        email: "user0@example.com"
      },
      {
        id: "2b3c4d5e",
        amount: 200,
        status: "processing",
        email: "user1@example.com"
      },
      {
        id: "3c4d5e6f",
        amount: 150,
        status: "failed",
        email: "user2@example.com"
      },
      {
        id: "4d5e6f7g",
        amount: 300,
        status: "pending",
        email: "user3@example.com"
      },
      {
        id: "5e6f7g8h",
        amount: 400,
        status: "processing",
        email: "user4@example.com"
      },
      {
        id: "6f7g8h9i",
        amount: 250,
        status: "failed",
        email: "user5@example.com"
      },
      {
        id: "7g8h9i0j",
        amount: 500,
        status: "pending",
        email: "user6@example.com"
      },
      {
        id: "8h9i0j1k",
        amount: 600,
        status: "processing",
        email: "user7@example.com"
      },
      {
        id: "9i0j1k2l",
        amount: 700,
        status: "failed",
        email: "user8@example.com"
      },
      {
        id: "0j1k2l3m",
        amount: 800,
        status: "pending",
        email: "user9@example.com"
      },
      {
        id: "1k2l3m4n",
        amount: 900,
        status: "processing",
        email: "user10@example.com"
      },
      {
        id: "2l3m4n5o",
        amount: 350,
        status: "failed",
        email: "user11@example.com"
      },
      {
        id: "3m4n5o6p",
        amount: 450,
        status: "pending",
        email: "user12@example.com"
      },
      {
        id: "4n5o6p7q",
        amount: 550,
        status: "processing",
        email: "user13@example.com"
      },
      {
        id: "5o6p7q8r",
        amount: 650,
        status: "failed",
        email: "user14@example.com"
      }
    // ...
  ]
}

export default async function DemoPage() {
  const data = await getData()

  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={data} />
    </div>
  )
}
