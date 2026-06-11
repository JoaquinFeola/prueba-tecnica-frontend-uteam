import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { FAB } from '@/shared/components/Buttons/FAB';

describe('FAB', () => {
    it('renders children correctly', () => {
        render(<FAB>+</FAB>);
        expect(screen.getByText('+')).toBeInTheDocument();
    });

    it('applies fixed positioning', () => {
        const { container } = render(<FAB>+</FAB>);
        expect(container.querySelector('button')).toHaveClass('fixed', 'bottom-6', 'right-6');
    });

    it('applies rounded-full class', () => {
        const { container } = render(<FAB>+</FAB>);
        expect(container.querySelector('button')).toHaveClass('rounded-full');
    });

    it('applies primary blue color', () => {
        const { container } = render(<FAB>+</FAB>);
        expect(container.querySelector('button')).toHaveClass('bg-blue-600', 'text-white');
    });

    it('applies small size correctly', () => {
        const { container } = render(<FAB size="sm">+</FAB>);
        expect(container.querySelector('button')).toHaveClass('h-12', 'min-w-12');
    });

    it('applies medium size correctly', () => {
        const { container } = render(<FAB size="md">+</FAB>);
        expect(container.querySelector('button')).toHaveClass('h-14', 'min-w-14');
    });

    it('applies large size correctly', () => {
        const { container } = render(<FAB size="lg">+</FAB>);
        expect(container.querySelector('button')).toHaveClass('h-16', 'min-w-16');
    });

    it('shows loading state with spinner', () => {
        render(<FAB isLoading>+</FAB>);
        expect(screen.queryByText('+')).not.toBeInTheDocument();
    });

    it('disables button when disabled prop is true', () => {
        const { container } = render(<FAB disabled>+</FAB>);
        expect(container.querySelector('button')).toBeDisabled();
    });

    it('disables button when isLoading is true', () => {
        const { container } = render(<FAB isLoading>+</FAB>);
        expect(container.querySelector('button')).toBeDisabled();
    });

    it('calls onClick handler when clicked', () => {
        const handleClick = vi.fn();
        const { container } = render(<FAB onClick={handleClick}>+</FAB>);
        fireEvent.click(container.querySelector('button')!);
        expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it('applies custom className', () => {
        const { container } = render(<FAB className="custom-class">+</FAB>);
        expect(container.querySelector('button')).toHaveClass('custom-class');
    });
});