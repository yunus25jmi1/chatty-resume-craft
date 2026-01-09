# Security Policy

## 🔒 Security Scanning

This project uses GitHub's Advanced Security features to automatically detect vulnerabilities:

### CodeQL Analysis
- **Runs on**: Every push to `main`, pull requests, and weekly on Saturdays
- **Coverage**: JavaScript/TypeScript codebase
- **Query Suites**: 
  - `security-extended` - Comprehensive security vulnerability detection
  - `security-and-quality` - Additional code quality and security checks

#### Detected Vulnerabilities Include:
- Cross-Site Scripting (XSS)
- SQL Injection
- Path Traversal
- Command Injection
- Prototype Pollution
- Insecure randomness
- Hardcoded credentials
- Unsafe deserialization
- Regular Expression DoS (ReDoS)
- CSRF vulnerabilities
- Insecure authentication patterns
- Information exposure
- And 100+ other security patterns

### Dependency Review
- **Runs on**: Pull requests only
- **Severity Threshold**: Fails on moderate or higher vulnerabilities
- **License Compliance**: Checks for problematic licenses (GPL, LGPL, AGPL)
- **Allowed Licenses**: MIT, Apache-2.0, BSD-2-Clause, BSD-3-Clause, ISC

## 📊 Viewing Security Results

1. **Security Tab**: Navigate to the repository's Security tab to view all findings
2. **Pull Requests**: Security findings appear as checks on PRs
3. **SARIF Artifacts**: Detailed results are uploaded as workflow artifacts (retained for 30 days)
4. **Workflow Summary**: Each run provides a summary with key metrics

## 🚨 Reporting Security Issues

If you discover a security vulnerability, please report it by:
1. **DO NOT** open a public issue
2. Email the maintainers directly
3. Or use GitHub's private security advisory feature

## 🛡️ Security Best Practices

This project follows these security practices:
- ✅ Regular dependency updates
- ✅ Automated vulnerability scanning
- ✅ Code review for all changes
- ✅ Weekly security scans
- ✅ SARIF results archiving
- ✅ License compliance checking

## 📦 Supported Versions

| Version | Supported          |
| ------- | ------------------ |
| Latest  | ✅ Yes             |
| Older   | ❌ No              |

We only support the latest version with security updates.

## 🔄 Manual Workflow Trigger

Security scans can be manually triggered:
1. Go to Actions tab
2. Select "CodeQL Security Analysis"
3. Click "Run workflow"

---

*Last updated: January 2026*
