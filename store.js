import { create } from '@opentf/react-state';

const [useAppState, setAppState] = create({
  user: null,
  themeMode: 'light',
  loading: false,
  visualizer: { filter: null, data: [], title: '', loading: false, chartType: 'Bar Chart' },
});

export { useAppState, setAppState };
