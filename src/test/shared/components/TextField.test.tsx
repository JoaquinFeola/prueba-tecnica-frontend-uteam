import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { TextField } from '@/shared/components/TextField';

describe('TextField', () => {
    it('renders input by default', () => {
        render(<TextField />);
        expect(screen.getByRole('textbox')).toBeInTheDocument();
    });

    it('renders textarea when as="textarea"', () => {
        render(<TextField as="textarea" />);
        expect(screen.getByRole('textbox')).toBeInTheDocument();
    });

    it('displays label when provided', () => {
        render(<TextField label="Email" />);
        expect(screen.getByText('Email')).toBeInTheDocument();
    });

    it('does not display label when not provided', () => {
        render(<TextField />);
        expect(screen.queryByText('Email')).not.toBeInTheDocument();
    });

    it('displays error message when error prop is provided', () => {
        render(<TextField error="Este campo es requerido" />);
        expect(screen.getByText('Este campo es requerido')).toBeInTheDocument();
    });

    it('displays helper text when no error and helperText is provided', () => {
        render(<TextField helperText="Ingresa tu email" />);
        expect(screen.getByText('Ingresa tu email')).toBeInTheDocument();
    });

    it('shows error styling when error prop is provided', () => {
        const { container } = render(<TextField error="Error" />);
        expect(container.querySelector('input')).toHaveClass('border-red-500');
    });

    it('does not show helper text when error is present', () => {
        render(<TextField error="Error" helperText="Helper" />);
        expect(screen.queryByText('Helper')).not.toBeInTheDocument();
    });

    it('handles onChange event', () => {
        const handleChange = vi.fn();
        render(<TextField onChange={handleChange} />);
        fireEvent.change(screen.getByRole('textbox'), { target: { value: 'test' } });
        expect(handleChange).toHaveBeenCalled();
    });

    it('forwards ref correctly', () => {
        const ref = { current: null };
        render(<TextField ref={ref} />);
        expect(ref.current).not.toBeNull();
    });

    it('applies custom className', () => {
        const { container } = render(<TextField className="custom-class" />);
        expect(container.querySelector('input')).toHaveClass('custom-class');
    });

    it('disables input when disabled prop is true', () => {
        const { container } = render(<TextField disabled />);
        expect(container.querySelector('input')).toBeDisabled();
    });

    it('applies disabled styling', () => {
        const { container } = render(<TextField disabled />);
        expect(container.querySelector('input')).toHaveClass('disabled:bg-slate-100');
    });
});