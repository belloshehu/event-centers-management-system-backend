import App from "./app";
import AuthRoute from "@/routes/auth.route";
import UserRoute from "@/routes/user.routes";
import "dotenv/config";
import EventCenterRoutes from "./routes/event-center.routes";

const application = new App([
	new AuthRoute(),
	new UserRoute(),
	new EventCenterRoutes(),
]);

application.startServer();
