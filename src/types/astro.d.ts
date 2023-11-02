/**
 * @doc https://docs.astro.build/en/guides/typescript/#built-in-html-attributes
 */
/// <reference types="astro/astro-jsx" />
/// <reference types="astro/client-image" />

export type HTMLTagString = keyof astroHTML.JSX.DefinedIntrinsicElements
