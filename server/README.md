# WeMeet server side

## requirements

you need to have installed on your computer:

1. nodejs v10.14.2 or higher
2. mongodb v4.0.0 or higher

I also recommend to insall studio-3t or Robo 3t (this one is free) for database gui.

## setup

run `npm i` to install dependencies.

## start server

run `node index.js`, if you want to copy the build client side to the server and start the server, run `npm start`.

## configuration

we use the package `dotenv` which search for file name `.env`.  
there will be all the configuration that needed for our server side.  
the syntax in the `.env` file is `KEY=VALUE`.  

```bash
SERVER_PORT=8989
MONGO_URI=localhost
#this is comment in the .env file
```

this envs will override if you run the server with enviroments variables:  

```bash
SERVER_PORT=8989 node index.js
```

then in our code we use it as process environment:  
```javascript
const SERVER_PORT = process.env.SERVER_PORT // in our case it is 8989
// if the configuration will not exist the process env will be undefiend
const SOME_ENV = process.env.SOME_ENV || 'default_value' // it is good to define default value in case the env not exist
```

***note: the envs are always string, so if you want to insert boolean or int, make sure to convert them***

## logs

To use our custom logger on the server side you need to use the logger object in the `utils` folder:  

```javascript
const logger = require('./path/to/utils/logger');

// this is the levels you can use for logs (every level have differnt color)

logger.info('info');
logger.debug('debug');
logger.warn('warn');
logger.error('error');
logger.fatal('fatal');

// you can also attach to log object, usage: logger.level(object,string)
// attach object can be on any level
logger.info(myobject,'this is log of my object');

```

***note*** if you debug in vscode, add the next line to your launch.json run object: `"outputCapture": "std"`

## test data

if you want some test data to test your feature etc.  
run the script under the scripts folder: `node scripts/initDB.js`  

wait for it to finish and you have some test data in the db, even if your db has no collections at all, it will create all from nothing.

## algorithm

To run our genetic algorithm we have 2 files for it that locate under `services/algorithm`.  
because node is single thread and our algorithm will take some time to execute we need to run the algorithm in a child process.  
`algorithmHandler.js` is responsible to fork the child process that will run the algorithm, it will get all the data need to send to the algorithm and fork it to new child process, then it will handle everything that needed to handle for the child process (unexpected errors, algorithm logs etc.), then it will return `promise.resolve` when algorithm is finished it job or `promise.reject` when error eccured.  
___
In addition, it will handle debug mode, which mean if you run the server through vscode, vscode will run the server with the flag `--inspect-brk=<PORT>`, where `PORT` is generate from the vscode randomly.  
that is mean that if we want to run our child process in debug mode also, the algorithmHandler should give it different port, so it will give it the `PORT` given by vscode + 1.  
then, to run it you need to add this object to launch.json:  
```json
{
            "type": "node",
            "request": "launch",
            "protocol": "inspector",
            "name": "server",
            "cwd": "${workspaceRoot}/server",
            "program": "${workspaceRoot}/server/index.js",
            "autoAttachChildProcesses": true,
            "outputCapture": "std",
            "windows": {
                "console": "internalConsole"
            }
}
```
***notice*** that this object is configure to run if you open vscode in the root WeMeet repo (when you see `client` and `server` folders).
