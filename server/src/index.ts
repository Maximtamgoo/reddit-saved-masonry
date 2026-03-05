import { env } from "./envConfig.js";
import app from "./app.js";

app.listen(env.PORT, () => console.log("Server started on port:", env.PORT));
