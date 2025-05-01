import express, { Request, Response, Router, RequestHandler } from 'express';
import { PrismaClient } from '@prisma/client';
import { authenticateToken, checkRole } from '../middleware/auth';

interface OrderItem {
  productId: string;
  quantity: number;
  price: number;
}

const router: Router = express.Router();
const prisma = new PrismaClient();

// Create order
const createOrder: RequestHandler = async (req: Request, res: Response): Promise<void> => {
  try {
    const { items } = req.body as { items: OrderItem[] };
    let total = 0;

    // Validate items and calculate total
    for (const item of items) {
      const product = await prisma.product.findUnique({
        where: { id: item.productId },
      });

      if (!product) {
        res.status(400).json({ error: `Product ${item.productId} not found` });
        return;
      }

      if (product.stock < item.quantity) {
        res.status(400).json({ 
          error: `Insufficient stock for product ${product.name}` 
        });
        return;
      }

      total += product.price * item.quantity;
    }

    // Create order and order items in a transaction
    const order = await prisma.$transaction(async (tx: PrismaClient) => {
      const newOrder = await tx.order.create({
        data: {
          userId: req.user!.id,
          total,
          items: {
            create: items.map((item) => ({
              productId: item.productId,
              quantity: item.quantity,
              price: item.price,
            })),
          },
        },
        include: {
          items: {
            include: {
              product: true,
            },
          },
        },
      });

      // Update product stock
      for (const item of items) {
        await tx.product.update({
          where: { id: item.productId },
          data: {
            stock: {
              decrement: item.quantity,
            },
          },
        });
      }

      return newOrder;
    });

    res.status(201).json(order);
  } catch (error) {
    res.status(500).json({ error: 'Error creating order' });
  }
};

// Get user's orders
const getUserOrders: RequestHandler = async (req: Request, res: Response): Promise<void> => {
  try {
    const orders = await prisma.order.findMany({
      where: {
        userId: req.user!.id,
      },
      include: {
        items: {
          include: {
            product: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching orders' });
  }
};

// Get order by ID (user's own order or admin/supplier)
const getOrderById: RequestHandler = async (req: Request, res: Response): Promise<void> => {
  try {
    const order = await prisma.order.findUnique({
      where: { id: req.params.id },
      include: {
        items: {
          include: {
            product: true,
          },
        },
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });

    if (!order) {
      res.status(404).json({ error: 'Order not found' });
      return;
    }

    if (
      order.userId !== req.user!.id &&
      req.user!.role !== 'ADMIN' &&
      req.user!.role !== 'SUPPLIER'
    ) {
      res.status(403).json({ error: 'Unauthorized to view this order' });
      return;
    }

    res.json(order);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching order' });
  }
};

// Update order status (admin only)
const updateOrderStatus: RequestHandler = async (req: Request, res: Response): Promise<void> => {
  try {
    const { status } = req.body;
    const order = await prisma.order.update({
      where: { id: req.params.id },
      data: { status },
      include: {
        items: {
          include: {
            product: true,
          },
        },
      },
    });
    res.json(order);
  } catch (error) {
    res.status(500).json({ error: 'Error updating order status' });
  }
};

// Get all orders (admin only)
const getAllOrders: RequestHandler = async (_req: Request, res: Response): Promise<void> => {
  try {
    const orders = await prisma.order.findMany({
      include: {
        items: {
          include: {
            product: true,
          },
        },
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching orders' });
  }
};

// Apply middleware to routes
router.post('/', authenticateToken, createOrder);
router.get('/my-orders', authenticateToken, getUserOrders);
router.get('/:id', authenticateToken, getOrderById);
router.patch('/:id/status', authenticateToken, checkRole(['ADMIN']), updateOrderStatus);
router.get('/', authenticateToken, checkRole(['ADMIN']), getAllOrders);

export default router;