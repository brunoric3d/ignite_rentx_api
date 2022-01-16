import { hash } from "bcryptjs";
import { v4 as uuidV4 } from "uuid";

import createConnection from "..";

async function create() {
  const connection = await createConnection();

  const id = uuidV4();
  const password = await hash(process.env.ADMIN_PASSWORD, 8);

  await connection.query(
    `INSERT INTO USERS(id, name, email, password, admin, created_at, driver_license)
    values('${id}', 'admin', 'admin@rentx.com.br', '${password}', true, 'now()', 'xxxxx')`
  );

  await connection.close;
}
create().then(() => console.log("user admin created"));
