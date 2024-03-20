import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';

import App from './App';
import List from './components/List'; // Import List component
import Item from './components/Item'; // Import Item component

describe('App component tests', () => {
  test('renders "Hello Canada" heading', () => {
    render(<App />);
    expect(screen.getByText('Hello Canada')).toBeInTheDocument();
  });

  test('renders Canada flag image', () => {
    render(<App />);
    const flagImg = screen.getByAltText("Canada's Flag");
    expect(flagImg).toBeInTheDocument();
    expect(flagImg.src).toBe('https://upload.wikimedia.org/wikipedia/commons/d/d9/Flag_of_Canada_%28Pantone%29.svg');
  });

  test('clicking on "Provinces" shows province list', async () => {
    render(<App />);
    fireEvent.click(screen.getByText('Provinces'));
    await new Promise(resolve => setTimeout(resolve, 2000)); 
    expect(screen.getByText("Ontario")).toBeInTheDocument();
  });

  test('clicking on "Territories" shows territories list', async () => {
    render(<App />);
    await new Promise(resolve => setTimeout(resolve, 2000)); 
    fireEvent.click(screen.getByText('Territories'));
    await new Promise(resolve => setTimeout(resolve, 2000)); 
    expect(screen.getByText('Northwest Territories')).toBeInTheDocument();
  });

  test('clicking "Show Capital" displays capital for a province', async () => {
    render(<App />);
    await new Promise(resolve => setTimeout(resolve, 2000)); 
    const allButtons = document.querySelectorAll('.btn-capital-show');
    const secondShowCapitalButton = allButtons[0];
    fireEvent.click(secondShowCapitalButton);
    const capitalElement = await screen.getByText('Toronto'); 
    expect(capitalElement).toBeInTheDocument();
  });
});
