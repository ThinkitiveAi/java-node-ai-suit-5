# UI Wrappers (Lightswind)

Purpose: Provide MUI-compatible facades so pages can migrate without changing business logic.

## Button
- Props: `variant` (contained|outlined|text), `color` (primary|success|danger|default), `size` (small|medium|large), `startIcon`, `endIcon`, `fullWidth`, all native button props.

## TextField
- Props: `label`, `helperText`, `error`, `required`, `fullWidth`, `size` (small|medium), plus native input props.

## Modal
- Props: `open`, `onClose`, `title`, `description`, optional `actions`.

## Table
- Exported parts: `Table`, `TableHeader`, `TableBody`, `TableRow`, `TableHead`, `TableCell`.

## IconButton
- Icon-only actions. Must pass an accessible `aria-label`. 