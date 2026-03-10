import type { useThemeEditor } from '../../hooks/useThemeEditor';

/** Props type for components that receive the editor instance */
export type ThemeEditorInstance = ReturnType<typeof useThemeEditor>;

export interface EditorProps {
  editor: ThemeEditorInstance;
}
