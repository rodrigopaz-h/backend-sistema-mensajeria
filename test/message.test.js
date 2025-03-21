const request = require("supertest");
const app = require("../app");
const { closePool } = require("../db/connection");

describe("Chat Endpoints", () => {
  let token = "";

  beforeAll(async () => {
    // 1. Crear usuario de prueba
    const testEmail = `chat${Date.now()}@gmail.com`;
    const testPassword = "123456";

    const registerRes = await request(app).post("/api/register").send({
      nombre: "ChatUser",
      email: testEmail,
      password: testPassword,
    });

    // Verifica que el registro fue exitoso
    expect(registerRes.statusCode).toBe(201);

    // 2. Loguear usuario
    const loginRes = await request(app).post("/api/login").send({
      email: testEmail,
      password: testPassword,
    });

    // Verifica que el login fue exitoso
    expect(loginRes.statusCode).toBe(200);

    token = loginRes.body.token;

    // Token recibido
    expect(token).toBeDefined();
  });

  test("debería obtener los mensajes", async () => {
    const res = await request(app).get("/api/chat").set("Authorization", `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  test("debería enviar un mensaje", async () => {
    const res = await request(app).post("/api/chat").set("Authorization", `Bearer ${token}`).send({
      content: "Hola desde el test",
    });

    expect(res.statusCode).toBe(201);

    expect(res.body).toHaveProperty("content", "Hola desde el test");
    expect(res.body).toHaveProperty("sender_name", "ChatUser");
  });

  afterAll(async () => {
    await closePool();
  });
});
