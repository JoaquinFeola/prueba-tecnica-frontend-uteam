import { Button, Modal, TextField } from "@/shared/components";
import type { IPost } from "@/shared/interfaces";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { MdSave } from "react-icons/md";
import { editPostSchema, type IEditPostSchema } from "../schemas/editPost.schema";

interface Props {
    isOpen: boolean;
    post: IPost;
    onClose(): void;
    onSave(data: IEditPostSchema): void;
}

export const EditPostModal = ({ isOpen, onClose, post, onSave }: Props) => {
    const { formState: { isDirty, isSubmitting, errors }, register, handleSubmit } = useForm({
        resolver: yupResolver(editPostSchema),
        defaultValues: {
            body: post.body,
            title: post.title
        }
    });


    return (
        <Modal isOpen={isOpen} onClose={onClose} title={`Editando ${post.title}`}>
            <form
                onSubmit={handleSubmit(onSave)}
                className="flex flex-col gap-4"
            >
                <TextField
                    {...register("title")}
                    label="Título"
                    error={errors.title?.message}
                    disabled={isSubmitting}
                    className="resize-none"
                    placeholder="Escribe aquí el título del post..."
                />
                <TextField
                    {...register("body")}
                    as="textarea"
                    error={errors.body?.message}
                    disabled={isSubmitting}
                    rows={6}
                    label="Descripción del Post"
                    className="resize-none"
                    placeholder="Escribe aquí la descripción del post..."
                />
                <div>
                    <div className="h-px bg-slate-300 mt-4 rounded-full"></div>
                    <div className="flex gap-2 justify-end mt-4 mb-2">
                        <Button disabled={isSubmitting} type="button" onClick={onClose} className="bg-neutral hover:bg-neutral/90">Cancelar</Button>
                        <Button tabIndex={1} type="submit" disabled={!isDirty || isSubmitting} isLoading={isSubmitting} ><MdSave size={18} /> Guardar</Button>
                    </div>
                </div>
            </form>
        </Modal >
    )
}
