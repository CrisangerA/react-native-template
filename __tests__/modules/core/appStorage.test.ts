import { useAppStorage } from '@modules/core/application/app.storage';
import { act } from '@testing-library/react-native';

describe('useAppStorage - Zustand Store', () => {
  beforeEach(() => {
    // Resetear el store antes de cada test
    const { modal, toast } = useAppStorage.getState();
    act(() => {
      modal.close();
      toast.hide();
    });
  });

  describe('Modal', () => {
    it('debe iniciar con modal oculto', () => {
      const { modal } = useAppStorage.getState();
      expect(modal.visible).toBe(false);
      expect(modal.entityName).toBe('');
      expect(modal.entityType).toBe('');
      expect(modal.onConfirm).toBeNull();
    });

    it('debe abrir modal con los parámetros correctos', () => {
      const onConfirm = jest.fn();
      act(() => {
        useAppStorage.getState().modal.open({
          entityName: 'Laptop HP',
          entityType: 'producto',
          onConfirm,
        });
      });

      const { modal } = useAppStorage.getState();
      expect(modal.visible).toBe(true);
      expect(modal.entityName).toBe('Laptop HP');
      expect(modal.entityType).toBe('producto');
      expect(modal.onConfirm).toBe(onConfirm);
    });

    it('debe cerrar modal y limpiar estado', () => {
      const onConfirm = jest.fn();
      act(() => {
        useAppStorage.getState().modal.open({
          entityName: 'Test',
          entityType: 'item',
          onConfirm,
        });
      });

      act(() => {
        useAppStorage.getState().modal.close();
      });

      const { modal } = useAppStorage.getState();
      expect(modal.visible).toBe(false);
      expect(modal.entityName).toBe('');
      expect(modal.entityType).toBe('');
      expect(modal.onConfirm).toBeNull();
    });
  });

  describe('Toast', () => {
    it('debe iniciar con toast oculto', () => {
      const { toast } = useAppStorage.getState();
      expect(toast.visible).toBe(false);
      expect(toast.message).toBe('');
      expect(toast.type).toBe('info');
      expect(toast.duration).toBe(3000);
      expect(toast.position).toBe('top');
    });

    it('debe mostrar toast con parámetros obligatorios', () => {
      act(() => {
        useAppStorage.getState().toast.show({
          message: 'Guardado exitosamente',
          type: 'success',
        });
      });

      const { toast } = useAppStorage.getState();
      expect(toast.visible).toBe(true);
      expect(toast.message).toBe('Guardado exitosamente');
      expect(toast.type).toBe('success');
      expect(toast.duration).toBe(3000);
      expect(toast.position).toBe('top');
    });

    it('debe mostrar toast con parámetros opcionales', () => {
      act(() => {
        useAppStorage.getState().toast.show({
          message: 'Error de red',
          type: 'error',
          duration: 5000,
          position: 'bottom',
        });
      });

      const { toast } = useAppStorage.getState();
      expect(toast.visible).toBe(true);
      expect(toast.message).toBe('Error de red');
      expect(toast.type).toBe('error');
      expect(toast.duration).toBe(5000);
      expect(toast.position).toBe('bottom');
    });

    it('debe ocultar toast y resetear estado', () => {
      act(() => {
        useAppStorage.getState().toast.show({
          message: 'Test',
          type: 'info',
        });
      });

      act(() => {
        useAppStorage.getState().toast.hide();
      });

      const { toast } = useAppStorage.getState();
      expect(toast.visible).toBe(false);
      expect(toast.message).toBe('');
      expect(toast.type).toBe('info');
      expect(toast.duration).toBe(3000);
      expect(toast.position).toBe('top');
    });

    it('debe soportar los tres tipos de toast', () => {
      const types: Array<'success' | 'error' | 'info'> = ['success', 'error', 'info'];
      types.forEach(type => {
        act(() => {
          useAppStorage.getState().toast.show({ message: 'Test', type });
        });
        expect(useAppStorage.getState().toast.type).toBe(type);
      });
    });
  });
});
