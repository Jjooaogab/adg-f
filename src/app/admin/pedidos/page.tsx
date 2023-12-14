"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogHeader,
  DialogTrigger,
  DialogContent,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Pedido } from "@/schemas/pedido.schema";
import { fetchOrders } from "@/services/getOrders";
import axios from "axios";
import { EyeIcon, PenIcon, Trash } from "lucide-react";
import { useState } from "react";
import { useQuery } from "react-query";

export default function Page() {
  const [value, setValue] = useState("");
  const [alerts, setAlerts] = useState<string[]>([]);

  const { data, isLoading, isError } = useQuery({
    queryFn: fetchOrders,
    queryKey: "Orders",
  });

  const handleRemoveAlert = ({ i }: { i: number }) => { // i = index
    setAlerts((prevAlerts) => {
      const updatedAlerts = prevAlerts.filter((_, index) => index !== i);
      console.log("Alerts atualizados:", updatedAlerts);
      return updatedAlerts;
    });
  };

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-2xl font-semibold">Pedidos feitos:</h1>
      <div className="grid grid-cols-4 gap-6">
        {data?.map((i: Pedido) => (
          <div
            key={i._id}
            className="flex flex-col items-center justify-around bg-zinc-200 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200 p-6  gap-1 h-[50vh] rounded-3xl mt-4"
          >
            <div className="flex flex-col items-center">
              <h1 className="font-semibold text-xl">
                Número da mesa: {i.numeroMesa.toString()}
              </h1>
              <span className="text-lg">Produtos pedidos: </span>
            </div>
            <ScrollArea className="h-56">
              <ul>
                {i.produtos.map((p) => {
                  return (
                    <li key={p._id}>
                      {p.produto} - Quantidade: {p.quantidade.toString()}
                    </li>
                  );
                })}
              </ul>
              <ScrollBar />
            </ScrollArea>
            <div className="flex items-center justify-between w-full">
              <Dialog>
                <DialogTrigger>
                  <PenIcon />
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>Qual anotação você quer enviar?</DialogHeader>

                  <div className="flex gap-2">
                    <Input
                      value={value}
                      onChange={(e) => {
                        setValue(e.target.value);
                      }}
                      className="ring-1 ring-black"
                      placeholder="Heineken está em falta, que tal outra? "
                    ></Input>
                    <Button
                      onClick={() => {
                        setAlerts((prevAlerts) => {
                          const newAlerts = [...prevAlerts, value];
                          console.log("Alerts acumulados:", newAlerts);
                          return newAlerts;
                        });
                      }}
                    >
                      Enviar
                    </Button>
                  </div>
                  <ul>
                    {alerts.map((alert, index) => (
                      <ul key={index} className="flex items-center justify-center">
                        <li>{alert}</li>
                        <Button variant={'secondary'} onClick={() => {
                          handleRemoveAlert({ i: index })
                        }}><Trash size={16} /></Button>
                      </ul>
                    ))}
                  </ul>
                </DialogContent>
              </Dialog>
              <Dialog>
                <DialogTrigger>
                  <Trash color="red" />
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    Você tem certeza que quer excluir essa mesa?
                  </DialogHeader>
                  <div className="flex flex-col gap-4">
                    <span className="text-red-700 font-bold">
                      É recomendado, excluir a mesa após efetuarem o pagamento
                      completo.
                    </span>
                    <Button
                      onClick={() => {
                        axios.delete(`http://localhost:8080/pedidos/${i._id}`);
                      }}
                    >
                      Okay!
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
