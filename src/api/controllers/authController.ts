import { Request, Response } from 'express';
import { signup, login, getMyUser } from '../services/authService';

export const signupController = async (req: Request, res: Response) => {
  try {
    const { email, password, name } = req.body;
    await signup({ email, password, name });
    res.status(200).json({ message: 'User account created successfully!' });
  } catch (error) {
    res.status(error.message === 'Email already registered' ? 409 : 403).json({ error: error.message });
  }
};

export const loginController = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const { token } = await login({ email, password });
    res.status(200).json({ token, message: 'User logged in successfully!' });
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
};

export const getMyProfile = async (req: Request, res: Response) => {
  try {
    const email = req.user.email;
    const user = getMyUser(email);
    if(user !== null || user !== undefined){
        res.status(200).json({
            user: user
        })
    }else{
        res.status(401).json({
            error: "There is an error in retrieving Account Details at the moment!"
        })
    }
  } catch (error) {
      res.status(200).json({
          error: error.message
      })
  }
}