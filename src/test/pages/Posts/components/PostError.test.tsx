import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { PostError } from '@/pages/Posts/components/PostError';

describe('PostError', () => {
    it('renders default error message', () => {
        render(<PostError />);
        expect(screen.getByText('Ocurrió un error al cargar los posts.')).toBeInTheDocument();
    });

    it('renders custom error message', () => {
        render(<PostError message="Error personalizado" />);
        expect(screen.getByText('Error personalizado')).toBeInTheDocument();
    });

    it('displays "Algo salió mal" heading', () => {
        render(<PostError />);
        expect(screen.getByText('Algo salió mal')).toBeInTheDocument();
    });

    it('renders retry button when onRetry is provided', () => {
        render(<PostError onRetry={vi.fn()} />);
        expect(screen.getByText('Reintentar')).toBeInTheDocument();
    });

    it('does not render retry button when onRetry is not provided', () => {
        render(<PostError />);
        expect(screen.queryByText('Reintentar')).not.toBeInTheDocument();
    });

    it('calls onRetry when retry button is clicked', () => {
        const handleRetry = vi.fn();
        render(<PostError onRetry={handleRetry} />);
        screen.getByText('Reintentar').click();
        expect(handleRetry).toHaveBeenCalledTimes(1);
    });

    it('displays error icon', () => {
        render(<PostError />);
        const container = document.querySelector('svg');
        expect(container).toBeInTheDocument();
    });
});