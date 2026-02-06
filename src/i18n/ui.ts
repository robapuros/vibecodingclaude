import { es } from './es';
import { en } from './en';

export const languages = {
  es: 'Español',
  en: 'English',
} as const;

export const defaultLang = 'es';

export type Lang = keyof typeof languages;

export const ui = {
  es,
  en,
} as const;

export function getLangFromUrl(url: URL): Lang {
  const [, lang] = url.pathname.split('/');
  if (lang in ui) return lang as Lang;
  return defaultLang;
}

export function useTranslations(lang: Lang) {
  return ui[lang];
}

export function getAlternateUrls(currentPath: string): { es: string; en: string } {
  const pathWithoutLang = currentPath.replace(/^\/(es|en)/, '');

  // Map Spanish paths to English equivalents
  const pathMap: Record<string, string> = {
    '/guia': '/guide',
    '/guide': '/guia',
    '/herramientas': '/tools',
    '/tools': '/herramientas',
    '/primera-app': '/first-app',
    '/first-app': '/primera-app',
    '/prompts': '/prompts',
    '/openclaw': '/openclaw',
    '': '',
    '/': '/',
  };

  const normalizedPath = pathWithoutLang || '/';
  const alternatePath = pathMap[normalizedPath] || normalizedPath;

  return {
    es: `/es${normalizedPath === '/' ? '' : normalizedPath}`,
    en: `/en${normalizedPath === '/' ? '' : alternatePath}`,
  };
}

export function getLocalizedPath(path: string, lang: Lang): string {
  // Handle path mapping between languages
  const pathMap: Record<string, Record<Lang, string>> = {
    guide: { es: 'guia', en: 'guide' },
    guia: { es: 'guia', en: 'guide' },
    tools: { es: 'herramientas', en: 'tools' },
    herramientas: { es: 'herramientas', en: 'tools' },
    'first-app': { es: 'primera-app', en: 'first-app' },
    'primera-app': { es: 'primera-app', en: 'first-app' },
    prompts: { es: 'prompts', en: 'prompts' },
    openclaw: { es: 'openclaw', en: 'openclaw' },
  };

  const pathParts = path.split('/').filter(Boolean);
  const mappedParts = pathParts.map(part => {
    if (part in pathMap) {
      return pathMap[part][lang];
    }
    return part;
  });

  return `/${lang}${mappedParts.length ? '/' + mappedParts.join('/') : ''}`;
}
