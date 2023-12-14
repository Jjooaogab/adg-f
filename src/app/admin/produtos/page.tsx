"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Produto } from "@/schemas/produto.schema";
import { fetchProducts } from "@/services/getProducts";
import { Pen, Plus, Trash } from "lucide-react";
import { useState } from "react";
import { useQuery } from "react-query";
import { useToast } from "@/components/ui/use-toast";
import axios from "axios";
import { editProducts } from "@/services/editProducts";
import { createProduct } from "@/services/createProduct";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "@radix-ui/react-context-menu";
import { ContextMenu } from "@/components/ui/context-menu";

export default function Page() {
  const { toast } = useToast();

  const [valueName, setValueName] = useState("");
  const [valuePrice, setValuePrice] = useState("");
  const [search, setSearch] = useState("");

  const { data, isLoading, isError } = useQuery({
    queryFn: fetchProducts,
    queryKey: "Products",
  });

  const products: Produto[] = data?.filter((i: Produto) => {
    const nameLower = i.nome.toLowerCase();
    return nameLower.includes(search.toLowerCase());
  });

  return (
    <main className="dark:bg-zinc-800 min-h-screen dark:text-secondary">
      <header className="flex gap-8 justify-between p-8 items-center w-screen">
        <Dialog>
          <DialogTrigger className="flex gap-2 items-center px-3 py-2 rounded-lg bg-secondary text-primary dark:bg-primary dark:text-secondary transition hover:opacity-95">
            Criar <Plus size={16} />
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>Qual produto você deseja criar?</DialogHeader>
            <div className="flex flex-col gap-4">
              <div className="">
                <span>Nome do novo produto</span>
                <Input
                  placeholder="Digite o novo nome"
                  value={valueName}
                  onChange={(e) => {
                    setValueName(e.target.value);
                  }}
                ></Input>
              </div>
              <div className="">
                <span>Preço do produto </span>
                <Input
                  placeholder="Digite o novo nome"
                  value={valuePrice}
                  onChange={(e) => {
                    setValuePrice(e.target.value);
                  }}
                ></Input>
              </div>
              <Button
                onClick={async () => {
                  const status = await createProduct({
                    nome: valueName,
                    preco: parseFloat(valuePrice),
                  });
                  if (status === "OK") {
                    toast({
                      variant: "sucess",
                      title: "Produtos novos!",
                      description: `Você acabou de criar um novo produto, atualize a pagina para ver as mudanças`,
                    });
                  } else if (status === "WRONG") {
                    toast({
                      variant: "error",
                      title: "Erro ao criar produto",
                      description: `Ocorreu um erro ao criar o produto, contate o desenvolvedor`,
                    });
                  }
                }}
              >
                Confirmar
              </Button>
            </div>
          </DialogContent>
        </Dialog>
        <Input
          placeholder="Digite o nome de um produto"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
          }}
          className="w-72 dark:bg-primary dark:text-secondary focus:border-none focus:cursor-text cursor-pointer dark:placeholder:text-secondary/80 dark:border-none"
        ></Input>
      </header>
      <Table className="">
        <TableCaption>Todos os seus produtos registrados</TableCaption>
        <TableHeader>
          <TableRow className="flex justify-between items-center mx-8">
            <TableHead className="w-64">Nome do produto</TableHead>
            <TableHead className="mr-2">Valor</TableHead>
            <TableHead>Ações</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {products?.map((i: Produto) => (
            <TableRow
              key={i._id}
              className="flex justify-between items-center mx-8"
            >
              <TableCell className="w-64">{i.nome}</TableCell>
              <TableCell>R${i.preco}</TableCell>
              <TableCell className="flex gap-4" >
                <Dialog>
                  <DialogTrigger>
                    <Pen size={16} />
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>O que você quer editar? </DialogHeader>
                    <div className="flex flex-col gap-4">
                      <div className="">
                        <span>Nome atual: {i.nome}</span>
                        <Input
                          placeholder="Digite o novo nome"
                          value={valueName}
                          onChange={(e) => {
                            setValueName(e.target.value);
                          }}
                        ></Input>
                      </div>
                      <div className="">
                        <span>Preço atual: {i.preco}</span>
                        <Input
                          placeholder="Digite o novo nome"
                          value={valuePrice}
                          onChange={(e) => {
                            setValuePrice(e.target.value);
                          }}
                        ></Input>
                      </div>
                      <Button
                        onClick={async () => {
                          const status = await editProducts({
                            id: i._id,
                            nome: valueName,
                            preco: parseFloat(valuePrice),
                          });
                          if (status === "OK") {
                            toast({
                              variant: "sucess",
                              title: "Mudanças no produto",
                              description: `Você alterou o produto ${i.nome}, atualize a página para ver as mudanças`,
                            });
                          } else if (status === "WRONG") {
                            toast({
                              variant: "error",
                              title: "Erro ao alterar o produto",
                              description: `Ocorreu um erro ao alterar o produto ${i.nome}`,
                            });
                          }
                        }}
                      >
                        Confirmar
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>
                <Dialog>
                  <DialogTrigger>
                    <Trash size={16} />
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      Você tem certeza que deseja excluir esse produto?
                    </DialogHeader>
                    <DialogDescription>
                      Isso é uma ação irreversivel
                    </DialogDescription>
                    <div className="flex flex-col gap-4">
                      <span>Nome do produto: {i.nome}</span>
                      <Button
                        onClick={() => {
                          try {
                            axios.delete(
                              `http://localhost:8080/produtos/${i._id}`
                            );
                            console.log("deleted");
                          } catch (e) {
                            console.log("error deleting");
                          } finally {
                            location.reload();
                          }
                        }}
                      >
                        Sim, tenho certeza
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </main>
  );
}
