import App from "./app";
import AuthRoute from "@/routes/auth.route";
import UserRoute from "@/routes/user.route";
import "dotenv/config";
import EventCenterRoutes from "@/routes/event-center.route";
import EventRoutes from "@/routes/event.route";
import IndexRoute from "./routes/index.route";

const application = new App([
	new IndexRoute(),
	new AuthRoute(),
	new UserRoute(),
	new EventCenterRoutes(),
	new EventRoutes(),
]);

application.startServer();

export default application.app;
