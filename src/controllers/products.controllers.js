//importamos las dependencias que usaremos mas adelante
import { getConnection } from "../database/connection.js"
import sql from 'mssql'

//metodo para obtener los productos
export const getProducts = async (req, res)=>{
    //codigo nuevo que ira dentro de la funcion
    const pool = await getConnection(); //establecemos la conexion
    const result = await pool.request().query("SELECT * FROM products"); //obtener productos
    res.json(result.recordset)//recibir la respuesta de que se recibio
};
//metodo para obtener un produco, segun id
export const getProduct = async (req, res)=>{
    //codigo nuevo que ira dentro de la funcion
    const pool = await getConnection(); //conextion a bd
    const result = await pool
    .request()
    .input('id', sql.Int, req.params.id)//como parametro pasamo el id
    .query("SELECT * FROM products WHERE id = @id")
    //hacemos un query donde el resultado sera el regitro con ese id
    //si en el resultado nada fue afectado, el producto no existe
    if (result.rowsAffected[0] === 0) {
        return res.status(404).json({message: "Product not found"})
    }
    //retornamos el registro encontrado en la bd
    return res.json(result.recordset[0])
}
//metodo para crear un producto
export const createProduct = async (req, res)=>{
    //código nuevo que ira dentro de la función
    const pool= await getConnection();//Conectarnos a la base de datos
    const result = await pool //Haremos una consulta a la base de datos
    .request()//hacemos un request, es decir abrir esa conexion
    .input('name', sql.VarChar, req.body.name)//a este request le ponemos estos inputs, es decir los parametros
    .input('description', sql.Text, req.body.description)
    .input('quantity', sql.Int, req.body.quantity)
    .input('price', sql.Decimal, req.body.price)
    //Elaboramos la consulta donde creamos el producto segun los parametros que pasamos en los inputs
    .query("INSERT INTO products (name, description, quantity, price) VALUES (@name, @description, @quantity, @price); SELECT SCOPE_IDENTITY() AS id;")
    //le mandamos como respuesta el objeto de prodcuto creado e ingresado a la base de datos
    res.json({
        id: result.recordset[0].id,
        name: req.body.name,
        description: req.body.description,
        quantity : req.body.quantity,
        price: req.body.price,  
    });
};
//metodo para actualizar un producto, segun id
export const updateProduct = async (req, res)=>{
    //código nuevo que ira dentro de la función
    const pool= await getConnection();//conexion con la bd
    const result = await pool
    .request()//hacemos la request y pasamos todos los parametros de la consulta
    .input('id', sql.Int, req.params.id)//notar que el id lo sacamos de params y no de body
    .input('name', sql.VarChar, req.body.name)
    .input('description', sql.Text, req.body.description)
    .input('quantity', sql.Int, req.body.quantity)
    .input('price', sql.Decimal, req.body.price)
    .query("UPDATE products SET name = @name, description = @description, quantity = @quantity, price = @price WHERE id = @id");
    //hacemos la consulta donde actualizamos los datos del registro con el id que fue pasado en los parametros de la request
    //si no encontro nada, se da el error not found
    if (result.rowsAffected[0] === 0) {
        return res.status(404).json({message: "Product not found"})
    }
    //si lo actualiza le damos como respuesta el producto actualizado
    return res.json({
        id: req.params.id,
        name: req.body.name,
        description: req.body.description,
        quantity : req.body.quantity,
        price: req.body.price
    });
}
//metodo para eliminar un producto, segun id
export const deleteProduct = async (req, res)=>{
    //código nuevo que ira dentro de la función
    const pool = await getConnection();//conexion a la bd
    const result = await pool.request()
    .input('id', sql.Int, req.params.id)//pasamos el id del registro
    .query("DELETE FROM products WHERE id = @id");
    //hacemos la consulta donde eliminamos el registro que tenga ese id
    //si no afecta nada, es porque no lo encontro
    if (result.rowsAffected[0] === 0) {
        return res.status(404).json({message: "Product not found"})
    }
    //en dado caso lo elimine, le enviamos el mensaje de eliminacion
    return res.json({message: "Product deleted"})
}