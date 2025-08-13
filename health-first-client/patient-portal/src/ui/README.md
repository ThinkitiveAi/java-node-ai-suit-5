### UI Wrappers

These components wrap Lightswind primitives and present MUI-compatible props so page logic does not change.

- Button: accepts `variant` (contained|outlined|text) and `color` (primary|secondary|success|error|inherit), `size`, `fullWidth`, `startIcon`, `endIcon`.
- TextField: accepts `label`, `required`, `helperText`, `error`, `fullWidth`, `margin`, `variant`, and `InputProps` with `startAdornment`/`endAdornment`.
- Modal: accepts `open`, `onClose`, `title`, `description`, `actions`.
- Table: re-exports primitives: `Table`, `TableHeader`, `TableHead`, `TableRow`, `TableBody`, `TableCell`.
- IconButton: accepts `color` and renders icon-only buttons with 44×44 minimum target.

All components forward refs and pass through DOM props with `...rest`. 