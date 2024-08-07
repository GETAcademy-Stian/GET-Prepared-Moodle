const request = require("supertest");
const app = require("./index");

describe("GET /api/users", () => {
	it("should return all users", async () => {
		const res = await request(app).get("/api/users");
		expect(res.statusCode).toEqual(200);
		expect(res.body).toBeInstanceOf(Array);
	});
});
