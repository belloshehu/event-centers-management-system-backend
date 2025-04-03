import App from "@/app";
import mongoose from "mongoose";
import request from "supertest";
import EntertainerRoutes from "@/routes/entertainer.route";
import AuthRoute from "@/routes/auth.route";
import { StatusCodes } from "http-status-codes";
import { Application } from "express";

let token = "";
let entertainerId = "";
let app: Application;

const entertainerPath = "/entertainers";
const authPath = "/auth";

describe("Entertainer", () => {
	beforeAll(async () => {
		app = new App([new EntertainerRoutes(), new AuthRoute()]).getServer();
		// mongoose
		// 	.connect("mongodb://localhost/test_database")
		// 	.then(() => {
		// 		console.log("Connected to test database");
		// 	})
		// 	.catch((error) => {
		// 		console.log("Test Databse Error: " + error);
		// 	});
	});

	describe("AUTH routes", () => {
		it("should register a new user", async () => {
			const response = await request(app).post(`${authPath}/signup`).send({
				email: "belloshehu1@gmail.com",
				password: "password@123",
				passwordRepeat: "password@123",
				firstName: "Bello",
				lastName: "Shehu",
				role: "user",
			});
			expect(response.status).toBe(201);
		});

		it("should authenticate user and return token", async () => {
			const response = await request(app).post(`${authPath}/login`).send({
				email: "belloshehu1@gmail.com",
				password: "password@123",
			});
			token = response.body.data.token;
			expect(response.status).toBe(201);
		});
	});

	describe("GET empty entainers", () => {
		describe("given entertainers do not exist", () => {
			it("should return empty array", async () => {
				const response = await request(app).get(entertainerPath);
				expect(response.status).toBe(200);
				expect(response.body.data.length).toBe(0);
			});
		});
	});

	describe("POST /entertainers", () => {
		describe("given entertainer data", () => {
			it("should create entertainer with 201 status code", async () => {
				const response = await request(app)
					.post(entertainerPath)
					.send({
						name: "Entertainer 1",
						description: "Entertainer 1 description",
						type: "music",
						images: ["image1.jpg", "image2.jpg"],
						contact_email: "eb@gmail.com",
						contact_number: "09061983150",
					})
					.set("Authorization", `Bearer ${token}`);
				entertainerId = response.body.data._id;
				expect(response.status).toBe(201);
				expect(response.body.message).toBe("Entertainer created");
			});
		});
	});

	describe("UPDATE /entertainers", () => {
		describe("given entertainer data", () => {
			it("should update entertainer with 201 status code", async () => {
				const response = await request(app)
					.put(`${entertainerPath}/${entertainerId}`)
					.send({
						name: "Entertainer 1",
						description: "Entertainer 1 description",
						type: "music",
						images: ["image1.jpg", "image2.jpg"],
						contact_email: "bello@gmail.com",
						contact_number: "09061983150",
					})
					.set("Authorization", `Bearer ${token}`);
				expect(response.status).toBe(StatusCodes.CREATED);
				expect(response.body.message).toBe("Entertainer updated");
			});
		});
	});

	describe("Get entertainers route", () => {
		describe("given entertainers exist", () => {
			it("should fetch paginated entertainers array with 200 status code", async () => {
				const response = await request(app).get(entertainerPath);
				expect(response.status).toBe(200);
				expect(response.body.message).toBe("All entertainers list");
			});
		});

		describe("given entertainer does not exist", () => {
			it("should return 404 status code", async () => {
				const response = await request(app).get(
					`${entertainerPath}/60706478aad6c9ad19a31c84`
				);
				expect(response.status).toBe(404);
			});
		});

		describe("given entertainer exist", () => {
			it("should fetch entertainer with 200 status code", async () => {
				const response = await request(app).get(
					`${entertainerPath}/${entertainerId}`
				);
				expect(response.status).toBe(200);
				expect(response.body.message).toBe("Single entertainer");
			});
		});
	});

	describe("DELETE /entertainers", () => {
		describe("given entertainer id", () => {
			it("should delete entertainer with 204 status code", async () => {
				const response = await request(app)
					.delete(`${entertainerPath}/${entertainerId}`)
					.set("Authorization", `Bearer ${token}`);
				expect(response.status).toBe(StatusCodes.OK);
				expect(response.body.message).toBe("Entertainer deleted");
			});
		});
	});

	afterAll(async () => {
		await mongoose.connection.dropDatabase();
		await mongoose.connection.close().then(() => {
			console.log("closing connection");
		});
	});
});
