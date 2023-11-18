import { columns } from "./columns";
import { DataTable } from "./data-table";

import { taskSchema } from "../components/data/schema";
import { z } from "zod";
import { promises as fs } from "fs";
import path from "path";
// Simulate a database read for tasks.
async function getTasks() {
  const data = await fs.readFile(
    path.join(
      process.cwd(),
      "/src/app/dashboard/(user)/student/components/data/tasks.json"
    )
  );

  const tasks = JSON.parse(data.toString());

  return z.array(taskSchema).parse(tasks);
}
export default async function Reports() {
  const tasks = await getTasks();

  if (tasks.length === 0) {
    return <h1 className="text-center mt-40">there is no tasks yet</h1>;
  }
  return <DataTable data={tasks} columns={columns} />;
}
