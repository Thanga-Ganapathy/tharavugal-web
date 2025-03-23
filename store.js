'use client';

import { create } from '@opentf/react-state';
import { isJSON } from '@opentf/std';

const user = window.localStorage.getItem('user');

const [useAppState, setAppState] = create({
  user: isJSON(user) ? JSON.parse(user) : null,
  themeMode: 'light',
  loading: false,
  visualizer: {
    filter: null,
    data: [],
    title: '',
    loading: false,
    chartType: 'Bar Chart',
  },
});

export { useAppState, setAppState };
