export default function parseTranslations(translations) {
    const keys = Object.keys(translations);
    const result = {};

    keys.forEach(function (key) {
        const subkeys = Object.keys(translations[key]);
        subkeys.forEach(function (subkey) {
            result[`${key}.${subkey}`] = translations[key][subkey];
        })
    })
    return result;
}