---
title: "Red Hat System Administration I (RH124) Comprehensive Notes"
description: "A complete reference guide and study notes for Red Hat System Administration I (RHEL 9), covering CLI access, file management, user & group administration, permissions, systemd services, SSH, networking, storage, and software packages."
date: "2025-02-7"
tags:
  - Linux
  - Red Hat
  - RHEL 9
  - RH124
  - System Administration
  - DevOps
  - Bash
  - Networking
  - Security
thumbnail: "/images/articles/redhat_sysadmin/thumbnail.png"
published: true
readingTime: "45 min"
github: "https://github.com/0sman1924/DevOps_notes/blob/main/RedHat_SysAdmin_I.md"
stack:
  - RHEL 9
  - Bash
  - systemd
  - SSH
  - VIM
  - nmcli
  - DNF / RPM
  - Tar / Gzip
  - Storage & File Systems
# pdf: ""
category: "Linux & System Administration"
---

## Resources

- [Course: Red Hat System Administration - I | Mahara-Tech](https://maharatech.gov.eg/course/view.php?id=2115)
- The Linux Command Line Book (by William Shotts)
- Linux BIBLE - Tenth Edition (by Christopher Negus)

## Note that

- you can get this pdf on github via:
 [DevOps_notes/RedHat_SysAdmin_I.md at main · 0sman1924/DevOps_notes](https://github.com/0sman1924/DevOps_notes/blob/main/RedHat_SysAdmin_I.md)
- for any issues, please contact me: <m.abdelnaby1924@gmail.com>

## Content

- ### CH01_Install RHEL 9

  - #### Prerequisites To Install Red Hat Enterprise Linux on VMWare Workstation

  - #### minimal requirements for RHEL virtual machine

- ### CH02_Accessing the Command Line

  - #### some common commands

  - #### some important terminal shortcuts

- ### CH03_Managing Files From the Command Line

  - #### Understand file system hierarchy

  - #### Specify what of files are available in Linux

  - #### Access directories using absolute and relative path

  - #### List the contents of directories]

  - #### Create, copy, move, and remove files and directories

  - #### Create hard links and soft links. & what is Inode Index

  - #### Efficiently run commands affecting many files by using pattern matching features of the Bash shell

- ### CH04_Getting Help in Red Hat Enterprise Linux

  - #### Common Sections of the Linux Manual

  - #### manual page sections

  - #### Notes

  - #### Another documentations to get help

- ### CH05_Creating, Viewing, and Editing Text Files

  - #### Input Output Redirection

  - #### Constructing Pipelines

  - #### VIM text editor

  - #### Variables in Linux

- ### CH06_Managing Local Users and Groups

  - #### User Identifier UID

  - #### Group ID GID

  - #### SUDO permissions

  - #### Grant Super user access

  - #### CRUD operations for users

  - #### CRUD operations for groups

  - #### managing user passwords

  - #### Restricting Access to User Accounts

- ### CH07_ Controlling Access to Files

  - #### Linux File-system Permission

  - #### Change permissions of files & Directories

  - #### change file & directory ownership

  - #### Set Special Permissions

  - #### Default Permissions

- ### CH08_Monitoring and Managing Linux Processes

  - #### Listing Processes

  - #### manage foreground & background processes

  - #### Killing a Processes

  - #### real-time processes monitoring

  - #### Linux process scheduling and multitasking

- ### CH09_Controlling Services and Daemons

  - #### Intro to systemd

  - #### systemctl

  - #### Service Unit Information

  - #### Service state in the output of systemctl

  - #### Control system services

- ### CH10_Configuring and Securing SSH

  - #### Access the Remote Command Line with SSH

  - #### Configure SSH Key-based Authentication

  - #### Customizing open SSH service configuration

- ### CH11_Analyzing and Storing Logs

  - #### System Log Architecture

  - #### Review Syslog Files

  - #### Review System Journal Entries

  - #### Change the Timezone in Linux

- ### CH12_Managing Networking

  - #### Gathering Interface Information

  - #### Testing Connectivity Between Hosts

  - #### Troubleshooting Ports & Services

  - #### configure network from CLI (nmcli command)

  - #### Modify Network Configuration files

  - #### delete a network connection

  - #### who can modify network settings??

  - #### Configure hostnames & name resolution

  - #### summary of common nmcli commands]

- ### CH13_Archiving and Transferring Files

  - #### Managing compressed TAR Archives

  - #### Transferring Files & Directories

- ### CH14_Installing and Updating Software Packages

  - #### Packaging Systems

  - #### How a Package System Works

  - #### High and Low-level Package Tools

  - #### Common Package Management Tasks

  - #### Notes

  - #### Additional Resources

- ### CH15_ Accessing Linux File Systems

  - #### Mounting and Unmounting Storage Devices

  - #### Creating New File Systems

  - #### Testing and Repairing File Systems

  - #### Moving Data Directly to and from Devices

  - #### Creating CD-ROM Images

  - #### Writing CD-ROM Images

  - #### Verify ISO Image Integrity

  - #### useful tools

  - #### Search for files in mounted file systems `locate` vs `find`

### CH01_Install RHEL 9

#### Prerequisites To Install Red Hat Enterprise Linux on VMWare Workstation

##### OPTION 1

- RHEL 9 ISO image:
  to download RHEL 9 for free, use following portal Red Hat Enterprise Linux product:
  [access.redhat.com/downloads/content/rhel](https://access.redhat.com/downloads/content/rhel)

![image_1](</images/articles/redhat_sysadmin/Pasted image 20250907074143.png>)

- Download VMWare Workstation or Virtual Box

> **NOTE!:** Ensure that hardware virtualization support is turned on in the BIOS settings

##### OPTION 2

create a vm on GCP using the credit gift $300, RHEL subscription is bundled in the VM price

#### minimal requirements for RHEL virtual machine

- RAM >= 2GB
- CPU  ==> Dual or Quad core processor
- Storage >= 20G
  - 10 GB for `root /`
  - 1 GB for swap
  - 4 GB for `/home`
  - 512 MB for `/boot`
- Network Connection
- Installation media

### CH02_Accessing the Command Line

- A command line is a **text-based interface** which can be used to input instructions to a computer system.
- The **default shell** for users in Red Hat Enterprise Linux is the **CNU Bourne-Again Shell** (**bash**).
- When a shell is used interactively, it displays a string when it is waiting for a command from the user. This is called the **shell prompt**.

#### some common commands

- **date**: print the current date & time
- **passwd**: Changes a user's own password.
- **file**: Scans the beginning of a file's contents and displays what type it is.
- **cat, less, head, tail**
- **history**
  - `!<command_no>` : run the command of this indexed number
  - `!!` :  run the last command
  - `ctrl+r` : search in the history about specific command

#### some important terminal shortcuts

- **Tab**: auto completion
- `\` :  continue a long command on another line
- **ctrl+A**:  Jump to the beginning of the command line.
- **ctrl+E**: Jump to the end of the command line.
- **ctrl+U**: Clear from the cursor to the beginning of the command line.
- **ctrl+K**: Clear from the cursor to the end of the command line.
- **Ctrl+LeftArrow**: Jump to the beginning of the previous word on the command line.
- **Ctrl+RightArrow**: Jump to the end of the next word on the command line.
- **ctrl+R**: Search the history list of commands for a pattern.

### CH03_Managing Files From the Command Line

#### Understand file system hierarchy

![image_2](</images/articles/redhat_sysadmin/Linux-file-system-hierarchy-Linux-file-structure-optimized.jpg>)
![image_3](</images/articles/redhat_sysadmin/Pasted image 20250814183504.png>)

##### /usr

Installed software, shared libraries, include files, and read-only program data.
Important subdirectories include:

- /usr/bin: User commands.
- /usr/sbin: System administration commands.
- /usr/local: Locally customized software.

##### /etc

Configuration files specific to this system.

##### /var

Variable data specific to this system that should persist between boots.
Files that dynamically change.
such as databases, cache directories, log files, printer-spooled documents and website content may be found under `/var`.

##### /run

Runtime data for processes started since the last boot.
This includes process ID files and lock files. among other things, The contents of this directory are
recreated on reboot.
This directory consolidates /var/run and /var/lock from earlier versions of Red Hat Enterprise Linux.

##### /home

Home directories are where regular users store their personal data and
configuration files.

##### /root

Home directory for the administrative superuser, root.

##### /tmp

A world-writable space for temporary files.
Files which have not been accessed, changed, or modified for 10 days are deleted from this directory automatically.
Another tempbrary directory exists, `/var/tmp`, in which files that have not been accessed, changed, or modified in more than 30 days are deleted automatically.

##### /boot

Files needed in order to start the boot process.

##### /dev

Contains special device files that are used by the system to access hardware.

#### Specify what of files are available in Linux

##### types of files in Linux

| Symbol | Meaning      |
| ------ | ------------ |
| -      | Regular file |
| d      | Directory    |
| l      | Link         |
| c      | Special file |
| s      | Socket       |
| p      | Named Pipe   |
| b      | Block Device |

![image_4](</images/articles/redhat_sysadmin/Pasted image 20250815021703.png>)

##### File Naming

**Should**

- Be Descriptive
- Only alphanumeric characters: UPERCASE, lowercase, number, @, _

**Shouldn't**

- Include Embedded Links
- Contain Shell Metacharacters: `* ? >< / ; & ! [ ] | \ ' " ( ) { }`

**Notes**

- Files Are case sensitive.
- Filenames starting with a "." are hidden.
- Maximum number of character for a filename is 255.

#### Access directories using absolute and relative path

**tools to Navigate Paths:**

- #### pwd

- #### cd

```Bash
cd -           # back to the last path
cd ..          # back to the parent folder of the current one   
cd ~           # go to /home directory  OR use "cd  " 
cd <USERNAME>  # go to this username folder.
cd ~/USERNAME  # go to /home/user directory
```

#### List the contents of directories

##### ls command

The **Is** command has multiple options for displaying attributes on files, The most common and useful are:

```Bash
-l     # long listing format 
-a     # all files, including hidden files
-R     # recursive, to include the contents of all subdirectories
-lh    # human readable
-t     # access time 
-r     # reverse order
```

##### dir command

the same as **ls** command but not colored, but there is an option to make the output colored:
`dir --color`

#### Create, copy, move, and remove files and directories

##### create files & directories (touch & mkdir)

```Bash
touch file1 FILE1  # Case Sensitive
touch /root/Desktop/file1
touch {file1, file2, file3, file4} 
```

> **NOTE!:** if the file exists, it will reset the timestamp of the file.

- **mkdir**

```Bash
mkdir DIRECTORY   # Create a directory
mkdir dir1/dir2/dir3    # throw an ERROR 
mkdir -p dir1/dir2/dir3 # that's fine
```

##### Copy files & directories

```Bash
cp file1 file2    # make file2 as a cpoy of file1
cp filel /root/Desktop/
cp filel file2 file3 /root/Desktop/  # the last argument must be a directory
cp -r /etc /dirl     # copy non empty directory (the folder itself and its content) 
cp -r /etc/* /dirl   # copy the content of /etc directory into dir1
```

##### Move files & directories

```bash
mv file1 new_file1     # rename the file
mv file1 file2 file3 /root/Documents/  # the last argument must be a directory
mv dir1 dir2 dir3 dir4    # the last argument must be a directory
```

##### Remove files & Directories

```Bash
rm file      # Remove a file
rm -r dir1   # remove non empty directory
# if you are the root, each rm command you will be asked to remove..so use -f
rm -f dir1   # remove this empty dir. without asking
rm -rf dir2  # remove this non empty dir. without asking
rm -rf *     # remove all contents of the current directory without asking 
rm -rf /     # remove all contents of the system without asking, this command is a very critical command, the system will be gone even without asking
rmdir directory   # Remove an empty directory
```

#### Create hard links and soft links. & what is Inode Index

A **link** in Linux is a **pointer to a file or Directory**.
Like pointers in any programming languages, links in Linux are pointers pointing to a file or a directory.
**Creating links is a kind of shortcuts to access a file**. Links allow more than one file name to refer to same file, elsewhere.

![image_5](</images/articles/redhat_sysadmin/Pasted image 20250816053733.png>)

##### Soft Links

- very small size compared to the original file  
- if the original file is deleted, the Soft Link will be useless
- the Soft Link has a different **Inode** than original file

##### Hard Link

- Has the same size as the original file
- if the original file is deleted, the Hard Link won't be affected
- Has the same **Inode** as the original file

##### What is Inode (Index Node)

Linux allocate an index node (inode) for every file and directory in filesystem.
An **inode (index node)** is a **data structure on a filesystem** that stores metadata about a file or directory.  It is **not the file itself** and **not just a number**.

Inode is Unique Identifier for the file in the filesystem.
**Inodes** **do not store actual data**.

each file or directory has an **inode entry** in the **Inode table**.
each **Inode entry** has:

- **Metadata**
- **Data pointer** (pointers to data blocks (where the file’s content is actually stored)

the following **Metadata** exists in an inode:

- #### File type

- #### Permissions

- #### Hard links count

- #### Owner ID

- #### Group ID

- #### Size of file

- #### Time stamp (access time)

- #### Time stamp (modification time )

- #### Soft/Hard Links

- #### Access Control List (ACLs)

- #### Pointers to data blocks (the actual disk locations where file content is stored)

![image_6](</images/articles/redhat_sysadmin/redhat5.png>)

##### File System Structure (especially for ext-family like ext2/ext3/ext4)

- The filesystem splits the disk into **block groups** to reduce disk head movement (for HDDs) and improve performance.
- Each block group is like a “mini filesystem” with its own **bitmaps, inode table, and data blocks**.

```mathematica
Disk / Partition
 ├── Boot sector
 ├── Superblock
 ├── Block Group 0
 │    ├─ Inode Bitmap
 │    ├─ Block Bitmap
 │    ├─ Inode Table  <── here, you find the Inode Entries
 │    └─ Data Blocks
 ├── Block Group 1
 │    ├─ Inode Bitmap
 │    ├─ Block Bitmap
 │    ├─ Inode Table
 │    └─ Data Blocks
 ├── Block Group 2
 │    ├─ Inode Bitmap
 │    ├─ Block Bitmap
 │    ├─ Inode Table
 │    └─ Data Blocks
 └── ...
```

###### Boot Sector

**contains initial boot code or reserved space for boot loaders.**

- It is The very first sector(s) of a storage device or partition.
- In a **disk with an OS**, it may contain:
  - **Boot loader code** (small program that starts the OS loading process).
  - Partition table (if it’s the MBR).
- In a **filesystem context** (like ext4), the `boot sector` of the partition is usually just reserved space; some filesystems don’t actually use it except for boot loaders.

###### Superblock

**master record of the filesystem — tells the OS how to interpret and navigate the whole disk structure.**

- It is a critical data structure at the start of each filesystem.
- Contains **global metadata about the entire filesystem**, such as:
  - Filesystem type (ext4, xfs, etc.)
  - Size of the filesystem (total number of blocks/inodes)
  - Size of each block
  - Number of free/used blocks and inodes
  - Location of the inode table and block bitmaps
  - Mount status (clean or dirty shutdown)

###### Inode Bitmap

**tracks allocation status of inodes.**

- A bitmap = a sequence of bits (0s and 1s).
- Each bit represents whether a given **inode** is free or in use.
  - `0` → free inode (available for a new file).
  - `1` → allocated inode (belongs to some file/directory).

###### Block Bitmap

**Tracks allocation status of data blocks.**

- Same idea of Inode Bitmap, but for **data blocks**.
- Each bit represents whether a **data block** is free or used.
  - `0` → free block.
  - `1` → block is occupied by some file’s content.

###### Inode Table

 **Holds metadata + block pointers for every file/directory.**

- This is the actual table (array) where all **inode entries** live.
- Each inode entry contains:
  - File type, size, ownership, timestamps, permissions.
  - Pointers to data blocks (direct/indirect).

###### Data Blocks

**Store the actual content (file data or directory entries).**

- The real storage space of the disk for file content.
- For directories, the data blocks store the **list of filenames → inode numbers** mapping.

##### Create Hard/Soft Links

- `ln` command: create a **new hard link** (another name) that points to an existing file.
- `ln -s` command: create a **new soft link** (another name) that points to an existing file or directory.
![image_7](</images/articles/redhat_sysadmin/radhat.png>)

![image_8](</images/articles/redhat_sysadmin/redhat2.png>)

Notes

- **soft links can link both a file or directory**,
  **hard links can only link to a file, not directory.**
 ![image_9](</images/articles/redhat_sysadmin/redhat3.png>)

- Soft Links can be created across filesystems, Hard links can't be created outside the filesystem.
 ![image_10](</images/articles/redhat_sysadmin/redhat4.png>)

 Notes

- **df command**  ==> **Disk Free**, It shows **disk space usage** of mounted filesystems.
- common options:
  - `df -h` → human-readable (KB, MB, GB).
  - `df -T` → also show filesystem type (ext4, xfs, tmpfs).
  - `df -i` → show inode usage instead of disk space (useful for inode exhaustion).

#### Efficiently run commands affecting many files by using pattern matching features of the Bash shell

##### Regular Expression (Regex)

| **Pattern**                   | **Matches**                                                                                                    |
| ----------------------------- | -------------------------------------------------------------------------------------------------------------- |
| *****                         | Any string ot zero or more characters.                                                                         |
| **?**                         | Any single character.                                                                                          |
| **\[abc]**                    | Any one character in the enclosed class (between the square brackets).                                         |
| **\[!abc...]**                | Any one character not in the enclosed class.                                                                   |
| **\[^abc...]<br>ex: \[^a-c]** | Any one character not in the enclosed class.                                                                   |
| **\[[:alpha:]]**              | Any alphabetic character.                                                                                      |
| **\[[:lower:]]**              | Any lowercase character.                                                                                       |
| **\[[:upper:]]**              | Any uppercase character.                                                                                       |
| **\[[:alnum:]]**              | Any alphabetic character or digit.                                                                             |
| **\[[:punct:]]**              | Any printable character not a space or alphanumeric.                                                           |
| **\[[:digit:]]**              | Any Single digit from O to 9.                                                                                  |
| **\[[:space:]]**              | Any single white space character. This may include tabs. newlines.<br>carriage returns. form feeds. or spaces. |

##### grep command

```Bash
-l   # if the pattern is matched, disply the filename 
-i   # case insensitive
-w   # search with the exact word 
-n   # number the lines
-A3  # Display 3 lines after the regular expression match. 
-B3  # Display 3 lines before the regular expression match.
-r   # recursive
-v   # reverse
-e   # Used for multiple search atterns
```

##### cut & tr command

**cut command**: used for **cutting out the sections** **from each line of files** and writing the result to standard output.

**tr command**: is a utility for **translating or deleting characters**. It supports a range of transformations including uppercase to lowercase.

```Bash
echo hello world | tr a-z AZ
echo hello world | tr [a-z] [A-Z]
echo hello world | tr [:lower:] [:upper:]
echo "Welcome To Linux" | tr -d 'W'
echo "my ID is 73535" | tr -d [:digit:]
```

### CH04_Getting Help in Red Hat Enterprise Linux

**One source of documentation** that is generally available **on the local system** are system manual pages or man pages.
These pages are **shipped as part of the software packages** for which they provide documentation, and **can be accessed** from the command line by using the **man** command.

#### Common Sections of the Linux Manual

---
> **NOTE!**: the 1, 5, 8 are the most frequented section for system administrators

| SECTION | CONTENT                                                             |
| ------- | ------------------------------------------------------------------- |
| **1**   | User commands (both executable and shell programs)                  |
| 2       | System calls (kernel routines invoked from user space)              |
| 3       | Library functions (provided by program libraries)                   |
| 4       | Special files (such as device files)                                |
| **5**   | File formats (for many configuration files and structures)          |
| 6       | Games (historical section for amusing programs)                     |
| 7       | Conventions, standards, and miscellaneous (protocols, file systems) |
| **8**   | System administration and privileged commands (maintenance tasks)   |
| 9       | Linux kernel API (internal kernel calls)                            |

#### manual page sections

---

| HEADING         | DESCRIPTION                                                            |
| --------------- | ---------------------------------------------------------------------- |
| **NAME**        | Subject name. Usually a command or file name. Very brief description.  |
| **SYNOPSIS**    | Summary of the command syntax.                                         |
| **DESCRIPTION** | In-depth description to provide a basic understanding of the topic.    |
| **OPTIONS**     | Explanation of the command execution options.                          |
| **EXAMPLES**    | Examples Of how to use the command, function, or file.                 |
| **FILES**       | A list of files and directories related to the man page.               |
| **SEE ALSO**    | Related information. normally other man page topics.                   |
| **BUGS**        | Known bugs in the software.                                            |
| **AUTHOR**      | Information about who has contributed to the development of the topic. |

#### Notes

---

- to search for a pattern in Manual Page: `man -K "PATTERN"`
- **which** & **whereis** command are useful to get the man page locations of any binary
- **--help** option: get less info than manual page. ex: `ls --help`

#### Another documentations to get help

- RadHat online docs ==>  <https://docs.redhat.com/en/documentation/red_hat_enterprise_linux/>
- [The Linux Documentation Project](https://tldp.org/)
- Documentations in `/usr/share/doc`, recommended to be opened in a browser.

### CH05_Creating, Viewing, and Editing Text Files

Save command output or errors to a file with shell redirection, and process command output
through multiple command-line programs with pipes.

Create and edit text files using the Vim editor.

use shell variables to help run commands. and edit Bash startup scripts to set shell and environment variables to modify the behavior of the shell and programs run from the shell.

#### Input Output Redirection

![image_11](</images/articles/redhat_sysadmin/Pasted image 20250816141254.png>)

![image_12](</images/articles/redhat_sysadmin/Pasted image 20250816141403.png>)

##### some examples for redirection

```Bash
date > date.txt
cal >> date.txt
ls sdfghjdfgh 2>errors.txt 
find / -name passwd 1>output.txt 2>/dev/null 
who >> users.txt
who >> users.txt | cat users.txt | wc -l >> users_numbers.txt | cat users_numbers.txt
```

#### Constructing Pipelines

![image_13](</images/articles/redhat_sysadmin/Pasted image 20250816145422.png>)

![image_14](</images/articles/redhat_sysadmin/Pasted image 20250816150037.png>)

##### the Difference between Redirection & Pipeline

- **Redirection** ==> save the output into a file
- **Pipelines**     ==> the output is as input to the next process

##### some examples for pipelines and redirection

```Bash
ls -lR / 2>/dev/null | wc -l  # get No. of files in the system
ls -lR /etc/ | wc -l    # get No. of all files under /etc 
ls -l /etc/ | wc -l           
   # get No. of files & folders under /etc (not all files in /etc) 
ls -l /usr/bin/ | wc -l       # get No. of binaries in your system
ls -l /usr/bin/ | less        # navigate the output as pages 
ls -ltr /etc | tail -n 10 > output.txt     
   # get the latest modified 10 files or folders in /etc
```

#### VIM text editor

![image_15](</images/articles/redhat_sysadmin/Pasted image 20250816153511.png>)

##### Vim operating modes

![image_16](</images/articles/redhat_sysadmin/Pasted image 20250816153407.png>)

##### Command Mode

```Bash
yy     # copy a line
3yy    # Copy three lines.                            
dd     # Cut a line                                   
p      # Paste after the current cursor.              
P      # Paste before the current cursor.(Upper case) 
/      # To search forward                            
?      # To search backward                           
n      # Find the next match
N      # Find the previous match   
ZZ     # save & exit
```

##### Insert Mode

```Bash
i     # insert (switches vim to insert mode)
a     # append (moves the cursor after the current character and enters insert mode)
I     # moves the cursor to the beginning of the line and enters insert mode 
A     # moves the cursor to the end of the line and enters insert mod
o     # inserts a new line below the current line and enters insert mode on the new line
O     # inserts a new line above the current line and enters insert mode on the new line
```

##### Extended Mode

###### Saving Files

```Bash
:wq    # Save and quit the current file.
:x     # Save the current file if there are unsaved changes, then quit
:w     # Save the current file and remain in editor.
:q     # Quit the current file (only if there are no unsaved changes).
:q!    # Quit the current file, ignoring any unsaved changes.
:10    # Jump to line number 10.
```

###### Search & Replace

```Bash
# this syntax for replacing every occurence of a string in the entire text
:%s/old/new/g   
```

###### Execute a command in vim

```Bash
:.!date   # execute date command at the current cursor position
:3!date   # execute date command at the third line
```

###### Vim options

```Bash
:set number    # enables line numbers
:set nonumber  # disables line numbers
```

##### Visual Mode

The visually identified text can be deleted, copied, changed, or modified with any other Vim
editing command.

###### There are 3 keystrokes

- Character mode: **v**  ---> **VISUAL** will appear at the **bottom** of the screen.
- Line mode: **Shift+V** ---> **VISUAL LINE** will appear at the **bottom** of the screen.
- Block mode: **Ctrl+V** ---> **VISUAL BLOCK** will appear at the **bottom** of the screen.

###### Visual mode options

```Bash
d            # delete the text 
y            # copy the text
u            # undo and start again
. or ctrl+r  # redo  
p            # paste the text 
c            # change the highlighted text. 
# The highlighted text will disappear,and you will be in Insert mode where you can add new text
```

##### Vim Cheat sheet

- [Vim Cheat Sheet](https://vim.rtorr.com/)
- [Vim cheatsheet](https://devhints.io/vim)
- [VIM Cheatsheet - Interactive Guide to VIM Commands](https://www.vim.ninja/cheatsheet)
- [A Great Vim Cheat Sheet](https://vimsheet.com/)

![image_17](</images/articles/redhat_sysadmin/Pasted image 20250817044854.png>)

#### Variables in Linux

- ##### User Defined Variables

- ##### Shell Variables

##### User Defined Variables

$VariableName = VALUE$

```Bash
[user@host~]$ x = 15 
[user@host~]$ echo $x 

[user@host~]$ y = 10
[user@host~]$ echo "x + y = $[x + y]"
25

[user@host~]$ first_name="mahmoud" 
[user@host~]$ last_name="abdelnaby"
[user@host~]$ echo "Hello ${first_name} ${last_name}"
Hello mahmoud abdelnaby

```

**Note**:

- if you set a variable in a shell, then you run a child shell,,,, this will be the result:  

![image_18](</images/articles/redhat_sysadmin/redhat00.png>)

- so, sure to export the variable

![image_19](</images/articles/redhat_sysadmin/redhat10.png>)

##### Shell Variables

run **set** command to show all shell variables: `set | less`

![image_20](</images/articles/redhat_sysadmin/Pasted image 20250817074506.png>)

for example, we edit **PS1** variable. **PS1** variable has the shell format, all editing reset when start a new shell.
![image_21](</images/articles/redhat_sysadmin/redhat8.png>)

###### **PATH** variable

Contains a list of colon separated directories that contain programs:

if we have a script execute some commands like this:

```Vim
date

cal

whoami
hostname
pwd
```

![image_22](</images/articles/redhat_sysadmin/Pasted image 20250817083041.png>)

![image_23](</images/articles/redhat_sysadmin/Pasted image 20250817083534.png>)

##### remove or unexport a variable

- **unset** command
 ![image_24](</images/articles/redhat_sysadmin/Pasted image 20250817084215.png>)

- **unexport** command: `export -n <VAR_NAME>`

##### Setting Variables Automatically

- You can edit the Bash startup scripts.
- These exact scripts that run depend on how the shell was started, whether it is an interactive login shell, an interactive non-login shell, or a shell script.
- Assuming the default **/etc/profile**, **/etc/bashrc**, and **~/.bash_profile** files,
  if you want to make a change to your user account that affects all your interactive shell prompts at startup, edit your **~/.bashrc** file.
- For example, you could set that account's default editor to nano by editing the file to read:

```Bash
# .bashrc
# Source global definitions

if [ -f /etc/bashrc ]; then
  . /etc/bashrc
fi

# User specific environment
PATH=$HOME/.local/bin:$HOME/bin:$PATH "
export PATH
```

### CH06_Managing Local Users and Groups

- There are three main types of user account: the **superuser**, **system users**, and **regular users**.
- A user **must have a primary group** and may be a member of **one or more supplementary groups**.
- The three critical files containing user and group information are
  **/etc/passwd**, **/etc/group**, and **/etc/shadow**.
- The **su** and sudo commands can be used to run commands as the superuser.
- The **useradd**, **usermod**, and **userdel** commands can be used to manage users.
- The **groupadd**, **groupmod**, and **groupdel** commands can be used to manage groups.
- The **chage** command can be used to configure and view password expiration settings for users.

#### User Identifier UID

**/etc/login.defs**

- use **id** to show user ID

to show all users on the system, cat this file **/etc/passwd**

```Bash
# the Formula of /etc/passwd lines 
username:Encrypted_password:UID:GID:real_name:home_directory:available_shell

# examples:
root:x:0:0:root:/root:/bin/bash

#   root ---> username
#   x ---> a symbol for encrypted password kept in /etc/shaodw file 
#   0 ---> UID
#   0 ---> GID
#   root ---> real username
#   /root ---> home directory for this user  
#   /bin/bash ---> The default shell program for this user, which runs on login
```

>**Note!**
>A system user might use **/sbin/nologin** if interactive logins are not allowed for that user.

#### Group ID GID

- Groups can be used to grant access to files to a set of users instead of just a single user.
- Internally, the system distinguishes groups by the unique identification number assigned to them, the group ID or GID.
- The mapping of group names to GIDs is defined in databases of group account information.
- By default, systems use the **/etc/group** file to store information about local groups.

![image_25](</images/articles/redhat_sysadmin/Pasted image 20250818210133.png>)

##### Primary Groups & Supplementary Groups

- When you create a new regular user, a new group with the same name as that user is created. That group is used **as the primary group for the new user**, and that user is the only member of this User Private Group.
- Users may also have supplementary groups. Membership in supplementary groups is determined by the **/etc/group** file. Users are granted access to files based on whether any of their groups have access.
- It doesn't matter if the group or groups that have access are primary or supplementary for the user.

For example, if the user user01 has:

- a primary group user01
- supplementary groups **wheel** and **webadmin**,
then that user can read files readable by any of those three groups.

to switch between users, use **su** command: `su username`  **OR**  `su - username`

- `su username` : Switches to **that user**.
  But it **keeps the current environment** (your PATH, variables, shell, etc.).
  You’re just switching the effective UID, not loading a full login shell.

- `su - username` :    Switches to **that user** **AND** starts a _login shell_ (**logging in as that user**)
  Loads the user’s environment (`~/.bash_profile`, `~/.bashrc`, etc.),
  Sets `HOME` to that user’s home directory,
  Updates PATH to that user’s default,

```Bash
# some examples:  

su root     # OR (su  ) without username, it dierctly switchs to root user without root's environment(root's PATH, variables, shell, etc.)

su - root   # switches to that user AND starts a login shell as root with all root's setup and environment
 
```

![image_26](</images/articles/redhat_sysadmin/Pasted image 20250821163929.png>)

![image_27](</images/articles/redhat_sysadmin/redhat_1.png>)

#### SUDO permissions

In some cases, the root user's account **may not have a valid password** at all for security reasons.
So, **users cannot log in** to the system **as root directly with a password**, and **su** cannot be used to get an interactive shell.
One tool that can be used to get root access in this case is **sudo**.

Unlike su, **sudo** normally requires users to **enter their own password for authentication**, not the password of the user account they are trying to access.
That is, users who use sudo to run commands as root do not need to know the root password. Instead, they use their own passwords to authenticate access.

> NOTE!!
  If a user tries to run a command as another user, and the sudo configuration does not permit it, the
  command will be blocked, the attempt will be logged, and by default an email will be sent to the root user.

For example,

- when sudo is configured to allow a user to run the command **useradd** as root, this user could run the following command to create a new user account:
 ![image_28](</images/articles/redhat_sysadmin/Pasted image 20250821173127.png>)

#### Grant Super user access

this section illustrates how we set a user to run commands as root using sudo.

- The **main configuration** file for **sudo** is **/etc/sudoers**.
- To avoid problems if multiple administrators try to edit it at the same time, it should only be edited with the special **visudo** command.

- the following figure from the **/etc/sudoers** file enables sudo access for members of group wheel.
 ![image_29](</images/articles/redhat_sysadmin/red2 1.png>)

```Mathematica
root    ALL=(ALL)     ALL 
  │      │    │        │   
  │      │    │        └─────> specify command list (ALL = any commands)  
  │      │    └─────> specify Run-as list  (ALL = run as any user)        
  │      └─────> specify host that the user can run the commands on
  └─────> username, if we set for a group naming wheelas an ex. --> %wheel 
```

##### Examples

###### Restrict to specific host

```Bash
ramy  server1=(root)   /usr/bin/systemctl restart nginx

# On host server1 only, ramy can restart nginx as root:
sudo systemctl restart nginx
```

###### Restrict run-as user

```Bash
khaled ALL=(postgres)  /usr/bin/psql

# khaled can only run /usr/bin/psql as the postgres user.
sudo -u postgres psql 
```

###### Multiple commands, root only

```Bash
ahmed  ALL=(root)  /usr/bin/systemctl restart httpd, /usr/bin/systemctl status httpd

# ahmed can restart Apache and check its status, but nothing else.
sudo systemctl restart httpd
sudo systemctl status httpd
```

###### Different hosts with different permissions

```Bash
david   webserver=(root)       /usr/bin/systemctl restart nginx
david   dbserver=(postgres)    /usr/bin/psql

# On webserver, david can restart nginx as root.  
# On dbserver, david can run psql as postgres.
sudo systemctl restart nginx  # on webserver host
sudo -u postgres psql    # on dbserver host
```

###### No password required (NOPASSWD)

```Bash
omar  ALL=(root) NOPASSWD: /usr/bin/systemctl restart sshd 

# omar can restart sshd without being asked for a password.
sudo systemctl restart sshd
```

###### Group with limited command on a specific host

```Bash
%webadmins  webserver=(root)  /usr/bin/systemctl restart nginx

# any user in group webadmins can restart nginx as root, but only on webserver.
sudo systemctl restart nginx  # for any user in webadmins group
```

###### Group running as another user (not root)

```Bash
%dba  ALL=(postgres)  /usr/bin/psql
#  Any user in group dba can run psql as the postgres user.
sudo -u postgres psql    # for any user in dba group  
```

###### Multiple allowed commands

```Bash
%devops  ALL=(root)  /usr/bin/systemctl restart httpd, /usr/bin/systemctl status httpd
# Anyone in devops can restart Apache and check its status.
```

###### Different rules for the same group on different hosts

```Bash
%ops  webserver=(root)  /usr/bin/systemctl restart nginx
%ops  dbserver=(postgres)  /usr/bin/psql
# Members of ops group can restart nginx on the webserver,  and connect to PostgreSQL as postgres on the dbserver.
```

###### NOPASSWD with a group

```Bash
%netadmins  ALL=(root) NOPASSWD: /usr/bin/systemctl restart sshd
# Members of netadmins group can restart sshd without entering a password.
```

#### CRUD operations for users

##### create a user (useradd)

```Bash
# Create a new user osman
sudo useradd osman

# Create a user with home directory and default shell
sudo useradd -m -s /bin/bash ali
```

In creating the account for osman, the useradd command performs several actions:

- Reads the **/etc/login.defs** and **/etc/default/useradd** files to **get default values** to use when creating accounts.
- **Checks command-line parameters** to find out which default values to override.
- **Creates** a new user **entry** in the **/etc/passwd** and **/etc/shadow** files based on the default values and command-line parameters.
- **Creates any new group entries** in the /etc/group file.
  (Fedora creates a group using the new user's name.)
- **Creates a home directory** based on the user's name in the /home directory.
- **Copies any files** located within the **/etc/skel** directory **to the new home directory**.
  This usually includes login and application startup scripts.

> **Note!**
> **-p passwd**: Enter a password for the account you are adding. This must be an encrypted password.
> Instead of adding an encrypted password here, you can simply use the passwd user command later to add a password for user. (**To generate** an **encrypted MD5** password, type **openssl passwd**.)

##### Read (list/check user info) (id)

```Bash
# Check user details
id osman

# Show login info from /etc/passwd
grep osman /etc/passwd
```

##### Update/Modify a user (usermod)

```Bash
# Change username
sudo usermod -l NEWNAME osman

# Change user’s home directory
sudo usermod -d NEW_HOME_DIR -m ali

# Add user to a group
sudo usermod -aG wheel ali
```

##### Delete a user (userdel)

```Bash
# Delete user but keep home directory
sudo userdel osman

# Delete user and remove home directory
sudo userdel -r ali
```

**NOTES:**

- Keep in mind that **simply removing** the user account **does not change anything about the files**
  that user **leaves** around the system (except those that are deleted when you use -r).
  However, ownership of files left behind appear as **belonging to the previous owner’s user ID** number when you run ls -l on the files.
- Because **files that are not assigned to any username** are **considered** to be **a security risk**,
  it is a good idea to find those files and assign them to a real user account.

to find all files in the filesystem that are not associated with any user (the files are listed by UID):

```Bash
find / -nouser -ls 
```

#### CRUD operations for groups

##### Create a group (groupadd)

```Bash
# Create a new group devops
sudo groupadd devops
```

##### Read (list/check group info) (getent)

```Bash
# Show group details
getent group devops

# Show all groups
getent group
```

##### Update a group (groupmod)

```Bash
# Change group name
sudo groupmod -n engineers devops

# Change group ID
sudo groupmod -g 505 engineers

# Add user ali to group engineers
sudo usermod -aG engineers ali
```

##### Delete a group

```Bash
# Remove a group
sudo groupdel engineers
```

#### managing user passwords

```Bash
# this is a line scheme in /etc/shadow file
username:password:lastchg:min:max:warn:inactive:expire:reserved

# example: 
osman:$6$abcdefg123456$Q8HzW9a...3w9X9/:19700:7:90:14:30:20000:
```

- **osman** → Username
- \$6\$abcdefg123456\$Q8HzW9a...3w9X9/ → Encrypted password (SHA-512 in this case)
- **19700** → Password last changed on day 19700 since 1970-01-01 (~2023-12-29)
- **7** → User must wait at least 7 days before changing password again
- **90** → Password expires after 90 days
- **14** → User warned 14 days before password expires
- **30** → Password still works for 30 days after expiration before account is locked
- **20000** → Account expires on day 20000 (~2024-10-11)
- **(empty)** → Reserved for future use

##### configure password aging

The following diagram relates the relevant password aging parameters, which can be
adjusted using the **chage** command to implement a password aging policy

![image_30](</images/articles/redhat_sysadmin/Pasted image 20250820005156.png>)

#### Restricting Access to User Accounts

There are situations where a user account should exist on the system but should **not be allowed to log in interactively**. RHEL provides two common ways to restrict access:

- ##### Locking an Account

- ##### Using the _nologin_ Shell

##### Locking an Account

```Bash
usermod -L USERNAME
# This prevents the user from logging in with their password, but the account itself still exists (useful for temporary disabling).

usermod -U USERNAME  # to unlock this user
```

##### Using the _nologin_ Shell

The **`/sbin/nologin`** shell acts as a replacement shell for accounts not intended to log in interactively.

- Best practice for accounts that serve system roles but don’t need interactive login (e.g., mail server accounts).
- When the user attempts to log in, the **connection is closed immediately**.

For example:

![image_31](</images/articles/redhat_sysadmin/Pasted image 20250821205303.png>)

### CH07_ Controlling Access to Files

Set Linux file-system permissions on files and to interpret the security effects of different permission settings.

#### Linux File-system Permission

- File permissions control access to files. The Linux file permissions system is simple but flexible, which makes it easy to understand and apply, yet still able to handle most normal permission cases easily.
- Files have three categories of user to which permissions apply. The file is owned by a user, normally the one who created the file. The file is also owned by a single group, usually the primary group of the user who created the file, but this can be changed.
- Different permissions can be set for the owning user, the owning group, and for all other users on the system that are not the user or a member of the owning group.
- Three categories of permissions apply: read, write, and execute.

##### Permissions on Files & Directories

| PERMISSION  | EFFECTS ON **FILES**                 | EFFECTS ON **DIRECTORIES**                                                                                                                                                |
| :---------: | ------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
|  r (read)   | Contents of the file can be read.    | Contents of the directory (the file<br>names) can be listed.                                                                                                              |
|  w (write)  | Contents of the file can be changed. | Any file in the directory can be created<br>or deleted.                                                                                                                   |
| x (execute) | Files can be executed as commands.   | Contents of the directory can be accessed. (You can change into the directory, read information about its files, and access its files if the files permissions allow it.) |

##### View file & Directory permissions and ownership

use this command: `ls -ld`

![image_32](</images/articles/redhat_sysadmin/Pasted image 20250820130634.png>)

- Each file has an owner
- Each file is assigned to a group
- Permissions can only be changed by the owner and root

#### change permissions of files & Directories

##### Symbolic Method

---
**Examples**

```Bash
chmod g+w filel
chmod o+w filel
chmod u-w filel
chmod u+w,g+wx,o+r filel
chmod go-rw filel
chmod u=rw,g=r,o=r filel
chmod a=x filel   # OR chmod ugo=x file1 
chmod a=rw filel  # OR chmod ugo=rw file1
chmod u= filel    # remove all permissions from owner
chmod a=- filel    # OR chmod a= file1 (remove all permissions from all)
chmod +rw filel
chmod =rw filel   # OR chmod a=rw file1
chmod -R g+rwx dirl
chmod -R o+rwx dirl
chmod -R o=- dirl
```

##### Numeric Method

---

| DECIMAL | OCTAL | REPRESENTATION |
| :-----: | :---: | :------------: |
|  **0**  |  000  |    **---**     |
|  **1**  |  001  |    **--x**     |
|  **2**  |  010  |    **-w-**     |
|  **3**  |  011  |    **-wx**     |
|  **4**  |  100  |    **r--**     |
|  **5**  |  101  |    **r-x**     |
|  **6**  |  110  |    **rw-**     |
|  **7**  |  111  |    **rwx**     |

```mathematica
## Example
chmod 745 file1   ## rwx r-- r-x
      ││└─────> others permissions = 5 = 101 = r-x
      │└──────> group permissions  = 4 = 100 = r--
      └───────> owner permissions  = 7 = 111 = rwx   
```

##### Requires Permissions for most common commands

| **Commands** | **Source Directory** | **Source File** | **Target Directory** |
| :----------: | :------------------: | :-------------: | :------------------: |
|      cd      |          x           |       N/A       |         N/A          |
|      ls      |        x , r         |       N/A       |         N/A          |
| mkdir, rmdir |        x , w         |       N/A       |         N/A          |
|  cat, less   |          x           |        r        |         N/A          |
|      cp      |          x           |        r        |        x , w         |
|    cp -r     |        x , r         |        r        |        x , w         |
|      mv      |        x , w         |    none !!!     |        x , w         |
|      vi      |        x , r         |      r , w      |         N/A          |
|      rm      |        x , w         |    none !!!     |         N/A          |

#### change file & directory ownership

- **Only root** can change the ownership of a file.
- **Root or the files owner** can change group ownership.
- we use **chown**, **chgrp** to change the ownership

##### some Examples

```Bash
# chown OWNER_NAME:GROUP_NAME file

chown mahmoud filel         # change file owner
chown mahmoud dirl          # change directory owner 
chown mahmoud:devops_team file1
chown :devops_team file1    # change group ownership for a file
chown -R mahmoud dirl       # change owner of a directory and its contents 
chown -R mahmoud:devops_team dirl # change user&group ownership for a directory and its content
```

#### Set Special Permissions

Special permissions provide additional access-related features over and above what the basic permission types allow.

##### why set special permissions??

we pick an example to understand...

- when you change your password using **passwd** command,
  the new password is updated into **/etc/shadow** file.
- **/etc/shadow** file is a critical file, which is under root control ONLY.
  which meaning that, you haven't write permissions to update your password in this file
- So, **how** you **change** your password and **update the new password** into **/etc/shadow** file **Although** you **haven't write permissions** to update your password ?!

**passwd** command has set permission, which meaning the user running this command has the root permission to write into **/etc/shadow** file.

##### effects of set special permissions for files & directories

| SPECIAL PERMISSION | EFFECT ON FILES                                                                   | EFFECT ON DIRECTORIES                                                                                                                          |
| :----------------: | --------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------- |
|   **u+s (suid)**   | File **executes as the user that owns the file**, not the user that run the file. | No effect.                                                                                                                                     |
|   **g+s (sgid)**   | File **executes as the group that owns the file**.                                | Files newly created in the directory have their group owner set to match the group owner of the directory.                                     |
|  **o+t (sticky)**  | No effect.                                                                        | Users with write access to the directory can only remove files that they own; they cannot remove or force saves to files owned by other users. |

##### setting special permissions

- **Symbolically**:
  - setuid = u+s
  - setgid g+s
  - sticky = 0+t
- **Numerically** (fourth preceding digit):
  - setuid = 4
  - setgid = 2
  - sticky = 1

```Bash
chmod g+s directory    # add setgid for a directory
chmod 2770 directory   # add setgid for a directory with rwx permissions for the user and group with no access for others
```

#### Default Permissions

When you create a new file or directory, it is assigned initial permissions.
There are two things that affect these initial permissions.

- The first is whether you are creating a regular file or a directory.
- The second is the current umask.

##### umask command  

- **umask** (User File-Creation Mode Mask) defines the **default permissions** for newly created files and directories.
- It **removes** (masks) permissions from the system’s default permissions

###### Default Behavior

- By default, Linux assigns:
  - **Files** → `666` (read & write for everyone, no execute)
  - **Directories** → `777` (read, write, execute for everyone)
- Then the **umask value is subtracted (bitwise)** from these defaults.
- **Effective Permission = Default Permission - umask**
  - Default file = `666`, umask = `022` → **644** (`rw-r--r--`).
    - Default dir = `777`, umask = `022` → **755** (`rwxr-xr-x`).

###### Notes

- The system's default umask values for Bash shell users are defined in the **/etc/profile** and **/etc/bashrc** files for services in **/etc/login.defs**
- **any change** for a user umask is a **temporary change**, all is reset to defaults after exit shell.
  to **change umask permanently**, you can override the system defaults in the **.bash_profile** and **.bashrc** files in their home directories.  
  - `echo "umask 007" >> ~/.bachrc`, then logout and login again

###### common examples

| umask                           | File Default (666 - umask) | Dir Default (777 - umask) |
| :------------------------------ | :------------------------: | :-----------------------: |
| `0000`                          |     666 → `rw-rw-rw-`      |     777 → `rwxrwxrwx`     |
| `0022` (common)                 |     644 → `rw-r--r--`      |     755 → `rwxr-xr-x`     |
| `0002` (for collaborative dirs) |     664 → `rw-rw-r--`      |     775 → `rwxrwxr-x`     |
| `0077` (restrictive)            |     600 → `rw-------`      |     700 → `rwx------`     |

### CH08_Monitoring and Managing Linux Processes

A process is a running instance of a launched, executable program.
Every new process is assigned a unique process ID (PID) for tracking and security.
The PID and the parent's process ID (PPID) are elements of the new process environment.
Any process may create a child process.

#### Listing Processes

The **ps** command is used for **listing current processes**.
 It can provide detailed process information, including:

- **User identification (UID)**, which determines process privileges.
- Unique process identification (**PID**)
- **CPU and real time** already expended
- **How much memory** the process has allocated in various locations
- The location of process **stdout**, known as the **controlling terminal**
- The **current process state**

##### Viewing Processes with `ps`

Common Options for `ps`

- **ps aux**  → Displays **all processes**, including those without a controlling terminal.
- **ps lax**   → Provides **more technical detail** (extra columns).
- **ps -ef**   → Displays **all processes** (UNIX-style syntax, commonly used in scripts)
- **ps axo**  → lets you **customize output columns**.
  ex: `ps axo user,pid,ni,command`

Notes

- **ps** displays the process list **once**. so, If you need a **real-time updating view**, use: **top** command
- you can view processes in **tree format** to see parent-child relationships using **pstree** command
- **PID 1** → `systemd` (the very first process started by the kernel).
  on older systems like **RHEL 6**, this was `initd`.

##### to display processes in tree format

```Bash
pstree       # process status tree
ps fax       # process status tree   
pstree -p    # Display PID of each process
pstree -p USERNAME     # Display PID of each process of this user 
pgrep -u USERNAME -l   # Show processes of this user
```

#### manage foreground & background processes

##### what is Control Jobs?

- Job control is a **shell feature** that allows a single shell instance to run and manage multiple commands.
- **Key rules of job control**:
  - Only **one job** at a time can read input and receive keyboard signals from a terminal,
       this is the **foreground job**.
  - Other jobs attached to the same terminal but not in the foreground are **background jobs**.
  - Background jobs **cannot read input or receive keyboard interrupts**, but they may write output to the terminal.
  - If a background job tries to read from the terminal, it is **automatically suspended**.
  - Each terminal session can have:
    - **1 foreground job**
    - **0 or more background jobs**

- **Foreground** jobs = **interact directly** with the terminal (can **take input**).
- **Background** jobs = **cannot take input**, but can run or write output.
  - to make a command in background directly, type **&** at the end of command
   ex: `sleep 1000 &`

##### Monitoring Jobs

```Bash
jobs   # to list jobs managed by the current shell  
ps j   # alternative view with process information
```

##### Moving Jobs Between Foreground and Background

```Bash
# to bring a background job → foreground
fg %JOB_ID  

# to Send a foreground job → background
ctrl+z       # suspend the running job
bg %JOB_ID   # resume it in the background 
```

#### Killing a Processes

**kill** command **sends a signal to a process by PID number**.
Despite its name, the kill command can be used for sending any signal, not just those for terminating programs.
to list the names and numbers of all available signals: use the `kill -l` command

```Bash
kill -l      # List all signals
pidof PROCESS_NAME    # get PID of a process     
kill PID   # Default is SIGTERM 15
pkill PROCESS_NAME
killall PROCESS_NAME   # terminate all processes of this process name
pkill -U user   # kill processes of specific user
```

##### NOTES!! (most common signals)

- `kill -15`  to terminate the process cleanly
- `kill -9`  aggressive termination (used in emergency termination but not recommended !)
- `kill -1`  (**SIGHUB**) to reload an re-read the configurations (configuration reload without termination)
  OR use this command `systemctl SERVICE_NAME`

##### Logging Users Out Administratively

You may need to log other users off for any of a variety of reasons. To name a few of the many possibilities:

- the user committed a **security violation**.
- the user may have **overused resources**.
- the user may **have an unresponsive system**.
- the user has **improper access to materials**.

In these cases, you may need to administratively terminate their session using signals.
Firstly,  **identify the PID numbers to be killed** using **pgrep**.

```Bash
pgrep -l -u USERNAME
pkill -SIGKILL -u USERNAME
```

###### Note

- **pgrep** operates much like **pkill**, including using the same options, except that **pgrep** lists processes rather than killing them.
- **pkill**
 **kill processes by name or attribute** instead of by PID.
 It is part of the **procps** package (same family as `ps`, `top`, `pgrep`).
  - saves you from looking up PIDs manually with `ps` or `pgrep`.
  - Faster than `kill` because you don’t need the PID.
  - Useful for stopping multiple processes of the same program at once.
  - Often used in **system administration scripts** to manage daemons/services.

#### real-time processes monitoring

**top** program is a **dynamic view of the system's processes**.

```Bash
top
top -n 2  # Specifies the maximum number of iterations, or frames, top should produce before ending.
top -d 2  # Number of second between each update (the delay between screen updates)
```

> **Note!**
> **lsof** -->  Lists all opened files and processes accessing them in the provided directory.
> it's useful to check which processes are preventing successful unmounting.

##### common keystrokes in top (type the option during monitoring)

| TYPE THIS OPTION | DESCRIPTION                                                               |
| :--------------: | ------------------------------------------------------------------------- |
|      **1**       | to **show all cpu cores**                                                 |
|      **s**       | to **change the default refresh** rate which is 3 seconds                 |
|      **h**       | for **help**                                                              |
|      **k**       | to **kill a process**                                                     |
|      **r**       | to **renice a process**                                                   |
|      **M**       | to change the display to **sort by** the amount of **memory**             |
|      **P**       | to change the display to **sort by** the **CPU utilization**              |
|      **n**       | to change the **number of processes shown**                               |
|      **w**       | to **save current display configuration**                                 |
|      **q**       | to **quit**                                                               |
|      ? or H      | Help for interactive keystrokes.                                          |
|     L, T, M      | Toggles for load. threads. and memory header lines.                       |
|        B         | Enables use of bold in display, in the header. and for Running processes. |
|     Shift+H      | Toggle threads: show process summary or individual threads.               |
|    U, Shift+U    | Filter for any user name (effective, real).                               |

#### Linux process scheduling and multitasking

- Linux (and other operating systems) can run more processes is by employing a technique called **time-slicing**.
- The part of the Linux kernel that performs switching btw. processes is called the **process scheduler**.
- There are exactly **40** different **levels of niceness** a process can have (**-20 to 19**).
- By default, **processes** will **inherit their nice level from their parent**, **which is usuall 0**.
- **Higher** nice **levels** indicate **less priority**, while **lower** nice **levels** indicate a **higher priority**.
  - -20 ===> is the highest priority
  - 19 ===> is the lowest priority
- **Only root** is allowed to **set all nice level** on existing processes.
- **Un privileged users** are only allowed to **set positive nice levels**, and they are only allowed to raise the nice level on their existing process but cannot lower them.
  ex: a regular user can set 5 to 7. But can't set 7 to 5 or any higher priority (6,5,4,3,2,....,-20)

- we can set priority for a process using **nice & renice** commands  

##### nice command

- used to **start a process with a given priority**.
- Default is **0**.

example:

```Bash
# nice COMMAND

nice vim text & # default 10,  
nice -n -20 vim text &  # -n to set priority  
```

##### renice command

- used to **change the priority of an already running process**.
- you can change priority from **top**, using **r** option.

example:

```Bash
# renice PRIORITY PID   
renice 19 1220   # set priority 19 for process with ID 1220
```

### CH09_Controlling Services and Daemons

#### Intro to systemd

- In **Red Hat Enterprise Linux**, the **first process that starts (PID 1)** is `systemd`.
- The `systemd` daemon is responsible for:
  - Managing system startup
  - Starting and supervising services
  - Activating system resources, daemons, and processes both at boot time and while the system is running

#### systemctl

##### Listing Service Units

use the `systemctl` command to **explore the current state of the system**.

- `--all` → list all service units, including inactive ones
- `--state=` → filter results by **LOAD**, **ACTIVE**, or **SUB** fields

```Bash
# List active service units (default behavior)
systemctl list-units --type=service  

# List all active and inactive services
systemctl list-units --type=service --all  

# List only failed services
systemctl --failed --type=service
```

##### view service status

```Bash
systemctl status name.type    # check  the status of a specific unit

# example: Check SSH service status
systemctl status sshd.service   
##### SCREEEEN HERE
```

> **NOTE!!**: if the unit type is not specified, systemctl assumes service.

##### Verify the Status of a service

The **systemctl** command provides methods for **verifying the specific status of a service**.

```Bash
systemctl is-active sshd.service     # active or inactive 
systemctl is-enabled sshd.service    # enable or disable  
systemctl is-failed sshd.service     # active or failed
systemctl --failed --type=service    # to list all the failed units
```

##### list unit dependency

```Bash
# command displays a hierarchy mapping of dependencies to start the service unit.
systemctl list-dependencies UNIT 

# For example
systemctl list-dependencies sshd.service
```

#### Service Unit Information

|    FIELD     | DESCRIPTION                                                                             |
| :----------: | --------------------------------------------------------------------------------------- |
|  **Loaded**  | Whether the service unit is **loaded into<br>memory.**                                  |
|  **Active**  | Whether the service unit **is running** and if so,<br>**how long** it has been running. |
| **Main PID** | The main process ID of the service. <br>including the command name.                     |
|  **Status**  | **Additional information** about the service.                                           |

#### Service state in the output of systemctl

|       KEYWORD        | DESCRIPTION                                                             |
| :------------------: | ----------------------------------------------------------------------- |
|      **loaded**      | Unit configuration file has been processed.                             |
| **active (running)** | Running with one or more continuing processes.                          |
| **active (exited)**  | Successfully completed a one-time configuration.                        |
| **active (waiting)** | Running but waiting for an event.                                       |
|     **inactive**     | Not running.                                                            |
|     **enabled**      | Is started at boot time.                                                |
|     **disabled**     | Is not set to be started at time.                                       |
|      **static**      | Cannot be enabled. but may be started by an enabled unit automatically. |

#### Control system services

| COMMAND                              | TASK                                                                           |
| ------------------------------------ | ------------------------------------------------------------------------------ |
| **systemctl status UNIT<br>**        | View detailed information about a unit state.                                  |
| **systemctl stop UNIT**              | Stop a service on a running system.                                            |
| **systemctl start UNIT**             | Start a service on a running system.                                           |
| **systemctl restart UNIT**           | Restart a service on a running system.                                         |
| **systemctl reload UNIT**            | Reload the configuration file of a running<br>service.                         |
| **systemctl mask UNIT**              | Completely disable a service from being<br>started. both manually and at boot. |
| **systemctl unmask UNIT**            | Make a masked service available.                                               |
| **systemctl enable UNIT**            | Configure a service to start at boot time.                                     |
| **systemctl disable UNIT**           | Disable a service from starting at boot time.                                  |
| **systemctl list-dependencies UNIT** | List units required and wanted by the specified unit.                          |

### CH10_Configuring and Securing SSH

#### Access the Remote Command Line with SSH

**OpenSSH** is an open-source implementation of the **Secure Shell (SSH)** protocol, which is widely used in **Red Hat Enterprise Linux (RHEL)** systems.  
SSH provides **secure, encrypted communication** over insecure networks such as the internet.

##### How SSH Works (Key Points)

- SSH encrypts all data exchanged between systems, including passwords.
- The **first time** a user connects to a remote host via SSH, the **server’s public key** is stored in the file:  `~/.ssh/known_hosts`
- This helps protect against **man-in-the-middle (MITM)** attacks in future connections by verifying the server’s identity.

![image_33](</images/articles/redhat_sysadmin/Pasted image 20250823201429.png>)

##### Secure shell examples

The following command initiates a **remote login session** using SSH:

```Bash
[user01@host ~]$ ssh user02@remotehost 
user02@remotehost's password: shadowman 
...output omitted... 
[user02@remotehost ~]$
```

- Connects as user `user02` to host `remotehost`.
- Prompts for the **remote user’s password**.
- Upon success, opens an **interactive shell** on the remote machine.

This command runs a **single command remotely** without opening a shell:

```Bash
[student@serverA ~]$ ssh student@serverB hostname
student@serverB's password: student
serverb.lab.example.com
```

- Connects to `serverB` as user `student`.
- Executes the `hostname` command.
- Displays the remote system’s hostname and exits.

#### Configure SSH Key-based Authentication

##### SSH Authentication Methods

1. **Password Authentication**
    - The most basic method.
    - User enters a password each time they connect.
    - Easy to use but less secure (vulnerable to brute-force attacks).
2. **SSH Key-Based Authentication**
    - Uses a **private–public key pair**.
    - No need to enter a password for every login.
    - More secure and recommended for production.
3. **Host-Based Authentication**
    - The client host is trusted by the server.
    - Requires configuration of `/etc/ssh/ssh_known_hosts` and server trust.
    - Mostly used in controlled environments (e.g., clusters).
4. **Keyboard-Interactive Authentication**
    - Server prompts the user with one or more questions (like a password, OTP, or token).
    - Often used for **multi-factor authentication (MFA)**.
5. **GSSAPI Authentication** (Kerberos)
    - Uses Kerberos tickets for authentication.
    - Common in enterprise environments with centralized authentication (Active Directory, FreeIPA).

The two most common methods you’ll actually use in **RHEL administration** are:

- **Password Authentication**
- **SSH Key-Based Authentication**

##### SSH Key-Based Authentication

- Uses a **private–public key pair**.
- The **private key** stays securely on your machine.
- The **public key** is shared with the remote system.
- Authentication works when the server verifies that the client’s private key matches the stored public key.

##### How to generate SSH Keys

Use the **ssh-keygen** command to generate a key pair:

- By default, keys are stored in **/.ssh** folder in the home directory :
  - Private key → `~/.ssh/id_rsa`
  - Public key → `~/.ssh/id_rsa.pub`
- **Permissions**:
  - Private key (`id_rsa`) → `600` (only readable by the user)
  - Public key (`id_rsa.pub`) → `644` (readable by others if needed)
Correct permissions are essential, otherwise SSH may refuse to use the keys.

##### Sharing the Public Key

To enable key-based authentication, the **public key** must be copied to the **remote host**.  
The easiest way is with the `ssh-copy-id` command:

```Bash
[user@host ~]$ ssh-copy-id -i ~/.ssh/id_rsa.pub user@remotehost
```

- Copies the public key into the remote user’s `~/.ssh/authorized_keys` file.
- If the path to the public key is omitted, it defaults to `~/.ssh/id_rsa.pub`.

After this setup, you can log in without typing a password:

```Bash
[user@host ~]$ ssh user@remotehost
```

#### Customizing open SSH service configuration

##### OpenSSH Service Configuration

- The OpenSSH service is provided by the **`sshd` daemon**.
- Its main configuration file is:  `/etc/ssh/sshd_config`

##### Prohibit Root Login via SSH

- **Best practice**: Disable direct root login from remote systems to reduce security risks.
- Controlled by the **`PermitRootLogin`** parameter in `/etc/ssh/sshd_config` :
  - `PermitRootLogin yes` → Allows root login (not recommended).
  - `PermitRootLogin no` → Denies root login.
- After making changes, reload the SSH service: `systemctl reload sshd`

##### Prohibit Password-Based Authentication

- Controlled by the **`PasswordAuthentication`** parameter in `/etc/ssh/sshd_config`:
  - `PasswordAuthentication yes` → Password logins allowed (default).
  - `PasswordAuthentication no` → Password logins disabled.
    - In this case, users must log in with **SSH key-based authentication**.
- After changing the file, reload the SSH service: `systemctl reload sshd`

> **NOTE!!**: Always test a new SSH session before logging out of your current one when making changes, to avoid accidentally locking yourself out.

### CH11_Analyzing and Storing Logs

#### System Log Architecture

- Processes and the operating system kernel record a log of events.  
- Logs are used for auditing and troubleshooting.  
- Many systems store logs in text files under **/var/log**, which can be inspected using tools like **less** and **tail**.  
- In **RHEL**, log handling is done by:
  - **systemd-journald**: Manages and provides access to log files.  
  - **rsyslog**: Sorts and writes syslog messages to persistent files under **/var/log**.  

##### common log files

|       LOG FILE        | TYPE OF MESSAGES STORED                                                                                                                                                                      |
| :-------------------: | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **/var/log/messages** | Most syslog messages are logged here. <br>Exceptions include messages related to authentication and email processing, scheduled job execution, and those which are purely debugging-related. |
|  **/var/log/secure**  | Syslog messages related to **security and authentication events**.                                                                                                                           |
| **/var/log/maillog**  | Syslog messages related to the **mail server**.                                                                                                                                              |
|   **/var/log/cron**   | Syslog messages related to **scheduled job execution**.                                                                                                                                      |
| **/var/log/boot.log** | **Non-syslog console messages** related to **system startup**.                                                                                                                               |

#### Review Syslog Files

##### Overview of Syslog Priorities

| CODE | PRIORITY | SEVERITY                         |
| ---- | -------- | -------------------------------- |
| 0    | emerg    | System is unusable               |
| 1    | alert    | Action must be taken immediately |
| 2    | crit     | Critical condition               |
| 3    | err      | Non-critical error condition     |
| 4    | warning  | Warning condition                |
| 5    | notice   | Normal but significant event     |
| 6    | info     | Informational event              |
| 7    | debug    | Debugging-level message          |

##### rsyslog Configuration

- Uses **facility + priority** to decide how to handle logs.  
- Configured in **/etc/rsyslog.conf**.  

Rules section in **/etc/rsyslog.conf**:
![image_34](</images/articles/redhat_sysadmin/Pasted image 20250906080222.png>)

##### log file rotation

- **logrotate** tool prevents log files from growing too large.  
- Configured in **/etc/logrotate.conf**.  

![image_35](</images/articles/redhat_sysadmin/Pasted image 20250826200935.png>)

![image_36](</images/articles/redhat_sysadmin/Pasted image 20250906080438.png>)

##### Monitoring logs

Monitoring one or more log files for events is helpful to reproduce problems and issues,
`tail -f /path/to/file` command outputs the **last 10 lines** of the file specified and continues to output new lines in the file as they get written.

##### send Syslog messages manually

The **logger** command can **send messages to the rsyslog service**. By default, it sends the message to the user facility with the notice priority (**user.notice**) unless specified otherwise with the **-p** option. To send a message to the **rsyslog** service that gets recorded in the **/var/log/boot.log** log file and **messages** file

for example: `logger -p local7.notice "Hello,I am a Log"`
![image_37](</images/articles/redhat_sysadmin/Pasted image 20250906082016.png>)

#### Review System Journal Entries

The **journalctl** command **highlights important log messages**:
messages at **notice** or **warning** priority are in **bold text**,
while messages at the **error** priority or **higher** are in **red text**.

By default, `journalctl -n` shows the **last 10 log entries**. You can adjust this with an optional argument that specifies how many log entries to display.
For the last five log entries, run the following journalctl command: `journalctl -n 5`

```Bash
journalctl -n
journalctl -f     # Similar to `tail -f` command
journalctl -p PROIRITY_NAME    #  list journal entries at the err priority or higher
journalctl -b
journalctl --since DURATION 
journalctl _PID=PROCESS_ID
journalctl _UID=USER_ID
journalctl _SYSTEMD_UNIT=UNIT_NAME
```

##### How to make journal log file permanent?

```Bash
mkdir /var/log/journal 
chown -R root:systemd-journal /var/log/journal  
chmod g+s /var/log/journal 
vi /etc/systemd/journal.conf
# make storage parameter uncomment and evaluate (persistent) 
systemctl restart systemd-journal
```

#### Change the Timezone in Linux

##### Maintaining Time Zone

The **timedatectl** command shows an overview of the current time-related system settings, including current time, time zone, and NTP synchronization settings of the system.

```Bash
# Show system time settings:  
timedatectl
    
# List available time zones:    
timedatectl list-timezones
    
# superuser can Change system time zone:   
timedatectl set-timezone <WANTED_ZONE>
```

##### Maintaining Accurate Time

Use the **tzselect** command to determine the appropriate time zone.

```Bash
# Determine appropriate timezone:
tzselect
    
# Change system time:
timedatectl set-time 'YYYY-MM-DD HH:MM:SS'
    
# Example:
timedatectl set-time 09:00:00
```

### CH12_Managing Networking

#### Gathering Interface Information

Common tools:

- ##### `ifconfig` (deprecated, part of **net-tools**)

- ##### `ip` (modern replacement, part of **iproute2**)

```Bash
ip link show                  # Show all interfaces 
ip addr show DEVICE_NAME      # Display IP addresses 
ip -s link show DEVICE_NAME   # Display interface statistics
```

> **Note!** Use `ip` instead of `ifconfig` → `ifconfig` may not be installed in RHEL 8/9.

#### Testing Connectivity Between Hosts

```Bash
ping     # check reachability
ip route # show routing table
netstat -nr  # old tool for routing info (deprecated)
traceroute / tracepath # show path to remote host
```

> **Note!** `netstat` belongs to **net-tools** (deprecated). Use `ss` and `ip route` instead.

#### Troubleshooting Ports & Services

- TCP services use **sockets** = (IP + Protocol + Port).
- Standard ports listed in `/etc/services`.

- ##### use `ss` command (replacement for `netstat`) ---> `ss -tulnp`

   `netstat` is deprecated in RHEL 8/9.

| OPTION | DESCRIPTION                                             |
| :----: | ------------------------------------------------------- |
| **-n** | Show numbers instead of names for interfaces and ports. |
| **-t** | Show **TCP sockets**.                                   |
| **-u** | Show **UDP sockets**.                                   |
| **-l** | Show **only listening** sockets.                        |
| **-a** | Show **all** (listening and established) sockets.       |
| **-P** | Show **the processes** using the sockets.               |

#### configure network from CLI (nmcli command)

##### Configuration files

- **RHEL 8**: `/etc/sysconfig/network-scripts/ifcfg-NAME`
- **RHEL 9**: `/etc/NetworkManager/system-connections/*.nmconnection`
  (Network-scripts removed)

The old network-scripts package has been removed (it was deprecated in the RHEL 8) which means you'll not find anything in the **/etc/sysconfig/network-scripts** directory

![image_38](</images/articles/redhat_sysadmin/Pasted image 20250830182000.png>)

##### View network information

```Bash
nmcli dev status      # Status of all devices
nmcli con show        # Show all connections
nmcli con show --active   # Show only active connections
```

##### Add a network connection

**nmcli con add** command is used to add new network connections.

###### The next example

- **creates** an **static-ens224 connection** for the **ens224 device**
- with a **static IPv4** 192.168.0.5/24
- using the **IPv4 address and network prefix 192.168.0.5/24**
- and **default gateway address** 192.168.0.254
- but still **auto connects at startup** and **saves its configuration into the same file**.

```Bash
nmcli connection add con-name static-ens224 \
 type ethernet \
 ifname ens224 \
 ipv4.addresses 192.168.1.55/24 \
 gw4 192.168.1.1 \
 connection.autoconnect yes \
 ipv4.method manual
```

#### Modify Network Configuration files

**there are 3 methods:**

- #### `nmcli` → CLI tool (scriptable, fast)

- #### `nmtui` → TUI (text user interface, easier for beginners)

- #### Edit config files → manual edits in `/etc/...` then reload (`nmcli con reload`)

##### nmcli

- The `nmcli con mod NAME` command is used to **change the settings for a connection**.
- for example: to **set**:
  - **IPv4 address** to 192.0.2.2/24
  - **default gateway** to 192.0.2.254
 for the **connection static-ens3**:

```Bash
nmcli con mod static-ens3 ipv4.addresses "192.0.2.2/24 192.0.2.254"
```

##### edit the configuration file

By default, changes made with **nmcli con mod NAME** are automatically saved to:

- **/etc/sysconfig/network-scripts/ifcfg-NAME** (RHEL8)
OR
- **/etc/NetworkManager/system-connections/NAME.nmconnection** (RHEL9)

The files can also be **manually edited with a text editor**. After doing so,  **reload** the file so that
NetworkManager reads the configuration changes.

```Bash
nmcli con reload
```

#### delete a network connection

The `nmcli con del NAME` command **deletes the connection named** from the system,
disconnecting it from the device and removing the file:

- /etc/sysconfig/network-scripts/ifcfg-NAME in case of RHEL8 and removing the file
- /etc/NetworkManager/system- connections/NAME.nmconnection in case of RHEL9.

```Bash
# for example
nmcli con del ens160   
```

#### who can modify network settings??

- The root user can make any necessary network configuration changes with nmcli.
- Regular users that log in using ssh **do not have access to change network permissions** without becoming root.
- to check your current permissions

```Bash
nmcli gen permissions
```

##### regular user permissions

![image_39](</images/articles/redhat_sysadmin/Pasted image 20250831011606.png>)

##### root permissions

![image_40](</images/articles/redhat_sysadmin/Pasted image 20250831011732.png>)

#### Configure hostnames & name resolution

##### Configure hostnames

- A **static hostname** may be specified in the **/etc/hostname** file.
- The **hostnamectl** command is used to **modify /etc/hostname** and may be used to view the status of the system's fully qualified hostname.

```Bash
# for example: 
hostnamectl set-hostname host@example.com
hostnamectl status
```

##### Configure name resolution

The **DNS resolver** is used to **convert host names to IP addresses or the reverse**.
It determines where to look based on the configuration of the **/etc/nsswitch.conf** file.

By default, the contents of the **/etc/hosts** file are checked first

If an entry is **not found in the /etc/hosts** file, by default the stub resolver tries to **look up the**
**hostname** by using a DNS nameserver. The **/etc/resolv.conf** file controls how this query is performed.

###### Configure name resolution using nmcli

NetworkManager updates the **/etc/resolv.conf** file using DNS settings in the connection configuration files. Use the **nmcli** to modify the connections.

```bash
# example of set dns resolver in configuration file using nmcli 
nmcli con mod ens160 ipv4.dns 8.8.8.8
nmcli con down ens160
nmcli con up ens160
```

#### summary of common nmcli commands

| COMMAND                         | PURPOSE                                                                                   |
| :------------------------------ | ----------------------------------------------------------------------------------------- |
| **nmcli dev status**            | Show the **NetworkManager status** of all network<br>interfaces.                          |
| **nmcli con show**              | List **all connections**.                                                                 |
| **nmcli con show NAME**         | List the **current settings** for the connection name.                                    |
| **nmcli con add con-name NAME** | **Add a new connection** named NAME.                                                      |
| **nmcli con mod NAME**          | **Modify** the connection **name**.                                                       |
| **nmcli con reload NAME**       | **Reload the configuration files** <br>(useful after they have been edited by hand).      |
| **nmcli con up NAME**           | **Activate** the connection **name**.                                                     |
| **nmcli dev dis DEV_NAME**      | **Deactivate and disconnect** the **current connection** on<br>the network interface dev. |
| **nmcli con del NAME**          | **Delete** the **connection name** and its **configuration file**.                        |

### CH13_Archiving and Transferring Files

#### Managing compressed TAR Archives

Archiving and compressing files are useful when **creating backups** and **transferring data** across a network.
One of **the oldest** and **most common commands** for creating and working with backup archives is the **tar** command.

##### tar command

The tar command expects one of the three following options:

```Bash
-t, --list       # Create a new archive.
-c, --create     # Extract from an existing archive.
-x, --extract    # List the table of contents of an archive.
-v, --verbose  # Verbose. Shows which files get archived or extracted.
-f, --file=    # File name. This option must be followed by the file name of the archive to use or create.
-p, --preserve-permissions  # Preserve the permissions of files and directories when extracting an archive, without subtracting the umask.
```

##### archiving files & directories

**Some Examples**

```Bash

# creates an archive named archive.tar With the contents of file1, file2, and file3.
tar -cf archive.tar filel file2 file3 

# the same command in long version:
tar --file=archive.tar --create filel file2 file3

# create a backup of /etc 
tar -cvf etc_backup_date.tar /etc
```

![image_41](</images/articles/redhat_sysadmin/Pasted image 20250906085638.png>)

##### create compressed archive

The tar command supports **three compression methods**:

- #### gzip

- #### bzip2

- #### xz

**options to create a compressed tar archive:**

```Bash
-z, --gzip   # Use gzip compression (.tar.gz)
-j, -bzip2   # Use bzip2 compression (.tar.bz2)
-J, --XZ     # Use xz compression (.tar.xz)
```

**Note!!**

- **bzip2** typically archieves a **better** compression ratio **than** **gzip**.
- The **xz** compression typically archieves a **better** compression ratio **than bzip2**.
- it looks like:
  - xz > bzip2 > gzip
 ![image_42](</images/articles/redhat_sysadmin/Pasted image 20250906091329.png>)

##### compress & extract files using gzip, bzip2, xz

- Additionally, **gzip, bzip2**, and **xz** can be used independently **to compress single files**.
- The corresponding commands to **decompress** are **gunzip**, **bunzip2** and **unxz**.

```Bash
gzip etc.tar
bzip2 abc.tar
xz myarchive.tar

gunzip etc.tar.gz
bunzip2 abc.tar.bz2
unxz myarchive.tar.xz
```

#### Transferring Files & Directories

##### transferring files using secure copy scp

The Secure Copy command (**scp**) which is **part of the OpenSSH suite**,
**copies files** from a **remote system** to the **local system** or vise versa  

The following example demonstrates how to copy the local **/etc/yum.conf** and **/etc/hosts** files on
host, **to the remote user's home directory** on the remote host remote system:

```Bash
scp /etc/yum.conf /etc/hosts remoteuser@remotehost:/home/remoteuser
```

##### transferring files using secure file transfer program sftp

To **interactively** **upload or download files** from SSH server,
use the Secure File Transfer Program (**sftp**).

A session with the sftp command **uses** the **secure authentication** mechanism and **encrypted data**
**transfer** to and from the SSH server.

```Bash
sftp remoteuser@remotehost
remoteuser@remotehost's password: password
Connected to remotehost.
sftp>

```

### CH14_Installing and Updating Software Packages

The most important determinant of distribution quality is the packaging system and the vitality of the distribution's support community.

Package management is a method of installing and maintaining software on the system.
Today, most people can satisfy all of their software needs by installing packages from their Linux distributor. This contrasts with the early days of Linux, when one had to download and compile source code to install software. There isn’t anything wrong with compiling source code; in fact, having access to source code is the great wonder of Linux. It gives us (and everybody else) the ability to examine and improve the system. It's just that having a precompiled package is faster and easier to deal with.

In this chapter, we will look at some of the command line tools used for package manage ment. While all the major distributions provide powerful and sophisticated graphical pro grams for maintaining the system, it is important to learn about the command line pro grams, too. They can perform many tasks that are difficult (or impossible) to do with their graphical counterparts.

#### Packaging Systems

Different distributions use different packaging systems, and as a general rule,
a **package** intended for one **distribution** is **not compatible** with **another distribution**.

Most distributions fall into one of two camps of packaging technologies:

- Debian **.deb** camp
- Red Hat **.rpm** camp.
There are some important exceptions such as **Gentoo**, **Slackware**, and **Arch**, but most others use one of these two basic systems.

![image_43](</images/articles/redhat_sysadmin/Pasted image 20250901055708.png>)

#### How a Package System Works

The method of software distribution found in the proprietary software industry usually entails buying a piece of installation media such as an “install disk” or visiting a vendor's web site and downloading a product and then running an “installation wizard” to install a new application on the system.
Linux doesn't work that way. Virtually all software for a Linux system will be found on the Internet. Most of it will be provided by the distribution vendor in the form of package files, and the rest will be available in source code form that can be installed manually.

##### Package Files

**The basic unit of software in a packaging system is the package file**. A package file is a **compressed collection** **of files** that comprise the software package. A package may consist of numerous programs and data files that support the programs.

**Package files** are **created by** a person known as a **package maintainer**, often (but not always) an **employee of the distribution vendor**.
The package maintainer **gets the software in source code form** from the **upstream provider** (the author of the program), **compiles it**, and **creates** the package **metadata** and **any necessary installation scripts**. Often, the package maintainer **will apply modifications** to the **original source code** to improve the program's integration with the other parts of the Linux distribution.

##### Repositories

While some software projects choose to perform their own packaging and distribution, most packages today are created by the distribution vendors and interested third parties.
**Packages** are made **available to the users** of a distribution **in central repositories** that may **contain many thousands of packages**, each specially built and maintained for the distribution.

A distribution may maintain several different repositories for different stages of the soft ware development life cycle. For example:

- there will usually be a **(testing) repository**.
- A distribution will often have a **“(development)” repository**.
- A distribution may also have related **(third-party) repositories**.

##### Dependencies

**Programs are seldom** “standalone”; rather they **rely on the presence of other software** components to get their work done.

If a package **requires a shared resource** such as a shared library, it is **said to have a dependency**. Modern package management systems all provide some method of dependency resolution to ensure that when a package is installed, all of its dependencies are installed, too.

#### High and Low-level Package Tools

Package management systems usually consist of two types of tools:

- **Low-level** tools which **handle tasks** such as **installing** and **removing** package files.
- **High-level** tools that **perform metadata searching** and **dependency resolution**.

| Distributions                                        | Low-Level Tools | High-Level Tools       |
| ---------------------------------------------------- | --------------- | ---------------------- |
| **Debian style**                                     | **dpkg**        | **apt, apt-get, aptitude** |
| **Fedora, <br>Red Hat Enterprise Linux, <br>CentOS** | **rpm**         | **yum, dnf**               |

#### Common Package Management Tasks

In the discussion below:

- the term **package_name** refers to the **actual name of a package**.
- the term **package_file** refers to the **name of the file that contains the package**.

**Note!**
![image_44](</images/articles/redhat_sysadmin/Pasted image 20250901073400.png>)

##### Finding a Package in a Repository

Using the high-level tools to search repository metadata, a package can be located based on its name or description

![image_45](</images/articles/redhat_sysadmin/Pasted image 20250901070451.png>)

For example, to search a yum repository for the emacs text editor, we can use this command:

```Bash
yum search emacs
```

##### Installing a Package from a Repository

High-level tools permit a package to be downloaded from a repository and installed with full dependency resolution

###### Package Installation Commands

| Style       | Command(s)                                      |
| ----------- | ----------------------------------------------- |
| **Debian**  | **apt-get update <br>apt-get install package_name** |
| **Red Hat** | **yum install package_name**                        |

For example, to install the emacs text editor from yum repository on a Red Hat system, we can use this command:

```Bash
yum install emacs
```

##### Installing a Package from a Package File

If a package file has been downloaded from a source other than a repository, it can be installed directly (though without dependency resolution) using a low-level tool

![image_46](</images/articles/redhat_sysadmin/Pasted image 20250901070728.png>)

For example, if the `emacs-22.1-7.fc7-i386.rpm` package file had been down loaded from a non-repository site, it would be installed this way:

```Bash
rpm -i emacs-22.1-7.fc7-i386.rpm
```

> **Note:** Because this technique uses the low-level rpm program to perform the installation, no dependency resolution is performed.
> If rpm discovers a missing de pendency, rpm will exit with an error.

##### Removing a Package

Packages can be uninstalled using either the high-level or low-level tools.

![image_47](</images/articles/redhat_sysadmin/Pasted image 20250901070757.png>)

##### Updating Packages from a Repository

The most common package management task is keeping the system up-to-date with the latest versions of packages. The high-level tools can perform this vital task in a single step

![image_48](</images/articles/redhat_sysadmin/Pasted image 20250901070827.png>)

##### Upgrading a Package from a Package File

If an updated version of a package has been downloaded from a non-repository source, it can be installed, replacing the previous version

| Style   | Command(s)           |
| ------- | -------------------- |
| **Debian**  | **dpkg -i package_file** |
| **Red Hat** | **rpm -U package_file**  |

For example, to update an existing installation of emacs to the version contained in the package file `emacs-22.1-7.fc7-i386.rpm` on a Red Hat system, we can use this command:

```Bash
rpm -U emacs-22.1-7.fc7-i386.rpm
```

> **Note**: dpkg does not have a specific option for upgrading a package versus in stalling one as rpm does.

##### Listing Installed Packages

to display a list of all the packages installed on the system.

![image_49](</images/articles/redhat_sysadmin/Pasted image 20250901071106.png>)

##### Determining Whether a Package is Installed

to display whether a specified package is installed.

![image_50](</images/articles/redhat_sysadmin/Pasted image 20250901071122.png>)

##### Displaying Information About an Installed Package

If the name of an installed package is known, we can use the commands in the figure to display a description of the package.

![image_51](</images/articles/redhat_sysadmin/Pasted image 20250901071141.png>)

##### Finding Which Package Installed a File

To determine what package is responsible for the installation of a particular file.

![image_52](</images/articles/redhat_sysadmin/Pasted image 20250901071239.png>)

For example, to see what package installed the `/usr/bin/vim` file on a Red Hat system, we can use this command:

```Bash
rpm -qf /usr/bin/vim
```

#### Notes

##### some common options of rpm low-level tool

```Bash
rpm -qa              # List all installed packages
rpm -qf package_file # Find out what package provides FILENAME
rpm -q yum           # List what version of the package is currently installed
rpm -qi yum          # Get detailed information about the package
rpm -ql yum          # List the files installed by the package
rpm -qc yum          # List just the configuration files installed by the package
rpm -gd yum          # List just the documentation files installed by the package
rpm -q --scripts package_file  # List shell scripts that run before or after the package is installed or removed
rpm -q --changelog   # list change information for the package

# to install a package: 
rpm -ivh package_file  
# -i --->  install package(s)
# -v ---> Verbosity provide more detailed output
# -h ---> Installation progress
```

##### Repo configuration

There are Two main repositories in Red Hat:

- #### BaseOS repository

  mainly concerns the operating system.

- #### AppStream repository

  contains application modules and non-modular RPMs.
**Both of these two repos are necessary part** of a Rad Hat Enterprise Linux 9 systems

![image_53](</images/articles/redhat_sysadmin/Pasted image 20250901081021.png>)

###### How to configure a repository in Red Hat Enterprise Linux

1. change your current directory to **/etc/yum.repos.d/**

```Bash
cd /etc/yum.repos.d/
```

1. create **two main files**, **one for BaseOS repo** and **another for AppStream repo**

```Bash
touch  BaseOS.repo  AppStream.repo # you can name these repos as you like :)
```

1. configure each file (add repo definition)

```Bash
# BaseOS.repo 

[Local_BaseOS] 
name="this is local BaseOS repo"   # repo description 
baseurl=file:///repo_path          # baseurl= URL, FTP, or file path to repo.
enable=1    # 1 --> enable this repo,  0 --> disable this repo 
gpgcheck=0  # verify package signatures. when you have RHEL subscription
gpgkey=KEY_PATH  # this parameter is not set if gpgchek=0
# ========================================================== # 

# AppStream.repo

[Local_AppStream] 
name="this is local AppStream repo"  
baseurl=file:///repo_path          
enable=1    
gpgcheck=0  
gpgkey=KEY_PATH  # this parameter is not set if gpgchek=0
```

#### Additional Resources

- The Debian GNU/Linux FAQ chapter on package management provides an over view of package management on Debian systems :
  <http://www.debian.org/doc/FAQ/ch-pkgtools.en.html>
- The home page for the RPM project: <http://www.rpm.org>
- The home page for the YUM project: <http://yum.baseurl.org>

### CH15_ Accessing Linux File Systems

In this chapter, we will consider data at the device level. Linux has amazing capabilities for handling storage devices, whether physical storage, such as hard disks, network storage, or virtual storage devices such as RAID (Redundant Array of Independent Disks) and LVM (Logical Vol ume Manager).

#### Mounting and Unmounting Storage Devices

The **first step** in managing a storage device is **attaching the device to the file system tree**.
This process, called **mounting**, **allows the device to interact with the operating system**.

Unix-like operating systems, like Linux, maintain a **single file system tree with devices attached at various points**. This contrasts with other operating systems such as MS-DOS and Windows that **maintain separate file system trees for each device** (for example C:\, D:\, etc.).

A file named **/etc/fstab** (short for “file system table”) lists the devices (typically hard disk partitions) that are to be **mounted at boot time**.

Here is an example **/etc/fstab** file from an **early Fedora system**:

```Bash
LABEL=/12       /          ext4     defaults         1 1 
LABEL=/home     /home      ext4     defaults         1 2 
LABEL=/boot     /boot      ext4     defaults         1 2 
tmpfs           /dev/shm   tmpfs    defaults         0 0 
devpts          /dev/pts   devpts   gid=5,mode=620   0 0 
sysfs           /sys       sysfs    defaults         0 0 
proc            /proc      proc     defaults         0 0 
LABEL=SWAP-sda3 swap       swap     defaults         0 0
```

These are the hard disk partitions. Each line of the file consists of six fields:

| Field | Contents         | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| ----- | ---------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1     | Device           | Traditionally, this field contains the actual name of a device file associated with the physical device, such as **/dev/sda1** (the first partition of the first detected hard disk). But with today's computers, which have many devices that are hot pluggable (like USB drives), many modern Linux distributions associate a device with a text label instead. <br>This label (which is added to the storage media when it is formatted) can be either a **simple text** label or a **randomly generated UUID** (Universally Unique Identifier). <br>This label is read by the operating system when the device is attached to the system. That way, no matter which device file is assigned to the actual physical device, it can still be correctly identified. |
| 2     | Mount point      | The directory where the device is attached to the file system tree.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| 3     | File system type | Linux allows many file system types to be mounted. Most native Linux file systems are Fourth Extended File System (**ext4**), but many others are supported, such as:<br>FAT16 (**msdos**), FAT32 (**vfat**), NTFS (**ntfs**), CD-ROM (**iso9660**), etc                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| 4     | Options          | File systems can be mounted with various options. <br>It is possible, for example, to mount file systems as read only or to prevent any programs from being executed from them <br>(a useful security feature for removable media)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| 5     | Frequency        | A single number that specifies if and when a file system is to be backed up with the dump command.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| 6     | Order            | A single number that specifies in what order file systems should be checked with the fsck command                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |

##### Viewing a List of Mounted File Systems

The **mount** command is used to mount file systems. Entering the command without arguments will **display a list of the file systems currently mounted**:

```Bash
[me@linuxbox ~]$ mount 
/dev/sda2 on / type ext4 (rw) 
proc on /proc type proc (rw) 
sysfs on /sys type sysfs (rw) 
devpts on /dev/pts type devpts (rw,gid=5,mode=620) 
/dev/sda5 on /home type ext4 (rw) 
/dev/sda1 on /boot type ext4 (rw)
tmpfs on /dev/shm type tmpfs (rw) 
none on /proc/sys/fs/binfmt_misc type binfmt_misc (rw) 
sunrpc on /var/lib/nfs/rpc_pipefs type rpc_pipefs (rw) 
fusectl on /sys/fs/fuse/connections type fusectl (rw) 
/dev/sdd1 on /media/disk type vfat (rw,nosuid,nodev,noatime, uhelper=hal,uid=500,utf8,shortname=lower) 
twin4:/musicbox on /misc/musicbox type nfs4 (rw,addr=192.168.1.4)
```

>**Note!**  A mount point is simply a directory somewhere on the file system tree. There’s nothing special about it. It doesn't even have to be an empty directory, though if you mount a device on a non-empty directory, you will not be able to see the directory's previous contents until you unmount the device.

###### Why Unmounting Is Important

If you look at the output of the free command, which displays statistics about memory usage, you will see a statistic called buffers. Computer systems are de signed to go as fast as possible. One of the impediments to system speed is slow devices.

Printers are a good example. Even the fastest printer is extremely slow by computer standards.
A computer would be very slow indeed if it had to stop and wait for a printer to finish printing a page. In the early days of PCs (before multi-tasking), this was a real problem. If you were working on a spreadsheet or text document, the computer would stop and become unavailable every time you printed. The computer would send the data to the printer as fast as the printer could accept it, but it was very slow since printers don't print very fast.

This problem was solved by the advent of the printer buffer, a device containing some RAM memory that would sit between the computer and the printer.

with the printer buffer in place, the computer would send the printer output to the buffer, and it would quickly be stored in the fast RAM so the computer could go back to work without waiting. Meanwhile, the printer buffer would slowly spool the data to the printer from the buffer's memory at the speed at which the printer could accept it.

This idea of buffering is used extensively in computers to make them faster. Don't let the need to occasionally read or write data to or from slow devices impede the speed of the system. Operating systems store data that has been read from and is to be written to storage devices in memory for as long as possible before actually having to interact with the slower device.

On a Linux system, for example, you will notice that the system seems to fill up memory the longer it is used. This does not mean Linux is “using” all the memory; it means that Linux is taking advantage of all the available memory to do as much buffering as it can.

This buffering allows writing to storage devices to be done very quickly because writing to the physical device is being deferred to a future time. In the meantime, the data destined for the device is piling up in memory. From time to time, the op erating system will write this data to the physical device.

Unmounting a device entails writing all the remaining data to the device so that it can be safely removed. If the device is removed without unmounting it first, the possibility exists that not all the data destined for the device has been transferred. In some cases, this data may include vital directory updates, which will lead to file system corruption, one of the worst things that can happen on a computer.

##### Determining Device Names

It's sometimes difficult to determine the name of a device. In the old days, it wasn't very hard.
A device was always in the same place and it didn't change. Unix-like systems like it that way. When Unix was developed, “changing a disk drive” involved using a forklift to remove a washing machine-sized device from the computer room.
In recent years, the typical desktop hardware configuration has become quite dynamic, and Linux has evolved to become more flexible than its ancestors.

the modern Linux desktop is able to “automagically” mount the device and then determine the name after the fact.
But what if we are managing a server or some other environment where this does not occur?
How can we figure it out

![image_54](</images/articles/redhat_sysadmin/Pasted image 20250902185609.png>)

If you are working on a system that does not automatically mount removable devices, you can use the following technique to determine how the removable device is named when it is attached. First, start a real-time view of the /var/log/messages or / var/log/syslog file (you may require superuser privileges for this).

```Bash
sudo tail -f /var/log/messages

# this log as an example of a removable device like USB connected to the system,
# after run the above command and connect the USB, this log will rises

Jul 23 10:07:59 linuxbox kernel: sdb: sdb1 
Jul 23 10:07:59 linuxbox kernel: sd 3:0:0:0: [sdb] Attached SCSI removable disk

# /dev/sdb  ====> the device name for the entire device 
# /dev/sdb1 ====> for name of the first partition on the device
```

we can now mount the flash drive.

```bash
sudo mkdir /mnt/flash 
sudo mount /dev/sdb1 /mnt/flash 
df
```

#### Creating New File Systems

 Let's say that we want to reformat the flash drive with a Linux native file system, rather than the FAT32 system it has now. This involves two steps.

 1. (optional) Create a new partition layout if the existing one is not to our liking.
 2. Create a new, empty file system on the drive

##### Manipulating Partitions with fdisk

**fdisk** is one of a host of programs (both command line and graphical) that allow us **to interact directly with disk-like devices** (such as hard disk drives and flash drives) **at a very low level**.
With this tool we can **edit**, **delete**, and **create** partitions on the device.

for example: if assume we have a flash drive and we need manipulate it:

```bash
sudo umount /dev/sdb1 
sudo fdisk /dev/sdb
# specify the device in terms of the entire device, not by partition number. (sdb, not sdb1)

# you will see the following prompt:
Command (m for help):

a toggle a bootable flag
b edit bsd disklabel 
c toggle the dos compatibility flag 
d delete a partition 
l list known partition types 
m print this menu 
n add a new partition 
o create a new empty DOS partition table 
p print the partition table 
q quit without saving changes 
s create a new empty Sun disklabel 
t change a partition's system id 
u change display/entry units 
v verify the partition table 
w write table to disk and exit 
x extra functionality (experts only)

Command (m for help):
```

##### Creating a New File System with mkfs

use **mkfs** (short for “**make file system**”), which can **create file systems** in a **variety of formats**.

for example

- to create an **ext4** file system on the device, we use the `-t` option to specify the ext4 system type, followed by the name of the device containing the partition we want to format.

```Bash
# to create an ext4 file system on the device
sudo mkfs -t ext4 /dev/sdb1

# to reformat the device to its original FAT32 file system
sudo mkfs -t vfat /dev/sdb1
```

#### Testing and Repairing File Systems

**fsck program**:

- #### check the integrity of file systems

  - In our earlier discussion of the **/etc/fstab** file, we saw some **mysterious digits at the end of each line**.  Each time the **system boots**, it **routinely checks** the **integrity** of the **file systems** **before mounting** them.
   This is **done by the fsck** program (short for “file system check”).
  - The **last number** in each fstab entry specifies **the order** in which **the devices are to be checked**. In our previous example, we see that the root file system is checked first, followed by the home and boot file systems.
  - **Devices** with a **zero as the last digit** are **not routinely checked**.

- #### repair corrupt file systems

  with varying degrees of success, depending on the amount of damage.
  In addition to On Unix-like file systems, recovered portions of files are placed in the **lost+found directory**, located in the root of each file system.

```bash
sudo fsck /dev/sdb1
```

#### Moving Data Directly to and from Devices

While we usually think of data on our computers as being organized into files, it is also possible to think of the data in “raw” form.
If we look at a disk drive, for example, we see that it consists of a large number of “blocks” of data that the operating system sees as directories and files.

However, if we could treat a disk drive as simply a **large collection of data blocks**, we could perform useful tasks, such as **cloning devices**. The **dd** program **performs this task**. It **copies blocks** **of data** from one place to another.
It uses a **unique syntax** (for historical reasons) and is usually used this way:

```Bash
dd if=input_file of=output_file [bs=block_size [count=blocks]]
```

> **Warning!** The dd command is very powerful. Though its name derives from “**data definition**” it is sometimes called “**destroy disk**” because users often mistype either the if or of specification.
> Always double-check your input and output specifications before pressing enter!

#### Creating CD-ROM Images

 Writing a recordable CD-ROM (either a CD-R or CD-RW) consists of two steps:

 1. **Constructing** an **iso image file** that is the exact file system image of the CD-ROM
 2. **Writing** the **image file** onto the **CD-ROM media**

##### Creating an Image Copy of a CD-ROM

If we want to **make an ISO image** of an **existing CD-ROM**,
we can use **dd** to **read** all the **data blocks off the CD-ROM** and **copy them** to a **local file**.

For Example:
Say we had an **Ubuntu CD** and we wanted to **make an ISO file** that we could **later use to make more copies**. After inserting the CD and determining its device name (we’ll assume /dev/cdrom), we can make the ISO file like so:

```bash
dd if=/dev/cdrom of=ubuntu.iso 
```

This technique **works** for **data DVDs** as **well**. But, will **not work for audio CDs**, as they do not use a file system for storage. **For audio CDs**, look at the **cdrdao** command.

##### Creating an Image From a Collection of Files

- **genisoimage** program: to create an **ISO image file** containing the **contents of a directory**.
To do this:

1. **create** a directory **containing all the files** we want to include in the image
2. **execute** the **genisoimage** command to create the image file.

For example, if we had created a directory called **~/cd-rom-files** and filled it with files for our **CD-ROM**

```Bash
genisoimage -o cd-rom.iso -R -J ~/cd-rom-files

# -R =====> adds metadata for the Rock Ridge extensions, which allows the use of long filenames and POSIX-style file permissions.

# -J =====> enables the Joliet extensions, which permit long filenames for Windows.
```

> **Note!!**
> If you look at online tutorials for creating and burning optical media like CD ROMs and DVDs, you will frequently encounter two programs called mkisofs and cdrecord. These programs were part of a popular package called cdr tools authored by Jörg Schilling. In the summer of 2006, Mr. Schilling made a license change to a portion of the cdrtools package, which, in the opinion of many in the Linux community, created a license incompatibility with the GNU GPL. As a result, a fork of the cdrtools project was started that now includes re placement programs for cdrecord and mkisofs named wodim and genisoimage, respectively

#### Writing CD-ROM Images

##### Mounting an ISO Image Directly

There is a **trick** that we can use **to mount an ISO image** while **it is still on our hard disk and treat it as though it were already on optical media**.

- By adding the “**-o loop**” option to mount, we can **mount the image file** as though **it were a device** and **attach it to the file system tree**.

```Bash
mkdir /mnt/iso_image mount -t iso9660 -o loop image.iso /mnt/iso_image 

# -t iso9660 ====> file system type
```

In the example above,

- created a mount point named /mnt/iso_image
- then mounted the image file image.iso at that mount point.
After the image is mounted, it can be treated just as though it were a real CD-ROM or DVD. Remember to unmount the image when it is no longer needed.

##### Blanking a Rewritable CD-ROM

**Rewritable CD-RW media** needs to be **erased or blanked** **before** it can be **reused**.
To do this, we can use **wodim**, specifying:

- the **device name for the CD writer**
- the **type of blanking to be performed**.
  The wodim program offers several types. The **most minimal** (and **fastest**) is the “**fast**” type.

```bash
wodim dev=/dev/cdrw blank=fast
```

##### Writing an Image

To **write an image**, use **wodim**, specifying:

- the name of the optical media writer device
- the name of the image file.

```Bash
wodim dev=/dev/cdrw image.iso
```

 In addition to the device name and image file, wodim supports a large set of options.
 Two common ones are:

- **-v** for verbose output
- **-dao** which writes the disc in **disc at-once** mode.
   This mode should be used if you are **preparing a disc** for commercial reproduction.
   The **default mode** for wodim is **track-at-once**, which is **useful** for recording **music tracks**.

#### Verify ISO Image Integrity

In most cases, a **distributor of an ISO image** will also **supply** a **checksum file**.
A **checksum** is the **result** of an **exotic mathematical calculation** resulting in a number that represents the content of the target file.
If the contents of the file change by even one bit, the resulting checksum will be much different.

The most common method of **checksum generation** uses the **md5sum** program. When you use md5sum, it **produces a unique hexadecimal number**.

For example:

```Bash
md5sum image.iso 34e354760f9bb7fbf85c96f6a3f94ece image.iso
```

After you download an image, you should **run md5sum** against it and **compare the results** with the **md5sum value supplied by the publisher**

**md5sum** can be used not only to check the integrity of downloaded files but also to **verify data written to optical media** (like **CDs**/**DVDs**).

- **Step 1:** Calculate the checksum of the original image file.
- **Step 2:** Calculate the checksum of the burned media.
  - Optical media is written in **2,048-byte blocks**.
  - **To verify correctly**, you must **read only** as many blocks from the media as the image file contains.
  - **For CDs** (disc-at-once mode), a direct checksum of `/dev/cdrom` often works.
  - **For DVDs**, you need to calculate the number of blocks precisely and use `dd` to read that portion before piping it to `md5sum`.

For example:

```Bash
md5sum dvd-image.iso; dd if=/dev/dvd bs=2048 count=$(( $(stat -c "%s" dvd-image.iso) / 2048 )) | md5sum

# First md5sum gives the checksum of the ISO file.
# Second command gives the checksum of the data physically read from the DVD.  
# If both checksums match ===> DVD was burned correctly, no corruption.
# If they differ ===> burning failed or data got corrupted.
```

#### useful tools

Disk Usage and Storage Overview

- **df**:  Shows disk space usage for mounted filesystems.
- **du**:  Shows disk usage for files and directories.
- **lsblk**: Lists information about block devices (disks, partitions, etc.).
- **blkid**: Displays block device attributes such as UUID, TYPE, and LABEL.

#### Search for files in mounted file systems `locate` vs `find`

##### Locate command

**How it works:**  

- Searches a pre-generated index (`mlocate` database) for file names or paths → results appear instantly.

**Limitations:**

- Database is **not real-time**. New files won’t appear until the database is updated.
- The database updates **daily** by default. Root can run `updatedb` to refresh it immediately.
- Results are restricted: user must have search permission on the containing directory

**Useful options:**

- `-i` → Case-insensitive search.
- `-n` → Limit the number of results.

**Examples:**

```Bash
locate passwd 
locate -i messages 
locate -n 5 messages
```

##### Find command

Unlike `locate`, `find` searches the **file system in real time**, making it slower but more accurate and versatile.

###### Find by Name

```Bash
find / -name sshd_config
find / -name '*.txt'
find / -iname '*messages*'   # Case-insensitive
```

###### Find by Ownership

```Bash
# -user USER     ===>  Files owned by a specific user.
# -group GROUP   ===> Files owned by a group.  
# -uid / -gid    ===> Search by numeric ID.

find /home/user -user USERNAME
find /home/user -group USERNAME
```

###### Find by Permission

```Bash
# -perm MODE   ===> Match exact permission values.    
# Use octal values (4 = read, 2 = write, 1 = execute).

find /home -perm 764     # rwx for user, rw for group, r for others 
find /home -perm -324    # at least write+execute for user, write for group, read for others 
find /home -perm /442    # matches any file with these bits set
```

###### Find by Size

```Bash
# Units: k (KB), M (MB), G (GB).    
# Prefixes: + (greater than), - (less than), no prefix (exact).
find / -size 10M      # exactly 10 MB
find / -size +10G     # greater than 10 GB
find / -size -10k     # smaller than 10 KB
```

###### Find by Modification Time

```Bash
# -mmin N   ===> Files modified _exactly N minutes ago_.
# -mmin +N  ===> Modified more than N minutes ago.
# -mmin -N  ===> Modified less than N minutes ago.

find / -mmin 120 
find / -mmin +200


# The time options (-atime, -ctime, and -mtime) enable you to search based on the number of days, # the min options (-amin, -cmin, and -mmin) do the same in minutes.
find /etc/ -atime -10     # if any file could be accessed for last 10 days ago
find /etc/ -ctime -10     # if any file could be changed for last 10 days ago
find /etc/ -mtime -10     # if any file had its metadata changed for last 10 days

```

###### Find by Type

```Bash
# -type f  ===> Regular file  
# -type d  ===> Directory
# -type l  ===> Symbolic link
# -type b  ===> Block device

find /etc -type d      # all directories under /etc 
find / -type l         # all symlinks 
find /dev -type b      # all block devices
```

###### Find and Execute command

```Bash
# With the -exec option, the command you use is executed on every file found, without stopping to ask if that’s okay. 
# The -ok option stops at each matched file and asks whether you want to run the command on it.

find [options] -exec command {} \;
find [options] -ok command {} \;

# Example1:
find /etc -iname passwd -exec echo "I found {}" \; 
# I found /etc/pam.d/passwd 
# I found /etc/passwd

# Example2:
find /usr/share -size +5M -exec du {} \; | sort -nr 
# 116932 /usr/share/icons/HighContrast/icon-theme.cache 
# 69048 /usr/share/icons/gnome/icon-theme.cache 
# 20564 /usr/share/fonts/cjkuni-uming/uming.ttc

# Example3:
find /var/allusers/ -user joe -ok mv {} /tmp/joe/ \; 
# < mv ... /var/allusers/dict.dat > ? y 
# < mv ... /var/allusers/five > ? y
```

##### find VS locate

| Feature          | `locate`                          | `find`                          |
| ---------------- | --------------------------------- | ------------------------------- |
| **Speed**        | Very fast (uses database)         | Slower (real-time search)       |
| **Accuracy**     | May miss new files (needs update) | Always accurate                 |
| **Search scope** | Name/path only                    | Name, size, time, owner, perms… |
| **Permissions**  | Requires directory search rights  | Direct filesystem traversal     |
| **Best for**     | Quick lookups                     | Complex, detailed searches      |
