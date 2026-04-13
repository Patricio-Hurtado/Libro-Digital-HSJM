import * as testService from '../services/testService.js';

export const checkHealth = (req, res) => {
  const health = testService.getStatus();
  res.json(health);
};