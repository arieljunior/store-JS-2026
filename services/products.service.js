const API_URL = 'https://fakestoreapi.com/products';

export async function listProducts(){
    try {
        const response = await fetch(API_URL);

        if(!response.ok){
            throw new Error(`Erro HTTP: ${response.status}`)
        }

        return await response.json();

    } catch (error) {
        console.error("API indisponível ", error.message)
        return []
    }
}