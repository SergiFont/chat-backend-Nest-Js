import { UserRequestGuard } from './user-request.guard';

describe('UserRequestGuard', () => {
  it('should be defined', () => {
    expect(new UserRequestGuard()).toBeDefined();
  });
});
