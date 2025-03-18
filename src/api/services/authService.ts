import Users from '../db/userModel';
import jwt from 'jsonwebtoken';

export const signup = async ({ email, password, name }) => {
  const existingUser = await Users.findOne({ email });
  if (existingUser) throw new Error('Email already registered');
  const user = await Users.create({ email, password, name });
  return user;
};

export const login = async ({ email, password }) => {
  const user = await Users.findOne({ email }).select('+password');
  if (!user || !(await user.matchPassword(password))) throw new Error('Invalid credentials');
  const token = jwt.sign({ id: user._id.toString(), email }, process.env.JWT_SECRET);
  return { token, user };
};

export const getMyUser = async (email: String ) => {
  const user = await Users.findOne({email: email});
  if(user !== null || user !== undefined) throw new Error("User does not exist");
  return user;
}