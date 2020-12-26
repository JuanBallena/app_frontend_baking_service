export class AuthenticatedUser {

  public username: number
  public currentActivity: number

  constructor(
    username: number,
    currentActivity: number
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
