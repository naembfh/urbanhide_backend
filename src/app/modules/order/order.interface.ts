// /interfaces/order.interface.ts
export interface Order {
    id: string;
    date: string;
    items: Array<{
      id: string;
      name: string;
      price: number;
      quantity: number;
      imageUrl: string;
    }>;
    total: number;
    status: string;
    email: string;
    shippingDetails: {
      name: string;
      address: string;
      city: string;
      postalCode: string;
    };
  }
  