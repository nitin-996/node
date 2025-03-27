import { serve } from "bun";

const port = 3003;
let teaData = [];
let id = 1;

const server = serve({
  port,
  fetch(req) {
    const { pathname } = new URL(req.url); // Extract only the pathname

    if (req.method === "POST" && pathname === "/post") {
      return req.json().then(({ name, price }) => {
        const newTea = { id: id++, name, price };
        teaData.push(newTea);
        return new Response(JSON.stringify(newTea), {
          status: 200,
          headers: { "Content-Type": "application/json" },
        });
      });
    }

    return new Response("Not Found", { status: 404 });
  },
});

console.log(`Bun server running on http://localhost:${port}`);
