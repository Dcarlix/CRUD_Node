// importamos los paquetes y funciones
import express from 'express'
import cors from 'cors'
import productRoutes from './routes/products.routes.js'
//creamos la app y agregamos las configuraciones
const app = express();
//usamos express para los archivos json
app.use(express.json());
//usamos cors
app.use(cors());
//usamos las rutas que vienen de routes.js
app.use(productRoutes);
//exportamos la app para usarla en index
export default app;



