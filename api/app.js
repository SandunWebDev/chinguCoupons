const app = require("./server");
const config = require("./utils/config");

app.set("port", config.port);

app.listen(app.get("port"), () => {
  console.log(`Listening on ${app.get("port")}`);
});
