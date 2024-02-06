import { Text, Pressable, PressableProps } from "react-native"
import { clsx } from "clsx"
// equivalente a um Extend de uma Classe 
type CategoryProps = PressableProps & {
    title: string,
    isSelected?: boolean
}
// ...rest : pegar o resto de PressableProps
export function CategoryBtn({ title, isSelected, ...rest }: CategoryProps) {
    return (
        <Pressable 
        // clsx equivalente a um ng-class
        className={
            clsx("bg-slate-800 px-4 justify-center rounded-md h-10"
            , isSelected && "border-2 border-lime-300")} 
        {...rest} >


            <Text className="text-slate-100 font-subtitle text-sm">{title}</Text>
        </Pressable>
    )
}