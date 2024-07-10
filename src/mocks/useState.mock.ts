export const mockSetState = vi.fn();
vi.mock('react', () => ({
  useState: (initial: any) => [initial, mockSetState],
}));
