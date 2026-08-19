import { renderHook, act } from '@testing-library/react-native';

import { useCreateTask } from '../../src/hooks/useCreateTask';
import { createBug } from '../../src/services/taskService';

jest.mock('../../src/services/taskService', () => ({
  createBug: jest.fn(),
}));

const mockCreateBug = createBug as jest.MockedFunction<typeof createBug>;

const bugData = {
  title: 'Error en Login',
  module: 'Login',
  priority: 'high' as const,
  description: 'El usuario no puede iniciar sesión',
  expectedResult: 'El usuario debe ingresar correctamente',
  actualResult: 'Se muestra un error',
};

const createdBug = {
  id: '1',
  ...bugData,
  status: 'pending' as const,
};

describe('useCreateTask', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  // Verifica que el hook registre correctamente un nuevo bug
  it('crea un bug correctamente', async () => {
    mockCreateBug.mockResolvedValueOnce(createdBug);

    const { result } = renderHook(() => useCreateTask());

    await act(async () => {
      await result.current.submit(bugData);
    });

    expect(mockCreateBug).toHaveBeenCalledWith(bugData);

    expect(result.current.status).toBe('success');

    expect(result.current.tasks).toHaveLength(1);

    expect(result.current.tasks[0].title).toBe(
      'Error en Login'
    );
  });

  // Verifica el comportamiento cuando el servicio presenta un error
  it('cambia el estado a error cuando el servicio falla', async () => {
    mockCreateBug.mockRejectedValueOnce(
      new Error('Error del servicio')
    );

    const { result } = renderHook(() => useCreateTask());

    await act(async () => {
      await result.current.submit(bugData);
    });

    expect(result.current.status).toBe('error');

    expect(result.current.tasks).toHaveLength(0);
  });

  // Verifica que un bug pueda eliminarse de la lista
  it('elimina un bug de la lista', async () => {
    mockCreateBug.mockResolvedValueOnce(createdBug);

    const { result } = renderHook(() => useCreateTask());

    await act(async () => {
      await result.current.submit(bugData);
    });

    expect(result.current.tasks).toHaveLength(1);

    act(() => {
      result.current.removeTask('1');
    });

    expect(result.current.tasks).toHaveLength(0);
  });

  // Verifica el cambio de estado de pendiente a completado
  it('cambia un bug de pendiente a completado', async () => {
    mockCreateBug.mockResolvedValueOnce(createdBug);

    const { result } = renderHook(() => useCreateTask());

    await act(async () => {
      await result.current.submit(bugData);
    });

    act(() => {
      result.current.toggleTask('1');
    });

    expect(result.current.tasks[0].status).toBe(
      'completed'
    );
  });

  // Verifica que un bug completado pueda volver a pendiente
  it('cambia un bug completado nuevamente a pendiente', async () => {
    const completedBug = {
      ...createdBug,
      status: 'completed' as const,
    };

    mockCreateBug.mockResolvedValueOnce(completedBug);

    const { result } = renderHook(() => useCreateTask());

    await act(async () => {
      await result.current.submit(bugData);
    });

    act(() => {
      result.current.toggleTask('1');
    });

    expect(result.current.tasks[0].status).toBe(
      'pending'
    );
  });
});