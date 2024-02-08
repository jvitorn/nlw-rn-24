import { ProductProps } from "@/utils/data/products";
import { ProductCartProps } from "../cart-store";
// verifica se o produto já foi adicionado
export function add(products: ProductCartProps[], newProduct: ProductProps) {
    const existsProduct = products.find(({ id }) => newProduct.id === id)

    if (existsProduct) {
        return products.map((p) => 
            p.id === existsProduct.id
                ? { ...p, quantity: p.quantity + 1 } : p
        )
    }

    return [...products, { ...newProduct, quantity: 1 }]
}
