import { Application } from "https://deno.land/x/oak/mod.ts";
import router from "./router.ts";
const app = new Application();
const HOST = "127.0.0.1";
const PORT = 7700;

app.use(router.routes());
app.use(router.allowedMethods());

app.addEventListener("listen", ({ hostname, port, secure }) => {
  console.log(
    `Listening on ${secure ? "https://" : "http://"}${hostname}:${port}`,
  );
});

await app.listen(`${HOST}:${PORT}`);
