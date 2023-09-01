import { Product } from "../Product/Product";

export const ProductContainer = () => {
  const data = [
    {
      name: "Aj4",
      url: "https://images.stockx.com/images/Air-Jordan-4-Retro-Messy-Room-GS-Product.jpg?fit=fill&bg=FFFFFF&w=700&h=500&fm=webp&auto=compress&q=90&dpr=2&trim=color&updated_at=1667976285",
      price: "2500",
      rating: "5",
      descrtiption: "hi",
    },
  ];
  return (
    <>
      {data.map((p, i) => {
        return (
          <Product
            name={p.name}
            url={p.url}
            rating={p.rating}
            descrtiption={p.descrtiption}
            price={p.price}
            key={i}
          />
        );
      })}
    </>
  );
};
