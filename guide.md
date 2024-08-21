# Creating a Mobile App from Scratch (order of events still underway)

## Everything essential to running the Mobile App

### Command Prompt
**windows only**  

#### base CMD
navigating down to a directory
```
> cd <directory>
```
navigating up to parent directory
```
> cd ..
```
display a list of files and directories in the current directory
```
> dir
```
creating directories
```
mkdir [directory_name]
```
#### Node and NPM
what's the purspose of npm?  
collaboration, version control, initializing

organizing npm  
first, install directly from the website: [npm](https://nodejs.org/en)  

next, navigate to the directory you want to implement npm
```
cd path/to/your/project
```

initialize the project
```
npm init
```

how to install necessary dependencies
```
npm install [package]
```

#### Expo dev
as always, start with the [docs](https://docs.expo.dev/)  

in order to view your expo app, you must install Expo Go on the App Store or similar 

first, install expo on npm
``` 
npm install [expo]
```

initialize a new app with blank template
```
npx create-expo-app StickerSmash --template blank
```

#### React mobile dependencies

3 main packages needed for mobile dev:  
base react package
```
npm install react
```

mobile react package
```
npm install react-native
```

secure secrets and apikey
```
npm install react-native-dotenv
```

alternatively, install them all at the same time:
```
npm install react react-native react-native-dotenv
```

### VSC

command prompt/terminal available here  
use to run most code

### Git / Github

importance of version control software  
>building in steps  
>ability to revert changes when things break  
>keeping track of the changes made  
>working on multiple computers or with other devs 

### ChatGPT Prompting
#### Tips on Maximing ChatGPT support:
>giving as much context as possible  
>providing example or similar functioning code  
>edit prompts instead of sending new message when output is off

#### ChatGPT's main purposes for these types of projects
>build foundation code  
>explain how code is working  
>debug errors  
>suggest next steps  
>good prompting saves time and enhances understanding. lazy prompting often makes things take longer and break more easily

### CSS Styling

### Dev Environment vs Production Level

## Development of App

### What do you want the app to accomplish?

1. define core functioning
2. separate into parts
- what the user sees and interacts with - frontend
- the software the runs the actions that make the app necessary