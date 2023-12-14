import axios from "axios";

export async function createProduct({  nome, preco }: { nome?: string; preco?: number }) {

  let status = "";

  try {
    await axios.post(`http://localhost:8080/produtos/`, { nome, preco });
    return (status = "OK")
  } catch (error) {
    console.log(error)
    return (status = "WRONG")
  }
}