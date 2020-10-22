/* eslint-disable no-console */
import 'reflect-metadata'
import express, { Request, Response, NextFunction } from 'express'
import cors from 'cors'
import 'express-async-errors'

import routes from './routes'

import AppError from '../../errors/AppError'

import uploadConfig from '../../../config/upload'

import '../typeorm'

const app = express()

app.use(cors())
app.use(express.json())
app.use('/files', express.static(uploadConfig.directory))
app.use(routes)
app.use(
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  (error: Error, request: Request, response: Response, _: NextFunction) => {
    if (error instanceof AppError) {
      return response.status(error.statusCode).json({
        status: 'error',
        message: error.message,
      })
    }

    console.error(error)

    return response.status(500).json({
      status: 'error',
      message: 'Internal server error.',
    })
  },
)

app.listen(3333, () => {
  console.log('🚀️ Aplicação voando na porta 3333.')
})
