"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { getProductsOrder } from "@/services/nextGet";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Page() {
  const router = useRouter();

  const [numeroMesa, setNumeroMesa] = useState("");

  const produtos = [{ produto: "656fec2fadd19b9a20032622", nome: 'Adega do Galego', quantidade: 0 }];

  return (
    <main className="w-screen h-screen flex flex-col justify-center items-center gap-4 dark:bg-stone-800 dark:text-zinc-200">
      <div className="flex flex-col items-center">
        <p>Boas vindas!</p>
        <span className="font-semibold text-lg text-center">
          Adega do Galego
        </span>
      </div>
      <div className="">
        <h1 className="font-bold text-xl">Você não abriu sua mesa ainda</h1>
        <span>Clique no botão abaixo para começar</span>
      </div>
      <Dialog>
        <DialogTrigger className="dark:bg-zinc-800 shadow-lg shadow-zinc-700 dark:text-zinc-200 bg-zinc-200 text-zinc-800 py-2 px-3 rounded-md">
          Abrir mesa
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            Adega do galego agradece pela preferencia.
          </DialogHeader>
          <div className="flex flex-col w-full gap-4">
            <div className="">
              <Label htmlFor="numberTable">Qual o número da sua mesa? </Label>
              <Input
                id="numberTable"
                className="border-zinc-700 outline-none"
                value={numeroMesa}
                onChange={(e) => {
                  setNumeroMesa(e.target.value);
                }}
              ></Input>
            </div>
            <Button
              onClick={async () => {
                const res = await axios.post("http://localhost:8080/pedidos", {
                  numeroMesa,
                  produtos,
                });
                const storedInfos = createLocalStorage({
                  id: res.data.mesaId,
                  mesa: numeroMesa,
                });
                router.push(`/client/${storedInfos[0]}`);
              }}
            >
              Abrir mesa
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </main>
  );
}

const createLocalStorage = ({ mesa, id }: { mesa: string; id: string }) => {
  const infos = [{ id }, { mesa }];
  localStorage.setItem("infos", JSON.stringify(infos));
  const storedItem = localStorage.getItem("infos");
  if (storedItem !== null) {
    const storedInfos = JSON.parse(storedItem);
    console.log(storedInfos);
    return storedInfos;
  }
};
