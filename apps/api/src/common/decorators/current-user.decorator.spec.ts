import { ExecutionContext } from "@nestjs/common";
import { currentUserFactory } from "./current-user.decorator";

describe("CurrentUser decorator", () => {
  it("returns request.user from execution context", () => {
    const user = { id: "1", email: "user@test.com" };
    const context = {
      switchToHttp: () => ({
        getRequest: () => ({ user }),
      }),
    } as ExecutionContext;

    const result = currentUserFactory(null, context);

    expect(result).toEqual(user);
  });
});
