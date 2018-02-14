# DevEnviro
* Editor for this markup: http://jbt.github.io/markdown-editor/
* IDE: VS Code

## To Get This Set Up:

* Install Chocolatey.
* Get a copy of https://github.com/MikeMundy/DevEnviro/blob/develop/PowerShellScripts/01SetupGit.ps1
* Follow the instructions in the script. It will install Git, Posh-Git, NodeJS and clone this repo into a folder.

## This Includes:
* Git with Posh-Git for Powershell, GitFlow and GitHub
* NodeJS

## Git Flow Command Examples

In Powershell, cd to the /DevEnviro folder, should see [develop] branch in prompt.

Get the latest code from the repo:
```
git fetch
git merge origin/develop
```

Create a new feature branch:
```
git checkout -b feature/my-branch-name
```

Make your code changes in your branch. When you are ready to push them to GitHub:
```
git status
git add .   (or git add <file> to only add specific files)
git commit -m "This is the commit message."
git push -u origin feature/my-branch-name
```

You can repeat the git add, git commit steps as often as you like before doing the push.

On the GitHub site at https://github.com/MikeMundy/DevEnviro, you'll see the branch has been pushed to the site. Open the branch, and create a Pull Request. (No need for asssigning an approver in this case.) Click Squash and Merge, and approve the squash and merge to merge the feature branch into the /develop branch.

Click the Delete Branch button.

Back on Powershell:

```
git checkout develop
git remote show origin   (will show stale branch)
git remote prune origin   (will remove the stale remote branch)
git branch -D feature/my-branch-name  (will remove the feature branch)
git fetch
git merge origin/develop
```

.. and you're back where you started, ready to create a new feature branch.

## Notes
* If git has the wrong username cached when you attempt a push, in Windows go to the Credentials Manager -> Windows Credentials, and delete the github id. Next time you attempt a push, it'll request your GitHub username and password, and cache them for 15mins.

