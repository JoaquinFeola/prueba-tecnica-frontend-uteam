import { Button, Modal, TextField } from "@/shared/components";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { MdAdd } from "react-icons/md";
import { createPostSchema, type ICreatePostSchema } from "../schemas/createPost.schema";

interface Props {
    isOpen: boolean;
    onClose(): void;
    onCreate(data: ICreatePostSchema): void;
}

export const CreatePostModal = ({ isOpen, onClose, onCreate }: Props) => {
    const { formState: { isDirty, isSubmitting, errors, }, register, handleSubmit } = useForm({
        resolver: yupResolver(createPostSchema),
    });


    return (
        <Modal isOpen={isOpen} onClose={onClose} title={`Creá un nuevo post`}>
            <form
                onSubmit={handleSubmit(onCreate)}
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
                    disabled={isSubmitting}
                    rows={6}
                    error={errors.body?.message}
                    label="Descripción del Post"
                    className="resize-none"
                    placeholder="Escribe aquí la descripción del post..."
                />
                <div>
                    <div className="h-px bg-slate-300 mt-4 rounded-full"></div>
                    <div className="flex gap-2 justify-end mt-4 mb-2">
                        <Button disabled={isSubmitting} type="button" onClick={onClose} className="bg-neutral hover:bg-neutral/90">Cancelar</Button>
                        <Button tabIndex={1} type="submit" disabled={!isDirty || isSubmitting} isLoading={isSubmitting} ><MdAdd size={18} /> Crear</Button>
                    </div>
                </div>
            </form>
        </Modal >
    )
}
