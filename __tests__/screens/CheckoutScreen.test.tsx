import React from 'react';
import {
  render,
  screen,
  fireEvent,
} from '@testing-library/react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { CheckoutScreen } from '../../src/screens/CheckoutScreen';

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
      <CheckoutScreen />
    </SafeAreaProvider>
  );

describe('CheckoutScreen', () => {

  it('muestra el botón Confirmar pago', () => {
    renderScreen();

    expect(
      screen.getByText('Confirmar pago')
    ).toBeTruthy();
  });

  it('muestra mensaje de error cuando faltan campos', () => {
    renderScreen();

    fireEvent.press(
      screen.getByText('Confirmar pago')
    );

    expect(
      screen.getByText(
        'Completa todos los campos antes de continuar'
      )
    ).toBeTruthy();
  });

  it('completa una transacción cuando todos los campos tienen información', () => {
    renderScreen();

    // Información del usuario
    fireEvent.changeText(
      screen.getByTestId('input-nombre'),
      'Ana Pérez'
    );

    fireEvent.changeText(
      screen.getByTestId('input-email'),
      'ana@test.com'
    );

    fireEvent.changeText(
      screen.getByTestId('input-telefono'),
      '3001234567'
    );

    // Información de envío
    fireEvent.changeText(
      screen.getByTestId('input-direccion'),
      'Calle 10 #20-30'
    );

    fireEvent.changeText(
      screen.getByTestId('input-ciudad'),
      'Bogotá'
    );

    fireEvent.changeText(
      screen.getByTestId('input-codigo-postal'),
      '110111'
    );

    // Información de pago
    fireEvent.changeText(
      screen.getByTestId('input-titular'),
      'Ana Pérez'
    );

    fireEvent.changeText(
      screen.getByTestId('input-numero-tarjeta'),
      '4111111111111111'
    );

    fireEvent.changeText(
      screen.getByTestId('input-vencimiento'),
      '12/28'
    );

    fireEvent.changeText(
      screen.getByTestId('input-cvv'),
      '123'
    );

    // Confirmar transacción
    fireEvent.press(
      screen.getByText('Confirmar pago')
    );

    expect(
      screen.getByText(
        'Transacción completada exitosamente'
      )
    ).toBeTruthy();
  });
});