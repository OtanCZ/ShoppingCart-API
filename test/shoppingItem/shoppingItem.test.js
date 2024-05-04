const request = require("supertest");
const app = require("../../app");

describe("shoppingItem tests", () => {
    let mockItem = {
        content: "test",
        count: 1,
        state: "ACTIVE"
    }

    let mockId;

    test("no content", async () => {
        const res = await request(app).post("/shoppingItem/create").send({count: 1});
        expect(res.statusCode).toBe(400);
    });

    test("no state", async () => {
        const res = await request(app).post("/shoppingItem/create").send({content: "test", count: 1});
        expect(res.statusCode).toBe(400);
    });

    test("create item", async () => {
        const res = await request(app).post("/shoppingItem/create").send(mockItem);
        expect(res.statusCode).toBe(200);
        expect(res.body.content).toBe(mockItem.content);
        expect(res.body.count).toBe(mockItem.count);
        expect(res.body.state).toBe(mockItem.state);
        mockId = res.body._id;
    });

    test("get item", async () => {
        const res = await request(app).get("/shoppingItem/get/" + mockId);
        expect(res.statusCode).toBe(200);
        expect(res.body.content).toBe(mockItem.content);
        expect(res.body.count).toBe(mockItem.count);
        expect(res.body.state).toBe(mockItem.state);
    });

    test("update item", async () => {
        const res = await request(app).put("/shoppingItem/update/" + mockId).send({state: "CANCELLED"});
        expect(res.statusCode).toBe(200);
        expect(res.body.state).toBe("CANCELLED");
    });

    test("wrong state", async () => {
        const res = await request(app).put("/shoppingItem/update/" + mockId).send({state: "WRONG"});
        expect(res.statusCode).toBe(400);
    });

    test("wrong count", async () => {
        const res = await request(app).put("/shoppingItem/update/" + mockId).send({count: -1});
        expect(res.statusCode).toBe(400);
    });

    test("list items", async () => {
        const res = await request(app).get("/shoppingItem/list").send({state: "CANCELLED"});
        expect(res.statusCode).toBe(200);
        expect(res.body.some(item => item._id === mockId)).toBe(true);
    });

    test("delete item", async () => {
        const res = await request(app).delete("/shoppingItem/delete/" + mockId);
        expect(res.statusCode).toBe(200);
    });

    test("get item not found", async () => {
        const res = await request(app).get("/shoppingItem/" + mockId);
        expect(res.statusCode).toBe(404);
    });
})