import { ProdutosPedido } from "./produto.schema";

export interface Pedido {
  _id: string;
  numeroMesa: Number;
  produtos: ProdutosPedido[];
  status: string;
  total: Number;
}
