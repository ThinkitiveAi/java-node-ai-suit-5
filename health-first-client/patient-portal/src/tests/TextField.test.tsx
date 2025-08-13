import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { TextField } from '../ui/TextField';

describe('TextField wrapper', () => {
	it('renders label and helper text', () => {
		render(<TextField label="Email" helperText="Enter your email" />);
		expect(screen.getByText('Email')).toBeInTheDocument();
		expect(screen.getByText('Enter your email')).toBeInTheDocument();
	});
}); 