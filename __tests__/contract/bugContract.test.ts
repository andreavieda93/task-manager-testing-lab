import { bugSchema } from '../../src/schemas/bugSchema';

describe('Contrato API - Bug', () => {
  it('acepta una respuesta válida de la API', () => {
    const validResponse = {
      id: '1',
      title: 'Error en Login',
      module: 'Login',
      priority: 'high',
      description: 'El usuario no puede iniciar sesión',
      expectedResult: 'El usuario debe ingresar correctamente',
      actualResult: 'Se muestra un error',
      status: 'pending',
    };

    const result = bugSchema.safeParse(validResponse);

    expect(result.success).toBe(true);
  });

  it('rechaza una respuesta inválida de la API', () => {
    const invalidResponse = {
      id: 1, // incorrecto: debe ser string
      title: 'Error en Login',
      module: 'Login',
      priority: 'urgent', // incorrecto: solo low, medium o high
      description: 'El usuario no puede iniciar sesión',
      expectedResult: 'El usuario debe ingresar correctamente',
      actualResult: 'Se muestra un error',
      status: 'pending',
    };

    const result = bugSchema.safeParse(invalidResponse);

    expect(result.success).toBe(false);
  });
});