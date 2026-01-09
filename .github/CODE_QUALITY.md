# Code Quality & Syntax Checking

This project uses automated tools to maintain code quality, detect syntax errors, and find unused code.

## 🔍 Tools Configured

### 1. ESLint - Code Linting
Detects and fixes code quality issues including:
- ✅ **Unused variables** (warns about variables declared but never used)
- ✅ **Syntax errors** (invalid JavaScript/TypeScript syntax)
- ✅ **Type errors** (TypeScript-specific issues)
- ✅ **Code style violations**
- ✅ **React Hooks violations**
- ✅ **Debugging statements** (console.log, debugger)
- ✅ **Unreachable code**
- ✅ **Duplicate imports**

### 2. TypeScript Compiler
- ✅ **Type checking** (ensures type safety)
- ✅ **Compilation errors** (syntax and semantic errors)
- ✅ **Missing type definitions**
- ✅ **Type inference issues**

### 3. Unused Code Detection
- ✅ **Unused exports** (exported but never imported)
- ✅ **Unused dependencies** (packages in package.json not used in code)
- ✅ **Dead code** (unreachable code paths)

## 🚀 Running Locally

### Quick Commands

```bash
# Run ESLint to find issues
npm run lint

# Auto-fix ESLint issues
npm run lint:fix

# TypeScript type checking
npm run type-check

# Check for unused exports
npm run check:unused

# Check for unused dependencies
npm run check:deps

# Run all quality checks
npm run quality
```

### Detailed Usage

#### Find Unused Variables
```bash
npm run lint
```
Output will show warnings like:
```
src/components/Example.tsx
  5:7  warning  'unusedVariable' is defined but never used  @typescript-eslint/no-unused-vars
```

#### Fix Auto-fixable Issues
```bash
npm run lint:fix
```

#### Check Types
```bash
npm run type-check
```

#### Generate Lint Report
```bash
npm run lint:report
# Creates eslint-report.json
```

## ⚙️ ESLint Rules Configured

| Rule | Severity | Description |
|------|----------|-------------|
| `@typescript-eslint/no-unused-vars` | warn | Detects unused variables |
| `no-console` | warn | Warns about console.log (allows warn/error) |
| `no-debugger` | warn | Detects debugger statements |
| `no-unreachable` | error | Finds unreachable code |
| `prefer-const` | warn | Suggests const for variables never reassigned |
| `no-var` | error | Enforces let/const instead of var |
| `no-duplicate-imports` | error | Prevents duplicate import statements |
| `eqeqeq` | warn | Enforces === instead of == |

### Ignoring False Positives

If you need to keep a variable for later use, prefix with underscore:
```typescript
const _reservedForLater = "value";  // Won't trigger warning
```

Or use ESLint disable comments:
```typescript
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const keepThis = "intentionally unused";
```

## 🤖 Automated GitHub Actions

The code quality checks run automatically:

### On Every Push & Pull Request
- ✅ ESLint analysis
- ✅ TypeScript type checking  
- ✅ Unused code detection
- ✅ Build verification

### Viewing Results

1. **GitHub Actions Tab**: See workflow runs
2. **Pull Request Checks**: Inline annotations on your code
3. **Workflow Artifacts**: Download detailed reports
4. **Action Summary**: Overview of all findings

### Manual Trigger

Run quality checks on demand:
```bash
# From GitHub UI:
Actions → Code Quality & Syntax Check → Run workflow
```

## 📊 Understanding Reports

### ESLint Report
- **Warning**: Should be fixed but won't fail builds
- **Error**: Must be fixed before merging

### TypeScript Report
- Shows file, line number, and error message
- All type errors must be resolved

### Unused Exports Report
- Lists functions/components exported but never imported
- Consider removing or documenting why they're kept

### Unused Dependencies Report
- Shows packages in package.json not used in code
- Safe to remove unless used in scripts/configs

## 🛠️ IDE Integration

### VS Code
Install these extensions for real-time linting:
- **ESLint** (`dbaeumer.vscode-eslint`)
- **TypeScript and JavaScript Language Features** (built-in)

### Settings
Add to `.vscode/settings.json`:
```json
{
  "eslint.validate": [
    "javascript",
    "javascriptreact",
    "typescript",
    "typescriptreact"
  ],
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  },
  "typescript.tsdk": "node_modules/typescript/lib"
}
```

## 🔧 Troubleshooting

### "Cannot find module" errors
```bash
npm ci --legacy-peer-deps
```

### ESLint not finding files
Check that `.eslintrc` or `eslint.config.js` exists and is properly configured.

### Too many unused variable warnings
Review and clean up or prefix with `_` if intentional.

### Type errors after updating packages
```bash
npm run type-check
# Fix reported issues or update type definitions
```

## 📝 Best Practices

1. **Run `npm run quality` before committing**
2. **Fix warnings incrementally** - don't let them pile up
3. **Use TypeScript strict mode** for better type safety
4. **Remove unused imports** immediately
5. **Review unused dependencies** monthly
6. **Keep ESLint config updated** with team standards

## 🎯 Quality Gates

Pull requests must pass:
- ✅ Zero TypeScript errors
- ✅ Build succeeds
- ⚠️ ESLint warnings reviewed (don't block merge)
- 📊 Unused code report generated

---

*Configured on: January 2026*
