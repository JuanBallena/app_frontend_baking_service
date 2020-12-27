export class Customer {

  public id: number
  public name: string

  constructor(
    id: number,
    name: string,
  ) {
    this.id = id;
    this.name = name;
  }
}

export function toCustomerModel(data: any): Customer {

  const customerModel = new Customer(
    data['id'],
    data['name']
  );
  return customerModel;
}
