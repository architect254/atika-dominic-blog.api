import { User } from "@endpoints/user/user.entity";

export interface JwtPayload {
  user: User;
}
