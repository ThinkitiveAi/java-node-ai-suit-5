import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Button } from '../ui/Button';

describe('Button wrapper', () => {
	it('renders with text and icons', () => {
		render(<Button startIcon={<span aria-hidden>!</span>} endIcon={<span aria-hidden>?</span>}>Click</Button>);
		expect(screen.getByText('Click')).toBeInTheDocument();
	});
}); 