import { Injectable, NestMiddleware, ForbiddenException } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class CsrfMiddleware implements NestMiddleware {
  use(req: Request, _res: Response, next: NextFunction) {
    const isMutation = ['POST', 'PUT', 'DELETE', 'PATCH'].includes(req.method);
    const isAuthRefresh = req.path === '/auth/refresh' || req.path === '/auth/refresh/';

    if (isAuthRefresh || isMutation) {
      const hasCustomHeader = req.headers['x-requested-with'] === 'XMLHttpRequest' || !!req.headers['x-csrf-token'];
      const origin = req.headers.origin as string;
      const allowedOrigins = process.env.CORS_ORIGINS?.split(',').map(o => o.trim()).filter(o => o.length > 0) || [];
      
      const isValidOrigin = origin && allowedOrigins.includes(origin);

      if (!hasCustomHeader && !isValidOrigin) {
         throw new ForbiddenException('CSRF detected: Missing custom validation header or invalid origin');
      }
    }
    next();
  }
}
