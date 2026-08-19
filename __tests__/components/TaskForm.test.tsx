import React from 'react';
import {
  render,
  screen,
  fireEvent,
} from '@testing-library/react-native';

import { TaskForm } from '../../src/components/TaskForm';

describe('TaskForm', () => {
  it('llama a onSubmit con los datos del bug al presionar "Guardar bug"', () => {
    const mockOnSubmit = jest.fn();

    render(<TaskForm onSubmit={mockOnSubmit} />);

    fireEvent.changeText(
      screen.getByPlaceholderText('Título del bug'),
      'Error en Login'
    );

    fireEvent.changeText(
      screen.getByPlaceholderText('Módulo'),
      'Login'
    );

    fireEvent.press(
      screen.getByText('Alta')
    );

    fireEvent.changeText(
      screen.getByPlaceholderText('Descripción del problema'),
      'El usuario no puede iniciar sesión'
    );

    fireEvent.changeText(
      screen.getByPlaceholderText('Resultado esperado'),
      'El usuario debe ingresar correctamente'
    );

    fireEvent.changeText(
      screen.getByPlaceholderText('Resultado obtenido'),
      'Se muestra un error'
    );

    fireEvent.press(
      screen.getByText('Guardar bug')
    );

    expect(mockOnSubmit).toHaveBeenCalledWith({
      title: 'Error en Login',
      module: 'Login',
      priority: 'high',
      description: 'El usuario no puede iniciar sesión',
      expectedResult: 'El usuario debe ingresar correctamente',
      actualResult: 'Se muestra un error',
    });

    expect(mockOnSubmit).toHaveBeenCalledTimes(1);
  });

  it('no llama a onSubmit cuando el título está vacío', () => {
    const mockOnSubmit = jest.fn();

    render(<TaskForm onSubmit={mockOnSubmit} />);

    fireEvent.press(
      screen.getByText('Guardar bug')
    );

    expect(mockOnSubmit).not.toHaveBeenCalled();
  });

  it('muestra el campo de título vacío al iniciar', () => {
    render(<TaskForm onSubmit={jest.fn()} />);

    const input =
      screen.getByPlaceholderText('Título del bug');

    expect(input.props.value).toBe('');
  });

  it('muestra el texto ingresado en el campo de título', () => {
    render(<TaskForm onSubmit={jest.fn()} />);

    const input =
      screen.getByPlaceholderText('Título del bug');

    fireEvent.changeText(
      input,
      'Error en pagos'
    );

    expect(input.props.value).toBe(
      'Error en pagos'
    );
  });

  it('permite modificar el título varias veces antes de guardar', () => {
    render(<TaskForm onSubmit={jest.fn()} />);

    const input =
      screen.getByPlaceholderText('Título del bug');

    fireEvent.changeText(
      input,
      'Error inicial'
    );

    fireEvent.changeText(
      input,
      'Error en Login'
    );

    expect(input.props.value).toBe(
      'Error en Login'
    );
  });
});