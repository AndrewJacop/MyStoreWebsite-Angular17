export interface IProduct {
  id: number;
  title: string;
  price: number;
  description: string;
  category: number;
  image: string;
  [key: string]: number | string;
}
