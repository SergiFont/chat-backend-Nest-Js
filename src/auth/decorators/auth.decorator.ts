import { UseGuards, applyDecorators } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { ValidRoles } from '../interfaces';
import { RoleProtected } from './role-protected.decorator';
import { UserRoleGuard, UserRequestGuard } from '../guards';

export function Auth(...roles: ValidRoles[]): Function {

  return applyDecorators(
    RoleProtected( ...roles ),
    UseGuards( AuthGuard(), UserRoleGuard, UserRequestGuard )
    // los decoradores no necesitan el `@` aqui.
  );
}