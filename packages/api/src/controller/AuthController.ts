import { Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';
import { getRepository } from 'typeorm';
import { validate } from 'class-validator';
import { User } from '../entity/User';

class AuthController {

  /**
   * Handle login
   * @param req 
   * @param res 
   */
  static async login(req: Request, res: Response) {
    // Check if username and password are set
    let { username, password } = req.body;
    if (!(username && password)) {
      res.status(400).send();
    }

    // Get user from database
    const userRepository = getRepository(User);
    let user: User;
    try {
      user = await userRepository.findOneOrFail({ where: { username } });
    } catch (error) {
      res.status(401).send();
    }

    // Check if encrypted password match
    if (!user.checkIfUnencryptedPasswordIsValid(password)) {
      res.status(401).send();
      return;
    }

    // Sign JWT, valid for 1 hour
    const token = jwt.sign(
      { userId: user.id, username: user.username, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    // Send the jwt in the response
    res.send({
      access_token: token,
      token_type  : 'bearer',
      expires_in  : '1hr'
    });
  };

  /**
   * Handle change password
   * @param req 
   * @param res 
   */
  static async changePassword(req: Request, res: Response) {
    // Get ID from JWT
    const id = res.locals.jwtPayload.userId;

    // Get parameters from the body
    const { oldPassword, newPassword } = req.body;
    if (!(oldPassword && newPassword)) {
      res.status(400).send();
    }

    // Get user from the database
    const userRepository = getRepository(User);
    let user: User;
    try {
      user = await userRepository.findOneOrFail(id);
    } catch (id) {
      res.status(401).send();
    }

    // Check if old password matchs
    if (!user.checkIfUnencryptedPasswordIsValid(oldPassword)) {
      res.status(401).send();
      return;
    }

    // Validate de model (password lenght)
    user.password = newPassword;
    const errors = await validate(user);
    if (errors.length > 0) {
      res.status(400).send(errors);
      return;
    }
    // Hash the new password and save
    user.hashPassword();
    userRepository.save(user);

    res.status(204).send();
  };

  /**
   * Handle reset password
   * @param req 
   * @param res 
   */
  static async resetPassword(req: Request, res: Response) {
    // TODO
    // generate token
    // send email via node-mailer (mailgun)
  }

  /**
   * Handle forgot password request
   * @param req 
   * @param res 
   */
  static async forgotPassword(req: Request, res: Response) {
    // TODO
    // validate token
    // change password
  }
}
export default AuthController;
