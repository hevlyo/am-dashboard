import { Test } from "@nestjs/testing";
import type { Response } from "express";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";

describe("AuthController", () => {
  let controller: AuthController;
  const authService = {
    login: jest.fn(),
    register: jest.fn(),
    refreshTokens: jest.fn(),
    getProfile: jest.fn(),
  };

  const createResponseMock = (): Partial<Response> => ({
    cookie: jest.fn(),
    clearCookie: jest.fn(),
  });

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [{ provide: AuthService, useValue: authService }],
    }).compile();

    controller = moduleRef.get(AuthController);
    jest.clearAllMocks();
  });

  it("sets refresh cookie on login (production)", async () => {
    process.env.NODE_ENV = "production";
    const res = createResponseMock();
    authService.login.mockResolvedValue({
      user: { id: "1", email: "user@test.com" },
      tokens: { accessToken: "access", refreshToken: "refresh" },
    });

    const result = await controller.login(
      { email: "user@test.com", password: "123" },
      res as Response,
    );

    expect(res.cookie).toHaveBeenCalledWith("refreshToken", "refresh", {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      path: "/",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    expect(result).toEqual({
      user: { id: "1", email: "user@test.com" },
      tokens: { accessToken: "access", refreshToken: "refresh" },
    });
  });

  it("sets refresh cookie on register (development)", async () => {
    process.env.NODE_ENV = "development";
    const res = createResponseMock();
    authService.register.mockResolvedValue({
      user: { id: "1", email: "user@test.com" },
      tokens: { accessToken: "access", refreshToken: "refresh" },
    });

    const result = await controller.register(
      { name: "User", email: "user@test.com", password: "123456" },
      res as Response,
    );

    expect(res.cookie).toHaveBeenCalledWith("refreshToken", "refresh", {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      path: "/",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    expect(result).toEqual({
      user: { id: "1", email: "user@test.com" },
      tokens: { accessToken: "access", refreshToken: "refresh" },
    });
  });

  it("sets refresh cookie on refresh", async () => {
    process.env.NODE_ENV = "production";
    const res = createResponseMock();
    authService.refreshTokens.mockResolvedValue({
      user: { id: "1", email: "user@test.com" },
      tokens: { accessToken: "access", refreshToken: "refresh" },
    });

    const result = await controller.refresh(
      {
        id: "1",
        email: "user@test.com",
        name: "User",
        role: "USER",
        createdAt: new Date(),
      },
      res as Response,
    );

    expect(res.cookie).toHaveBeenCalledWith("refreshToken", "refresh", {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      path: "/",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    expect(result).toEqual({
      user: { id: "1", email: "user@test.com" },
      tokens: { accessToken: "access", refreshToken: "refresh" },
    });
  });

  it("clears refresh cookie on logout", async () => {
    const res = createResponseMock();

    const result = await controller.logout(res as Response);

    expect(res.clearCookie).toHaveBeenCalledWith("refreshToken", { path: "/" });
    expect(result).toEqual({ message: "Logged out successfully" });
  });

  it("returns profile for me", async () => {
    authService.getProfile.mockResolvedValue({
      id: "1",
      email: "user@test.com",
    });

    const result = await controller.me({
      id: "1",
      email: "user@test.com",
      name: "User",
      role: "USER",
      createdAt: new Date(),
    });

    expect(authService.getProfile).toHaveBeenCalledWith("1");
    expect(result).toEqual({ id: "1", email: "user@test.com" });
  });
});
