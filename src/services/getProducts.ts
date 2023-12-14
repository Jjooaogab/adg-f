import axios from "axios";

export async function fetchProducts() {
  try {
    const res = await axios.get('http://localhost:8080/produtos/')
    return res.data
  } catch (err) {
    console.log(err)
  }
}