import {
  Controller,
  Post,
  Body,
  UseGuards,
  Get,
  Res,
  UsePipes,
  HttpStatus,
  HttpCode,
} from "@nestjs/common";
import type { Response } from "express";
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
} from "@nestjs/swagger";
import { AuthService } from "./auth.service";
import {
  loginSchema,
  registerSchema,
  LoginInput,
  RegisterInput,
  User,
} from "@repo/schemas";
import { ZodValidationPipe } from "../common/pipes/zod-validation.pipe";
import { JwtAuthGuard } from "./guards/jwt-auth.guard";
import { JwtRefreshGuard } from "./guards/jwt-refresh.guard";
import { CurrentUser } from "../common/decorators/current-user.decorator";

import { AuthResponseDto, UserDto } from "./dto/auth-response.dto";

@ApiTags("auth")
@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("login")
  @ApiOperation({ summary: "Login do usuário" })
  @ApiResponse({ status: 200, description: "Login realizado com sucesso", type: AuthResponseDto })
  @ApiResponse({ status: 401, description: "Credenciais inválidas" })
  @UsePipes(new ZodValidationPipe(loginSchema))
  @HttpCode(HttpStatus.OK)
  async login(
    @Body() body: LoginInput,
    @Res({ passthrough: true }) res: Response,
  ): Promise<AuthResponseDto> {
    const { user, tokens } = await this.authService.login(body);

    const isProduction = process.env.NODE_ENV === "production";
    res.cookie("refreshToken", tokens.refreshToken, {
      httpOnly: true,
      secure: isProduction,
      sameSite: isProduction ? "none" : "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000, 
    });

    return { 
      user: {
        ...user,
        createdAt: user.createdAt.toISOString(),
      },
      tokens 
    };
  }

  @Post("register")
  @ApiOperation({ summary: "Registrar novo usuário" })
  @ApiResponse({ status: 201, description: "Usuário criado com sucesso", type: AuthResponseDto })
  @ApiResponse({ status: 409, description: "Email já cadastrado" })
  @UsePipes(new ZodValidationPipe(registerSchema))
  async register(
    @Body() body: RegisterInput,
    @Res({ passthrough: true }) res: Response,
  ): Promise<AuthResponseDto> {
    const { user, tokens } = await this.authService.register(body);

    const isProduction = process.env.NODE_ENV === "production";
    res.cookie("refreshToken", tokens.refreshToken, {
      httpOnly: true,
      secure: isProduction,
      sameSite: isProduction ? "none" : "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return { 
      user: {
        ...user,
        createdAt: user.createdAt.toISOString(),
      }, 
      tokens 
    };
  }

  @Post("refresh")
  @UseGuards(JwtRefreshGuard)
  @ApiOperation({ summary: "Renovar Access Token usando Refresh Token" })
  @ApiResponse({ status: 200, description: "Token renovado com sucesso", type: AuthResponseDto })
  @HttpCode(HttpStatus.OK)
  async refresh(
    @CurrentUser() user: User,
    @Res({ passthrough: true }) res: Response,
  ): Promise<AuthResponseDto> {
    const { user: userData, tokens } = await this.authService.refreshTokens(
      user.id,
      user.email,
    );

    const isProduction = process.env.NODE_ENV === "production";
    res.cookie("refreshToken", tokens.refreshToken, {
      httpOnly: true,
      secure: isProduction,
      sameSite: isProduction ? "none" : "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return { 
      user: {
        ...userData,
        createdAt: userData.createdAt.toISOString(),
      }, 
      tokens 
    };
  }

  @Post("logout")
  @ApiOperation({ summary: "Logout do usuário" })
  @HttpCode(HttpStatus.OK)
  async logout(@Res({ passthrough: true }) res: Response) {
    res.clearCookie("refreshToken");
    return { message: "Logged out successfully" };
  }

  @Get("me")
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth("JWT-auth")
  @ApiOperation({ summary: "Obter dados do usuário logado" })
  @ApiResponse({ status: 200, description: "Dados do usuário", type: UserDto })
  async me(@CurrentUser() user: User): Promise<UserDto> {
    const profile = await this.authService.getProfile(user.id);
    return {
      ...profile,
      createdAt: profile.createdAt.toISOString(),
      avatar: (profile as any).avatar || undefined,
    };
  }
}
