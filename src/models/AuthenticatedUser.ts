import { Activity } from './Activity';
export class AuthenticatedUser {

  public username: number
  public currentActivity: Activity

  constructor(
    username: number,
    currentActivity: Activity
  ) {
    this.username = username;
    this.currentActivity = currentActivity;
  }
}

export function toAuthenticatedUserModel(data: any): AuthenticatedUser {
  
  const AuthenticatedUserModel = new AuthenticatedUser(
    data['username'],
    data['currentActivity']
  );
  return AuthenticatedUserModel;
}
