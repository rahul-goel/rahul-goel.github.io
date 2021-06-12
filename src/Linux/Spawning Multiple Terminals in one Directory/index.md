# Spawning Multiple Terminals in one Directory


It is hardly the case when programming involves editing a single file. On whatever medium to big sized projects that I've worked upon, atleast 3 files are needed to be opened at once either to edit or for reference.
Add running docker instances and autorun servers, the number shoots up to 7 to 8.

When the project directory is located 4 to 5 levels deep from the home directory, one has to open 7 to 8 terminals and `cd` into them one by one. Repeating this several times should indicate that a better way should exist and should be used.

I wrote a simple shell script and combined it with dmenu, dwm and zsh to open any number of terminals in any directory within 2 seconds.

Let's call this script `opendir`.
```zsh
#!/bin/sh

# Search for non hidden directories further down from home.
export ST_PATH=$(find ~ -not -path '*/\.*' -type d | dmenu -i -l 5)

# Get the number of terminals to be spawned.
num_times=$(echo | dmenu -i -p "How many terminals? (Default - 1)")

if [[ -z $num_times ]]
then
	num_times=1
fi
echo $num_times
for((i=0;i<$num_times;i++));
do
	st -e zsh &
done
```

It uses dmenu to give the user an interface to quickly select the directory. And then enter the number of terminals (default is 1).
It says st which stands for simple terminal (or the suckless terminal as some people call it). If you use any other terminal emulator, you'll have to replace `st` by that and the `-e` flag by your terminal's execute flag.

I also needed to add the following to the end of my zshrc.
```zsh
if ! [ -z $ST_PATH ]; then
cd "$ST_PATH"
fi
```

This is needed because I couldn't find a way to pass the path to the directory as an argument. In the first script I am setting the environment variable `ST_PATH`. In the zshrc, I am checking that if this variable is set the open zsh and change the directory to it. In the other case, ignore it.

I placed the opendir script in a `$PATH` directory and mapped it to the keybind `Mod + Shift + Return`. It is convenient since the keybind to open up a regular terminal is `Mod + Return`.

### Further Improvements
The first time `find` command is run after startup, it takes up a lot of time and then it is almost instant. I did not look into it, but the reason behind this seems to be caching. Instead of waiting for 15 to 20 seconds, to run for the first time, we can make it refer to a cached list.

We can maintain a file which contains the list of the directories that find spits out every time it is run. When spawning a new directory, we can make dmenu search from this list. And to maintain/refresh the cached list we can run a cronjob to update it every 1 hour or so.

The cronjob will look like -
```
* 1 * * * opendir_cron
```

The script opendir\_cron is -
```zsh
#!/bin/sh
find ~ -not -path '*/\.*' -type d | $HOME/.cache/opendir_reference
```

And the updated `opendir` script is -
```zsh
#!/bin/sh

# Search for non hidden directories further down from home.
export ST_PATH=$(cat $HOME/.cache/opendir_reference | dmenu -i -l 5)

# Get the number of terminals to be spawned.
num_times=$(echo | dmenu -i -p "How many terminals? (Default - 1)")

if [[ -z $num_times ]]
then
	num_times=1
fi
echo $num_times
for((i=0;i<$num_times;i++));
do
	st -e zsh &
done
```
