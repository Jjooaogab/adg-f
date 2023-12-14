import axios from "axios";

export async function editProducts({ id, nome, preco }: { id: any; nome?: string; preco?: number }) {

  let status = "";

  try {
    await axios.put(`http://localhost:8080/produtos/${id}`, { nome, preco });
    return (status = "OK")
  } catch (error) {
    console.log(error)
    return (status = "WRONG")
  }
}