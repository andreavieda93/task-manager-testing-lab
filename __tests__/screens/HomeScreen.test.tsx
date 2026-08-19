import React from 'react';
import { render, screen } from '@testing-library/react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { HomeScreen } from '../../src/screens/HomeScreen';

jest.mock('expo-router', () => ({
  Link: ({ children }: { children: React.ReactNode }) => children,
}));

const metrics = {
  frame: {
    x: 0,
    y: 0,
    width: 390,
    height: 844,
  },
  insets: {
    top: 47,
    left: 0,
    right: 0,
    bottom: 34,
  },
};

const renderScreen = () =>
  render(
    <SafeAreaProvider initialMetrics={metrics}>
      <HomeScreen />
    </SafeAreaProvider>
  );

describe('HomeScreen', () => {
  it('muestra el título principal de la aplicación', () => {
    renderScreen();

    expect(
      screen.getByText('Task Manager')
    ).toBeTruthy();
  });

  it('muestra el acceso al flujo Todo List', () => {
    renderScreen();

    expect(
      screen.getByText('Flujo Todo List')
    ).toBeTruthy();

    expect(
      screen.getByText('Crear, completar y eliminar tareas')
    ).toBeTruthy();
  });

  it('muestra el acceso al flujo transaccional', () => {
    renderScreen();

    expect(
      screen.getByText('Flujo Transaccional')
    ).toBeTruthy();

    expect(
      screen.getByText('Datos de usuario, envío y pago')
    ).toBeTruthy();
  });

  it('los accesos principales tienen rol de botón', () => {
    renderScreen();

    const buttons = screen.getAllByRole('button');

    expect(buttons).toHaveLength(2);
  });

  it('los accesos tienen etiquetas accesibles descriptivas', () => {
    renderScreen();

    expect(
      screen.getByLabelText('Flujo Todo List')
    ).toBeTruthy();

    expect(
      screen.getByLabelText('Flujo Transaccional')
    ).toBeTruthy();
  });
});