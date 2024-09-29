import mysql from "mysql2/promise";

// create connection
async function getMysqlConnection() {
  const conn = await mysql.createConnection({
    host: "localhost",
    user: "root",
    database: "note_db",
    password: "0486577@Mm",
    port: 3306,
  });
  return conn;
}

export async function getAllnotes() {
  const conn = await getMysqlConnection();

  const result = await conn.query("SELECT * FROM notes");

  console.log("getAllnotes Result:", result[0]);

  return result[0];
}

async function createnotesTable() {
  const conn = await getMysqlConnection();

  await conn.query(
    `
    CREATE TABLE IF NOT EXISTS todos(
    Id INT PRIMARY KEY AUTO_INCREMENT,
    Title VARCHAR(255),
    Name VARCHAR(255),
    Status VARCHAR(255),
    Created_At DATETIME DEFAULT(NOW())
);
    `
  );
}

export async function createnote(title: string, name: string, status: string) {
  const conn = await getMysqlConnection();

  const result = await conn.query(
    `INSERT INTO notes (Title,Name,Status) VALUES ('${name}','${title}','${status}');`
  );

  return result[0];
}

export async function getnoteById(noteId: number) {
  const conn = await getMysqlConnection();

  const result = await conn.query(`SELECT * FROM notes WHERE id=${noteId}`);

  return result[0];
}

export async function updatenote(
  noteId: number,
  title: string,
  name: string,
  status: string
) {
  const conn = await getMysqlConnection();

  // Run the update query
 const result = await conn.query(
    `UPDATE notes SET Title='${title}' , Name ='${name}' ,Status='${status}' WHERE Id=${noteId}`
  );


  return result[0];  
}


export async function deletenote(noteId: number) {
  const conn = await getMysqlConnection();

  const result = await conn.query(`DELETE FROM notes WHERE id = ${noteId}`);

  return result[0];
}
