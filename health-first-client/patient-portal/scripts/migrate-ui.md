# UI Migration Guide (MUI -> Lightswind wrappers)

This repo introduces wrapper components in `src/ui/` to avoid rewriting page logic. Replace MUI imports gradually:

## Codemods / Search-and-Replace

1) Replace MUI Button imports with wrapper:

```bash
ripgrep -l "from '@mui/material'" src | xargs sed -i "s/{[^}]*Button[^}]*} from '@mui\/material'/{ Button } from '..\/ui\/Button'/g"
```

2) Replace MUI TextField with wrapper:

```bash
ripgrep -l "TextField" src | xargs sed -i "s/{[^}]*TextField[^}]*} from '@mui\/material'/{ } from '@mui\/material'\nimport { TextField } from '..\/ui\/TextField'/g"
```

3) Replace MUI Dialog with wrapper Modal:

```bash
ripgrep -l "Dialog" src | xargs sed -i "s/{[^}]*Dialog[^}]*} from '@mui\/material'/{ } from '@mui\/material'\nimport { Modal } from '..\/ui\/Modal'/g"
```

4) Replace MUI Table primitives with wrapper re-exports:

```bash
ripgrep -l "Table(Cell|Row|Head|Body|Footer)" src | xargs sed -i "s/{[^}]*Table[^}]*} from '@mui\/material'/{ Table, TableHeader, TableHead, TableRow, TableBody, TableCell } from '..\/ui\/Table'/g"
```

Review each change. Some files may need relative import tweaks.

## Design tokens

Use `src/styles/theme.ts` tokens for consistent colors and spacing.

## Known gaps

- Some niche MUI props (e.g., `sx`) are not mapped. Use `className` and Tailwind classes.
- If a Lightswind component lacks an exact feature, add a small primitive under `src/ui/primitives/` and note a TODO in code. 