import React from 'react';
import { render, screen } from '@testing-library/react-native';
import { TaskList } from '../../src/components/TaskList';

const mockTask = {
  id: '1',
  title: 'Error en Login',
  status: 'pending' as const,
};

const anotherTask = {
  id: '2',
  title: 'Error en Pagos',
  status: 'completed' as const,
};

describe('TaskList', () => {
  it('muestra un mensaje cuando la lista de bugs está vacía', async () => {
    await render(<TaskList tasks={[]} />);

    expect(
      screen.getByText('No hay bugs registrados')
    ).toBeTruthy();
  });

  it('no muestra el mensaje de lista vacía cuando hay bugs', async () => {
    await render(<TaskList tasks={[mockTask]} />);

    expect(
      screen.queryByText('No hay bugs registrados')
    ).toBeNull();
  });

  it('muestra el contador de bugs correctamente', async () => {
    await render(
      <TaskList tasks={[mockTask, anotherTask]} />
    );

    expect(screen.getByText('2 bugs')).toBeTruthy();
  });
});