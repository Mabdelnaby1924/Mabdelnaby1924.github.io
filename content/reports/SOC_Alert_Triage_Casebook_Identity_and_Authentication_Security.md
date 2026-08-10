---
title: "SOC Alert Triage Casebook — Identity & Authentication Security Alerts"

description: "A practical SOC alert triage casebook covering identity and authentication threats, focusing on evidence correlation, risk assessment, containment decisions, escalation, and analyst investigation workflow."

date: "2026-07-30"

tags:
  - SOC
  - Security Operations
  - Alert Triage
  - Identity Security
  - Authentication Security
  - Account Compromise
  - Credential Attacks
  - Brute Force
  - Credential Stuffing
  - MFA Abuse
  - Impossible Travel
  - Privilege Escalation
  - Incident Response
  - Threat Detection
  - DFIR

thumbnail: "/images/reports/soc_triage/soc_triage2.png"

published: true

readingTime: "10 min read"
category: "SOC Analysis"
type: "Security Operations Casebook"
level: "SOC Analyst T1"


cases: 12

---


## Introduction

This casebook documents twelve alert triage cases covering identity and authentication threats. Each case captures the analyst's reasoning at triage time — evidence correlation, severity assessment, containment, and escalation — based strictly on what was available when the alert fired.

These are not full-scope forensic investigations. Where deeper analysis was warranted, the case ends with recommended next steps rather than speculative findings.

The alerts cover impossible travel, MFA abuse, credential stuffing, brute force across multiple target types, privilege escalation, and anomalous login activity. Two cases are classified as false positives.

> **Note That,**
> This document is a collection of SOC Alert Triage case studies completed as part of hands-on analyst training. Each case simulates the information initially available to a SOC analyst at the time of detection. The objective was not to perform a full DFIR investigation, but to analyze the available evidence, assess risk, determine the appropriate containment actions, and make justified escalation decisions according to SOC operational workflows.

---

## Decision Matrix

| #   | Alert                                                                                                | Severity | Decision  |
| --- | ---------------------------------------------------------------------------------------------------- | -------- | --------- |
| 1   | Concurrent Sessions from Riyadh and Frankfurt Indicating VPN-Assisted Account Compromise             | High     | Escalated |
| 2   | Finance Department Account Accessed from Cairo and Munich Within Twelve Minutes                      | Critical | Escalated |
| 3   | Successful Account Takeover via MFA Push Notification Fatigue Attack                                 | High     | Escalated |
| 4   | Large-Scale Credential Stuffing Campaign with Confirmed Account Compromise via Legacy Authentication | High     | Escalated |
| 5   | Brute Force Attack from Tor Exit Node with Successful Weekend Login on Okta-Protected Account        | High     | Escalated |
| 6   | External Brute Force Attempt Against Clinical User Account Without MFA Protectio                     | Medium   | Escalated |
| 7   | Legacy Automation Script Generating Failed Authentication Attempts Against Default Admin Account     | Low      | Closed    |
| 8   | Brute Force Campaign Against Database Server Requiring Distributed Attack Assessment                 | High     | Escalated |
| 9   | SSH Brute Force Contained by fail2ban with Subsequent Targeted Username Enumeration                  | Medium   | Escalated |
| 10  | Non-Root User Accessed Shadow File and Modified Sudoers to Gain Elevated Privileges                  | Critical | Escalated |
| 11  | Unverified Authentication from Anomalous Geographic Location Requiring User Confirmation             | Medium   | Escalated |
| 12  | New Device Login Alert for Treasury Employee Correlated with Approved IT Device Provisioning         | Low      | Closed    |

---

## Alert Cases

---

### Case 1 — Concurrent Sessions from Riyadh and Frankfurt Indicating VPN-Assisted Account Compromise

#### Metadata

| Field          | Value                        |
| -------------- | ---------------------------- |
| **Category**   | Impossible Travel            |
| **Severity**   | High                         |
| **Source**     | Azure AD Identity Protection |
| **Status**     | Confirmed — True Positive    |
| **Confidence** | High                         |

---

#### Alert Summary

Azure AD Identity Protection flagged simultaneous active sessions for a single account from two geographically distant locations. One session ran Chrome on Windows from Riyadh; the other used Firefox on Linux from Frankfurt.

```

Session A:  Chrome / Windows  — Riyadh, KSA

Session B:  Firefox / Linux   — Frankfurt, DE  — IP: 185.25.11.44

```

Threat intelligence on the Frankfurt IP (`185.25.11.44`) classified it as a DigitalOcean hosting address — commonly associated with VPN or proxy infrastructure.

```

 [Riyadh, KSA]                     [Frankfurt, DE]

  Chrome/Win                       Firefox/Linux

      |                                 |

      +-------- Same Account ----------+

                     |

            [Concurrent Sessions]

```

---

#### Analyst Assessment

The sessions are simultaneous, not sequential — ruling out any travel explanation. The platform fingerprints are completely different: Chrome/Windows from a KSA residential connection versus Firefox/Linux from a DigitalOcean IP. Interactive logins from cloud hosting infrastructure are abnormal; this is consistent with an attacker routing through a VPS.

The legitimate user is almost certainly operating from Riyadh. The Frankfurt session represents unauthorized access using compromised credentials.

Rated **High**. Would escalate to Critical if audit logs reveal data access or configuration changes during the Frankfurt session.

---

#### Response Decision

##### Immediate Actions

1. Revoke all active sessions for the affected account immediately.

2. Disable the account until the investigation completes.

3. Enforce a password reset and verify MFA is enabled before re-activation.

4. Block IP `185.25.11.44` at the firewall.

##### Escalation Decision

**Escalated.** Concurrent sessions from two countries with a hosting-provider source IP constitute strong evidence of compromise. IR must review what actions occurred during the Frankfurt session.

---

#### Next Investigation Steps

- Review Azure AD audit logs for the Frankfurt session — mailbox access, file downloads, forwarding rule changes, administrative operations.

- Coordinate with the network team to search for connections from the same DigitalOcean IP range across the environment.

- Interview the account owner via out-of-band channel to confirm they were operating exclusively from Riyadh.

- Determine whether MFA was enabled prior to this event and, if so, how the second session bypassed it.

---

#### Lessons Learned

Device fingerprint comparison (browser, OS, ISP type) is often more decisive than geography alone in impossible travel cases. A user can legitimately appear in another country via VPN — but concurrent sessions with mismatched platform profiles and a hosting-provider IP leave almost no room for a benign explanation. Concurrent-session impossible travel should be triaged with higher urgency than sequential.

---

---

### Case 2 — Finance Department Account Accessed from Cairo and Munich Within Twelve Minutes

#### Metadata

| Field          | Value                     |
| -------------- | ------------------------- |
| **Category**   | Impossible Travel         |
| **Severity**   | Critical                  |
| **Status**     | Confirmed — True Positive |
| **Confidence** | High                      |

---

#### Alert Summary

Two authentication events for a finance department employee, twelve minutes apart, from different countries:

```

Login 1:  09:42 EET  — Cairo, EG  — IP 156.193.x.x  — ASN: WE Telecom Egypt (Residential)

Login 2:  09:54 EET  — Munich, DE — IP 95.91.x.x     — ASN: Vodafone DE (Business)

```

Cairo to Munich in twelve minutes is physically impossible.

```

 09:42 EET                            09:54 EET

 Cairo, EG                            Munich, DE

 156.193.x.x                          95.91.x.x

 WE Telecom (Residential)             Vodafone DE (Business)

      |              12 min                |

      +------------- Gap -----------------+

                     |

              [Same Account]

         [Finance Department User]

```

---

#### Analyst Assessment

What matters here is the account context. This belongs to a finance department employee — someone with likely access to payment systems, bank details, and financial records. Unauthorized access to this account carries direct financial risk, not just data exposure.

Neither IP is flagged as malicious infrastructure. The Cairo session comes from a residential ISP; the Munich session from a Vodafone business connection. The attacker may be operating from a legitimate network rather than a disposable VPS. IP reputation alone does not resolve this case — but the twelve-minute gap between countries does.

Rated **Critical** due to the finance department context and confirmed physical impossibility.

---

#### Response Decision

##### Immediate Actions

1. Revoke all active sessions and disable the account immediately.

2. Contact Maryam through her registered phone number — not email or corporate chat.

3. Enforce password reset and MFA enrollment before account restoration.

4. Block the Munich IP at the perimeter firewall.

5. Review audit logs for the Munich session, prioritizing financial application access, data exports, or configuration changes.

##### Escalation Decision

**Escalated.** Finance department context, confirmed impossible travel, and potential access to financial systems warrant immediate IR involvement. The team should assess whether financial data was accessed during the Munich session and coordinate with the user's management.

---

#### Next Investigation Steps

- Pull full session activity for the Munich login — every application accessed, file opened, configuration changed.

- Compare User-Agent strings and device fingerprints between both logins.

- Revoke access to all linked cloud applications, not only email — including financial platforms and shared drives.

- Coordinate with the finance department manager to verify whether any transactions or approvals occurred during the suspicious window.

---

---

### Case 3 — Successful Account Takeover via MFA Push Notification Fatigue Attack

#### Metadata

| Field          | Value                          |
| -------------- | ------------------------------ |
| **Category**   | MFA Abuse / Account Compromise |
| **Severity**   | High                           |
| **Source**     | Identity Protection / MFA Logs |
| **Status**     | Confirmed — True Positive      |
| **Confidence** | High                           |

---

#### Alert Summary

Eighteen MFA push notifications in two minutes, followed by a successful login from a Russian IP. The legitimate user is based in KSA and self-reported accidentally approving one of the pushes.

```

- 18 MFA push notifications delivered within a 2-minute window

- Successful login from a Russian IP (185.x.x.x)

- The legitimate user is based in KSA (Saudi Arabia)

- User self-reported: accidentally approved one of the 18 push requests

```

```

 [Attacker]                              [Legitimate User - KSA]

 IP: 185.x.x.x (Russia)

      |                                         |

      +--- Valid Credentials -----> [IdP] ----> Push #1  ✗

      +--- Retry ------------------> [IdP] ---> Push #2  ✗

      +--- Retry ------------------> [IdP] ---> Push #3  ✗

      :         ...14 more pushes...            :

      +--- Retry ------------------> [IdP] ---> Push #18 ✓ (accidental)

      |                                         |

      +-------- Session Established ----------->+

```

---

#### Analyst Assessment

The credentials were already compromised before the push sequence started — the MFA mechanism was the last barrier. Eighteen pushes in two minutes is well outside any legitimate pattern. The user approved one accidentally, likely from frustration or confusion caused by the notification flood.

The Russia-to-KSA geographic mismatch independently confirms unauthorized access, but the push volume alone would have been sufficient for classification. The attacker achieved a fully authenticated session.

Rated **High**. Actual impact depends on what was done during the session — audit log review will determine that.

---

#### Response Decision

##### Immediate Actions

1. Disable the account immediately.

2. Revoke all active sessions.

3. Force password reset — credentials are confirmed compromised.

4. Block the Russian IP (`185.x.x.x`) at the firewall.

5. Search network logs for other connections from this IP to internal assets.

6. Review audit logs for attacker activity during the session.

##### Escalation Decision

**Escalated.** Authenticated access was achieved. The credential compromise and MFA bypass require IR involvement regardless of what audit logs show — the source of the credential theft must be determined.

---

#### Next Investigation Steps

- Review session audit logs — account changes, data access, forwarding rules, OAuth app registrations, privilege modifications.

- Determine the source of credential compromise (phishing, breach, credential stuffing) by reviewing recent email and authentication activity.

- Check whether the attacker registered additional MFA methods or recovery options during the session.

- Search for the Russian IP across the full SIEM dataset to identify other targeted accounts.

---

#### Lessons Learned

Push-based MFA is vulnerable to fatigue attacks by design. The fix is migrating to **number matching** or **TOTP/OTP** instead of simple push approval. Detection rules should also block push requests after a threshold is exceeded within a short window — the user should never have received eighteen notifications.

---

---

### Case 4 — Large-Scale Credential Stuffing Campaign with Confirmed Account Compromise via Legacy Authentication

#### Metadata

| Field          | Value                      |
| -------------- | -------------------------- |
| **Category**   | Credential Attack          |
| **Severity**   | High                       |
| **Source**     | SIEM / Identity Protection |
| **Status**     | Confirmed — True Positive  |
| **Confidence** | High                       |

---

#### Alert Summary

Five hundred failed logins in ten minutes, distributed across 50 accounts from 15 source IPs. One account — Ahmed Almansour — produced a successful login from IP `185.151.x.x`. The successful authentication used **Legacy Authentication**, bypassing MFA entirely.

```

Attack Profile:

- 500 failed logins / 10 minutes

- 50 targeted accounts

- 15 source IPs (distributed)

- 1 confirmed successful login: Ahmed Almansour

- Attack vector: Legacy Authentication (MFA bypass)

```

---

#### Analyst Assessment

The distribution pattern — many accounts, few attempts per account, multiple source IPs — is credential stuffing, not brute force. The attacker is testing stolen credential pairs, expecting some users reuse passwords. Fifteen source IPs indicate a botnet or rotating proxy infrastructure to evade rate-limiting.

The critical finding is the Legacy Authentication vector. Ahmed Almansour's credentials were valid, and because the authentication occurred through a legacy protocol, MFA was never enforced. This makes the organization's MFA policy effectively optional for any attacker who discovers the legacy endpoint.

Rated **High** — one confirmed compromise, 49 accounts potentially tested with valid credentials that simply weren't in the attacker's list, and a systemic MFA bypass vector that affects every account with Legacy Authentication enabled.

---

#### Response Decision

##### Immediate Actions

1. Disable Ahmed Almansour's account and revoke all active sessions.

2. Force password resets for all 50 targeted accounts.

3. Block all 15 source IPs at the firewall.

4. Search for additional connections from `185.151.x.x` across the environment.

5. Review audit logs for Ahmed Almansour's session.

##### Escalation Decision

**Escalated.** Confirmed compromise with MFA bypass via Legacy Authentication. IR must assess session scope, determine whether the credentials came from a known breach, and evaluate disabling Legacy Authentication organization-wide.

---

#### Next Investigation Steps

- Review Ahmed Almansour's session activity — email access, forwarding rules, file downloads, administrative actions.

- Correlate the 15 source IPs against threat intelligence feeds and historical SIEM data.

- Audit which accounts organization-wide still have Legacy Authentication enabled.

- Check whether any of the 50 targeted accounts appear in known breach databases.

---

#### Lessons Learned

Legacy Authentication is a known MFA bypass. If it cannot be fully disabled due to business constraints, it should be restricted to specific monitored service accounts with conditional access policies. A successful login via a legacy protocol from an unusual IP should generate its own high-fidelity alert.

---

---

### Case 5 — Brute Force Attack from Tor Exit Node with Successful Weekend Login on Okta-Protected Account

#### Metadata

| Field          | Value                            |
| -------------- | -------------------------------- |
| **Category**   | Brute Force / Account Compromise |
| **Severity**   | High                             |
| **Source**     | SIEM / Okta                      |
| **Status**     | Confirmed — True Positive        |
| **Confidence** | High                             |

---

#### Alert Summary

Thirty-four failed logins against `badr.otaibi` within two minutes from a single IP, followed by a successful authentication. Both SIEM and Okta flagged the activity; Okta reported `CREDENTIALS_INVALID` failure codes.

```

Attack Summary:

- Target: badr.otaibi

- Failed Attempts: 34 within 2 minutes

- Source IP: 198.51.100.25 (Tor Exit Node)

- Alert Source: SIEM + Okta (CREDENTIALS_INVALID)

- Result: Successful login detected

- Timing: During official weekend (per HR baseline)

```

The source IP (`198.51.100.25`) is a confirmed Tor exit node. The successful login occurred during the organization's official weekend.

---

#### Analyst Assessment

Three converging factors here.

**Tor exit node.** Corporate users do not authenticate through Tor. Its presence as the source of both a brute force sequence and a successful login is a strong malicious indicator.

**Successful login after 34 failures.** The `CREDENTIALS_INVALID` codes confirm password guessing, not lockout or MFA rejection. The password was either weak or appeared in a common wordlist — 34 attempts is a very small keyspace.

**Weekend timing.** The legitimate user would not normally authenticate during the official weekend. Combined with the Tor source, there is no benign explanation.

The `badr.otaibi` account is compromised.

---

#### Response Decision

##### Immediate Actions

1. Disable the `badr.otaibi` account immediately.

2. Revoke all active sessions.

3. Initiate incident investigation — authenticated access was achieved.

4. Block IP `198.51.100.25` at the firewall; consider blocking known Tor exit node ranges per policy.

##### Escalation Decision

**Escalated.** Confirmed compromise via brute force from an anonymized source. The attacker's session must be fully analyzed.

---

#### Next Investigation Steps

- Review access logs for the authenticated session: new user creation, credential access, role modifications, data exfiltration.

- Determine whether MFA was enabled on `badr.otaibi` — if not, that's a contributing factor.

- Check whether the same Tor exit node appears in authentication logs for other accounts.

- Review lockout policies — 34 failures without triggering lockout indicates misconfiguration or absence.

- Verify password complexity requirements.

---

#### Lessons Learned

Thirty-four consecutive failures from a single IP should trigger lockout well before success. Lockout thresholds need to be validated, not assumed. Additionally, Tor-sourced authentication should be flagged or blocked by conditional access policies by default.

---

---

### Case 6 — External Brute Force Attempt Against Clinical User Account Without MFA Protection

#### Metadata

| Field          | Value                              |
| -------------- | ---------------------------------- |
| **Category**   | Brute Force                        |
| **Severity**   | Medium                             |
| **Status**     | Contained — No Compromise Detected |
| **Confidence** | Medium                             |

---

#### Alert Summary

Repeated authentication failures from an external IP against a clinical staff account over a short period. No successful login was recorded. The targeted account did not have MFA enabled.

---

#### Analyst Assessment

No compromise occurred, but the missing MFA is the real finding. The account is protected by password complexity alone — one correct guess away from compromise. The source IP was blocked and a SIEM search returned no additional hits from it across other assets, suggesting a targeted attempt rather than a campaign.

Account lockout policy was confirmed active, which limits sustained brute force effectiveness. Rated **Medium** — the attack failed, but it exposed a defensive gap that needs remediation.

---

#### Response Decision

##### Immediate Actions

1. Block the source IP at the perimeter firewall.

2. Verify account lockout policy is active and correctly configured.

3. Coordinate with the identity team to enable MFA on the targeted account.

4. Document the incident in the organization's threat database.

##### Escalation Decision

**Escalated** for remediation tracking. The missing MFA requires identity team follow-up, and the escalation ensures it gets addressed.

---

#### Next Investigation Steps

- Search proxy and firewall logs for prior connections from the source IP to identify reconnaissance activity.

- Audit other accounts in the same department for systemic MFA gaps.

- Check the targeted account's password against known breach databases.

---

---

### Case 7 — Legacy Automation Script Generating Failed Authentication Attempts Against Default Admin Account

#### Metadata

| Field          | Value                        |
| -------------- | ---------------------------- |
| **Category**   | Brute Force — False Positive |
| **Severity**   | Low                          |
| **Status**     | Closed — False Positive      |
| **Confidence** | High                         |

---

#### Alert Summary

Repeated failed authentication attempts against a default `admin` account. The source was an internal system running a legacy automation script with hardcoded, stale credentials. The script's owner confirmed the activity and provided supporting documentation.

Log review confirmed the script only attempted to access resources within its authorized scope.

---

#### Analyst Assessment

Technical debt, not an attack. The automation script predates the decommissioning (or credential rotation) of the default `admin` account and continues running with outdated credentials. The repeated failures are retry loops against stale credentials.

The key validation was confirming the script stayed within its authorized scope — a legacy script with broad network access could mask unauthorized activity behind apparently benign automation. In this case, behavior matched the documented purpose.

Classified **False Positive**, but the alert exposed two issues: a default `admin` account that should be disabled and an automation script running with dead credentials.

---

#### Response Decision

##### Immediate Actions

1. Close the alert as a documented false positive.

2. Attach the script owner's confirmation to the ticket for audit trail.

##### Escalation Decision

**Closed — False Positive.** Confirmed known automation process. No escalation required.

---

#### Next Investigation Steps

No further investigation needed. Operational recommendations:

- Update or retire the legacy script to use current service account credentials.

- Disable or rename the default `admin` account per organizational policy.

- Create a SIEM exception rule or update the asset inventory to prevent recurring false positives.

- Submit a **Use Case Tuning Request** to the detection engineering team.

---

#### Lessons Learned

Closing a false positive is half the job. The other half is recommending the tuning and root-cause fix. Recurring false positives from unaddressed technical debt erode analyst trust in detection systems and waste operational capacity.

---

---

### Case 8 — Brute Force Campaign Against Database Server Requiring Distributed Attack Assessment

#### Metadata

| Field          | Value                  |
| -------------- | ---------------------- |
| **Category**   | Brute Force — Database |
| **Severity**   | High                   |
| **Source**     | SIEM                   |
| **Status**     | Under Investigation    |
| **Confidence** | Medium                 |

---

#### Alert Summary

Multiple failed authentication attempts against a database service triggered this alert. The immediate question is whether the attack extends beyond the alerted account — a distributed brute force scenario where the attacker spreads attempts across multiple database accounts to stay below per-account lockout thresholds.

---

#### Analyst Assessment

The target is what elevates this. Database access can expose bulk records, customer data, or financial information in a single session — the blast radius of a compromised database account is fundamentally larger than a compromised email account.

Two priorities drive the response. First, scope: access logs need to be reviewed across all database accounts during the attack window, not just the alerted one. A distributed attack testing a few passwords per account is harder to detect and more dangerous than a focused brute force against a single account. Second, hardening: many database servers lack account lockout by default, and enabling it requires operations team coordination to avoid breaking application connectivity or locking out service accounts.

Rated **High** based on target criticality. Compromise status remains unresolved pending log review.

---

#### Response Decision

##### Immediate Actions

1. Coordinate with operations to enable account lockout on the database server, exempting known service accounts.

2. Block the source IP — determine permanent vs. temporary based on policy and threat intel.

3. Review database access logs for successful logins from other accounts during the attack window.

##### Escalation Decision

**Escalated.** Target criticality and unresolved scope require IR and DBA team coordination.

---

#### Next Investigation Steps

- Pull complete database access logs for the attack window and surrounding hours.

- Identify all accounts that authenticated successfully — compare against service account and administrator baselines.

- Determine whether the database server is internet-facing or whether the attacker reached it through an internal pivot.

- Verify authentication configuration: password complexity, lockout policy, logging granularity.

- Coordinate with the DBA team to check for data queries, exports, or modifications from any successfully authenticated accounts.

---

---

### Case 9 — SSH Brute Force Contained by fail2ban with Subsequent Targeted Username Enumeration

#### Metadata

| Field          | Value                                    |
| -------------- | ---------------------------------------- |
| **Category**   | SSH Brute Force / Enumeration            |
| **Severity**   | Medium                                   |
| **Source**     | SIEM / System Logs                       |
| **Status**     | Contained — Escalated for Pattern Change |
| **Confidence** | Medium                                   |

---

#### Alert Summary

High volume of failed SSH attempts from a single external IP against a web server. fail2ban blocked the source after the brute force threshold was exceeded. However, the log sequence revealed a behavioral shift near the end — the attacker moved from generic credential guessing to deliberate attempts against specific usernames.

---

#### Analyst Assessment

The brute force itself is unremarkable — fail2ban handled it as designed. What warrants escalation is the **TTP change**. Before being blocked, the attacker transitioned from high-volume spray to low-volume, targeted username probes. That shift indicates reconnaissance: confirming which accounts exist on the system to build a target list for a more focused follow-up.

Volume-based detection caught the first phase, but the enumeration could easily slip under thresholds if the attacker returns from a different IP. The defensive posture needs to account for both phases.

Rated **Medium** — no successful authentication, brute force mechanically contained. The escalation is driven by the behavioral change, not impact.

---

#### Response Decision

##### Immediate Actions

1. Document the brute force containment by fail2ban.

2. Flag the targeted enumeration as a separate finding — distinct from the generic brute force.

3. Recommend SSH hardening to infrastructure:

   - Disable password authentication; require SSH key-based access only.

   - Increase fail2ban `bantime` (one hour is insufficient for a determined attacker).

   - Evaluate restricting SSH to allowlisted IPs or VPN-only management access.

##### Escalation Decision

**Escalated.** The TTP shift from brute force to targeted enumeration suggests a more capable actor than a typical automated scanner. Senior analyst or infrastructure team should evaluate whether the enumerated usernames correspond to real accounts.

---

#### Next Investigation Steps

- Review the specific usernames targeted during enumeration to determine whether they correspond to real system accounts.

- Search web server access logs, email logs, and other service logs for the same source IP.

- Implement a permanent block for the enumeration-phase IP if it differs from the brute force source.

- Assess whether the web server's SSH is exposed to the public internet and whether that exposure is necessary.

---

#### Lessons Learned

fail2ban solves the volume problem but not the intelligence problem. An attacker who shifts from brute force to enumeration is gathering information for a return visit, and a temporary ban only delays them. Eliminating password-based SSH authentication entirely renders both brute force and enumeration irrelevant.

---

---

### Case 10 — Non-Root User Accessed Shadow File and Modified Sudoers to Gain Elevated Privileges

#### Metadata

| Field          | Value                            |
| -------------- | -------------------------------- |
| **Category**   | Privilege Abuse / Insider Threat |
| **Severity**   | Critical                         |
| **Source**     | Linux System Logs                |
| **Status**     | Confirmed — True Positive        |
| **Confidence** | High                             |

---

#### Alert Summary

Developer account `ahmed_m` performed a deliberate privilege escalation sequence on a Linux system:

```

1. Accessed /etc/shadow (password hash file) — successfully

2. Modified /etc/sudoers to grant sudo privileges to ahmed_m

3. Established an SSH connection to external IP  (attributed to ahmed_m)

```

```

 [ahmed_m]  ──> Read /etc/shadow        (credential access)

     |

     └──────> Edit /etc/sudoers         (self-granted sudo)

                   |

                   └──> SSH to 104.244.42.129  (external connection)

```

---

#### Analyst Assessment

This is an insider threat, not an external attack. Every action was deliberate.

**`/etc/shadow` access.** A non-root user successfully reading this file means either permissions were misconfigured or the user exploited a misconfiguration to gain access. The result is the same: `ahmed_m` now has password hashes for every account on the system.

**Sudoers modification.** Adding your own account to sudoers removes any ambiguity about intent. A developer has no authorization to grant themselves administrative privileges. This is the most direct form of privilege escalation on Linux.

**Outbound SSH to a personal IP.** Following the escalation, `ahmed_m` connected to `104.244.42.129` — attributed to the user personally. This raises the possibility that shadow file contents or other data were exfiltrated to a system the user controls.

Rated **Critical**. Confirmed privilege escalation, credential access, and an established external connection from a named internal user.

---

#### Response Decision

##### Immediate Actions

1. Disable `ahmed_m` across all systems immediately.

2. Revoke all active sessions.

3. Revert the unauthorized sudoers modification.

4. Force password resets for all accounts on the affected system — the shadow file may be compromised.

5. Block external IP `104.244.42.129` at the firewall.

6. Search for any other connections to this IP from internal assets.

7. Review audit logs comprehensively for additional actions by `ahmed_m`.

##### Escalation Decision

**Escalated** to both IR and management. Deliberate unauthorized actions by an identified employee — IR must assess scope, and management must be involved for the personnel decision regarding `ahmed_m`.

---

#### Next Investigation Steps

- Determine how `ahmed_m` accessed `/etc/shadow` — file permission issue, kernel exploit, or misconfigured SUID binary.

- Review all commands via shell history and auditd logs.

- Investigate what data was transferred over the SSH connection to `104.244.42.129`.

- Check for persistence — additional accounts, SSH keys in authorized_keys, cron jobs, other backdoors.

- Assess whether `ahmed_m` used credentials obtained from the shadow file to access other systems.

- Coordinate with HR and legal.

---

---

### Case 11 — Unverified Authentication from Anomalous Geographic Location Requiring User Confirmation

#### Metadata

| Field          | Value                    |
| -------------- | ------------------------ |
| **Category**   | Anomalous Authentication |
| **Severity**   | Medium                   |
| **Source**     | Identity Protection      |
| **Status**     | Under Investigation      |
| **Confidence** | Medium                   |

---

#### Alert Summary

Authentication from a location not previously associated with the user's account. No additional indicators — suspicious IP reputation, unusual User-Agent, or concurrent sessions — were available at alert time to immediately resolve the case.

---

#### Analyst Assessment

On its own, a new-location login is ambiguous. Users travel, use personal hotspots, and sometimes connect through VPNs that shift their apparent location. But new-location logins are also the first visible indicator in many account takeover scenarios.

Without additional confirming signals, the alert cannot be classified on evidence alone. The approach is containment first: revoke sessions to limit exposure, then verify with the user via phone — not email or chat, which could be compromised. The user's response determines the outcome: denial escalates to full compromise investigation; confirmation of travel or VPN use closes the alert.

Rated **Medium** because the alert is unconfirmed. Severity adjusts based on the user's response and account sensitivity.

---

#### Response Decision

##### Immediate Actions

1. Revoke all active sessions immediately — do not wait for user confirmation.

2. Contact the user through their registered phone number.

3. Ask specifically about VPN usage, which could explain the location discrepancy.

##### Escalation Decision

**Escalated** pending user verification. If the user confirms the login was not theirs, the case moves to full account compromise response. If confirmed legitimate, the alert is closed with documentation.

---

#### Next Investigation Steps

- Review audit logs for the new-location session — configuration changes, data access, forwarding rules.

- Compare device fingerprint from the new-location session against the user's historical profile.

- If the user denies initiating the login: disable the account, force password reset, enable MFA if not already active, and review all recent activity.

---

---

### Case 12 — New Device Login Alert for Treasury Employee Correlated with Approved IT Device Provisioning

#### Metadata

| Field | Value |
| ------- | ------- |
| **Category** | New Device Login — False Positive |
| **Severity** | Low |
| **Status** | Closed — False Positive |
| **Confidence** | High |

---

#### Alert Summary

New device identifier detected for a Treasury department employee's account. Cross-referencing the IT support ticketing system revealed an open ticket for approved device provisioning — device replacement or new assignment through the standard IT workflow.

---

#### Analyst Assessment

Treasury department initially gives this alert elevated attention — these accounts typically have access to payment systems and financial operations. But the IT support ticket correlation resolves it cleanly: the new device appeared because the employee genuinely received a provisioned device through an approved process. The device type in authentication logs is consistent with the IT support request.

No conflicting indicators — no concurrent session from a different device, no unusual location, no suspicious IP. This is a predictable byproduct of routine IT operations.

Classified **False Positive** with high confidence.

---

#### Response Decision

##### Immediate Actions

1. Close the alert in SIEM.

2. Link the alert to the IT support ticket number for audit trail.

##### Escalation Decision

**Closed — False Positive.** Directly attributable to an approved IT provisioning process.

---

#### Next Investigation Steps

No further investigation needed. Operational recommendations:

- Include the IT support ticket number in closure notes for traceability.

- Verify device type and model in auth logs match the IT support ticket as a cross-check.

- Consider recommending automated cross-referencing between IT provisioning events and new-device alerts to reduce manual triage for these predictable triggers.

---

---

## Overall Observations

### Common Patterns

**Credential-based attacks dominate.** Nine of twelve alerts involved credential compromise attempts — brute force, credential stuffing, MFA fatigue, or direct credential theft. The authentication layer remains the primary target.

**MFA bypass is a real and present risk.** Two cases demonstrated bypass: push notification fatigue (Case 3) and Legacy Authentication protocols that skip MFA entirely (Case 4).

**Anonymization infrastructure correlates with malicious activity.** Tor exit nodes (Case 5) and cloud hosting providers used as VPN endpoints (Case 1) consistently appeared in confirmed true positives.

**Insider threats follow different detection patterns.** Case 10 involved a developer with legitimate access who escalated deliberately. Detection depends on monitoring privileged operations — shadow file access, sudoers modifications — not authentication anomalies.

**False positives require full validation.** Cases 7 and 12 were false positives, but classification required investigation, cross-referencing, and documentation — not assumption.

**Defensive control gaps amplify attack success.** Missing lockout policies, absent MFA, and enabled Legacy Authentication directly contributed to attacker success or elevated risk across multiple cases.
