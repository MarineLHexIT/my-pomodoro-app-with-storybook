import colors from 'tailwindcss/colors';

export type ExtractColorNames<T> = {
    [K in keyof T]: T[K] extends Record<string, string> ? K : never;
}[keyof T];

export type DisplayTheme = ExtractColorNames<typeof colors>;