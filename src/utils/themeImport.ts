import type { ThemeConfig, ThemeExportJSON, ThemeColors } from '../types/theme';

/** 校验颜色值是否为合法 hex */
function isValidHex(value: string): boolean {
  return /^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6}|[0-9a-fA-F]{8})$/.test(value);
}

/** 所需的颜色 token 键名 */
const REQUIRED_TOKENS: (keyof ThemeColors)[] = [
  'primary', 'secondary', 'accent', 'background', 'surface',
  'text', 'textSecondary', 'border',
  'success', 'warning', 'error', 'info',
  'hover', 'active', 'disabled',
];

/** 校验单个主题配置 */
function validateThemeConfig(theme: unknown): theme is ThemeConfig {
  if (!theme || typeof theme !== 'object') return false;
  const t = theme as Record<string, unknown>;

  if (typeof t.id !== 'string' || !t.id) return false;
  if (typeof t.name !== 'string' || !t.name) return false;
  if (typeof t.isDark !== 'boolean') return false;

  if (!t.colors || typeof t.colors !== 'object') return false;
  const colors = t.colors as Record<string, unknown>;
  for (const key of REQUIRED_TOKENS) {
    if (typeof colors[key] !== 'string' || !isValidHex(colors[key] as string)) {
      return false;
    }
  }

  return true;
}

/** 校验 JSON 导出结构 */
export function validateThemeJSON(data: unknown): { valid: boolean; error?: string; themes?: ThemeConfig[] } {
  if (!data || typeof data !== 'object') {
    return { valid: false, error: '无效的 JSON 结构' };
  }

  const d = data as Record<string, unknown>;

  // 检查是否为完整的 ThemeExportJSON 格式
  if (d.$schema && d.version && Array.isArray(d.themes)) {
    const json = d as unknown as ThemeExportJSON;
    const validThemes: ThemeConfig[] = [];
    for (let i = 0; i < json.themes.length; i++) {
      if (!validateThemeConfig(json.themes[i])) {
        return { valid: false, error: `主题 #${i + 1} 数据格式错误` };
      }
      validThemes.push(json.themes[i]);
    }
    if (validThemes.length === 0) {
      return { valid: false, error: '没有找到有效的主题配置' };
    }
    return { valid: true, themes: validThemes };
  }

  // 兼容：直接传入单个主题对象
  if (validateThemeConfig(data)) {
    return { valid: true, themes: [data as ThemeConfig] };
  }

  // 兼容：传入主题数组
  if (Array.isArray(data)) {
    const validThemes: ThemeConfig[] = [];
    for (let i = 0; i < data.length; i++) {
      if (!validateThemeConfig(data[i])) {
        return { valid: false, error: `主题 #${i + 1} 数据格式错误` };
      }
      validThemes.push(data[i] as ThemeConfig);
    }
    if (validThemes.length === 0) {
      return { valid: false, error: '没有找到有效的主题配置' };
    }
    return { valid: true, themes: validThemes };
  }

  return { valid: false, error: '无法识别的 JSON 格式，请使用标准主题导出格式' };
}

/** 从文件读取并解析主题 JSON */
export function readThemeFile(file: File): Promise<{ themes?: ThemeConfig[]; error?: string }> {
  return new Promise((resolve) => {
    if (!file.name.endsWith('.json')) {
      resolve({ error: '请选择 .json 文件' });
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const raw = e.target?.result;
        if (typeof raw !== 'string') {
          resolve({ error: '文件读取失败' });
          return;
        }
        const parsed = JSON.parse(raw);
        const result = validateThemeJSON(parsed);
        if (result.valid && result.themes) {
          // 确保导入的主题有元数据
          const now = new Date().toISOString();
          const themes = result.themes.map((t) => ({
            ...t,
            version: t.version ?? 1,
            createdAt: t.createdAt ?? now,
            updatedAt: t.updatedAt ?? now,
            isPreset: false,
          }));
          resolve({ themes });
        } else {
          resolve({ error: result.error });
        }
      } catch {
        resolve({ error: 'JSON 解析失败，请检查文件格式' });
      }
    };
    reader.onerror = () => {
      resolve({ error: '文件读取失败' });
    };
    reader.readAsText(file);
  });
}
