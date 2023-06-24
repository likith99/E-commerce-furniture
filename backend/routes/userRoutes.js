import express from 'express';
import bcrypt from 'bcryptjs';
import expressAsyncHandler from 'express-async-handler';
import User from '../models/userModel.js';
import { isAuth, isAdmin, generateToken } from '../utils.js';

const userRouter = express.Router();

/**
 * @openapi
 * paths:
 *  /api/users/:
 *    get:
 *      tags:
 *          - Get all users
 *      summary: Returns all registered users     
 *      responses:
 *          200: 
 *            description: Success
 *          400:
 *            description: Bad Request 
 */
userRouter.get(
  '/',
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const users = await User.find({});
    res.send(users);
  })
);

/**
 * @openapi
 * paths:
 *  /api/users/{id}:
 *    get:
 *      tags:
 *        - Get user by id
 *      summary: Returns a specific user
 *      parameters:
 *        - name: id
 *          in: path
 *          required: true
 *          type: string   
 *      responses:
 *          200: 
 *            description: Success
 *          400:
 *            description: Bad Request 
 */
userRouter.get(
  '/:id',
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);
    if (user) {
      res.send(user);
    } else {
      res.status(404).send({ message: 'User Not Found' });
    }
  })
);

/**
 * @openapi
 * paths:
 *  /api/users/{id}:
 *    put:
 *      tags:
 *        - Update user
 *      summary: Updates a specific user
 *      parameters:
 *        - name: id
 *          in: path
 *          required: true
 *          type: string  
 *      responses:
 *          200: 
 *            description: Success, User updated
 *          404:
 *            description: Not Found 
 */
userRouter.put(
  '/:id',
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);
    if (user) {
      user.name = req.body.name || user.name;
      user.email = req.body.email || user.email;
      user.isAdmin = Boolean(req.body.isAdmin);
      const updatedUser = await user.save();
      res.send({ message: 'User Updated', user: updatedUser });
    } else {
      res.status(404).send({ message: 'User Not Found' });
    }
  })
);

/**
 * @openapi
 * paths:
 *  /api/users/{id}:
 *    delete:
 *      tags:
 *        - Delete user
 *      summary: Deletes a specific user
 *      parameters:
 *        - name: id
 *          in: path
 *          required: true
 *          type: string   
 *      responses:
 *          200: 
 *            description: Success, Deleted user
 *          404:
 *            description: User Not Found 
 */
userRouter.delete(
  '/:id',
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);
    if (user) {
      if (user.email === 'admin@example.com') {
        res.status(400).send({ message: 'Can Not Delete Admin User' });
        return;
      }
      await user.remove();
      res.send({ message: 'User Deleted' });
    } else {
      res.status(404).send({ message: 'User Not Found' });
    }
  })
);
/**
 * @openapi
 * paths:
 *  /api/users/signin:
 *    post:
 *      tags:
 *        - User login
 *      summary: User login
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              required:
 *                - email
 *                - password
 *              properties:
 *                email:
 *                  type: string
 *                  default: johndoe@email.com
 *                password:
 *                  type: string
 *                  default: somepassword
 *      responses:
 *          201: 
 *            description: User Login Successful
 *          401:
 *            description: Invalid email or password 
 */
userRouter.post(
  '/signin',
  expressAsyncHandler(async (req, res) => {
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      if (bcrypt.compareSync(req.body.password, user.password)) {
        res.send({
          _id: user._id,
          name: user.name,
          email: user.email,
          isAdmin: user.isAdmin,
          token: generateToken(user),
        });
        return;
      }
    }
    res.status(401).send({ message: 'Invalid email or password' });
  })
);

/**
 * @openapi
 * paths:
 *  /api/users/signup:
 *    post:
 *      tags:
 *          - User Signup
 *      summary: User Signup
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              required: 
 *                - name
 *                - email
 *                - password
 *              properties:
 *                name:
 *                  type: string
 *                  default: john
 *                email:
 *                  type: string
 *                  default: johndoe@email.com
 *                password:
 *                  type: string
 *                  default: somepassword
 *      responses:
 *          201: 
 *            description: User Signup Successful
 *          400:
 *            description: Bad Request 
 */
userRouter.post(
  '/signup',
  expressAsyncHandler(async (req, res) => {
    const newUser = new User({
      name: req.body.name,
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password),
    });
    const user = await newUser.save();
    res.send({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user),
    });
  })
);

/**
 * @openapi
 * paths:
 *  /api/users/profile:
 *    patch:
 *      tags:
 *          - Update user profile
 *      summary: Updates user profile
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              required: 
 *                - name
 *                - email
 *                - password
 *              properties:
 *                name:
 *                  type: string
 *                  default: john
 *                email:
 *                  type: string
 *                  default: johndoe@email.com
 *                password:
 *                  type: string
 *                  default: somepassword
 *      responses:
 *          201: 
 *            description: User Profile Updates
 *          404:
 *            description: User Not Found 
 */
userRouter.patch(
  '/profile',
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);
    if (user) {
      user.name = req.body.name || user.name;
      user.email = req.body.email || user.email;
      if (req.body.password) {
        user.password = bcrypt.hashSync(req.body.password, 8);
      }

      const updatedUser = await user.save();
      res.send({
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        isAdmin: updatedUser.isAdmin,
        token: generateToken(updatedUser),
      });
    } else {
      res.status(404).send({ message: 'User not found' });
    }
  })
);

export default userRouter;
