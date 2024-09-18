import express, { Request, Response } from "express";

const app = express();
const port = 3001;

app.get("/", (req: Request, res: Response) => {
  console.log("hi");
  res.send("hi");
});
app.get("/about", (req: Request, res: Response) => {
  console.log("about");
  res.send("hi");
});
app.listen(port, (err?: Error): void => {
  if (err) console.log(err.message);
  console.log(`server is running at ${port}`);
});
