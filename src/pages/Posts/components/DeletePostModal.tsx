import { Button, Modal } from "@/shared/components";
import type { IPost } from "@/shared/interfaces";
import { MdDelete } from "react-icons/md";

interface Props {
    isOpen: boolean;
    post: IPost;
    isDeleting: boolean;
    onClose(): void;
    onConfirm(): void;
}

export const DeletePostModal = ({ isOpen, onClose, post, isDeleting, onConfirm }: Props) => {

    return (
        <Modal isOpen={isOpen} onClose={onClose} title={`Estás seguro que deseas elimninar el post: ${post.title}`}>
            <div>
                <p className="text-muted">Esta acción es <b>irreversible</b> y no podrás recuperar el post eliminado.</p>
            </div>

            <div className="flex gap-2 justify-end mt-4 mb-2">
                <Button disabled={isDeleting} onClick={onClose} className="bg-neutral hover:bg-neutral/90">Cancelar</Button>
                <Button isLoading={isDeleting}  className="bg-red-500 hover:bg-red-600 hover:text-white" tabIndex={1} onClick={onConfirm} ><MdDelete size={18} /> Confirmar</Button>
            </div>
        </Modal >
    )
}
