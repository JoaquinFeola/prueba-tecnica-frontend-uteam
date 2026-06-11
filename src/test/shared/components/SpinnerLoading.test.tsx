import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { SpinnerLoading } from '@/shared/components/SpinnerLoading';

describe('SpinnerLoading', () => {
    it('renders with default size', () => {
        const { container } = render(<SpinnerLoading />);
        const spinner = container.querySelector('div');
        expect(spinner).toBeInTheDocument();
        expect(spinner).toHaveStyle({ width: '20px', height: '20px' });
    });

    it('renders with custom size', () => {
        const { container } = render(<SpinnerLoading size={40} />);
        const spinner = container.querySelector('div');
        expect(spinner).toHaveStyle({ width: '40px', height: '40px' });
    });

    it('has spinner animation class', () => {
        const { container } = render(<SpinnerLoading />);
        expect(container.querySelector('div')).toHaveClass('animate-spin');
    });

    it('has border styling classes', () => {
        const { container } = render(<SpinnerLoading />);
        expect(container.querySelector('div')).toHaveClass('border-2', 'border-gray-300', 'border-t-blue-500');
    });
});