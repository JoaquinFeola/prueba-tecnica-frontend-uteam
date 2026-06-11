import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Button } from '@/shared/components/Buttons/Button';

describe('Button', () => {
    it('renders children correctly', () => {
        render(<Button>Click me</Button>);
        expect(screen.getByText('Click me')).toBeInTheDocument();
    });

    it('applies primary variant by default', () => {
        const { container } = render(<Button>Primary</Button>);
        expect(container.querySelector('button')).toHaveClass('bg-blue-600');
    });

    it('applies secondary variant correctly', () => {
        const { container } = render(<Button variant="secondary">Secondary</Button>);
        expect(container.querySelector('button')).toHaveClass('bg-slate-100');
    });

    it('applies tertiary variant correctly', () => {
        const { container } = render(<Button variant="tertiary">Tertiary</Button>);
        expect(container.querySelector('button')).toHaveClass('bg-transparent');
    });

    it('applies small size correctly', () => {
        const { container } = render(<Button size="sm">Small</Button>);
        expect(container.querySelector('button')).toHaveClass('h-8');
    });

    it('applies medium size correctly', () => {
        const { container } = render(<Button size="md">Medium</Button>);
        expect(container.querySelector('button')).toHaveClass('h-10');
    });

    it('applies large size correctly', () => {
        const { container } = render(<Button size="lg">Large</Button>);
        expect(container.querySelector('button')).toHaveClass('h-12');
    });

    it('shows loading state with spinner and text', () => {
        render(<Button isLoading loadingText="Guardando...">Save</Button>);
        expect(screen.getByText('Guardando...')).toBeInTheDocument();
        expect(screen.queryByText('Save')).not.toBeInTheDocument();
    });

    it('disables button when disabled prop is true', () => {
        const { container } = render(<Button disabled>Disabled</Button>);
        expect(container.querySelector('button')).toBeDisabled();
    });

    it('disables button when isLoading is true', () => {
        const { container } = render(<Button isLoading>Loading</Button>);
        expect(container.querySelector('button')).toBeDisabled();
    });

    it('calls onClick handler when clicked', () => {
        const handleClick = vi.fn();
        const { container } = render(<Button onClick={handleClick}>Click</Button>);
        fireEvent.click(container.querySelector('button')!);
        expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it('does not call onClick when disabled', () => {
        const handleClick = vi.fn();
        const { container } = render(<Button disabled onClick={handleClick}>Disabled</Button>);
        fireEvent.click(container.querySelector('button')!);
        expect(handleClick).not.toHaveBeenCalled();
    });

    it('does not call onClick when loading', () => {
        const handleClick = vi.fn();
        const { container } = render(<Button isLoading onClick={handleClick}>Loading</Button>);
        fireEvent.click(container.querySelector('button')!);
        expect(handleClick).not.toHaveBeenCalled();
    });

    it('applies custom className', () => {
        const { container } = render(<Button className="custom-class">Custom</Button>);
        expect(container.querySelector('button')).toHaveClass('custom-class');
    });
});