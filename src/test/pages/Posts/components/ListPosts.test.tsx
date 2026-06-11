import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { ListPosts } from '@/pages/Posts/components/ListPosts';
import type { IPost } from '@/shared/interfaces';

const mockPosts: IPost[] = [
    { id: 1, title: 'First Post', body: 'First post body', userId: 1 },
    { id: 2, title: 'Second Post', body: 'Second post body', userId: 1 },
    { id: 3, title: 'Third Post', body: 'Third post body', userId: 2 },
];

const renderWithRouter = (ui: React.ReactElement) => {
    return render(<BrowserRouter>{ui}</BrowserRouter>);
};

describe('ListPosts', () => {
    it('renders all posts in the list', () => {
        renderWithRouter(<ListPosts posts={mockPosts} />);
        expect(screen.getByText('First Post')).toBeInTheDocument();
        expect(screen.getByText('Second Post')).toBeInTheDocument();
        expect(screen.getByText('Third Post')).toBeInTheDocument();
    });

    it('renders empty message when posts array is empty', () => {
        renderWithRouter(<ListPosts posts={[]} />);
        expect(screen.getByText('No se encontraron elementos')).toBeInTheDocument();
    });

    it('renders post bodies', () => {
        renderWithRouter(<ListPosts posts={mockPosts} />);
        expect(screen.getByText('First post body')).toBeInTheDocument();
        expect(screen.getByText('Second post body')).toBeInTheDocument();
        expect(screen.getByText('Third post body')).toBeInTheDocument();
    });

    it('renders single post correctly', () => {
        renderWithRouter(<ListPosts posts={[mockPosts[0]]} />);
        expect(screen.getByText('First Post')).toBeInTheDocument();
        expect(screen.queryByText('Second Post')).not.toBeInTheDocument();
    });

    it('renders with different post data', () => {
        const differentPosts: IPost[] = [
            { id: 10, title: 'Different Post', body: 'Different body', userId: 5 },
        ];
        renderWithRouter(<ListPosts posts={differentPosts} />);
        expect(screen.getByText('Different Post')).toBeInTheDocument();
        expect(screen.getByText('Different body')).toBeInTheDocument();
    });

    it('renders "Ver más" links for each post', () => {
        renderWithRouter(<ListPosts posts={mockPosts} />);
        const verMasLinks = screen.getAllByText('Ver más');
        expect(verMasLinks.length).toBe(3);
    });
});