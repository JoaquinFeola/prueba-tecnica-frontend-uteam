import * as yup from "yup";

export const createPostSchema = yup.object({
    title: yup.string().min(5, "Mínimo 5 carácteres").max(1000, "Máximo 1000 carácteres").required(),
    body: yup.string().min(5, "Mínimo 5 carácteres").required(),
})

export type ICreatePostSchema = yup.InferType<typeof createPostSchema> 