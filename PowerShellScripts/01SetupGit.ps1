<#  MIKE's DEV ENVIRO GIT REPO SETUP SCRIPT: v1

This script sets up the Dev Enviro from this Git repository (retrieved from GitHub at https://github.com/MikeMundy/DevEnviro), and 
and gets Git configured to use the Git Flow workflow.
It does these steps:
- Installs Git, Posh-Git, and NodeJS.
- Configures Git.
- Clones the DevEnviro git repo into a folder.

THIS SCRIPT ASSUMES YOU HAVE THE FOLLOWING APPLICATIONS ALREADY INSTALLED:
- Windows Powershell
- Chocolatey: Go to https://chocolatey.org/ -> Install Chocolatey Now, follow instructions

TO USE THIS SCRIPT:
    1) Grab a copy of this script and save it on your machine. 
    2) Go to the VARIABLES YOU NEED TO SET section below, and update the variables as required.
    2) Open Windows Powershell -> 
            CHOOSE 'Run as Administrator' when opening.
        In Powershell:
            cd "<folder path where this script is kept>"
            .\01SetupGit.ps1
    This script will then execute.
#>

# VARIABLES YOU NEED TO SET:
#   Your details:
$YourFullName =                     "Michael Mundy"                                                     # Used to identify your commits.
$YourEmailAddress =                 "seraphrim@hotmail.com"                                             # Email messages from the GitHub repo are sent to this address. 
#   Where the Git repo will go, and the URL that you're cloning it from.
$GitRepositoryLocalParentFolder =   "C:\Users\MikeMundy\Documents\VIsual Studio Code\2018\DevEnviroTEST"  # The path to the folder where you want the Git repo folder to be created. 
$GitRepositoryLocalFolderName =     "DevEnviro"                                                         # The name of the folder that the Git repo will be created in, MUST equal the name of the GitHub repo.
$GitRepositoryRemoteURL =           "https://github.com/MikeMundy/DevEnviro"                            # The URL to the remote Git repository that we'll be cloning into the $GitRepositoryLocalFolder

# --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

# Computed variables (Don't change these):
$GitRepositoryLocalFolder =         "$($GitRepositoryLocalParentFolder)/$($GitRepositoryLocalFolderName)"

# FUNCTIONS:

function show {
    Param($Text)
    write-host "* $text" -foregroundcolor "green"
}

function deleteFolder {
    Param($FolderPath)    
    if(test-path "$FolderPath") {
        remove-Item -path "$FolderPath" -recurse -force
    }   
}

function createFolder {
    Param($FolderPath)
    $exists = test-path "$FolderPath"
    if($exists -eq $false) {
        new-item $FolderPath -ItemType directory     
    }   
}

function deleteAndCreateFolder {
    Param($FolderPath)
    deleteFolder($FolderPath)
    createFolder($FolderPath)
}

# MAIN SCRIPT:

# This skips any Do you want to (Y/N)... messages. 
Set-ExecutionPolicy -ExecutionPolicy Bypass  

#   Use Chocolatey to install Git. (If you already have a version of Git installed, Chocolately will warn you that git is already installed, and won't install a new version.)
choco install git --r
show("Chocolatey installed Git.")

#   Use Chocolatey to install Posh-Git, which provides enhanced command-line prompts for Git in Powershell. (If you already have a version of Posh Git installed, Chocolately will 
#   warn you that Posh Git is already installed, and won't install a new version.)
choco install poshgit --r
show("Chocolatey installed Posh-Git.")

#   Use Chololately to install NodeJS.
choco install nodejs.install -y
show("Chocolatey installed NodeJS.")

#   Delete and create the folder where we will be cloning the Git repo into (in a subfolder).
deleteAndCreateFolder($GitRepositoryLocalParentFolder)

#   Delete the subfolder where we will be putting the Git repo (in case it already exists).
deleteAndCreateFolder($GitRepositoryLocalFolder)

#   Initialise the folder as a git repo, so we can set the configuration before cloning the remote repo into the folder. If you don't do this, the CR/LF stuff is not set before you clone and everything looks like a change. 
cd $GitRepositoryLocalParentFolder
git init 

#   Set Git configuration settings:
git config --global credential.helper cache         # Cache your GitHub username and password for 15 mins.
git config --local core.autocrlf false              #   Linux/Mac uses LF for newline, while Windows uses CR/LF. This setting tells git to automatically set the newlines to LF when checking in, but changes them back to CR/LF when checking code out.   
git config --global user.name "$YourFullName"
git config --global user.email "$YourEmailAddress"
git config --global push.default upstream           #   Push the current branch back to the branch whose changes are usually integrated into the current branch (which is called @{upstream}). This mode only makes sense if you are pushing to the same repository you would normally pull from (i.e. central workflow).
git config --global branch.autosetupmerge true      #   Tells git branch and git checkout to set up new branches so that git-pull will appropriately merge from the starting point branch. true = automatic setup is done when the starting point is a remote-tracking branch.
git config --global branch.autosetuprebase always   #   When true, rebase the branch <name> on top of the fetched branch, instead of merging the default branch from the default remote when "git pull" is run. See "pull.rebase" for doing this in a non branch-specific manner.
git config branch.develop.rebase true               #   In local config, set rebase = true for develop branch. Conformed as correct with Mark H. 
show("Git configuration setting completed.")

#   Clone the remote Git repository into the subfolder.
git clone $GitRepositoryRemoteURL
show("Repository cloning completed.")

# Swap to the subfolder where the git repo was created.
cd $GitRepositoryLocalFolder

# Fetch and merge the develop branch so everything is up to date.
git checkout develop
git fetch
git merge origin/develop
git status

# SCRIPT COMPLETED.
show("DONE.")
show("Git repository is set up at $GitRepositoryLocalFolder")