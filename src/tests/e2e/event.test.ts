const mongoose = require("mongoose");
import App from "@/app";
import AuthRoute from "@/routes/auth.route";
import EventRoutes from "@/routes/event.route";
import request from "supertest";
import "dotenv/config";
import { Routes } from "@/interfaces/route.interface";
import { StatusCodes } from "http-status-codes";
import { mockEvents } from "@/constants/mocks/event.mock";
import { Application } from "express";

let app: Application;

describe("Event routes", () => {
	let token = "";
	let eventId = "";
	let eventPath = "/events";
	let authPath = "/auth";

	beforeAll(async () => {
		app = new App([new EventRoutes(), new AuthRoute()]).getServer();
		mongoose
			.connect("mongodb://localhost/test_database")
			.then(() => {
				console.log("Connected to test database");
			})
			.catch((error: any) => {
				console.log("Test Databse Error: " + error);
			});
	});

	describe("POST /user", () => {
		it("should register a new a new user", async () => {
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

	describe("POST /events", () => {
		it("should create a new event", async () => {
			const response = await request(app)
				.post(eventPath)
				.send({
					name: "Event 1",
					description: "Wedding celebration event between two families",
					startDate: new Date("2022-01-01"),
					endDate: new Date("2022-02-03"),
					startTime: "12:00:00",
					endTime: "12:00:00",
					cost: 1000,
					images: ["image1.jpg", "image2.jpg"],
					eventType: "wedding",
					eventCenter: "60706478aad6c9ad19a31c84",
					user: "60706478aad6c9ad19a31c84",
				})
				.set("Authorization", `Bearer ${token}`);
			eventId = response.body.data._id;
			expect(response.status).toBe(201);
			expect(response.body).toHaveProperty("data");
			expect(response.body.message).toBe("created");
		});
	});

	describe("GET /events", () => {
		it("should return 200 and all events", async () => {
			const response = await request(app).get(eventPath);
			expect(response.status).toBe(200);
			expect(response.body).toHaveProperty("data");
			expect(response.body.message).toBe("All events list");
		});

		it("should return 200 with a single event", async () => {
			const response = await request(app).get(`/events/${eventId}`);
			expect(response.status).toBe(200);
			expect(response.body.message).toBe("Single event");
		});
	});

	describe("UPDATE /events", () => {
		it("should return 201 and updated event", async () => {
			const response = await request(app)
				.put(`${eventPath}/${eventId}`)
				.send({ ...mockEvents[0], name: "Aliyu's wedding" })
				.set("Authorization", `Bearer ${token}`);
			expect(response.status).toBe(StatusCodes.CREATED);
			expect(response.body.message).toBe("Updated event");
		});
	});

	describe("DELETE /events", () => {
		it("should return 204 and deleted event", async () => {
			const response = await request(app)
				.delete(`${eventPath}/${eventId}`)
				.set("Authorization", `Bearer ${token}`);
			expect(response.status).toBe(StatusCodes.NO_CONTENT);
		});
	});

	afterAll(async () => {
		await mongoose.connection.dropDatabase();
		await mongoose.connection.close().then(() => {
			console.log("closing connection");
		});
	});
});
