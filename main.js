process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = '0'; 
import './config.js';
import { createRequire } from "module"; 
import path, { join } from 'path'
import { fileURLToPath, pathToFileURL } from 'url'
import { platform } from 'process'
import * as ws from 'ws';
import { readdirSync, statSync, unlinkSync, existsSync, readFileSync, rmSync, watch } from 'fs';
/*import watch from 'glob-fs'*/
import yargs from 'yargs';
import { spawn } from 'child_process';
import lodash from 'lodash';
import chalk from 'chalk';
import syntaxerror from 'syntax-error';
import { tmpdir } from 'os';
import { format } from 'util';
import P from 'pino';
//import pino from 'pino';
import { makeWASocket, protoType, serialize } from './lib/simple.js';
import { Low, JSONFile } from 'lowdb';
import { mongoDB, mongoDBV2 } from './lib/mongoDB.js';
import store from './lib/store.js'
const { DisconnectReason, useMultiFileAuthState } = await import('@adiwajshing/baileys')
const { CONNECTING } = ws
const { chain } = lodash
const PORT = process.env.PORT || process.env.SERVER_PORT || 3000

protoType()
serialize()

global.__filename = function filename(pathURL = import.meta.url, rmPrefix = platform !== 'win32') { return rmPrefix ? /file:\/\/\//.test(pathURL) ? fileURLToPath(pathURL) : pathURL : pathToFileURL(pathURL).toString() }; global.__dirname = function dirname(pathURL) { return path.dirname(global.__filename(pathURL, true)) }; global.__require = function require(dir = import.meta.url) { return createRequire(dir) }

global.API = (name, path = '/', query = {}, apikeyqueryname) => (name in global.APIs ? global.APIs[name] : name) + path + (query || apikeyqueryname ? '?' + new URLSearchParams(Object.entries({ ...query, ...(apikeyqueryname ? { [apikeyqueryname]: global.APIKeys[name in global.APIs ? global.APIs[name] : name] } : {}) })) : '')

global.timestamp = { start: new Date }

const __dirname = global.__dirname(import.meta.url)

global.opts = new Object(yargs(process.argv.slice(2)).exitProcess(false).parse())
global.prefix = new RegExp('^[' + (opts['prefix'] || 'xzXZ/i!#$%+£¢€¥^°=¶∆×÷π√✓©®:;?&.\\-HhhHBb.aA').replace(/[|\\{}()[\]^$+*?.\-\^]/g, '\\$&') + ']')

global.db = new Low(/https?:\/\//.test(opts['db'] || '') ? new cloudDBAdapter(opts['db']) : new JSONFile(`${opts._[0] ? opts._[0] + '_' : ''}database.json`))

global.DATABASE = global.db // Backwards Compatibility
global.loadDatabase = async function loadDatabase() {
if (global.db.READ) return new Promise((resolve) => setInterval(async function () {
if (!global.db.READ) {
clearInterval(this)
resolve(global.db.data == null ? global.loadDatabase() : global.db.data)
}
}, 1 * 1000))
if (global.db.data !== null) return
global.db.READ = true
await global.db.read().catch(console.error)
global.db.READ = null
global.db.data = {
users: {},
chats: {},
stats: {},
msgs: {},
sticker: {},
settings: {},
...(global.db.data || {})
}
global.db.chain = chain(global.db.data)
}
loadDatabase()

global.authFile = `BotSession`
const { state, saveState, saveCreds } = await useMultiFileAuthState(global.authFile)

const connectionOptions = {
printQRInTerminal: true,
auth: state,
logger: P({ level: 'silent'}),
browser: ['TheLoliBot-MD','Edge','1.0.0']
}

global.conn = makeWASocket(connectionOptions)
conn.isInit = false

if (!opts['test']) {
if (global.db) setInterval(async () => {
if (global.db.data) await global.db.write()
if (opts['autocleartmp'] && (global.support || {}).find) (tmp = [os.tmpdir(), 'tmp'], tmp.forEach(filename => cp.spawn('find', [filename, '-amin', '3', '-type', 'f', '-delete'])))
}, 1000 * 900)}

if (opts['server']) (await import('./server.js')).default(global.conn, PORT)

function clearTmp() {
const tmp = [tmpdir(), join(__dirname, './tmp')]
const filename = []
tmp.forEach(dirname => readdirSync(dirname).forEach(file => filename.push(join(dirname, file))))
return filename.map(file => {
const stats = statSync(file)
if (stats.isFile() && (Date.now() - stats.mtimeMs >= 1000 * 900)) return unlinkSync(file) // 15 minutes
return false
})}

async function connectionUpdate(update) {
const { connection, lastDisconnect, isNewLogin } = update
if (isNewLogin) conn.isInit = true
const code = lastDisconnect?.error?.output?.statusCode || lastDisconnect?.error?.output?.payload?.statusCode
if (code && code !== DisconnectReason.loggedOut && conn?.ws.readyState !== CONNECTING) {
console.log(await global.reloadHandler(true).catch(console.error))
global.timestamp.connect = new Date
}
if (global.db.data == null) loadDatabase()
if (update.qr != 0 && update.qr != undefined) {
console.log(chalk.yellow(lenguajeGB['smsCodigoQR']()))}  
if (connection == 'open') {
console.log(chalk.yellow(lenguajeGB['smsConexion']()))
await conn.groupAcceptInvite(global.nna2)}
if (connection == 'close') {
console.log(chalk.yellow(lenguajeGB['smsConexionOFF']()))}}

process.on('uncaughtException', console.error)

let isInit = true;
let handler = await import('./handler.js')
global.reloadHandler = async function (restatConn) {
try {
const Handler = await import(`./handler.js?update=${Date.now()}`).catch(console.error)
if (Object.keys(Handler || {}).length) handler = Handler
} catch (e) {
console.error(e)
}
if (restatConn) {
const oldChats = global.conn.chats
try { global.conn.ws.close() } catch { }
conn.ev.removeAllListeners()
global.conn = makeWASocket(connectionOptions, { chats: oldChats })
isInit = true
}
if (!isInit) {
conn.ev.off('messages.upsert', conn.handler)
conn.ev.off('group-participants.update', conn.participantsUpdate)
conn.ev.off('groups.update', conn.groupsUpdate)
conn.ev.off('message.delete', conn.onDelete)
conn.ev.off('call', conn.onCall)
conn.ev.off('connection.update', conn.connectionUpdate)
conn.ev.off('creds.update', conn.credsUpdate)
}
  
//Información para Grupos
conn.welcome = lenguajeGB['smsWelcome']() //'  ╭────────────\n┆──〘 *𝗕𝗶𝗲𝗻𝘃𝗲𝗻𝗶𝗱𝗼/𝗮* 〙──\n┆──────────\n┆ ✨ *@user* _𝗔𝗹_\n┆ *@subject ✨* \n┆\n┆ *𝗘𝗻 𝗲𝘀𝘁𝗲 𝗴𝗿𝘂𝗽𝗼 𝗽𝗼𝗱𝗿𝗮́𝘀*\n┆  *𝗘𝗻𝗰𝗼𝗻𝘁𝗿𝗮𝗿:*\n┆> *𝗔𝗺𝗶𝘀𝘁𝗮𝗱𝗲𝘀* 👥\n┆> *𝗗𝗲𝘀𝗺𝗮𝗱𝗿𝗲* 💃🕺\n┆> *𝗕𝗮𝗿𝗱𝗼*🤺\n┆> *𝙅𝙤𝙙𝙖 𝙮 𝙢𝙖𝙨* 😛\n┆> *𝗨𝗻 𝗯𝗼𝘁 𝘀𝗲𝘅𝘆*\n┆> *𝗣𝘂𝗲𝗱𝗲 𝘀𝗼𝗹𝗶𝗰𝗶𝘁𝗮𝗿 𝗺𝗶 𝗹𝗶𝘀𝘁𝗮 𝗱𝗲*\n┆> *𝗖𝗼𝗺𝗮𝗻𝗱𝗼 𝗰𝗼𝗻:*\n┆> *#menu*\n┆\n┆> *𝗔𝗾𝘂𝗶́ 𝘁𝗶𝗲𝗻𝗲 𝗹𝗮 𝗱𝗲𝘀𝗰𝗿𝗶𝗽𝗰𝗶𝗼́𝗻* \n┆ *𝗗𝗲𝗹 𝗴𝗿𝘂𝗽𝗼, 𝗹𝗲́𝗲𝗹𝗮!! 🙌*\n┆──────────\n┆  @desc\n┆──────────\n┆ *🔰 𝗗𝗶𝘀𝗳𝗿𝘂𝘁𝗮 𝗱𝗲 𝘁𝘂*\n┆ *𝗘𝘀𝘁𝗮𝗱𝗶́𝗮 𝗲𝗻 𝗲𝗹 𝗚𝗿𝘂𝗽𝗼 🔰* \n┆\n╰─────────────️'
conn.bye = lenguajeGB['smsBye']() //'.' //no gusta :v
conn.spromote = lenguajeGB['smsSpromote']() //'*𝙃𝙚𝙮@user 𝘼𝙝𝙤𝙧𝙖 𝙚𝙧𝙚𝙨 𝙖𝙙𝙢𝙞𝙣, 𝙙𝙚𝙡 𝙜𝙧𝙪𝙥𝙤😛!!*'
conn.sdemote = lenguajeGB['smsSdemote']() //'*𝙃𝙚𝙮 @user 𝘿𝙀𝙅𝘼𝙔𝙖 𝙣𝙤 𝙚𝙧𝙚𝙨 𝙖𝙙𝙢𝙞𝙣😐!!*'
conn.sDesc = lenguajeGB['smsSdesc']() //'*𝑺𝒆 𝒉𝒂 𝒎𝒐𝒅𝒊𝒇𝒊𝒄𝒂𝒅𝒐 𝒍𝒂 𝒅𝒆𝒔𝒄𝒓𝒊𝒑𝒄𝒊𝒐𝒏 𝒅𝒆𝒍 𝒈𝒓𝒖𝒑𝒐*\n\n*𝑵𝒖𝒆𝒗𝒐 𝒅𝒆𝒔𝒄𝒓𝒊𝒑𝒄𝒊𝒐𝒏:*\n@desc'
conn.sSubject = lenguajeGB['smsSsubject']() //'*𝑺𝒆 𝒉𝒂 𝒎𝒐𝒅𝒊𝒇𝒊𝒄𝒂𝒅𝒐 𝒆𝒍 𝒏𝒐𝒎𝒃𝒓𝒆 𝒅𝒆𝒍 𝒈𝒓𝒖𝒑𝒐*\n*𝑵𝒖𝒆𝒗𝒐 𝒏𝒐𝒎𝒃𝒓𝒆:*\n@subject'
conn.sIcon = lenguajeGB['smsSicon']() //'*𝑺𝒆 𝒉𝒂 𝒄𝒂𝒎𝒃𝒊𝒂𝒅𝒐 𝒍𝒂 𝒇𝒐𝒕𝒐 𝒅𝒆𝒍 𝒈𝒓𝒖𝒑𝒐!!'
conn.sRevoke = lenguajeGB['smsSrevoke']() //'*𝑺𝒆 𝒉𝒂 𝒂𝒄𝒕𝒖𝒂𝒍𝒊𝒛𝒂𝒅𝒐 𝒆𝒍 𝒍𝒊𝒏𝒌 𝒅𝒆𝒍 𝒈𝒓𝒖𝒑𝒐!!*\n*𝑳𝒊𝒏𝒌 𝒏𝒖𝒆𝒗𝒐!!*\n\n*@revoke*'

conn.handler = handler.handler.bind(global.conn)
conn.participantsUpdate = handler.participantsUpdate.bind(global.conn)
conn.groupsUpdate = handler.groupsUpdate.bind(global.conn)
conn.onDelete = handler.deleteUpdate.bind(global.conn)
conn.onCall = handler.callUpdate.bind(global.conn)
conn.connectionUpdate = connectionUpdate.bind(global.conn)
conn.credsUpdate = saveCreds.bind(global.conn, true)

conn.ev.on('messages.upsert', conn.handler)
conn.ev.on('group-participants.update', conn.participantsUpdate)
conn.ev.on('groups.update', conn.groupsUpdate)
conn.ev.on('message.delete', conn.onDelete)
conn.ev.on('call', conn.onCall)
conn.ev.on('connection.update', conn.connectionUpdate)
conn.ev.on('creds.update', conn.credsUpdate)
isInit = false
return true
}

const pluginFolder = global.__dirname(join(__dirname, './plugins/index'))
const pluginFilter = filename => /\.js$/.test(filename)
global.plugins = {}
async function filesInit() {
for (let filename of readdirSync(pluginFolder).filter(pluginFilter)) {
try {
let file = global.__filename(join(pluginFolder, filename))
const module = await import(file)
global.plugins[filename] = module.default || module
} catch (e) {
conn.logger.error(e)
delete global.plugins[filename]
}}}
filesInit().then(_ => Object.keys(global.plugins)).catch(console.error)

global.reload = async (_ev, filename) => {
if (pluginFilter(filename)) {
let dir = global.__filename(join(pluginFolder, filename), true)
if (filename in global.plugins) {
if (existsSync(dir)) conn.logger.info(` updated plugin - '${filename}'`)
else {
conn.logger.warn(`deleted plugin - '${filename}'`)
return delete global.plugins[filename]
}
} else conn.logger.info(`new plugin - '${filename}'`)
let err = syntaxerror(readFileSync(dir), filename, {
sourceType: 'module',
allowAwaitOutsideFunction: true
})
if (err) conn.logger.error(`syntax error while loading '${filename}'\n${format(err)}`)
else try {
const module = (await import(`${global.__filename(dir)}?update=${Date.now()}`))
global.plugins[filename] = module.default || module
} catch (e) {
conn.logger.error(`error require plugin '${filename}\n${format(e)}'`)
} finally {
global.plugins = Object.fromEntries(Object.entries(global.plugins).sort(([a], [b]) => a.localeCompare(b)))
}}}
Object.freeze(global.reload)
watch(pluginFolder, global.reload)
await global.reloadHandler()
async function _quickTest() {
let test = await Promise.all([
spawn('ffmpeg'),
spawn('ffprobe'),
spawn('ffmpeg', ['-hide_banner', '-loglevel', 'error', '-filter_complex', 'color', '-frames:v', '1', '-f', 'webp', '-']),
spawn('convert'),
spawn('magick'),
spawn('gm'),
spawn('find', ['--version'])
].map(p => {
return Promise.race([
new Promise(resolve => {
p.on('close', code => {
resolve(code !== 127)
})}),
new Promise(resolve => {
p.on('error', _ => resolve(false))
})])}))
let [ffmpeg, ffprobe, ffmpegWebp, convert, magick, gm, find] = test
let s = global.support = { ffmpeg, ffprobe, ffmpegWebp, convert, magick, gm, find }
Object.freeze(global.support)
}
setInterval(async () => {
var a = await clearTmp()    
console.log(chalk.cyanBright(lenguajeGB['smsClearTmp']()))
}, 900000) //15 min
_quickTest()
.then(() => conn.logger.info(lenguajeGB['smsCargando']()))
.catch(console.error)
