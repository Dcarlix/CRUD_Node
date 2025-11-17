//importamos el objeto router de exprees
import { Router } from "express";
import { deleteProduct, getProduct, getProducts, createProduct, updateProduct } from "../controllers/products.controllers.js";
//Creamos una constante de tipo router, que sirve para los endpoints
const router = Router();
//ruta para obtener un listado de produtos, metodo GET
router.get("/productos", getProducts);
//ruta para obtener un solo producto, metodo GET con parametro
router.get("/productos/:id", getProduct);
//ruta para crear un producto, metodo POST con parametro
router.post("/productos", createProduct);
//ruta para actualizar un producto, metodo PUT con parametro
router.put("/productos/:id", updateProduct);
//ruta para borrar un producto, metodo DELETE con parametro
router.delete("/productos/:id", deleteProduct);
//Exportamos las rutas
export default router