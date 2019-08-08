#!/usr/bin/env node
import * as yargs from 'yargs'
import { Argv } from 'yargs'
import * as util from 'util'
import { exec, spawn } from 'child_process'
import { resolve } from 'path'
import './env'

const execAsync = util.promisify(exec)
const ENV = process.env.ENVIRONMENT || 'DEV'
const cwd = { cwd: resolve(`${__dirname}/../`)}

// CLI interface
// ---------------------------
const cli = yargs.scriptName('monorepo').usage('$0 <cmd> [args]')
console.log(`monorepo, environment: ${process.env.ENVIRONMENT}`)
console.log('--------------------------')

/**
 * Init pulumi cli
 * TODO move to a lib?
 */
const initPulumi = async function() {
    // pulumi is installed
    const pulumiVersion = await execAsync('pulumi version')
    if(pulumiVersion.stdout.indexOf('v') < 0) {
        throw new Error('Pulumi not installed.')
    }
    
    // check stack for current ENV
    const pulumiStacks = await execAsync('pulumi stack ls', cwd)
    if (pulumiStacks.stdout.indexOf(ENV) < 0) {
        // create stack
        console.log(`Creating new stack ${ENV}...`)
        await execAsync(`pulumi stack init ${ENV}`, cwd)
    }

    // select stack
    await execAsync(`pulumi stack select ${ENV}`, cwd)
}

//  ----------------------------------------------------

// deploy
cli.command('deploy', 'Deploy app to the current environment', (y: Argv) => y, async () => {

    try {
        // init
        await initPulumi()

        // deploy
        await new Promise((resolve, reject) => {
            const proc = spawn('pulumi',  ['up', '--non-interactive'], Object.assign(cwd, { stdio: 'inherit' }) )
            proc.on('error', (e: Error) => reject(e))
            proc.on('close', (m: number) => resolve(m))
        })
    } catch(err) {
        console.log(err)
        process.exit(1)
    }

})

// destroy
cli.command('destroy', 'Destroy app on current environment', (y: Argv) => y, async () => {

    try {
        // init
        await initPulumi()

        // destroy
        await new Promise((resolve, reject) => {
            const proc = spawn('pulumi',  ['destroy', '--non-interactive'], Object.assign(cwd, { stdio: 'inherit' }) )
            proc.on('error', (e: Error) => reject(e))
            proc.on('close', (m: number) => resolve(m))
        })
    } catch(err) {
        console.log(err)
        process.exit(1)
    }

})

// display help
cli.help()

// default help display
if (!cli.argv._[0]) {
  cli.showHelp()
}