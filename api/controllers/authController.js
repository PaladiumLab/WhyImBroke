import { signup, login } from '../services/authService.js';

export const signupController = async (req, res) => {
  try {
    const { email, password, name } = req.body;
    await signup({ email, password, name });
    res.status(200).json({ message: 'User account created successfully!' });
  } catch (error) {
    res.status(error.message === 'Email already registered' ? 409 : 403).json({ error: error.message });
  }
};

export const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    const { token } = await login({ email, password });
    res.status(200).json({ token, message: 'User logged in successfully!' });
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
};