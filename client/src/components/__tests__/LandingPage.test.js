import { render, screen, cleanup } from '@testing-library/react';
import LandingPage from '../LandingPage';


test('renderizar componente LandingPage', () => {
    render(<LandingPage />);
    const landingElement = screen.getAllByTestId('landing-1');
    expect(landingElement).toBeInTheDocument();
})