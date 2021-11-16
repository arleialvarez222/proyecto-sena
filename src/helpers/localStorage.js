// localStorage.js
export const loadState = () => {
  try {
    const serializedState = localStorage.getItem('state');
    if (serializedState === null) {
      return {};
    }

    return JSON.parse(serializedState);
  } catch (err) {
    return {};
  }
};

export const saveState = (state) => {
  if (state.autenticado === undefined) return;
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('state', serializedState);
  } catch {
    // ignore write errors
  }
};

