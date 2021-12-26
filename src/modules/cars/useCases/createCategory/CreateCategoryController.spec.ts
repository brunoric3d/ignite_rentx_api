import { hash } from "bcryptjs";
import request from "supertest";
import { Connection, createConnection } from "typeorm";
import { v4 as uuidV4 } from "uuid";

import { app } from "../../../../server";

const user = "admin@rentx.com.br";
const pwd = "admin";

let connection: Connection;

beforeAll(async () => {
  connection = await createConnection();
  await connection.runMigrations();

  const id = uuidV4();
  const password = await hash(pwd, 8);

  await connection.query(
    `INSERT INTO USERS(id, name, email, password, admin, created_at, driver_license)
    values('${id}', 'admin', '${user}' , '${password}',true, now(), 'xxxxx')`
  );
});

afterAll(async () => {
  await connection.dropDatabase();
  await connection.close;
});

describe("Create category controller", () => {
  it("Should be able to create a category", async () => {
    const req = await request(app)
      .post("/sessions")
      .send({ email: user, password: pwd });

    const { token } = req.body;

    console.log(token);

    const res = await request(app)
      .post("/categories")
      .send({
        name: "Usado",
        description: "Carros usados",
      })
      .set({ Authorization: `Bearer ${token}` });

    expect(res.status).toBe(201);
  });

  /* it("Should not be able to create a category with the same name", async () => {
    const req = await request(app)
      .post("/sessions")
      .send({ email: user, password: pwd });

    const { token } = req.body;

    console.log(token);

    const res = await request(app)
      .post("/categories")
      .send({
        name: "Usado",
        description: "Carros usados",
      })
      .set({ Authorization: `Bearer ${token}` });

    expect(res.status).toBe(400);
  }); */
});
