import { useReducer, useCallback, useEffect, useRef } from 'react';
import type { ThemeConfig, ThemeColors, EditorState, EditorAction, ThemeExportJSON } from '../types/theme';
import { lightTheme, darkTheme, brandTheme } from '../styles/themes';

const STORAGE_KEY = 'theme-editor-state';

// ──── 将预设 Theme 转换为 ThemeConfig ────

function themeToConfig(theme: typeof lightTheme, isPreset = true): ThemeConfig {
  const now = new Date().toISOString();
  return {
    ...theme,
    version: 1,
    createdAt: now,
    updatedAt: now,
    isPreset,
  };
}

const defaultPresets: ThemeConfig[] = [
  themeToConfig(lightTheme),
  themeToConfig(darkTheme),
  themeToConfig(brandTheme),
];

// ──── 从 localStorage 加载状态 ────

function loadState(): EditorState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw) as EditorState;
      if (parsed.themes?.length > 0) {
        return parsed;
      }
    }
  } catch {
    // ignore
  }
  return {
    activeThemeId: 'light',
    themes: defaultPresets,
    isDirty: false,
    previewMode: 'single',
  };
}

// ──── 生成唯一 ID ────

function generateId(): string {
  return `theme-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

// ──── Reducer ────

function editorReducer(state: EditorState, action: EditorAction): EditorState {
  switch (action.type) {
    case 'SELECT_THEME': {
      return { ...state, activeThemeId: action.id };
    }

    case 'UPDATE_TOKEN': {
      const themes = state.themes.map((t) =>
        t.id === state.activeThemeId
          ? {
              ...t,
              colors: { ...t.colors, [action.token]: action.value },
              updatedAt: new Date().toISOString(),
              version: t.version + 1,
            }
          : t
      );
      return { ...state, themes, isDirty: true };
    }

    case 'CREATE_THEME': {
      const baseTheme = action.baseId
        ? state.themes.find((t) => t.id === action.baseId)
        : state.themes.find((t) => t.id === state.activeThemeId);
      const now = new Date().toISOString();
      const newTheme: ThemeConfig = {
        id: generateId(),
        name: action.name,
        isDark: baseTheme?.isDark ?? false,
        colors: baseTheme ? { ...baseTheme.colors } : { ...defaultPresets[0].colors },
        version: 1,
        createdAt: now,
        updatedAt: now,
        isPreset: false,
      };
      return {
        ...state,
        themes: [...state.themes, newTheme],
        activeThemeId: newTheme.id,
        isDirty: true,
      };
    }

    case 'DUPLICATE_THEME': {
      const source = state.themes.find((t) => t.id === action.id);
      if (!source) return state;
      const now = new Date().toISOString();
      const dup: ThemeConfig = {
        ...source,
        id: generateId(),
        name: `${source.name} (副本)`,
        version: 1,
        createdAt: now,
        updatedAt: now,
        isPreset: false,
      };
      return {
        ...state,
        themes: [...state.themes, dup],
        activeThemeId: dup.id,
        isDirty: true,
      };
    }

    case 'DELETE_THEME': {
      const target = state.themes.find((t) => t.id === action.id);
      if (!target || target.isPreset) return state; // 预设主题不可删
      const filtered = state.themes.filter((t) => t.id !== action.id);
      const newActiveId =
        state.activeThemeId === action.id
          ? filtered[0]?.id ?? 'light'
          : state.activeThemeId;
      return {
        ...state,
        themes: filtered,
        activeThemeId: newActiveId,
        isDirty: true,
      };
    }

    case 'RENAME_THEME': {
      const themes = state.themes.map((t) =>
        t.id === action.id
          ? { ...t, name: action.name, updatedAt: new Date().toISOString() }
          : t
      );
      return { ...state, themes, isDirty: true };
    }

    case 'UPDATE_DESCRIPTION': {
      const themes = state.themes.map((t) =>
        t.id === action.id
          ? { ...t, description: action.description, updatedAt: new Date().toISOString() }
          : t
      );
      return { ...state, themes, isDirty: true };
    }

    case 'TOGGLE_DARK': {
      const themes = state.themes.map((t) =>
        t.id === action.id
          ? { ...t, isDark: !t.isDark, updatedAt: new Date().toISOString() }
          : t
      );
      return { ...state, themes, isDirty: true };
    }

    case 'IMPORT_THEMES': {
      // 合并导入的主题，ID 冲突则使用新 ID
      const existingIds = new Set(state.themes.map((t) => t.id));
      const imported = action.themes.map((t) => ({
        ...t,
        id: existingIds.has(t.id) ? generateId() : t.id,
        isPreset: false,
      }));
      return {
        ...state,
        themes: [...state.themes, ...imported],
        isDirty: true,
      };
    }

    case 'SET_COMPARE': {
      if (action.id) {
        return { ...state, previewMode: 'compare', compareThemeId: action.id };
      }
      return { ...state, previewMode: 'single', compareThemeId: undefined };
    }

    case 'TOGGLE_COMPARE': {
      if (state.previewMode === 'compare') {
        return { ...state, previewMode: 'single', compareThemeId: undefined };
      }
      const otherTheme = state.themes.find((t) => t.id !== state.activeThemeId);
      return {
        ...state,
        previewMode: 'compare',
        compareThemeId: otherTheme?.id,
      };
    }

    case 'MARK_SAVED': {
      return { ...state, isDirty: false };
    }

    default:
      return state;
  }
}

// ──── Hook ────

export function useThemeEditor() {
  const [state, dispatch] = useReducer(editorReducer, undefined, loadState);
  const rafRef = useRef<number | null>(null);

  // 持久化到 localStorage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [state]);

  const activeTheme = state.themes.find((t) => t.id === state.activeThemeId) ?? state.themes[0];
  const compareTheme = state.compareThemeId
    ? state.themes.find((t) => t.id === state.compareThemeId)
    : undefined;

  // ──── 实时注入 CSS 变量（用于画布预览） ────

  const applyThemeToElement = useCallback(
    (theme: ThemeConfig, element: HTMLElement) => {
      const entries = Object.entries(theme.colors) as [keyof ThemeColors, string][];
      for (const [key, value] of entries) {
        const cssVar = `--color-${key.replace(/([A-Z])/g, '-$1').toLowerCase()}`;
        element.style.setProperty(cssVar, value);
      }
      element.setAttribute('data-theme', theme.id);
    },
    []
  );

  // ──── 使用 rAF 节流的 token 更新 ────

  const updateToken = useCallback(
    (token: keyof ThemeColors, value: string) => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
      rafRef.current = requestAnimationFrame(() => {
        dispatch({ type: 'UPDATE_TOKEN', token, value });
        rafRef.current = null;
      });
    },
    []
  );

  const selectTheme = useCallback((id: string) => {
    dispatch({ type: 'SELECT_THEME', id });
  }, []);

  const createTheme = useCallback((name: string, baseId?: string) => {
    dispatch({ type: 'CREATE_THEME', name, baseId });
  }, []);

  const duplicateTheme = useCallback((id: string) => {
    dispatch({ type: 'DUPLICATE_THEME', id });
  }, []);

  const deleteTheme = useCallback((id: string) => {
    dispatch({ type: 'DELETE_THEME', id });
  }, []);

  const renameTheme = useCallback((id: string, name: string) => {
    dispatch({ type: 'RENAME_THEME', id, name });
  }, []);

  const updateDescription = useCallback((id: string, description: string) => {
    dispatch({ type: 'UPDATE_DESCRIPTION', id, description });
  }, []);

  const toggleDark = useCallback((id: string) => {
    dispatch({ type: 'TOGGLE_DARK', id });
  }, []);

  const importThemes = useCallback((themes: ThemeConfig[]) => {
    dispatch({ type: 'IMPORT_THEMES', themes });
  }, []);

  const setCompare = useCallback((id?: string) => {
    dispatch({ type: 'SET_COMPARE', id });
  }, []);

  const toggleCompare = useCallback(() => {
    dispatch({ type: 'TOGGLE_COMPARE' });
  }, []);

  const exportThemes = useCallback(
    (ids?: string[]): ThemeExportJSON => {
      const exportList = ids
        ? state.themes.filter((t) => ids.includes(t.id))
        : state.themes;
      return {
        $schema: 'theme-lowcode/1.0.0',
        version: '1.0.0',
        themes: exportList,
        exportedAt: new Date().toISOString(),
      };
    },
    [state.themes]
  );

  return {
    state,
    activeTheme,
    compareTheme,
    selectTheme,
    updateToken,
    createTheme,
    duplicateTheme,
    deleteTheme,
    renameTheme,
    updateDescription,
    toggleDark,
    importThemes,
    exportThemes,
    setCompare,
    toggleCompare,
    applyThemeToElement,
  };
}
