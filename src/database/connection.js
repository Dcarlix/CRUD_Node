//importamos el objeto sql de mssql
import sql from 'mssql'
//Configuramos la conexion, semejante a la cadena de conexion
const dbSettings = {
    user: "sa", //usuario
    password: "123456", //contraseña del usuario
    server: "localhost", //Servidor de sql 
    database: "API_Productos_Node", //nombre de la base de datos
    options:{ //opciones extra como la seguridad y el puerto de la conexion
        encrypt: false,
        trustServerCertificate: true,
        port: 1433
    }
}
//exportamos el metodo que nos permite conectaros a la base de datos
export const getConnection  = async () => {
    try {
        const pool = await sql.connect(dbSettings);
        return pool;
    } catch (error) {
        console.error(error);
    }
}