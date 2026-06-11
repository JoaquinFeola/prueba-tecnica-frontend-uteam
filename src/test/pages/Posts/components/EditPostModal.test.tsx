import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { EditPostModal } from '@/pages/Posts/components/EditPostModal';
import type { IPost } from '@/shared/interfaces';

const mockPost: IPost = {
    id: 1,
    title: 'Test Post Title',
    body: 'Test post body content',
    userId: 1,
};

const defaultProps = {
    isOpen: true,
    post: mockPost,
    onClose: vi.fn(),
    onSave: vi.fn(),
};

describe('EditPostModal', () => {
    it('renders modal when isOpen is true', () => {
        render(<EditPostModal {...defaultProps} />);
        expect(screen.getByText(/editando/i)).toBeInTheDocument();
    });

    it('does not render modal when isOpen is false', () => {
        const { container } = render(<EditPostModal {...defaultProps} isOpen={false} />);
        expect(container.firstChild).toBeNull();
    });

    it('displays post title in header', () => {
        render(<EditPostModal {...defaultProps} />);
        expect(screen.getByText('Editando Test Post Title')).toBeInTheDocument();
    });

    it('displays Cancel and Guardar buttons', () => {
        render(<EditPostModal {...defaultProps} />);
        expect(screen.getByRole('button', { name: /cancelar/i })).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /guardar/i })).toBeInTheDocument();
    });

    it('calls onClose when Cancel button is clicked', () => {
        render(<EditPostModal {...defaultProps} />);
        fireEvent.click(screen.getByRole('button', { name: /cancelar/i }));
        expect(defaultProps.onClose).toHaveBeenCalledTimes(1);
    });

    it('has form with title and body inputs', () => {
        const { container } = render(<EditPostModal {...defaultProps} />);
        expect(container.querySelectorAll('input[name="title"]').length).toBe(1);
        expect(container.querySelectorAll('textarea[name="body"]').length).toBe(1);
    });

    it('pre-fills title input with post title', () => {
        const { container } = render(<EditPostModal {...defaultProps} />);
        const titleInput = container.querySelector('input[name="title"]') as HTMLInputElement;
        expect(titleInput.value).toBe('Test Post Title');
    });

    it('pre-fills body textarea with post body', () => {
        const { container } = render(<EditPostModal {...defaultProps} />);
        const bodyInput = container.querySelector('textarea[name="body"]') as HTMLTextAreaElement;
        expect(bodyInput.value).toBe('Test post body content');
    });

    it('renders with different post data', () => {
        const differentPost: IPost = {
            id: 2,
            title: 'Another Post Title',
            body: 'Another post body content',
            userId: 2,
        };
        render(<EditPostModal {...defaultProps} post={differentPost} />);
        expect(screen.getByText('Editando Another Post Title')).toBeInTheDocument();
    });
});