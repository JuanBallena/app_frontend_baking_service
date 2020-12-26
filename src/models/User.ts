export class User {

  public id: number
  public username: string

  constructor(
    id: number,
    username: string
  ) {
    this.id = id;
    this.username = username;
  }
}

export function toUserModel(data: any): User {
  
  const userModel = new User(
    data['id'],
    data['username']
  );
  return userModel;
}
