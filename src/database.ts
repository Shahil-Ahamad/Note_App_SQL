import mysql from "mysql2/promise";

// create connection
async function getMysqlConnection() {
  const conn = await mysql.createConnection({
    host: "localhost",
    user: "root",
    database: "note_db",
    password: "0486577@Mm",
    port: 3306,
    connectionLimit: 10,
    connectTimeout: 300,
  });
  return conn;
}
function getMySQLPool() {
  const pool = mysql.createPool({
    host: "localhost",
    user: "root",
    database: "note_db",
    password: "0486577@Mm",
    waitForConnections: true,
    connectionLimit: 10,
    maxIdle: 10, // max idle connections, the default value is the same as `connectionLimit`
    idleTimeout: 60000, // idle connections timeout, in milliseconds, the default value 60000
    queueLimit: 0,
    enableKeepAlive: true,
    keepAliveInitialDelay: 0,
  });
  return pool;
}

const myPool = getMySQLPool();

async function createNotesTable() {
  const conn = await getMysqlConnection();

  await conn.query(
    `
    CREATE TABLE IF NOT EXISTS todos(
    Id INT PRIMARY KEY AUTO_INCREMENT,
    Title VARCHAR(255),
    description VARCHAR(255),
     VARCHAR(255),
    Created_At DATETIME DEFAULT(NOW())
);
    `
  );
}

export async function createNote(title: string, description: string) {
  const conn = await getMysqlConnection();

  const result = await conn.query(
    `INSERT INTO notes (Title,Description,) VALUES ('${title}','${description}');`
  );

  return result[0];
}

export async function createNoteWithPool(title: string, description: string) {
  const result = await myPool.query(
    `INSERT INTO notes (Title,Description) VALUES ('${title}','${description}');`
  );

  return result[0];
}

export async function getNoteById(noteId: number) {
  const conn = await getMysqlConnection();

  const result = await conn.query(`SELECT * FROM notes WHERE id=${noteId}`);

  return result[0];
}

export async function getNoteByIdWithPool(noteId: number) {
  const result = await myPool.query(`SELECT * FROM notes WHERE id=${noteId}`);
  return result[0];
}

export async function getAllNotes() {
  const conn = await getMysqlConnection();

  const result = await conn.query("SELECT * FROM notes");

  console.log("getAllnotes Result:", result[0]);

  return result[0];
}

export async function getAllNotesWithPool() {
  const result = await myPool.query("SELECT * FROM notes");
  return result[0];
}

export async function updateNote(
  noteId: number,
  title: string,
  description: string
) {
  const conn = await getMysqlConnection();

  // Run the update query
  const result = await conn.query(
    `UPDATE notes SET Title='${title}' , Description ='${description}'  WHERE Id=${noteId}`
  );

  return result[0];
}

export async function updateNoteWithPool(
  noteId: number,
  title: string,
  description: string
) {
  const result = await myPool.query(
    `UPDATE notes SET Title='${title}' , Description ='${description}' WHERE Id=${noteId}`
  );
  return result[0];
}

export async function deleteNote(noteId: number) {
  const conn = await getMysqlConnection();

  const result = await conn.query(`DELETE FROM notes WHERE id = ${noteId}`);

  return result[0];
}

export async function deleteNoteWithPool(noteId: number) {
  const result = await myPool.query(`
    DELETE FROM notes WHERE id = '${noteId}'
    `);
  return result;
}
