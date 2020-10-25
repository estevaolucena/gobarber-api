import { compare, hash } from 'bcryptjs'
import IHashProvider from '../models/IHasgProvider'

class BCryptHashProvider implements IHashProvider {
  public async generatedHash(payload: string): Promise<string> {
    return hash(payload, 8)
  }

  public async compareHash(payload: string, hashed: string): Promise<boolean> {
    return compare(payload, hashed)
  }
}

export default BCryptHashProvider
