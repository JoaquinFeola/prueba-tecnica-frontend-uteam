import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { DeletePostModal } from '@/pages/Posts/components/DeletePostModal';
import type { IPost } from '@/shared/interfaces';

const mockPost: IPost = {
    id: 1,
    title: 'Test Post to Delete',
    body: 'Test post body content',
    userId: 1,
};

const defaultProps = {
    isOpen: true,
    post: mockPost,
    isDeleting: false,
    onClose: vi.fn(),
    onConfirm: vi.fn(),
};

describe('DeletePostModal', () => {
    it('renders modal when isOpen is true', () => {
        render(<DeletePostModal {...defaultProps} />);
        expect(screen.getByText(/estás seguro/i)).toBeInTheDocument();
    });

    it('does not render modal when isOpen is false', () => {
        const { container } = render(<DeletePostModal {...defaultProps} isOpen={false} />);
        expect(container.firstChild).toBeNull();
    });

    it('displays post title in confirmation message', () => {
        render(<DeletePostModal {...defaultProps} />);
        expect(screen.getByText(/Test Post to Delete/i)).toBeInTheDocument();
    });

    it('displays irreversible warning message', () => {
        render(<DeletePostModal {...defaultProps} />);
        expect(screen.getByText(/irreversible/i)).toBeInTheDocument();
    });

    it('displays Cancel and Confirm buttons', () => {
        render(<DeletePostModal {...defaultProps} />);
        expect(screen.getByRole('button', { name: /cancelar/i })).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /confirmar/i })).toBeInTheDocument();
    });

    it('calls onClose when Cancel button is clicked', () => {
        render(<DeletePostModal {...defaultProps} />);
        fireEvent.click(screen.getByRole('button', { name: /cancelar/i }));
        expect(defaultProps.onClose).toHaveBeenCalledTimes(1);
    });

    it('calls onConfirm when Confirm button is clicked', () => {
        render(<DeletePostModal {...defaultProps} />);
        fireEvent.click(screen.getByRole('button', { name: /confirmar/i }));
        expect(defaultProps.onConfirm).toHaveBeenCalledTimes(1);
    });

    it('Confirm button is disabled when isDeleting is true', () => {
        const { container } = render(<DeletePostModal {...defaultProps} isDeleting={true} />);
        const buttons = container.querySelectorAll('button');
        const confirmButton = buttons[1];
        expect(confirmButton).toBeDisabled();
    });

    it('Cancel button is disabled when isDeleting is true', () => {
        render(<DeletePostModal {...defaultProps} isDeleting={true} />);
        const cancelButton = screen.getByRole('button', { name: /cancelar/i });
        expect(cancelButton).toBeDisabled();
    });

    it('renders delete icon in confirm button', () => {
        render(<DeletePostModal {...defaultProps} />);
        const confirmButton = screen.getByRole('button', { name: /confirmar/i });
        expect(confirmButton.querySelector('svg')).toBeInTheDocument();
    });
});