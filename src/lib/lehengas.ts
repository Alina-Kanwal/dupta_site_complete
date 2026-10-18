export type Lehenga = {
  id: number;
  name: string;
  images: string[];
  fabric: string;
  work: string;
  color: string;
  sizes: string[];
  price: number;
};

export const lehengas: Lehenga[] = [
  {
    id: 1,
    name: "Bridal Lehenga 1",
    images: [
      "/images/lehnga_1/1.jpg",
      "/images/lehnga_1/2.jpg",
      "/images/lehnga_1/3.jpg",
      "/images/lehnga_1/4.jpg",
      "/images/lehnga_1/5.jpg",
      "/images/lehnga_1/6.jpg"
    ],
    fabric: "Net",
    work: "Heavy Embroidery",
    color: "Ivory",
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    price: 0
  },
  {
    id: 2,
    name: "Bridal Lehenga 2",
    images: [
      "/images/lehnga_2/1.jpg",
      "/images/lehnga_2/2.jpg",
      "/images/lehnga_2/3.jpg",
      "/images/lehnga_2/4.jpg",
      "/images/lehnga_2/5.jpg",
      "/images/lehnga_2/6.jpg",
      "/images/lehnga_2/7.jpg",
      "/images/lehnga_2/8.jpg",
      "/images/lehnga_2/9.jpg",
      "/images/lehnga_2/10.jpg"
    ],
    fabric: "Net",
    work: "Heavy Embroidery",
    color: "Ivory",
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    price: 0
  }
];
