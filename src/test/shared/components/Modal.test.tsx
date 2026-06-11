import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Modal } from '@/shared/components/Modal';

describe('Modal', () => {
    const defaultProps = {
        isOpen: true,
        onClose: vi.fn(),
        children: <p>Modal content</p>,
    };

    it('renders children when isOpen is true', () => {
        render(<Modal {...defaultProps} />);
        expect(screen.getByText('Modal content')).toBeInTheDocument();
    });

    it('does not render anything when isOpen is false', () => {
        const { container } = render(<Modal {...defaultProps} isOpen={false} />);
        expect(container.firstChild).toBeNull();
    });

    it('displays title when provided', () => {
        render(<Modal {...defaultProps} title="Test Title" />);
        expect(screen.getByText('Test Title')).toBeInTheDocument();
    });

    it('does not display title content when not provided', () => {
        render(<Modal {...defaultProps} />);
        const heading = screen.queryByRole('heading');
        expect(heading).toBeInTheDocument();
        expect(heading).toBeEmptyDOMElement();
    });

    it('calls onClose when close button is clicked', () => {
        const onClose = vi.fn();
        render(<Modal {...defaultProps} onClose={onClose} />);
        fireEvent.click(screen.getByRole('button'));
        expect(onClose).toHaveBeenCalledTimes(1);
    });

    it('calls onClose when background is clicked and backgroundCanClose is true', () => {
        const onClose = vi.fn();
        const { container } = render(
            <Modal {...defaultProps} onClose={onClose} backgroundCanClose={true} />
        );
        fireEvent.click(container.firstChild as Element);
        expect(onClose).toHaveBeenCalledTimes(1);
    });

    it('does not call onClose when background is clicked and backgroundCanClose is false', () => {
        const onClose = vi.fn();
        const { container } = render(
            <Modal {...defaultProps} onClose={onClose} backgroundCanClose={false} />
        );
        fireEvent.click(container.firstChild as Element);
        expect(onClose).not.toHaveBeenCalled();
    });

    it('does not call onClose when clicking inside modal content', () => {
        const onClose = vi.fn();
        render(
            <Modal {...defaultProps} onClose={onClose} backgroundCanClose={true}>
                <div data-testid="content">Content</div>
            </Modal>
        );
        fireEvent.click(screen.getByTestId('content'));
        expect(onClose).not.toHaveBeenCalled();
    });
});