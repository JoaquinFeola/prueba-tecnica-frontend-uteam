import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { CreatePostModal } from '@/pages/Posts/components/CreatePostModal';

const defaultProps = {
    isOpen: true,
    onClose: vi.fn(),
    onCreate: vi.fn(),
};

describe('CreatePostModal', () => {
    it('renders modal when isOpen is true', () => {
        render(<CreatePostModal {...defaultProps} />);
        expect(screen.getByText('Creá un nuevo post')).toBeInTheDocument();
    });

    it('does not render modal when isOpen is false', () => {
        const { container } = render(<CreatePostModal {...defaultProps} isOpen={false} />);
        expect(container.firstChild).toBeNull();
    });

    it('displays title input with placeholder', () => {
        render(<CreatePostModal {...defaultProps} />);
        expect(screen.getByPlaceholderText('Escribe aquí el título del post...')).toBeInTheDocument();
    });

    it('displays body textarea with placeholder', () => {
        render(<CreatePostModal {...defaultProps} />);
        expect(screen.getByPlaceholderText('Escribe aquí la descripción del post...')).toBeInTheDocument();
    });

    it('displays Cancel and Crear buttons', () => {
        render(<CreatePostModal {...defaultProps} />);
        expect(screen.getByRole('button', { name: /cancelar/i })).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /crear/i })).toBeInTheDocument();
    });

    it('calls onClose when Cancel button is clicked', () => {
        render(<CreatePostModal {...defaultProps} />);
        fireEvent.click(screen.getByRole('button', { name: /cancelar/i }));
        expect(defaultProps.onClose).toHaveBeenCalledTimes(1);
    });

    it('has form with two input fields', () => {
        const { container } = render(<CreatePostModal {...defaultProps} />);
        expect(container.querySelectorAll('input[name="title"]').length).toBe(1);
        expect(container.querySelectorAll('textarea[name="body"]').length).toBe(1);
    });

    it('textarea has 6 rows', () => {
        const { container } = render(<CreatePostModal {...defaultProps} />);
        const textarea = container.querySelector('textarea');
        expect(textarea?.getAttribute('rows')).toBe('6');
    });

    it('renders form with correct structure', () => {
        const { container } = render(<CreatePostModal {...defaultProps} />);
        expect(container.querySelector('form')).toBeInTheDocument();
    });

    it('displays both text fields with labels', () => {
        render(<CreatePostModal {...defaultProps} />);
        expect(screen.getByText('Título')).toBeInTheDocument();
        expect(screen.getByText('Descripción del Post')).toBeInTheDocument();
    });
});