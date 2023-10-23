"use client";
export default async function page() {
  const h = await fetch("http://localhost:3000/api/user/role", {
    method: "GET",
  });

  return <h1>test page</h1>;
}
