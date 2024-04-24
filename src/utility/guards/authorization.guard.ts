import { Injectable, CanActivate, ExecutionContext, UnauthorizedException, mixin } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';

export const AuthorizeGuard = (allowedRoles: string[]) => {
    class RolesGuardMixin implements CanActivate {

        constructor(reflector: Reflector) { }

        canActivate(
            context: ExecutionContext,
        ): boolean {
            const request = context.switchToHttp().getRequest();
            const result = request.currentUser.roles.map((role: string) => allowedRoles.includes(role)).find((val: boolean) => val === true)

            if (!result) throw new UnauthorizedException("Sorry, you are not authorized!")

            return true;
        }
    }

    const guard = mixin(RolesGuardMixin)

    return guard
}