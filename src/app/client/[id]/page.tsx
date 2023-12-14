"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useToast } from "@/components/ui/use-toast";
import { Pedido } from "@/schemas/pedido.schema";
import { Produto, ProdutosPedido } from "@/schemas/produto.schema";
import {
  getProductById,
  getProducts,
  getProductsOrder,
} from "@/services/nextGet";
import axios from "axios";
import {
  CreditCardIcon,
  MinusIcon,
  PlusIcon,
  ShoppingCart,
} from "lucide-react";
import { useEffect, useState } from "react";

export default function Page({ params }: { params: { id: string } }) {
  const { toast } = useToast();

  const [orderP, setOrderP] = useState<Pedido | null>(null);
  const [products, setProducts] = useState<Produto[] | null>([]);

  const [cart, setCart] = useState<ProdutosPedido[]>([]);

  const [counter, setCounter] = useState(1);

  const handleRemoverItem = ({ productId }: { productId: string }) => {
    const novoCarrinho = cart.filter((item) => item._id !== productId);

    setCart(novoCarrinho);
  };

  useEffect(() => {
    async function fetchData() {
      const orderData = await getProductsOrder({ id: params.id });
      const productData = await getProducts();
      setOrderP(orderData);
      setProducts(productData);
    }
    fetchData();
  }, [params.id]);

  if (!orderP || !products) {
    return <div>Loading...</div>;
  }

  // Infos for order
  const numberTable = orderP.numeroMesa;

  return (
    <>
      <div className="flex flex-col items-center justify-between mt-8 p-4 sm:p-6 md:p-8 lg:p-10 xl:p-12">
        <h1 className="font-bold text-xl sm:text-2xl mb-4">Os produtos pedidos</h1>
        <ScrollArea className="max-h-[36rem] overflow-auto mb-4">
          {orderP.produtos?.map((i) => (
            <ul
              key={i._id}
              className="dark:bg-zinc-900 dark:text-zinc-200 px-12 py-4 first-of-type:rounded-t-xl last-of-type:rounded-b-xl w-80"
            >
              <li>
                {i.produto === "Adega do galego" ? "" : i.quantidade.toString()}
                {" - "}
                {i.produto}
              </li>
            </ul>
          ))}
        </ScrollArea>
        <div className="flex justify-between items-center w-[70%] fixed bottom-0 bg-zinc-700/40 px-4 py-2 rounded-t-xl">
          <Dialog>
            <DialogTrigger className="rounded-full w-12 h-12 dark:bg-zinc-950 dark:text-zinc-200 bg-zinc-200 text-zinc-800 flex justify-center items-center">
              <PlusIcon size={16} />
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>Desejar pedir novos produtos? </DialogHeader>
              <ScrollArea className="h-72">
                {products.map((i) => (
                  <ul
                    key={i._id}
                    className="w-full flex justify-between items-center"
                  >
                    <div className="">
                      <li>{i.nome}</li>
                      <li>Valor: {i.preco}</li>
                    </div>
                    <Dialog>
                      <DialogTrigger>Add</DialogTrigger>
                      <DialogContent>
                        <ul>
                          <li>{i.nome}</li>
                          <li>Valor: {i.preco}</li>
                        </ul>
                        <span>Quantos itens deseja adicionar? </span>
                        <div className="flex justify-center items-center gap-6">
                          <Button
                            onClick={() => setCounter(counter - 1)}
                            size={"sm"}
                            disabled={counter <= 1 ? true : false}
                          >
                            <MinusIcon size={12} />
                          </Button>
                          {counter}
                          <Button
                            onClick={() => setCounter(counter + 1)}
                            size={"sm"}
                          >
                            <PlusIcon size={12} />
                          </Button>
                        </div>
                        <span>
                          Valor a adicionar: {Math.round(i.preco * counter)}
                        </span>
                        <Button
                          onClick={async () => {
                            // const numeroMesa = numberTable;
                            // const nome = i.nome
                            // const produtos = [
                            //   { produto: i._id, quantidade: counter },
                            // ];
                            // console.log(typeof numberTable);
                            // try {
                            //   const response = await axios.post(`http://localhost:8080/pedidos`, {
                            //     numeroMesa,
                            //     produtos,
                            //     nome
                            //   });
                            //   console.log('Resposta do servidor:', response.data);
                            // } catch (e) {
                            //   console.log('Erro na solicitação:', e);
                            // }
                            const updatedCart = [
                              ...cart,
                              {
                                produto: i.nome,
                                quantidade: counter,
                                _id: i._id,
                              },
                            ];
                            setCart(updatedCart);
                            setCounter(1);
                            console.log(updatedCart);
                          }}
                        >
                          Confirmar
                        </Button>
                      </DialogContent>
                    </Dialog>
                  </ul>
                ))}
              </ScrollArea>
            </DialogContent>
          </Dialog>
          <Dialog>
            <DialogTrigger className="rounded-full w-12 h-12 bg-green-800 text-zinc-200 flex justify-center items-center">
              <CreditCardIcon size={16} />
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                {" "}
                Deseja pagar a conta ou apenas deixar algum recado?{" "}
              </DialogHeader>
              <span>
                Por favor, se redirecione ao caixa, e fale com o atendente,
                agradecemos a compreensão❤️
              </span>
            </DialogContent>
          </Dialog>       
          <Dialog>
            <DialogTrigger className="rounded-full w-12 h-12 dark:bg-zinc-950 dark:text-zinc-200 bg-zinc-200 text-zinc-800 flex justify-center items-center">
              <ShoppingCart size={16} />
            </DialogTrigger>
            <DialogContent>
              <DialogHeader> Seu carrinho atual:</DialogHeader>
              {cart?.map((i) => (
                <ul
                  key={i._id}
                  className="dark:bg-zinc-900 dark:text-zinc-200 px-12 py-4 rounded-xl"
                >
                  <li>
                    <span>Quantidade: {i.quantidade}</span>
                    {" - "}
                    {i.produto}
                  </li>
                  <Button
                    variant={"destructive"}
                    onClick={() => {
                      handleRemoverItem({ productId: i._id });
                    }}
                  >
                    Cancelar
                  </Button>
                  <Button
                    onClick={async () => {
                      const produtos = [
                        { produto: i.produto, quantidade: i.quantidade },
                      ];
                      const res = axios.post(" http://localhost:8080/pedidos", {
                        numeroMesa: numberTable,
                        produtos,
                      });
                      console.log((await res).status);
                      handleRemoverItem({ productId: i._id });
                    }}
                  >
                    Confirmar
                  </Button>
                </ul>
              ))}
            </DialogContent>
          </Dialog>
         
        </div>
      </div>
    </>
  );
}
