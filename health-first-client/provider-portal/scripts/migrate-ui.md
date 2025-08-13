# UI Migration Guide: MUI → Lightswind

This project now ships a thin `src/ui/` abstraction over Lightswind so you can migrate screens without touching business logic.

## Wrappers
- Button: `src/ui/Button.tsx` (props: variant, color, size, startIcon, endIcon, fullWidth, disabled)
- TextField: `src/ui/TextField.tsx` (props: label, helperText, error, required, fullWidth, size)
- Modal: `src/ui/Modal.tsx` (props: open, onClose, title, description, actions)
- Table: `src/ui/Table.tsx` (composed parts: Table, TableHeader, TableBody, TableRow, TableHead, TableCell)
- IconButton: `src/ui/IconButton.tsx`

## Minimal Tailwind setup
- Tailwind + Lightswind CSS are imported via `src/styles/globals.css`.
- Tokens in `src/styles/theme.ts`.

## Search-and-replace helpers
Preview changes before applying globally.

```bash
# Buttons
rg -n "@mui/material" src | rg Button
# Replace imports per file
# Example sed (GNU sed) to swap import and name:
sed -i 's/import {\s*Button\s*} from \"@mui\/material\"/import Button from \"@ui\/Button\"/' <file>

# TextField
sed -i 's/import {\s*TextField\s*} from \"@mui\/material\"/import TextField from \"@ui\/TextField\"/' <file>

# Dialog/Modal
sed -i 's/import {\s*Dialog\s*.*} from \"@mui\/material\"/import Modal from \"@ui\/Modal\"/' <file>

# Table parts
sed -i 's/import {\s*Table\(.*\)\s*} from \"@mui\/material\"/import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from \"@ui\/Table\"/' <file>
```

Notes:
- If a direct prop mapping doesn’t exist, wrappers choose a sensible default to preserve behavior.
- Use `aria-label` on icon-only actions; decorative icons should set `aria-hidden`.

## Example pages
- `src/pages/Dashboard.tsx` and `src/pages/PatientDetails.tsx` show the design direction and animations.

## Follow-ups
- Gradually migrate remaining components under `src/components/` to wrappers.
- Once complete, remove `@mui/*` dependencies. 