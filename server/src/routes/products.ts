import express, { Request, Response, Router, RequestHandler } from 'express';
import { PrismaClient } from '@prisma/client';
import { authenticateToken, checkRole } from '../middleware/auth';

interface AuthRequest extends Request {
  user?: {
    id: string;
    email: string;
    role: string;
  };
}

const router: Router = express.Router();
const prisma = new PrismaClient();

// Get all products
const getAllProducts: RequestHandler = async (_req, res) => {
  try {
    const products = await prisma.product.findMany({
      include: {
        supplier: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching products' });
  }
};

// Get product by id
const getProductById: RequestHandler = async (req, res) => {
  try {
    const product = await prisma.product.findUnique({
      where: { id: req.params.id },
      include: {
        supplier: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });
    if (!product) {
      res.status(404).json({ error: 'Product not found' });
      return;
    }
    res.json(product);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching product' });
  }
};

// Create product (Supplier only)
const createProduct: RequestHandler = async (req: AuthRequest, res) => {
  try {
    const { name, description, price, category, stock, imageUrl } = req.body;
    const product = await prisma.product.create({
      data: {
        name,
        description,
        price: parseFloat(price),
        category,
        stock: parseInt(stock),
        imageUrl,
        supplierId: req.user!.id,
      },
    });
    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ error: 'Error creating product' });
  }
};

// Update product (Supplier only - owner of the product)
const updateProduct: RequestHandler = async (req: AuthRequest, res) => {
  try {
    const product = await prisma.product.findUnique({
      where: { id: req.params.id },
    });

    if (!product) {
      res.status(404).json({ error: 'Product not found' });
      return;
    }

    if (product.supplierId !== req.user!.id && req.user!.role !== 'ADMIN') {
      res.status(403).json({ error: 'Unauthorized to update this product' });
      return;
    }

    const { name, description, price, category, stock, imageUrl } = req.body;
    const updatedProduct = await prisma.product.update({
      where: { id: req.params.id },
      data: {
        name,
        description,
        price: parseFloat(price),
        category,
        stock: parseInt(stock),
        imageUrl,
      },
    });
    res.json(updatedProduct);
  } catch (error) {
    res.status(500).json({ error: 'Error updating product' });
  }
};

// Delete product (Supplier only - owner of the product)
const deleteProduct: RequestHandler = async (req: AuthRequest, res) => {
  try {
    const product = await prisma.product.findUnique({
      where: { id: req.params.id },
    });

    if (!product) {
      res.status(404).json({ error: 'Product not found' });
      return;
    }

    if (product.supplierId !== req.user!.id && req.user!.role !== 'ADMIN') {
      res.status(403).json({ error: 'Unauthorized to delete this product' });
      return;
    }

    await prisma.product.delete({
      where: { id: req.params.id },
    });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Error deleting product' });
  }
};

router.get('/', getAllProducts);
router.get('/:id', getProductById);
router.post('/', authenticateToken, checkRole(['SUPPLIER', 'ADMIN']), createProduct);
router.put('/:id', authenticateToken, checkRole(['SUPPLIER', 'ADMIN']), updateProduct);
router.delete('/:id', authenticateToken, checkRole(['SUPPLIER', 'ADMIN']), deleteProduct);

export default router;