import { env } from "./envConfig.js";
import app from "./app.js";

console.log("env.NODE_ENV:", env.NODE_ENV);
app.listen(env.PORT, () => console.log("Server started on port:", env.PORT));
