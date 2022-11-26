export const generateRequiredMessage = (prop:string):string => {
    const vowels = ['a', 'e', 'i', 'o', 'u'];
    const prefix = vowels.some(vowel => prop.startsWith(vowel)) ? 'An' : 'A';
    return `${prefix} ${prop} is required`;
};
