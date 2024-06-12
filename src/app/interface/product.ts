export interface Inventor {
  id: number;
  first: string;
  last: string;
  year: number;
  passed: number;
}

export interface IProduct {
  productId: number;
  productName: string;
  productCode: string;
  releaseDate: string;
  price: number;
  description: string;
  starRating: number;
  imageUrl: string;
}

export interface Listpro {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: number;
}

export interface AddProductForm {
  id: number,
  title: string,
  price: number,
  description: string,
  category: string,
  image: string,
  rating: {
      rate: number,
      count: number
  },
}

export interface Categories{
  id: number,
  name: string
}
