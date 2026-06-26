import { describe, test, expect } from 'vitest';

import { en_locale } from '../locales/en_locale.js';
import { de_locale } from '../locales/de_locale.js';

const translations = { en_locale, de_locale };

function compare(reference, translation, path = '') {
    const missing = [];
    const extra = [];

    for (const key of Object.keys(reference)) {
        const current = path ? `${path}.${key}` : key;

        if (!(key in translation)) {
            missing.push(current);
            continue;
        }

        if (
            reference[key] &&
            typeof reference[key] === 'object' &&
            !Array.isArray(reference[key])
        ) {
            const result = compare(reference[key], translation[key], current);
            missing.push(...result.missing);
            extra.push(...result.extra);
        }
    }

    for (const key of Object.keys(translation)) {
        if (!(key in reference)) {
            extra.push(path ? `${path}.${key}` : key);
        }
    }

    return { missing, extra };
}

function findNonStrings(obj, path = '') {
    const errors = [];

    for (const [key, value] of Object.entries(obj)) {
        const current = path ? `${path}.${key}` : key;

        if (
            value &&
            typeof value === 'object' &&
            !Array.isArray(value)
        ) {
            errors.push(...findNonStrings(value, current));
        } else if (typeof value !== 'string') {
            errors.push(`${current}: ${typeof value}`);
        }
    }

    return errors;
}

describe('Localization', () => {
    test('all localization files contain the same keys', () => {
        for (const [name, translation] of Object.entries(translations)) {
            const { missing, extra } = compare(en_locale, translation);

            expect(
                { missing, extra },
                `${name} differs from English`
            ).toEqual({
                missing: [],
                extra: [],
            });
        }
    });

    test('all translation values are strings', () => {
        for (const [name, translation] of Object.entries(translations)) {
            expect(
                findNonStrings(translation),
                `${name} contains non-string values`
            ).toEqual([]);
        }
    });
});
