import request from "supertest";
import App from "@/app";
import IndexRoute from "@/routes/index.route";
const mongoose = require("mongoose");

let app = null;
beforeAll(async () => {
	app = new App([new IndexRoute()]).getServer();
	mongoose
		.connect("mongodb://localhost/test_database")
		.then(() => {
			console.log("Connected to test database");
		})
		.catch((error) => {
			console.log("Test Databse Error: " + error);
		});
});
afterAll(async () => {
	await mongoose.connection.dropDatabase();
	await mongoose.connection.close();
});

describe("Index", () => {
	describe("GET /", () => {
		it("should return 200 and Wellcome message", async () => {
			const response = await request(app).get("/");
			expect(response.status).toBe(200);
		});
	});
});
