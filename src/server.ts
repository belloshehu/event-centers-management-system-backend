import App from "./app";
import AuthRoute from "@/routes/auth.route";
import UserRoute from "@/routes/user.route";
import "dotenv/config";
import EventCenterRoutes from "./routes/event-center.route";
import EventRoutes from "./routes/event.route";

const application = new App([
	new AuthRoute(),
	new UserRoute(),
	new EventCenterRoutes(),
	new EventRoutes(),
]);

application.startServer();
