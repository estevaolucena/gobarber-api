import { compare } from 'bcryptjs'
import { sign } from 'jsonwebtoken'
import { injectable, inject } from 'tsyringe'

import AppError from '@shared/errors/AppError'

import User from '@modules/users/infra/typeorm/entities/User'

import authConfig from '@config/auth'
import IUserRepository from '../repositories/IUsersRepository'

interface IRequest {
  email: string
  password: string
}

interface IResponse {
  user: User
  token: string
}

const enum Errors {
  incorrectCombination = 'Incorrect e-mail/password combination.',
}

@injectable()
class AuthenticateUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUserRepository,
  ) { }

  public async execute({ email, password }: IRequest): Promise<IResponse> {
    const user = await this.usersRepository.findByEmail(email)

    if (!user) {
      throw new AppError(Errors.incorrectCombination, 401)
    }

    const passwordMatched = await compare(password, user.password)

    if (!passwordMatched) {
      throw new AppError(Errors.incorrectCombination, 401)
    }

    const { secret, expiresIn } = authConfig.jwt

    const token = sign({}, secret, {
      subject: user.id,
      expiresIn,
    })

    return {
      user,
      token,
    }
  }
}

export default AuthenticateUserService