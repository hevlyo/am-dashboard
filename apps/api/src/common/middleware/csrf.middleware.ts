import { Injectable, NestMiddleware, ForbiddenException } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class CsrfMiddleware implements NestMiddleware {
  use(req: Request, _res: Response, next: NextFunction) {
    if (req.path.includes('/auth/refresh') || ['POST', 'PUT', 'DELETE', 'PATCH'].includes(req.method)) {
      const hasCustomHeader = req.headers['x-requested-with'] === 'XMLHttpRequest' || !!req.headers['x-csrf-token'];
      const origin = req.headers.origin as string;
      const allowedOrigins = process.env.CORS_ORIGINS?.split(',').map(o => o.trim()).filter(o => o.length > 0) || [];
      
      if (!hasCustomHeader && origin && !allowedOrigins.includes(origin)) {
         throw new ForbiddenException('CSRF detected: Missing custom validation header');
      }
    }
    next();
  }
}
