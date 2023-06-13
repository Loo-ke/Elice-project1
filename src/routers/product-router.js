import { Router } from 'express';
import { productController } from '../controllers/product-controller.js';
import { adminOnly } from "../middlewares/index.js"
import { loginRequired } from "../middlewares/index.js"
const productRouter = Router();

productRouter.post('/product', loginRequired, adminOnly, productController.createProduct);
productRouter.get('/product', productController.getProductList);
// 제품 등록 시 필요한 데이터 => 제품명, 아이디, 가격, , 올린 사람 
productRouter.get('/product/:productId',productController.getProduct);
productRouter.get('/product/category/:name',productController.getProductByCategory);

productRouter.put('/product/:productId',loginRequired, adminOnly, productController.updateProduct);
productRouter.delete('/product/:productId', loginRequired, adminOnly, productController.deleteProduct);

export default productRouter;
