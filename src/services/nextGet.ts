import { Pedido } from "@/schemas/pedido.schema";
import { Produto } from "@/schemas/produto.schema";

interface IGetProductsOrder {
  id: string
}

const getProductsOrder = async ({ id }: IGetProductsOrder): Promise<Pedido> => {
  const res = await fetch(`http://localhost:8080/pedidos/${id}`);
  return res.json();
};

const getProducts = async (): Promise<Produto[]> => {
  const res = await fetch(`http://localhost:8080/produtos`);
  return res.json();
};

const getProductById = async ({id}: {id: string}): Promise<Produto> => {
  const res = await fetch(`http://localhost:8080/${id}`);
  return res.json();
}

// Exports

export { getProducts, getProductsOrder, getProductById }