---
title: "Investigating Windows Threats Using Event Logs - Effective Threat Investigation for SOC Analysts (Part 2) Notes"
description: "A practical SOC and DFIR reference covering Windows Event Logs, account activity, process execution, PowerShell, persistence, and lateral movement investigation."
date: "2026-07-12"
tags:
  - Windows
  - Windows Event Logs
  - SOC
  - DFIR
  - Threat Investigation
  - Account Investigation
  - Process Investigation
  - PowerShell
  - Persistence
  - Lateral Movement
  - Incident Response
  - Detection Engineering
thumbnail: "/images/reports/windows-investigation.png"
published: true
readingTime: "30 min"
github: ""
stack:
  - Windows Event Logs
  - Event Viewer
  - EvtxECmd
  - Sysinternals
  - PowerShell
  - Windows Registry
  - WMI
  - RDP
  - SMB
  - PsExec
  - WinRM
  - HELK
# pdf: ""
category: "SOC & DFIR"
---



## CH_3 Investigating Windows Threats using Event Logs

---

> [!tip] before log analysis,
> sure that **Event Logs** path is the same, not be edited!

### Windows Event Log Tools Summary

#### 1. Event Viewer

Event Viewer is the built-in Windows GUI tool used to:

- View and analyze Windows Event Logs
- Monitor system, security, application, and service events
- Investigate errors, warnings, logins, process execution, etc.
It works directly with Windows event logs stored on the local machine.

---

#### 2. PsLogList

PsLogList is a Sysinternals command-line tool used to:

- Query and extract Windows Event Logs
- Read logs locally or remotely
- Export event log information from the Windows Event Log service

> [!tip]
>
> - PsLogList is mainly used for command-line access and log collection.
> - PsLogList does **NOT** extract logs from Event Viewer itself.
> - Both PsLogList and Event Viewer access the same underlying Windows Event Logs.

---

#### 3. Event Log Explorer

Event Log Explorer is a third-party GUI tool used to:

- Open and analyze exported Windows event logs offline
- Work with `.evt` and `.evtx` files
- Search, filter, and investigate logs more efficiently than Event Viewer

It is commonly used during:

- Incident Response
- DFIR investigations
- Offline forensic analysis

---

#### 4. EvtxECmd

EvtxECmd is a DFIR-focused command-line parser developed by Eric Zimmerman.

It is used to:

- Parse `.evtx` Windows Event Log files
- Convert logs into readable formats such as CSV or JSON
- Perform timeline and forensic analysis
- Extract detailed event data for large-scale investigations

It is especially useful for:

- Offline log analysis
- Automation
- Threat hunting
- SIEM ingestion

---

### Relationship Between the Tools

```mathematica
Windows Event Logs
        │
        ├── Viewed directly using:
        │      └── Event Viewer
        │
        ├── Queried/exported using:
        │      └── PsLogList
        │
        └── Saved as .evtx files
               │
               ├── Analyzed offline using:
               │      └── Event Log Explorer
               │
               └── Parsed/processed using:
                      └── EvtxECmd
```

### Quick Comparison

| **Tool**           | **Type**        | **Main Purpose**                   |
| ------------------ | --------------- | ---------------------------------- |
| Event Viewer       | Built-in GUI    | View and analyze live Windows logs |
| PsLogList          | CLI             | Query/export Windows logs          |
| Event Log Explorer | Third-party GUI | Offline event log analysis         |
| EvtxECmd           | DFIR CLI Tool   | Parse and process `.evtx` files    |

### Windows Event Log Formats Quick Reference

#### `.evt`

**Definition**

- Legacy Windows Event Log file format used in older Windows systems.
**Characteristics**
- Old binary format
- Limited scalability
- Basic metadata support
- Mostly obsolete today
- Common Location: `C:\Windows\System32\Config\`

**Common Logs**

```powershell
AppEvent.evtSecEvent.evtSysEvent.evt
```

**Used In**:

- Windows XP
- Windows Server 2003

---

#### `.evtx`

**Definition**
Modern Windows Event Log format used in current Windows systems.

**Characteristics**

- XML-based internal structure
- Better performance and scalability
- Rich metadata and filtering
- Standard format in DFIR/SOC operations

**Common Location**

```
C:\Windows\System32\winevt\Logs\
```

**Common Important Logs**

```
Security.evtx
System.evtx
Application.evtx
Sysmon.evtx
Microsoft-Windows-PowerShell%4Operational.evtx
```

**Used In**

- Windows Vista+
- Windows 7/10/11
- Windows Server 2008+

---

#### Quick Comparison

| **Feature**          | **`.evt`** | **`.evtx`** |
| -------------------- | ---------- | ----------- |
| **Type**             | Legacy     | Modern      |
| **Structure**        | Binary     | XML-based   |
| **Windows Versions** | XP / 2003  | Vista+      |
| **Scalability**      | Limited    | Better      |
| **Metadata Support** | Basic      | Advanced    |
| **Current Usage**    | Rare       | Standard    |

### Notes

##### registry key

**registry key** is located under the
  `HKEY_LOCAL_MACHINE\SYSTEM\CurrentControlSet\Services\EventLog\<EventLogName>` registry hive.
  **\<EventLogName>** is a placeholder that represents the name of the Windows event log for which you want to configure the storage location. can be the application, system, or security log.

##### Links

- [PsLogList - Sysinternals | Microsoft Learn](https://learn.microsoft.com/en-us/sysinternals/downloads/psloglist)
- [Cyb3rWard0g/HELK: The Hunting ELK](https://github.com/Cyb3rWard0g/HELK)
- Datasets
  - [UraSecTeam/mordor: Re-play Adversarial Techniques](https://github.com/UraSecTeam/mordor)
  - [Introduction — Security Datasets](https://securitydatasets.com/introduction.html)

##### investigation lab installation

The required machine:

- [ ] At least 6 GB of RAM
- [ ] Ubuntu 18.04 OS VM
- [ ] A hard disk of at least 20 GB

To install HELK:

- [ ] Download HELK:

```bash
git clone https://github.com/ Cyb3rWard0g/HELK.git
cd HELK/ docker
sudo ./ helk_install.sh
```

- [ ] then, use the installation option, Option1 is recommended
- [ ] Finally, you will be provided with the **HELK component’s IP address** and how to access Kibana.
  - **Kibana** is the **HELK GUI** used to analyze the ingested logs for HELK,
   and it is accessible through a browser by entering the access link.

## CH_4 Tracking Accounts Login and Management

---

### Chapter Objectives

- know how to track and profile Windows account activities.
- how to track successful and failed logins, monitor special privilege account logins,
- track the activities of the same logon session, and measure the length of logon sessions.
- Armed with this knowledge, you can effectively investigate and detect suspicious behavior observed from Windows accounts by analyzing authentication event logs.
- differentiate between the different logon events and logon validation events and understand various logon validation event logs.

### 1. Windows Account Types

Every process, service, running application, or authentication activity within a Windows environment must be associated with an account to define its operating context and security boundaries.

##### Standard Accounts

  Basic user accounts typically created by a system administrator for an employee's day-to-day tasks. They are restricted from performing actions that require elevated privileges, which significantly helps limit potential damage if an account is compromised.

- **Local accounts**: Standard accounts that exist locally on an individual machine.
- **Domain accounts**: Standard user accounts created within an organization's centralized network domain environment.

##### Default Local System Accounts

Specialized local accounts created by Microsoft to allow background processes and operating system services to perform system-level tasks automatically without requiring user interaction.

- **SYSTEM (High privilege)**:
  The most powerful local account on a Windows machine. It possesses complete control over the system and can access all local resources and objects.

- **NETWORK SERVICE (Network Auth)**:
  A local system account with restricted privileges that allows specific Windows background services to authenticate over the network by presenting the machine's credentials to remote servers.

- **LOCAL SERVICE (Local Null session)**:
  A local system account with restricted privileges similar to the Network Service account, but it is confined to local tasks and communicates over the network strictly using anonymous null sessions.

- **COMPUTERNAME$ (Domain computer account)**:
  A dedicated account automatically generated when a Windows computer joins an Active Directory domain, allowing the machine to authenticate to the domain and be managed centrally.

- **ANONYMOUS LOGON (Null communication)**:
  An account utilized for network communications that do not require explicit credentials, which may be leveraged depending on system configuration to enumerate basic system, policy, or registry details.

---

### 2. Account Login Tracking

A methodology that allows security analysts to profile account behaviors, identify anomalies, and map out compromised user activities by auditing authentication event data stored within the Windows Security log file.

##### Successful Logins (Event ID 4624)

  Audit logs indicating that an account successfully authenticated to a system, capturing vital tracking parameters such as timestamps and methods.

- **Logon Type**:
  A technical numeric identifier that specifies the exact authentication method used to access the machine (e.g., local keyboard usage, remote desktop connection, or accessing network file shares).
  ![image_1](/images/articles/windows_investigation/Pasted image 20260518081456.png)

- **Key Fields: Account Name, Domain, Source IP**:
  Explicit metadata fields within the logon event structure used to determine exactly who logged in, whether they used a local or domain-level profile, and the network address of the system originating the connection request.

##### Administrative Logins (Event ID 4672)

Highly targeted tracking focused on successful authentications made by sensitive, high-privilege accounts, which are critical to monitor since attackers must secure administrative access to complete complex objectives.

- **Special privileges assigned**:
  Detailed line-items inside the logon event listing the exact administrative user rights and internal operating system security privileges granted to the session.
- **Usually follows Successful Logon**:
  Administrative logins record two distinct events simultaneously:
  - an authentication log entry tracking the baseline logon success and
  - an accompanying entry auditing the administrative rights assigned to that session.

##### Failed Logins (Event ID 4625)

Security tracking generated for every authentication failure, serving as a primary indicator for analysts evaluating password cracking or privilege escalation attempts.
![image_2](/images/articles/windows_investigation/Pasted image 20260518083514.png)

- **Failure Information: Status and Sub Status**:
  Distinct textual explanations and hexadecimal codes that deliver the precise technical reason a logon request failed, such as a mismatched password or a non-existent account.
  ![image_3](/images/articles/windows_investigation/Pasted image 20260518081651.png)

##### Logon Sessions

Interactive session tracking used by security analysts to determine how long an authenticated user account remained continuously active on an endpoint.
![image_4](/images/articles/windows_investigation/Pasted image 20260518084228.png)

- **Logon ID (Unique session identifier)**:
  A temporary, unique session ID generated for every logon instance that allows security analysts to bind specific endpoint events (like executed processes or accessed files) to a distinct authentication window.

- **Duration Calculation**: **(logon 4624 vs logoff 4634/4647)**
  The process of locating matching session start and end events utilizing the shared unique session identifier, then subtracting the logon timestamp from the logoff timestamp to isolate the total runtime.
  - **To determine the length of a session**,
    - correlate between the Event IDs that represent the start and end of the session.
    - For instance, to determine the length of an account’s logon session,
    SOC analysts can correlate between the successful logon Event IDs, such as 4624 or 4672, and the logoff session IDs, such as 4647 or 4634. This will provide a clear view of how long a user has been active on the system, which can be valuable information while investigating security incidents.

##### Account Lockout (Event ID 4740)

A protective operating system containment mechanism that locks a user profile for a designated timeframe after it exceeds a threshold of authentication failures defined by the organization's security policy.

![image_5](/images/articles/windows_investigation/Pasted image 20260518083423.png)

---

### 3. Login Validation Events

Credential validation records that are logged explicitly by the authoritative system responsible for authenticating credentials (e.g., a Domain Controller for domain accounts, or the local SAM database for local workstation accounts), contrasting with standard endpoint logon logs.

##### NTLM Protocol

Audits credential validation results processed specifically over the NTLM authentication protocol framework, recording both successful and failed attempts.

- ##### Event ID 4776

  records both successful and failed attempts regarding credentials validation when the NTLM protocol is used.
![image_6](/images/articles/windows_investigation/Pasted image 20260518083003.png)

##### Kerberos Protocol

Audits credential validation actions occurring over the Kerberos authentication architecture, logging milestones such as ticket creation requests, service ticket grants, and pre-authentication failures.

- ##### Event ID 4768

  records a Ticket Granting Ticket (TGT) being created, which means that the authentication process succeeded over the Kerberos authentication protocol and a TGT has been granted to the user for a certain period.  

- ##### Event ID 4769

  records service ticket request to access the server resources, such as shared files and folders.  

- ##### Event ID 4771

  records pre-authentication failures, meaning that the DC won’t grant TGT or Ticket Granting Service (TGS) tickets
![image_7](/images/articles/windows_investigation/Pasted image 20260518081901.png)

![image_8](/images/articles/windows_investigation/Pasted image 20260518081847.png)

### 4. Account and Group Management

Security logs that map administrative structural changes within the operating system or active directory, allowing analysts to uncover attempts by an attacker to manipulate directories, establish persistence, or execute privilege escalation techniques.

##### Account Management

Tracking the operational lifecycle of user profiles on a system, auditing modifications such as
new user account creations, password reset requests, account enabling/disabling, and profile deletions.

![image_9](/images/articles/windows_investigation/Pasted image 20260518082020.png)

![image_10](/images/articles/windows_investigation/Pasted image 20260518082040.png)

##### Security Group Management

Monitoring structural changes to directory security groups, tracking new group creations or deletions, and logging the addition or removal of user accounts to identify how privileges are being delegated.

![image_11](/images/articles/windows_investigation/Pasted image 20260518082108.png)

| **Event ID** | **Event Name**                                               |
| ------------ | ------------------------------------------------------------ |
| 4728         | A member was added to a security-enabled global group        |
| 4729         | A member was removed from a security-enabled global group    |
| 4732         | A member was added to a security-enabled local group         |
| 4733         | A member was removed from a security-enabled local group     |
| 4756         | A member was added to a security-enabled universal group     |
| 4757         | A member was removed from a security-enabled universal group |

![image_12](/images/articles/windows_investigation/Pasted image 20260518082530.png)

## CH_5 Investigating Suspicious Process Execution using Windows Event Logs

---

### Chapter Objectives

main topics of this chapter:

- Introduction to Windows processes
- Windows process types
- Windows process tracking events
- Investigating suspicious process executions

### Introduction to Windows processes

#### Process Attributes

![image_13](/images/articles/windows_investigation/Pasted image 20260520073559.png)

#### process Types

##### Standard Processes

The standard Windows processes are processes that are developed by Microsoft and exist on Windows platforms

**Here are some common Standard Processes**:

| Process             | Name                                       | Default Path                                 | Typical Username                             | Typical Instances                                                  | Parent Process                                                                    | Purpose                                                                                                                                                                                                                |
| ------------------- | ------------------------------------------ | -------------------------------------------- | -------------------------------------------- | ------------------------------------------------------------------ | --------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `System`            | Windows Kernel/System Process              | N/A                                          | `SYSTEM`                                     | One                                                                | N/A                                                                               | responsible for threads that run in kernel mode                                                                                                                                                                        |
| `smss.exe`          | Session Manager Subsystem                  | `C:\%Systemroot%\System32\smss.exe`          | `SYSTEM`                                     | One for the master instance plus one for each new session creation | `System`                                                                          | responsible for creating new sessions.                                                                                                                                                                                 |
| `csrss.exe`         | Client Server Runtime Subsystem            | `C:\%Systemroot%\System32\csrss.exe`         | `SYSTEM`                                     | One per session                                                    | `smss.exe`<br>but it does not appear as a parent process in any analysis tool     | created for every new session to manage the processes and threads and import DLLs that provide the Windows API                                                                                                         |
| `wininit.exe`       | Windows Initialization Process             | `C:\%Systemroot%\System32\wininit.exe`       | `SYSTEM`                                     | One                                                                | `smss.exe`<br>but it does not appear as a parent process in any analysis tool<br> | represents **session 0** and is responsible for initializing the Service Control Manager `services.exe`, and the Local Security Authority process `lsass.exe`                                                          |
| `services.exe`      | Service Control Manager                    | `%Systemroot%\System32\services.exe`         | `SYSTEM`                                     | One                                                                | `wininit.exe`                                                                     | responsible for loading and launching the Windows services and drivers                                                                                                                                                 |
| `svchost.exe`       | Service Host                               | `C:\%Systemroot%\System32\svchost.exe`       | `SYSTEM`, `LOCAL SERVICE`, `NETWORK SERVICE` | Many                                                               | `services.exe`                                                                    | responsible for running and hosting service DLLs. There are multiple instances of svchost.exe                                                                                                                          |
| `RuntimeBroker.exe` | Runtime Broker                             | `C:\%Systemroot%\System32\RuntimeBroker.exe` | Logged-in User                               | One or More                                                        | `svchost.exe`                                                                     | helps manage permissions on your PC for apps from the Microsoft Store by acting as a proxy between Windows Universal apps and privacy/security                                                                         |
| `lsass.exe`         | Local Security Authority Subsystem Service | `C:\%Systemroot%\System32\lsass.exe`         | `SYSTEM`                                     | One                                                                | `wininit.exe`                                                                     | responsible for authenticating users and implementing the security policy and storing the authentication credentials in its memory section                                                                             |
| `winlogon.exe`      | Windows Logon Application                  | `C:\%Systemroot%\System32\winlogon.exe`      | `SYSTEM`                                     | One for each interactive user login                                | `smss.exe`<br>but it does not appear as a parent process in any analysis tool     | handles interactive user logins and logouts,<br>responsible for loading the LogonUI.exe process to receive credentials from the user and then passing the provided credentials to the lsass.exe process for validation |
| `LogonUI.exe`       | Logon User Interface                       | `C:\%Systemroot%\System32\LogonUI.exe`       | `SYSTEM`                                     | One or More                                                        | `winlogon.exe`                                                                    | responsible for handling the user interface for the Windows login screen                                                                                                                                               |
| `explorer.exe`      | Windows Explorer / Shell                   | `C:\%Systemroot%\explorer.exe`               | Logged-in User                               | One for each interactive user login                                | N/A                                                                               | responsible for providing the user interface for the desktop, taskbar, and file manager in Windows                                                                                                                     |

###### Notes

**Session Manager**

- The first instance of **`smss.exe`** is the master instance,
  which then creates new instances of the `smss.exe` process for each new session by starting the `csrss.exe` process and then `wininit.exe` for **session 0**, which handles the Windows services,
  or `winlogon.exe` for session 1 and higher to handle users logging in

**Service Host**

- each instance uses the unique `-k` parameter in the command-line argument of the process instance to group similar services in one instance

**Logon User Interface**

- When a user attempts to log in, `LogonUI.exe` is launched to display the login screen and receive the user’s credentials.
- Once the user’s credentials are entered, `LogonUI.exe` passes them to the appropriate process, such as `winlogon.exe` or `lsass.exe`, for authentication and further processing

- Multiple instances of `svchost.exe` are normal in modern Windows versions because services are isolated into separate processes.

- Multiple `RuntimeBroker.exe` instances are also normal for UWP/Store apps.

- If any of these processes run from a path outside `C:\Windows\System32\` (or `C:\Windows\` for explorer), it may indicate suspicious activity.

- `lsass.exe`, `csrss.exe`, and `winlogon.exe` are highly targeted by malware because they interact with authentication and sessions.

##### Non-standard Processes

Non-standard processes are processes that are not developed by Microsoft and do not exist by default installation of the Windows platforms.

### Windows Process Tracking events

#### Event ID 4688

records every process creation activity

![image_14](/images/articles/windows_investigation/Pasted image 20260520081110.png)

##### Token Elevation Type

Refers to the token of the process assigned by User Account Control (UAC), which determines the privilege assigned to the process.

| Token    | Type                    | Description                                                                                          | When to Use / When It Appears                                                                                    |
| -------- | ----------------------- | ---------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------- |
| `%%1936` | Type 1 (Full Token)     | Full access token containing all privileges and group memberships without filtering or modification. | when UAC is disabled or for built-in privileged accounts such as `Administrator`, `SYSTEM`, or service accounts. |
| `%%1937` | Type 2 (Elevated Token) | Elevated administrative token containing all privileges and administrator groups fully enabled.      | when UAC is enabled and the user explicitly runs a process using **Run as administrator**.                       |
| `%%1938` | Type 3 (Limited Token)  | Restricted token where administrative privileges are removed or administrator groups are disabled.   | when UAC is enabled and the application does not require elevation.                                              |

##### Mandatory label

Refers to the process integrity level that is used by Mandatory Integrity Control, which provides a mechanism for controlling access to securable objects.

For instance, a process with a low integrity level cannot write to an object with a medium integrity level. As per Microsoft, the following table describes all available process integrity values for the Mandatory Label field.

![image_15](/images/articles/windows_investigation/Pasted image 20260520082417.png)

##### Process Command Line

Refers to the newly created process’s command-line argument.

**Process Command Line** field refers to an empty value if logging the process command line is not enabled by default. To enable logging, within Group Policy Editor, enable  
`Administrative Templates > System > Audit Process Creation >
` include the command line in process creation events`.

##### Notes

- Within Target Subject,
  If the owner of the newly created process is same as the user who started the process (same details as in the Creator Subject section), then the fields in this section will be empty
 ![image_16](/images/articles/windows_investigation/Pasted image 20260520081252.png)

#### Event ID 4689

records every process exit activity

![image_17](/images/articles/windows_investigation/Pasted image 20260520082837.png)

### Investigating suspicious process executions

#### Hiding in plain sight

##### Typosquatting

An attacker may name their malware with names similar to the common standard Windows process names, such as `Svch0st.exe`, `scvhost.exe`, `lssas.exe`, and so on,

##### Legitimate name in wrong path

name a malware process with the same name as a common Windows process and then save and load it from a Windows path other than the one that the original legitimate process file was saved and is running from.

##### Notes

- [Rocky Raccoon | AI-Powered Windows Process Analysis](https://rockyraccoon.io/): provides you with useful information about Windows processes, such as their process descriptions, expected full paths, top parent processes, and top hashes, and a security analysis of the process.

#### Living Off The Land (LOTL)

when an attacker decides to depend on the legitimate software and binaries available in the victim’s system to perform his malicious activities and achieve his objectives instead of uploading new malware and tools to the infected host to evade detection efforts.

- [LOLBAS](https://lolbas-project.github.io/)

#### Suspicious parent-child process relationships

when a process spawns an unexpected process or when the process has an unexpected parent process.
for example:

- a weaponized Microsoft Office document spawn a child process executing suspicious action.
- injecting malicious code into a legitimate Windows process such as the `svchost.exe` or `explorer.exe` process to enforce the legitimate process to execute the malicious code and perform their malicious intents and actions.
  ![image_18](/images/articles/windows_investigation/Pasted image 20260520085304.png)

#### Suspicious process paths

During the investigation of the process execution activities, you should pay attention to the full process path. The most common suspicious process paths are the user profile paths and Temp folders.
Also, it is important to note that during investigations, you may observe a malicious process running from a specific path, which we called the attacker’s working directory.

## CH_6 Investigating PowerShell Event logs

---

### PowerShell execution tracking events

#### Event ID 4604

- records the executed PowerShell script block contents on the first execution
- allows you to reconstruct the fully executed script by arranging and assembling the events that have the same `ScriptBlock ID` value.
- You can reconstruct the script either manually by:
  - ordering and copying every section into any text editor
  - using automated scripts such as the `ExtractAllScripts.ps1`  at the following URL
   (<https://gist.github.com/vikas891/841ac223e69913b49dc2aa9cc8663e34>).
   That script allows you to reconstruct all scripts from 4104 events.

> [!tip]  Script Block Logging feature
>
> - what?

> [!tip] Enabling the PowerShell Script Block Logging feature
>
> - Computer Configuration | Administrative Templates > Windows Components > Windows PowerShell

#### Event ID 4103

- it logs the executed modules and cmdlets

![image_19](/images/articles/windows_investigation/Pasted image 20260520134823.png)

#### Event ID 800

records any PowerShell command executions made through the PowerShell console, in a log file named Windows PowerShell.

![image_20](/images/articles/windows_investigation/Pasted image 20260520135031.png)

### Two additional logging features for monitoring PowerShell activities

#### PSReadLine

- allows you to track the history of every command entered in the PowerShell console
- This functionality is similar to the history command in Linux operating systems,
  but in the case of PowerShell, the history is stored in a dedicated file on the disk.
  By default, this history is saved in a **TXT file** located in the user’s **AppData directory** at
  `C:\Users\[USERNAME]\AppData\Roaming\Microsoft\Windows\PowerShell\PSReadLine`

#### Transcript

- allows you to track the input and output of PowerShell sessions.
- captures the executed commands, their output, and any error messages generated during the session.

> [!note]
>
> - the Transcripts feature is not enabled by default.
>   To start a transcript in PowerShell, you can use the `Start-Transcript` cmdlet,
>   and by default, the output is saved to disk in the **user’s Documents folder**.

While the two features are not event logs, it is still possible to forward them to your SIEM solution, at least from critical servers.

## CH_7 Investigating Persistence and Lateral Movement Using Windows Event Logs

---

### Chapter Objectives

The main topics:  

- Understanding and investigating persistence techniques
- Understanding and investigating lateral movement techniques

### persistence techniques

#### Registry run keys

The **Windows Registry** is a hierarchical database that stores configuration settings, options, and information about the operating system, hardware devices, software applications, and user preferences on Microsoft Windows operating systems.
It serves **as a central repository** for critical system and application settings

**Registry** consist of **five Hives**, the most important hives of them are:

- `HKEY_CURRENT_USER` (**HKCU**)
  which stores configuration settings for the **currently logged-in user**
- `HKEY_LOCAL_MACHINE` (**HKLM**)
  which stores configuration settings for the **entire computer system**, applicable to all users.

**Each registry hive** include **several registry keys** such as the registry run keys.
Registry run keys are registry keys that make a program run when a user logs on to a system.

An attacker may achieve persistence by **modifying** existing or **adding** new value under the registry run keys to reference the malware path to be executed when a user logs in.
Attackers can do so either by using:

- the Windows **built-in Registry Editor GUI** tool or  
- a command-line tool, such as the Windows built-in `reg.exe` tool.

The following registry run keys are created by default on the Windows OSs

```powershell
HKEY_CURRENT_USER\Software\Microsoft\Windows\CurrentVersion\Run
HKEY_CURRENT_USER\Software\Microsoft\Windows\CurrentVersion\RunOnce
HKEY_LOCAL_MACHINE\Software\Microsoft\Windows\CurrentVersion\Run
HKEY_LOCAL_MACHINE\Software\Microsoft\Windows\CurrentVersion\RunOnce
```

![image_21](/images/articles/windows_investigation/Pasted image 20260522060157.png)
a new registry value Malware was created under one of the registry run keys, referencing the C:\Windows\Temp\Malware.exe executable path on the disk, to be executed upon user login.

##### Events to detect suspicious access and additions or modifications to registry keys

![image_22](/images/articles/windows_investigation/Pasted image 20260522060307.png)

> [!Note]
> all the event names refer to an Object **except event ID 4657**, which refers to the registry.
> This is because event IDs 4656, 4658, 4660, and 4663 are designed to record any access to any object, including the registry keys,
> while event ID 4657 is designed to audit changes in the registry keys.

![image_23](/images/articles/windows_investigation/Pasted image 20260522060428.png)

- Object Server field is always Security.
- Object Type field refers to the type of the accessed object, which could be a **file**, **key**, or **SAM**

> [!Note]
> Unfortunately, auditing the modification of the registry keys is not enabled by default and should be configured to generate an event if the `Set Value` auditing is set in the registry key’s system access control list (SACL).

#### Windows scheduled tasks

Windows scheduled tasks are recurring predefined actions automatically executed whenever a certain set of conditions are met.

A scheduled task can be created by using the GUI tool or command-line tools such as `schtasks.exe`:

```powershell
schtasks /create /tn mysc /tr C:\Users\Public\test.exe /sc ONLOGON / ru System
```

- the above command:
  - **creates** a new scheduled task named **mysc**,
  - to **execute** a malicious executable, `C:\Users\ Public\test.exe`,
  - **every time there a user logged in** under the context of the **System** account.

##### Windows scheduled tasks event ID 4698 = A scheduled task was created

![image_24](/images/articles/windows_investigation/image.png)

- at `2020-09-21T03:15:45`,
  - an attacker used the compromised account (**THESHIRE\pgustavo**)
  - to create a **new scheduled task** named **MordorSchtask**,
  - **executing** a PowerShell **script** stored **in a registry key** **every day** at `2020-09-21T09:00:00`
  - **under** the context of the (**THESHIRE\pgustavo**) account.
 (Note that all mentioned times are in the local system time zone.)

#### Windows services

A Windows service is a process that runs in the background without any interaction from a user and can run even before any user logs in to a system.

Service creation can be done by either using the GUI application or a command-line tool, such as:

```Powershell
sc.exe create TestService binpath= c:\windows\temp\NewServ.exe start= auto
```

- The above command creates:
  - a new service named **TestService**
  - to **execute** the `c:\windows\ temp\NewServ.exe` binary
  - **automatically** each time a computer is **restarted**,
    even if no user logs on to the system.

##### Windows services  Events IDs

Microsoft allows you to track every new service creation activity by recording:

- event ID **7045** in the **system event** **log** file
- event ID **4697** in the **Security event** **logs**.
Both events have the same event name – **A service was installed in the system**

![image_25](/images/articles/windows_investigation/Pasted image 20260522053719.png)

![image_26](/images/articles/windows_investigation/Pasted image 20260522053737.png)

In the above case,

- the **pbeesly domain account** created a new **auto-start service**
- to execute the `C:\ Windows\System32\javamstup.exe executable`
- **under** the context of the **LocalSystem account**,

which is an indicator of suspicious activity because:

- the created service start type is auto start,
- the service has been created to execute javamstup.exe from the System32 folder,
- and the aforementioned executable is **not a built-in** or **default Windows executable** usually located in the System32 folder,
  which is a special folder in the Windows OS that contains built-in system executables.

> [!Tip] Service Start Type
> indicates when and how the service will start.
> The start types values are numeric:
>
> - `0` = a boot device such as Windows drivers,
> - `1` = a driver started by the I/O subsystem,
> - `2` = an auto-start service (the service start type used by attackers to keep persistence),
> - `3` = a manual start,
> - `4` = a disabled service

#### WMI event subscription

An attacker may keep persistence on an infected system by configuring the Windows Management Instrumentation (WMI) event subscription to execute malicious content, either through a script or the command line.

To keep persistence on the victim's machine by using WMI event subscription, an attacker needs to conduct the following three steps:

1. An **event filter** must be created to define a specific trigger condition
   (for example, every one minute).
2. An **event consumer** must be created to define the script or command that should be executed once the condition defined in the event filter is met.
3. A binding must be created that ties the event filter and event consumer together.

##### WMI Types

- `CommandLineEventConsumer` ==> is designed to execute commands.
- `ActiveScriptEventConsumer`  ==> is designed to execute scripts.

##### WMI event ID 5861

- records every WMI event consumer creation activity
- location: `Microsoft-Windows-WMI-Activity/Operational` log fil

**example:**

![image_27](/images/articles/windows_investigation/Pasted image 20260522042023.png)

The preceding event indicates that:

- a new WMI event consumer named Updater was created,
- the log event shows that the consumer is bound with an event filter, also named Updater,
- and the consumer type is a command-line consumer and designed to execute a suspiciously encoded PowerShell command.

##### To investigate suspicious consumers creation

1. define whether the consumer type is one of the two mentioned consumer types .
2. Investigate rare WMI event filter and consumer **names**,
3. investigate whether the consumer is designed to conduct any suspicious executions,
   such as **executing binary** from suspicious paths, or the **use of a living off the land** executable.

### lateral movement techniques

#### Remote Desktop application

An attacker can use the Windows built-in Remote Desktop connection tool to fully access and control remote systems in a network for lateral movement.
The attacker takes advantage of that the RDP traffic is usually considered legitimate traffic, usually permitted from security devices, and the RDP application is usually installed and enabled on all environment’s systems.

![image_28](/images/articles/windows_investigation/Pasted image 20260522062710.png)

##### Source machine event logs

While most valuable event logs that allow you to investigate RDP connections are recorded on the target system, there are some useful event logs recorded on the source machine that help us detect and investigate RDP activities, such as:

- **event ID 4688**, which **records new process execution activities**.
This is the event that will record the execution of `mstsc.exe`, the **Remote Desktop client process**.

##### Target machine event logs

- **Event ID 4688** ==> record the execution of the `rdpclip.exe` and `tstheme.exe` processes.
- **Event ID 4624** ==> records users’ **successful authentication** over the RDP session.

![image_29](/images/articles/windows_investigation/Pasted image 20260522063113.png)

The preceding screenshot shows that:

- the **pbeesly** account **logged on** to the **SCRANTON** hostname
- from the **172.18.39.2 source machine IP**.

> [!Note]
> the case of RDP logins, the Workstation Name field in the Network Information section does not refer to the source machine name; instead, it refers to the name of the machine that recorded the event log (the target machine).

To find the source machine name of the RDP login,

- you can depend on **event IDs** **4778** and **4779**, recorded in the **Security event logs** file.
  - **Event ID 4778** ==>  records every reconnected RDP session.
  - **Event ID 4779** ==> records every disconnected RDP session.

![image_30](/images/articles/windows_investigation/Pasted image 20260522063504.png)

> [!Tip] To distinguish between legitimate and malicious RDP connections
> it is crucial to **investigate whether** the RDP connection was established between two regular workstations (**client to client**),
> since the **majority of RDP** connections typically originate **from a workstation to a jump server**,
> or **from an IT administrator’s workstation to another machine** within a network for routine job responsibilities.

#### Windows admin shares

An attacker can use an administrative privilege account to interact with the remote Windows admin shares and transfer binaries to a remote machine over the SMB protocol to execute it later, using one of the remote execution techniques, such as the PsExec tool, PowerShell remoting, remote scheduled task creation, or remote service creation.

Windows admin shares include:

- `C$` = allows you access to the C: drive of the remote machine.
- `ADMIN$` = allows you access to the Windows folder of the remote machine.
- `IPC$` = is a special Windows admin share usually used for named pipe connections.

![image_31](/images/articles/windows_investigation/Pasted image 20260522065901.png)

##### NET command Line tool

The most used tool by attackers to map Windows admin shares

For example, the Turla threat group used the NET tool with the following command to map remote systems’ shares:

```powershell
net use L: \\<Target_IP>\$C /USER:\<Domain>\<User>
```

##### Source machine event logs

- **event ID 4688** ==> records process execution activities of the `net.exe` and `net1.exe` processes.
The event also provides us with other useful information, such as the parent process and the process command line (if the process’s CMD logging is enabled).
By analyzing the NET utility process command argument, you will be able to identify the target hostname or IP for the attacker to pivot.

##### Target machine event logs

The most valuable events recorded on the target system are:

- **Event ID 4624** ==> records the successful authentications on the target system to access its shared resources
- **Event ID 5140**
- **Event ID 5145**

###### Event ID 4624

![image_32](/images/articles/windows_investigation/Pasted image 20260522070237.png)

###### Event ID 5140

It's recorded after event ID 4624 in the Security event log file and allows you to track the accessed shared folders of the system.

**BUT**, this event does not include the accessed and potentially transferred files in the accessed shared folders.

![image_33](/images/articles/windows_investigation/Pasted image 20260522070432.png)

###### Event ID 5145

allows you to track the accessed shared files

![image_34](/images/articles/windows_investigation/Pasted image 20260522070559.png)

The preceding scenario describes the activity of an attacker who used the Windows admin shares technique for lateral movement.

- After successful authentication to the victim's system to access its shared network resources,
  as shown in event ID 4624:
- the attacker accessed one of the Windows admin shares on the system, the `C:\Windows` folder
- the attacker transferred a file named `python.exe` to the `C:\Windows\Temp\python.exe` path to be executed later, using one of the remote execution techniques.

> [!Note]
> the attackers often employ **automated share discovery utilities**, such as the **ShareFinder** tool, to discover and enumerate shared folders and files on a victim’s network.
> To detect and investigate such activities, utilize event IDs 5140 and 5145 to track aggressive share access to multiple internal systems from the same source system.

#### The PsExec Sysinternals tool

PsExec is a Sysinternals tool developed by Microsoft for remote code executions on other systems. Most attackers use the PsExec tool for both remote code execution and lateral movement.

![image_35](/images/articles/windows_investigation/Pasted image 20260522073109.png)

The preceding figure describes:

- a remote code execution **from** **Host A** **to Host B** for lateral movement.
- In Host A, the attacker entered this command:

```powershell
psexec.exe \\hostB -accepteula -d -c C:\ MalwareFolder\malware.exe
```

- to copy and execute the `Malware.exe` binary, located in **Host A** in the `c:\MalwareFolder` path, remotely on Host B.

If the attacker has a proper administrative privilege, by entering the aforementioned command in Host A,

- **they will authenticate to Host B**, and then,
- by default configuration,
   `Psexesvc.exe` (to handle the remote execution) and
  `Malware.exe` (the attacker’s malicious executable) binaries
  will be **copied to the ADMIN$ share** on Host B.
- Finally, a **Windows service** is **created** and **starts to execute** the `psexesvc.exe` binary to execute the `Malware.exe` binary.

The `psexesvc.exe` binary is a renamed copy of the `psexec.exe` binary to handle the remote execution from the source to the remote host.

![image_36](/images/articles/windows_investigation/Pasted image 20260522073800.png)

##### Source machine event logs

- **Event ID 4688** ==> which records the execution of the psexec.exe process

##### Target machine event logs

###### event ID 4624

- records the **successful authentication** to the target system to access its shared resources.
  (in this case, it’s ADMIN$, which is the default location for PsExec to copy the binaries to remote systems).

###### event IDs 5140 & 5145

- allowing you to track the accessed and mapped shared folders and files of the system and the potentially transferred files.

###### Event ID 7045 & 4697

- record the new service creation on the system
  - **4697** ==> stored within security events log file.
  - **7045** ==> stored within system events log file.

![image_37](/images/articles/windows_investigation/Pasted image 20260522074407.png)

###### Event ID 4688

- records that the `PSEXESVC.exe` binary was executed and spawned by `Services.exe`, which is the expected parent process of all the services’ binaries.

![image_38](/images/articles/windows_investigation/Pasted image 20260522074502.png)

> [!Tip]  To differentiate between the legitimate and malicious use of PsExec
> it is crucial to establish a baseline for your environment. For example,
>
> - the execution of PsExec in certain environments is an **anomaly**, and in some environments, it is a **normal** activity.
> - If you work in an environment where system admins use PsExec for remote executions and administration, then try to **observe** any **suspicious** execution of the **PsExec** utility by **non-admin users** or **outside** normal **working hours**.
> - it’s crucial to focus on the executed code and spawned processes by `PSEXESVC.exe` on a remote system.

#### PowerShell remoting

PowerShell remoting uses the **Windows Remote Management (WinRM)** protocol,

> [!WinRM] Windows Remote Management
> A protocol allowing users to execute commands on remote systems over an encrypted channel.

To remotely execute commands on remote systems, an attacker can use one of the following two commands:

```powershell
Invoke-Command -ComputerName VICTIM -ScriptBlock {Start-Process c:\malwarefolder\malware.exe} -Credential $credentials

Enter-PSSession -ComputerName VICTIM -Credential $credentials
```

![image_39](/images/articles/windows_investigation/Pasted image 20260522080738.png)

##### Source machine event logs

- **Event ID 4688** ==> records the execution of the `PowerShell.exe` process, its command line, and the parent process.
- **Event ID 4104** and **Event ID 800**, which then log the executed PowerShell command line and script.

##### Target machine event logs

- **Event ID 4624** ==> records successful authentication to the target system with logon `type 3`.
- **Event ID 4688** ==> logs and records the execution of the `wsmprovhost.exe` process,
  which is the process of the Windows Remote PowerShell session when using the WinRM service.
  - The `wsmprovhost.exe` process executes on the target system to receive the entered commands from the source machine’s PowerShell process, to be executed on the target system.
  ![image_40](/images/articles/windows_investigation/Pasted image 20260522081415.png)
for more investigation
- **Event IDs 800** and **4104** and found that event ID 4104 decoded and logged the full encoded script
  
  ![image_41](/images/articles/windows_investigation/Pasted image 20260522081716.png)
  ![image_42](/images/articles/windows_investigation/Pasted image 20260522081750.png)
