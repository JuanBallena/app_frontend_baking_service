export class Customer {

  public id: number
  public name: string
  public document: string
  public phone: string

  constructor(
    id: number,
    name: string,
    document: string,
    phone: string
  ) {
    this.id = id;
    this.name = name;
    this.document = document;
    this.phone = phone;
  }
}

export function toCustomerModel(data: any): Customer {

  const customerModel = new Customer(
    data['id'],
    data['name'],
    data['document'],
    data['phone']
  );
  return customerModel;
}
