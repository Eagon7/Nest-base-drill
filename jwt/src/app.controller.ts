import { Controller, Get } from '@nestjs/common'
import fs, { readFileSync } from 'fs'
import { resolve } from 'path'

@Controller()
export class AppController {
  private readonly envConfig: Record<string, string>

  constructor() {}
}
