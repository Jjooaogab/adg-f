import axios from "axios";

export async function fetchOrdersById({ id }: { id: string }) {
  try {
    const { data } = await axios.get(`http://localhost:8080/pedidos/${id}`);
    console.log(data.produtos)
    return data.produtos;
  } catch (e) {
    alert("Deu b.o olha o console");
    console.log(e);
  }
}