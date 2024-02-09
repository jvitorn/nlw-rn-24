import { ProductProps } from "@/utils/data/products";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware"
import AsyncStorage from "@react-native-async-storage/async-storage"
import * as cartInMemory from "./helpers/cart-memory";

export type ProductCartProps = ProductProps & {
    quantity: number
}

type StateProps = {
    products: ProductCartProps[]
    add: (product: ProductProps) => void
    remove: (productId: string) => void
    clear: () => void
}

export const useCardStore = create(
    persist<StateProps>((set) => ({
        products: [],

        add: (product: ProductProps) =>
            set((state) => ({
                products: cartInMemory.add(state.products, product)
            })),

        remove: (productId: string) =>
            set((state) => ({
                products: cartInMemory.remove(state.products, productId)
            })),

        clear: () => 
            set( () => ({ 
                products:[] 
            })),

    }), {
        // nome da aplicação e colection
        name: "nwl-expert:cart",
        storage: createJSONStorage(() => AsyncStorage),
    }))