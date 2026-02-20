import ServerlessHttp from "serverless-http";
import app from "../src/app.js";

export default ServerlessHttp(app);
