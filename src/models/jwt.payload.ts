import { User } from "@models/user/user.entity";

export interface JwtPayload {
  user: User;
}
