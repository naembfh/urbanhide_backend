import express from 'express';

import upload from '../../config/multerConfig';
import { categoryControllers } from './category.controller';



const router = express.Router();

router.post('/create', upload.single('image'), categoryControllers.addCategory);
router.get('/all', categoryControllers.getAllCategories);
router.put('/edit/:categoryId', upload.single('image'), categoryControllers.updateCategory);
router.delete('/delete/:categoryId', categoryControllers.deleteCategory);

export const categoryRoutes = router;
