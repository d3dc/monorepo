import { Router } from 'express';
import UserController from '../controller/UserController';
import { checkJwt } from '../middleware/checkJwt';
import { checkRole } from '../middleware/checkRole';

const router = Router();

// Get all users
router.get('/', [checkJwt, checkRole(['admin'])], UserController.listAll);

// Get one user
router.get(
  '/:id([0-9]+)',
  [checkJwt, checkRole(['admin'])],
  UserController.getOneById
);

// Create a new user
router.post('/', [checkJwt, checkRole(['admin'])], UserController.newUser);

// Edit one user
router.patch(
  '/:id([0-9]+)',
  [checkJwt, checkRole(['admin'])],
  UserController.editUser
);

// Delete one user
router.delete(
  '/:id([0-9]+)',
  [checkJwt, checkRole(['admin'])],
  UserController.deleteUser
);

export default router;