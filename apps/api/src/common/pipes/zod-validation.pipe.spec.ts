import { z } from "zod";
import { BadRequestException } from "@nestjs/common";
import { ZodValidationPipe } from "./zod-validation.pipe";

describe("ZodValidationPipe", () => {
  it("returns parsed data for valid input", () => {
    const schema = z.object({ name: z.string() });
    const pipe = new ZodValidationPipe(schema);

    const result = pipe.transform({ name: "Ana" });

    expect(result).toEqual({ name: "Ana" });
  });

  it("throws BadRequestException for invalid input", () => {
    const schema = z.object({ email: z.string().email() });
    const pipe = new ZodValidationPipe(schema);

    expect(() => pipe.transform({ email: "invalid" })).toThrow(
      BadRequestException,
    );

    try {
      pipe.transform({ email: "invalid" });
    } catch (error) {
      expect(error).toBeInstanceOf(BadRequestException);
      const response = (error as BadRequestException).getResponse();
      if (!response || typeof response !== "object") {
        throw new Error("Expected response object");
      }
      const responseBody = response as {
        message: string;
        errors: { field: string; message: string }[];
      };
      expect(responseBody.message).toBe("Validation failed");
      expect(responseBody.errors[0]).toEqual({
        field: "email",
        message: "Invalid email",
      });
    }
  });
});
