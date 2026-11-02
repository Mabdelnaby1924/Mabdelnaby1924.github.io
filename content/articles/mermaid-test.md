---
title: "Mermaid Diagram Integration Test"
description: "Test page validating flowchart, sequence diagrams, invalid diagram error handling, and normal code blocks."
date: "2026-11-03"
tags:
  - Test
  - Mermaid
published: true
readingTime: "2 min"
category: "Testing"
---

# Mermaid Diagram Test Suite

This test article verifies that fenced ````mermaid```` code blocks render into actual interactive SVG diagrams across the entire portfolio.

---

## 1. Flowchart Diagram (Incident Response Flow)

```mermaid
graph TD
  A[Spear-Phishing Email Delivered] --> B{Attachment Opened?}
  B -->|No| C[Threat Mitigated at Gateway]
  B -->|Yes| D[PowerShell Dropper Executed]
  D --> E[C2 Channel Established]
  E --> F[KeePass Database Exfiltrated]
  
  style A fill:#3b82f6,color:#fff
  style C fill:#10b981,color:#fff
  style F fill:#ef4444,color:#fff
```

---

## 2. Sequence Diagram (Authentication & C2 Beaconing)

```mermaid
sequenceDiagram
  autonumber
  actor Attacker
  actor Victim
  participant Server as C2 Server

  Attacker->>Victim: Send Spoofed Invoice (ZIP/LNK)
  Victim->>Victim: Double-clicks LNK
  Victim->>Server: DNS TXT Query Beacon
  Server-->>Victim: Encoded Tasking Command
  Victim->>Server: HTTP POST Encoded Exfiltration Data
```

---

## 3. Invalid Syntax Handling (Graceful Degradation Test)

The block below contains deliberately invalid syntax. It should display a red warning message and the fallback code block, without crashing the page or breaking other diagrams.

```mermaid
graph TD
  A ---> >>> INVALID_SYNTAX_NODE ??? !!!
```

---

## 4. Normal Code Block Non-Regression Test

Normal code blocks (like Python or Bash) must remain standard syntax-highlighted code blocks with copy/read styling and must NOT attempt to render as diagrams:

```python
def verify_hash(file_path: str, expected_sha256: str) -> bool:
    import hashlib
    with open(file_path, "rb") as f:
        digest = hashlib.sha256(f.read()).hexdigest()
    return digest.lower() == expected_sha256.lower()
```

```bash
# Verify network connections
Get-NetTCPConnection -State Established | Select-Object LocalAddress, RemoteAddress, OwningProcess
```

