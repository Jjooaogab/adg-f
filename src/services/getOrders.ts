import axios from "axios";

export async function fetchOrders() {
  try {
    const res = await axios.get("http://localhost:8080/pedidos/");
    return res.data;
  } catch (e) {
    alert("Deu b.o olha o console");
    console.log(e);
  }
}