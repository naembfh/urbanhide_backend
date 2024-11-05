import express from 'express';
import upload from '../../config/multerConfig';
import { productControllers } from './product.controller';
import auth from '../../middlewares/auth';

const router = express.Router();

router.post('/create', auth(["ADMIN"]), upload.array('images', 5), productControllers.addProduct);
router.get('/all', productControllers.getAllProducts);
router.get('/:productId', productControllers.getProductById);
router.put('/edit/:productId', auth(["ADMIN"]), upload.array('images', 5), productControllers.updateProduct);
router.delete('/delete/:productId', auth(["ADMIN"]), productControllers.deleteProduct);

export const ProductRoutes = router;
