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

export function remove(products: ProductCartProps[], removedId: string) {

    const updatedProducts = products.map((product) =>
        product.id === removedId ?
            {
                ...product,
                quantity: product.quantity > 1 ? product.quantity - 1 : 0
            } : product)

    return updatedProducts.filter((product) => product.quantity > 0)
} 