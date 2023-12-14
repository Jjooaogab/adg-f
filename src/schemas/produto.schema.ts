export interface ProdutosPedido {
  produto: string;
  quantidade: number;
  _id: string;
}

export interface Produto {
  nome: string;
  preco: number;
  _id: string;
}

export interface getProduto {
  produtos: Produto[];
}