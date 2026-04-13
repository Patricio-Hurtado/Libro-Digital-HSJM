import * as authService from '../services/authService.js';

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const data = await authService.login(email, password);
    res.json(data);
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
};