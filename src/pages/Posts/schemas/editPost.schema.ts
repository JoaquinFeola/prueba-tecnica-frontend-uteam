import * as yup from "yup";

export const editPostSchema = yup.object({
    title: yup.string().min(5, "Mínimo 5 carácteres").max(1000, "Máximo 1000 carácteres").optional(),
    body: yup.string().min(5, "Mínimo 5 carácteres").optional(),
})

export type IEditPostSchema = yup.InferType<typeof editPostSchema> 