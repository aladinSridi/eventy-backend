# Github Summary:
Definitions:
Git / SVN
Git is a distributed version control system. 
 - VCS: Keeps track of changes to content making it possible to recover files and revert to previous versions.
 - Distributed: Users have their own repositories of a project with its full history and a tracking ability. 
 - Changes are stored as “change sets” or “patches.” Which are then submited and included (or not) in the project.


GitHub / GitLab
GitHub is a service that provides Git repository hosting to insure collaboration. GitHub is also a software forge. That means it also has an issue tracker, tools for code review, and more.



Git Project Sections:
1/ Git directory (PROJECT-PATH/.git/)
This is where Git stores everything it needs to accurately track the project. This includes metadata and an object database which includes compressed versions of the project files.

2/ Working directory (or working tree)
This is where a user makes local changes to a project. The working directory pulls the project’s files from the Git directory’s object database and places them on the user’s local machine.

3/ Staging area
A file (also called “index”, “stage”, or “cache”) that stores information about what will go into your next commit. A commit is when you tell Git to save these staged changes. Git takes a snapshot of the files as they are and permanently stores that snapshot in the Git directory.

=> There are four main states that a file can be in at any given time: untracked, modified, staged or committed. 
- An untracked file is a new file. 
- You modify a file any time you make changes to it in your working directory. 
- Next, it’s staged when you move it to the staging area. 
- Finally, it’s committed after a commit.

=> There are three places where a file can be:
- When you just add a file to a folder, you are adding it to the working copy.
- When you 'git add' the file you add it to the index. 
- And when you commit it, you add it to the tree.


Installation: $ sudo apt-get install git

Get Help in Git: $ git help COMMAND



Configure the Git Environment: $ git config 

1- System Configuration Variables: /etc/gitconfig              =>  $ git config --system  // Manual Creation in Need
2- User Configuration Variables: ~/.gitconfig                  =>  $ git config --global
3- Project Configuration Variables: PROJECT-PATH/.git/config   =>  $ git config --local

NOTE: -l To see content.
NOTE: -e To edit content.
NOTE: If settings conflict, project-level conf > user-level conf > system-level conf.


#~ Add Your Name and Email ~#
 Git includes the user name and email in a commit:
 $ git config --global user.name "Alaeddine Sridi"
 $ git config --global user.email "aladin.sridi@gmail.com"


#~ Change Your Text Editor ~#
 $ git config --global core.editor "code --wait"
 
 Add vscode as the diff tool to compare two files:
 [diff]                   
     tool = default-difftool
 [difftool "default-difftool"]
     cmd = code --wait --diff $LOCAL $REMOTE


#~ Add Color to Git Output ~#
 $ git config --global color.ui true



Initialize Git in a Project:

 $ cd /PROJECT-REPOSITORY/
 $ git init
 $ git status  =>  Check if there is a git repository

 $ echo "Hello Git!" > readme.txt

NOTE: .md, .mkdn or .markdown is markdown formatted. Markdown is a markup language (from text to HTML).

 $ git status  =>  reame.txt is untracked (new file)
 $ git add readme.txt 
 $ git status  =>  reame.txt is staged now 
 $ echo "More Hellos!" >> readme.txt
 $ git status  =>  reame.txt is modified now 
 $ git add readme.txt 
 $ git status  =>  reame.txt is staged now 
 $ git rm --cached readme.txt  =>  Unstage, untrack from tree
 $ git status  =>  reame.txt is untracked now
 $ git commit -m "Created readme"
 $ git status  =>  working tree clean

NOTE: HEAD is the name of default commit

 $ echo "Hello after commit!" >> readme.txt
 $ git status  =>  reame.txt is modified now 
 $ git checkout -- readme.txt  =>  discard changes
 $ echo "Hello after commit!" >> readme.txt
 $ git add readme.txt  =>  Index Modified
 $ git reset --mixed HEAD readme.txt  =>  Unstaged and Holds last version in the tree

 $ git diff  =>  Shows difference between the file in the working tree now and how it was at your last commit.
 $ git add . =>  To add all the files



GitHub:


#~ Add Your UserName To Git ~#
 $ git config --global user.username "aladinSridi"



#~ Create a Remote Repository ~#
 GitHub.com -> '+' -> 'New repository' -> Name:'hello-git' -> Desc:'My first repo synching'

 Branches:
  -  A branch is a safe environment to try a feature or a fix without affecting the master branch.
  -  When you create a branch, Git copies everything from the current branch and places it in the new branch.
  -  The master branch is the first branch created.
  -  You can branch off any branch.
  -> $ git status  =>  To see current branch
  -> $ git branch <BRANCHNAME>  =>  To create a branch
  -> $ git branch -m <NEWBRANCHNAME>  =>  To change a branch's name
  -> $ git checkout <BRANCHNAME>   =>  To go into that branch and work on it
  -> $ git checkout -b <BRANCHNAME>  => To create and switch to a branch in one line
  -> $ git branch  =>  List the branches
  -> Add file: contibutors/aladinSridi.txt
  -> Stage it and commit it
  -> $ git push origin <BRANCHNAME>

  -  Collaborators are users permissited to edit a repo owned by someone else, through a Fork and Pull Request.
  -  To add collaborators: repository's page -> upper-Settings -> Collaborators
  -> $ git pull origin <BRANCHNAME>  =>  If no changes it says 'Already up to date'.
  -> $ git fetch --dry-run  =>  See changes to the remote before you pull in

  -  Pull Requests (Pull my changes into the original Requests).
  -  In Fork & Pull Model, they provide a way to notify project maintainers and start a discussion (in Markdown).
  -  In Shared Repository Model, they help start code review and conversation (in Markdown) before merged.
  -> To make a Pull Request: original's page -> New Pull Request -> Select the branch to submit

  -> $ git checkout gh-pages  =>  Switch to the branch you want to merge into (locally)
  -> $ git merge <BRANCHNAME>
  -> $ git branch -d <BRANCHNAME>  =>  Remove a branch locally
  -> $ git push <REMOTENAME> --delete <BRANCHNAME>  => Only remove a branch on remote
  -> $ git pull upstream gh-pages  ==> Pull from a remote branch latest Changes

 Common Files:
  - CONTRIBUTING explains how to contribute
  - README explains what the project is, how to use it and sometimes how to contribute 
  - .gitignore is a list of files that Git should not track.
  - license is the type of license you put on your project. 



#~ Synching Local and Remote repositories ~#
 $ cd /PROJECT-PATH/                                                    **  We want the local to know the remote
 $ git remote add origin https://github.com/aladinSridi/hello-git.git   **  Origin references to the URL
 $ git remote set-url origin <UpdatedURL>
 $ git remote -v                                                        **  View remote addresses
 $ git push -u origin master                                            **  Push local changes remote repo.
 $ git pull <REMOTENAME> <BRANCHNAME>                                   **  Pull latest changes from remote.



#~ Forking and Cloning ~#
To fork a repository is to create a copy (your own version) of it on your GitHub account.
To get a forked repository from your GitHub account onto your computer you clone it.
Push and Pull to your fork. Pull from upstream (original) changes to the original.

Fork: GitHub.com/jlord/patchwork -> 'top-right-fork'
Clone:  $ cd Not-Git-Repo/
        $ git clone https://github.com/aladinSridi/patchwork.git         ** It creates repo automatically
        $ cd patchwork/
        $ git remote -v                                                  ** Already connected to origin
        $ git remote add upstream https://github.com/jlord/patchwork.git ** Connect to the Original Repository



#~ GitHub Pages ~#
Free service that automatically serve and host static website files in branches named 'gh-pages'. 
Found online at: http://githubusername.github.io/repositoryname



#~ GitHub Recursive Authentication ~#
 Method1: Using HTTPS
  $ git remote set-url origin https://username:password@github.com/WEMP/project-slideshow.git


 Method2: Using SSH
  $ ls -al ~/.ssh  => Check if keys exist (id_rsa:private, id_rsa.pub:public) 

  NOTE: If someone hacks your computer, they gain access to your private key.
        A passphrase can be used to further encrypted the private key.

  $ ssh-keygen -t rsa -b 4096 -C "your_email@example.com"  =>  Generates keys
  $ rm -rf /home/loudin/.ssh  =>  Remove all ssh keys
  $ ssh-keygen -p  =>  Add/Update Passphrases

  NOTE: ssh-agent keeps track of user's identity keys and their passphrases to insure single sing-on.

  $ eval "$(ssh-agent -s)"  =>  Start the ssh-agent in the background
  $ ssh-add ~/.ssh/id_rsa  =>  Add your SSH private key to the ssh-agent.

  Add Public Key to GH: GitHub.com -> 'Settings' -> SSH and GPG keys -> 'New SSH Key' -> Copy Public Key

  $ ssh -T git@github.com  =>  ssh to GitHub
  $ git remote set-url origin git@github.com:USERNAME/REPOSITORY.git  =>  Set SSH Auth to your remote
  $ git push origin master  =>  No authentication required
