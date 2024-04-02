import sql from 'mssql'

const dbSetting = {
    user: 'seb',
    password: '123',
    server: 'localhost',
    database: 'chatbot_db',
    options: {
        encrypt: true, // for azure
        trustServerCertificate: true // change to true for local dev / self-signed certs
      }
}

export async function getConnection(){

    try {
        const pool = await sql.connect(dbSetting);
        return pool;

    } catch (error) {
        console.error(error);
    }
}
getConnection();

export {sql}
