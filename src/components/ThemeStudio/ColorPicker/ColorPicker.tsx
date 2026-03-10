import React, { useCallback, useState } from 'react';
import type { ThemeColors } from '../../../types/theme';
import styles from './ColorPicker.module.css';

interface ColorPickerProps {
  token: keyof ThemeColors;
  label: string;
  value: string;
  onChange: (token: keyof ThemeColors, value: string) => void;
}

export const ColorPicker: React.FC<ColorPickerProps> = React.memo(
  ({ token, label, value, onChange }) => {
    const [hexInput, setHexInput] = useState(value);

    // 同步来自外部的变化
    React.useEffect(() => {
      setHexInput(value);
    }, [value]);

    const handleColorInput = useCallback(
      (e: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = e.target.value;
        setHexInput(newValue);
        onChange(token, newValue);
      },
      [token, onChange]
    );

    const handleHexInput = useCallback(
      (e: React.ChangeEvent<HTMLInputElement>) => {
        let v = e.target.value;
        setHexInput(v);
        // 自动补 #
        if (v && !v.startsWith('#')) {
          v = '#' + v;
        }
        if (/^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/.test(v)) {
          onChange(token, v);
        }
      },
      [token, onChange]
    );

    return (
      <div className={styles.picker}>
        <div className={styles.colorPreview} style={{ background: value }} />
        <input
          type="color"
          className={styles.colorInput}
          value={value}
          onChange={handleColorInput}
          title={label}
        />
        <div className={styles.info}>
          <span className={styles.label}>{label}</span>
          <input
            className={styles.hexInput}
            value={hexInput}
            onChange={handleHexInput}
            placeholder="#000000"
            spellCheck={false}
          />
        </div>
      </div>
    );
  }
);

ColorPicker.displayName = 'ColorPicker';
