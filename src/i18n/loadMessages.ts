export async function getI18nProps(locale: string | undefined) {
    const currentLocale = locale || 'es';
    try {
        return {
            locale: currentLocale,
            messages: (await import(`../../messages/${currentLocale}.json`)).default,
        };
    } catch (error) {
        console.error(`Error cargando i18n para ${currentLocale}:`, error);
        return { locale: currentLocale, messages: {} };
    }
}