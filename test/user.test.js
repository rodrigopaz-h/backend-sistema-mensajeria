const request = require("supertest");
const app = require("../app");
const { closePool } = require("../db/connection");

describe("Auth Endpoints", () => {
  const testEmail = `test${Date.now()}@gmail.com`;
  const testPassword = "123456";
  let token = "";

  beforeAll(async () => {
    // Registramos el usuario antes de probar el login
    const registerRes = await request(app).post("/api/register").send({
      nombre: "Rodrigo",
      email: testEmail,
      password: testPassword,
    });

    expect(registerRes.statusCode).toBe(201);
    expect(registerRes.body).toHaveProperty("mensaje", "Usuario registrado");
  });

  test("debería loguear un usuario existente y devolver un token", async () => {
    const loginRes = await request(app).post("/api/login").send({
      email: testEmail,
      password: testPassword,
    });

    // Verificamos que el status sea 200 y que haya token
    expect(loginRes.statusCode).toBe(200);
    expect(loginRes.body).toHaveProperty("token");

    // Se guarda el token para otros tests
    token = loginRes.body.token;

    // Agregado para verificar el contenido del token
    console.log("Token recibido en test:", token);
  });

  // Probar un endpoint protegido
  test("debería acceder a un endpoint protegido usando el token", async () => {
    const res = await request(app).get("/api/chat").set("Authorization", `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  afterAll(async () => {
    await closePool();
  });
});
