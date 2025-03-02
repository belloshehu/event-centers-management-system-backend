import App from "./app";
import AuthRoute from "@/routes/auth.route";
import UserRoute from "@/routes/user.routes";
import "dotenv/config";

const application = new App([new AuthRoute(), new UserRoute()]);

application.startServer();
