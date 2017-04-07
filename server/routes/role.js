import express from 'express';
import User from '../app/controllers/user';
import Auth from '../app/middlewares/Auth';

const rolesRouter = express.Router();
