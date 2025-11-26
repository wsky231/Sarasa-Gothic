# Sarasa Gothic (更纱黑体 / 更紗黑體 / 更紗ゴシック / 사라사고딕)

This is SARASA GOTHIC, a CJK composite font based on Inter, Iosevka and Source Han Sans.

## Note

It is highly recommended to completely remove the old version of the fonts before you install the newer version of this font. Many OSes' and softwares' caching system may have trouble when dealing with large TTC fonts.

## To build

You need [Node.js](https://nodejs.org/en/) (version 20 or newer), [AFDKO](https://github.com/adobe-type-tools/afdko) (latest) and [ttfautohint](https://www.freetype.org/ttfautohint) installed, then run:

```bash
npm install
```

after the NPM packages are installed, run

```bash
npm run build ttf
```

to build the TTF files, it would be in `out/ttf` directory.

To build TTC, type

```bash
npm run build ttc
```

instead, the files would be in `out/ttc` directory.

Please note that you will need *a lot of* memory to create TTCs, due to the huge quantity of subfamily-orthography combinations.

### Building only selected outputs

If you only need a subset of the packages, you can filter by environment variables:

- `BUILD_FAMILIES` (or `FAMILIES`): comma-separated family names, e.g. `Ui`.
- `BUILD_SUBFAMILIES` (or `SUBFAMILIES`): comma-separated orthography codes, e.g. `SC`.
- `BUILD_HINTED_ONLY` (or `HINTED_ONLY`): set to `1`/`true` to skip unhinted builds.

Examples for hinted Sarasa UI builds only:

```bash
# Hinted Sarasa UI SuperTTCs
BUILD_FAMILIES=Ui BUILD_HINTED_ONLY=1 npm run build -- super-ttc

# Hinted Sarasa UI TTCs
BUILD_FAMILIES=Ui BUILD_HINTED_ONLY=1 npm run build -- ttc

# Hinted Sarasa UI SC TTFs
BUILD_FAMILIES=Ui BUILD_SUBFAMILIES=SC BUILD_HINTED_ONLY=1 npm run build -- ttf
```

## What are the names?

- Style dimension
  - Latin/Greek/Cyrillic character set being [Inter](https://github.com/rsms/inter)
    - Quotes (`“”`) are full width —— **Gothic**
    - Quotes (`“”`) are narrow —— **UI**
  - Latin/Greek/Cyrillic character set being [Iosevka](https://github.com/be5invis/Iosevka)
    - Em dashes (`——`) are full width —— **Mono**
    - Em dashes (`——`) are half width —— **Term**
    - No ligature, Em dashes (`——`) are half width —— **Fixed**
- Orthography dimension
  - `SC`, `TC`, `J`, `K`, `HC`: Regional orthography, following [Source Han Sans](https://github.com/adobe-fonts/source-han-sans) notations.

## Mirrors

- TUNA (CN): https://mirrors.tuna.tsinghua.edu.cn/github-release/be5invis/Sarasa-Gothic
- NJU (CN): https://mirror.nju.edu.cn/github-release/be5invis/Sarasa-Gothic
