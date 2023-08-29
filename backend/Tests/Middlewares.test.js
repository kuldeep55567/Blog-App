const { logger } = require('../Middleware/logger');
const { authMiddleWare } = require('../Middleware/Authentication');
const jwt = require('jsonwebtoken');
const User = require('../Model/UserModel');
jest.mock('jsonwebtoken');
jest.mock('../Model/UserModel');
describe('logger Middleware', () => {
  let mockRequest, mockResponse, next;
  beforeEach(() => {
    mockRequest = {
      url: '/test',
      method: 'GET',
    };
    mockResponse = {};
    next = jest.fn();
  });
  it('should log the endpoint and method', () => {
    const consoleSpy = jest.spyOn(console, 'log').mockImplementation();
    logger(mockRequest, mockResponse, next);
    expect(consoleSpy).toHaveBeenCalledWith('Endpoint:- /test | Method:- GET');
    expect(next).toHaveBeenCalled();
    consoleSpy.mockRestore();
  });
});
describe('authMiddleWare Middleware', () => {
    let mockRequest, mockResponse, next; 
    beforeEach(() => {
      mockRequest = {
        header: jest.fn(),
      };
      mockResponse = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
      next = jest.fn();
    });
    it('should pass with valid token and role', async () => {
      mockRequest.header.mockReturnValue('valid-token');
      jwt.verify.mockReturnValue({ id: 1 });
      User.findByPk.mockResolvedValue({ id: 1, role: 'admin', isBlocked: false });
      await authMiddleWare('admin')(mockRequest, mockResponse, next);
      expect(mockRequest.user).toEqual({ id: 1, role: 'admin', isBlocked: false });
      expect(next).toHaveBeenCalled();
    });
    it('should block access for blocked user', async () => {
      mockRequest.header.mockReturnValue('valid-token');
      jwt.verify.mockReturnValue({ id: 1 });
      User.findByPk.mockResolvedValue({ id: 1, role: 'user', isBlocked: true });
      await authMiddleWare('user')(mockRequest, mockResponse, next);
      expect(mockResponse.status).toHaveBeenCalledWith(403);
      expect(mockResponse.json).toHaveBeenCalledWith({ message: 'Access denied. User is blocked.' });
    });
  });