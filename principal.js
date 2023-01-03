proceso.env['NODE_TLS_REJECT_UNAUTHORIZED'] = '0'; //SI QUIERES TEXTO SIMPLIFICADO EN LA CONSOLA USA ESTE CÓDIGO
importar './config.js';
importar { createRequire } desde "módulo";
importar ruta, {unirse} desde 'ruta'
importar { fileURLToPath, pathToFileURL } desde 'url'
importar {plataforma} desde 'proceso'
importar * como ws desde 'ws';
importar { readdirSync, statSync, unlinkSync, existSync, readFileSync, rmSync, ver } desde 'fs';
//importar reloj desde 'glob-fs'
importar yargs de 'yargs';
importar {spawn} desde 'child_process';
importar lodash desde 'lodash';
importar tiza de 'tiza';
importar error de sintaxis desde 'error de sintaxis';
importar {tmpdir} desde 'os';
importar {formato} desde 'util';
importar P de 'pino';
import {makeWASocket, protoType, serialize} from './lib/simple.js';
importar { Low, JSONFile } desde 'lowdb';
importar { mongoDB, mongoDBV2 } desde './lib/mongoDB.js';
importar tienda desde './lib/store.js'
const {DisconnectReason, useMultiFileAuthState} = esperar importación('@adiwajshing/baileys')
const { CONECTANDO } = ws
const {cadena} = lodash
const PUERTO = proceso.env.PORT || proceso.env.SERVER_PORT || 3000

prototipo()
publicar por fascículos()

global.__filename = function filename(pathURL = import.meta.url, rmPrefix = plataforma! == 'win32') { return rmPrefix ? /file:\/\/\//.test(rutaURL) ? fileURLToPath(pathURL) : pathURL : pathToFileURL(pathURL).toString() }; global.__dirname = function dirname(rutaURL) { return ruta.dirname(global.__filename(rutaURL, verdadero)) }; global.__require = function require(dir = import.meta.url) { return createRequire(dir) }

global.API = (nombre, ruta = '/', consulta = {}, apikeyqueryname) => (nombre en global.APIs ? global.APIs[nombre] : nombre) + ruta + (consulta || apikeyqueryname ? '?' + new URLSearchParams(Object.entries({ ...consulta, ...(apikeyqueryname ? { [apikeyqueryname]: global.APIKeys[nombre en global.APIs ? global.APIs[nombre] : nombre] } : {}) } )) : '')

global.timestamp = { inicio: nueva fecha }

const __dirname = global.__dirname(import.meta.url)

global.opts = new Object(yargs(process.argv.slice(2)).exitProcess(false).parse())
global.prefix = new RegExp('^[' + (opts['prefix'] || 'xzXZ/i!#$%+£¢€¥^°=¶∆×÷π√✓©®:;?& .\\-HhhHBb.aA').replace(/[|\\{}()[\]^$+*?.\-\^]/g, '\\$&') + ']')

global.db = new Low(/https?:\/\//.test(opts['db'] || '') ? new cloudDBAdapter(opts['db']) : new JSONFile(`${opts. _[0] ? opciones._[0] + '_': ''}base de datos.json`))

global.DATABASE = global.db // Compatibilidad con versiones anteriores
global.loadDatabase = función asíncrona loadDatabase() {
if (global.db.READ) devuelve una nueva promesa ((resolver) => setInterval (función asíncrona () {
si (!global.db.LEER) {
clearInterval(esto)
resolve(global.db.data == null ? global.loadDatabase() : global.db.data)
}
}, 1 * 1000))
si (global.db.data !== null) devuelve
global.db.LEER = verdadero
espera global.db.read().catch(console.error)
global.db.READ = nulo
global.db.datos = {
usuarios: {},
charlas: {},
estadísticas: {},
mensajes: {},
pegatina: {},
ajustes: {},
...(global.db.datos || {})
}
global.db.cadena = cadena(global.db.datos)
}
cargarBase de datos()

global.authFile = `Hades-Sesión`
const { estado, saveState, saveCreds } = esperar useMultiFileAuthState(global.authFile)

const opciones de conexión = {
imprimirQRInTerminal: verdadero,
autenticación: estado,
registrador: P({nivel: 'silencioso'}),
navegador: ['The-Hades-Bot-MD','Safari','1.0.0']
}

global.conn = makeWASocket(opciones de conexión)
conn.isInit = falso

si (! opciones ['prueba']) {
if (global.db) setInterval(async() => {
si (global.db.data) espera global.db.write()
if (opts['autocleartmp'] && (global.support || {}).find) (tmp = [os.tmpdir(), 'tmp'], tmp.forEach(filename => cp.spawn('find' , [nombre de archivo, '-amin', '3', '-tipo', 'f', '-eliminar'])))
}, 30 * 1000)}

if (opts['server']) (esperar importación('./server.js')).default(global.conn, PORT)

función borrar Tmp () {
const tmp = [tmpdir(), join(__dirname, './tmp')]
const nombre de archivo = []
tmp.forEach(dirname => readdirSync(dirname).forEach(file => filename.push(join(dirname, file))))
devuelve nombre de archivo.map(archivo => {
const stats = statSync(archivo)
if (stats.isFile() && (Date.now() - stats.mtimeMs >= 1000 * 60 * 3)) return unlinkSync(file) // 3 minutos
falso retorno
})}

conexión de función asíncrona Actualización (actualización) {
const { conexión, última desconexión, isNewLogin } = actualizar
if (isNewLogin) conn.isInit = verdadero
const código = lastDisconnect?.error?.output?.statusCode || lastDisconnect?.error?.output?.payload?.statusCode
if (código && código !== DisconnectReason.loggedOut && conn?.ws.readyState !== CONECTANDO) {
consola.log(espera global.reloadHandler(verdadero).catch(consola.error))
global.timestamp.connect = nueva fecha
}
if (global.db.data == nulo) loadDatabase()
si (conexión == 'abrir') {
console.log(tiza.amarillo(`▣──────────────────────────────···\n│\n│❧ 𝙲𝙾𝙽𝙴𝙲𝚃𝙰𝙳𝙾 𝙲𝙾𝚁𝚁𝙴𝙲𝚃𝙰𝙼𝙴𝙽𝚃𝙴 𝙰𝙻 𝚆𝙷𝙰𝚃𝚂𝙰𝙿𝙿 ✅ \ n│ \ n▣ versión
}

proceso.on('excepción no detectada', consola.error)

let isInit = verdadero;
dejar controlador = esperar importación ('./controlador.js')
global.reloadHandler = función asíncrona (restatConn) {
tratar {
const Manejador = aguardar importación(`./handler.js?update=${Date.now()}`).catch(console.error)
if (Objeto.claves(Manejador || {}).longitud) manejador = Manejador
} atrapar (e) {
consola.error(e)
}
si (reestablecer conexión) {
const oldChats = global.conn.chats
intente { global.conn.ws.close() } catch { }
conn.ev.removeAllListeners()
global.conn = makeWASocket(opciones de conexión, { chats: oldChats })
esInicio = verdadero
}
si (! isInit) {
conn.ev.off('mensajes.upsert', conn.handler)
conn.ev.off('grupo-participantes.actualizar', conn.participantesActualizar)
conn.ev.off('groups.update', conn.groupsUpdate)
conn.ev.off('mensaje.eliminar', conn.onDelete)
conn.ev.off('llamada', conn.onLlamar)
conn.ev.off('conexión.actualizar', conn.conexiónActualizar)
conn.ev.off('creds.update', conn.credsUpdate)
}
  
conn.wElcome = '╭─ig 𝙼𝙸 𝙲𝚁𝙴𝙰𝙳𝙾𝚁 \ n│📔ᩭ✎http: //wa.me/5212411347465 \ n│📚ᩭ✎𝙴𝙽 𝙴𝚂𝚃𝙴 𝙶𝚁𝚄𝙿𝙾 𝙿𝚄𝙴𝙳𝙴𝚂 𝙴𝙽𝙲𝙾𝙽𝚃𝚁𝙰𝚁 \ n│🍀ᩭ✎𝙰𝙼𝙸𝚂𝚃𝙰𝙳𝙴𝚂 \ n│🤝ᩭ✎𝙰𝙼𝙸𝙶𝙾𝚂 \ n│❤️📚ᩭ✎𝙳𝙴𝚂𝙼𝙰𝙳𝚁𝙴 │◦➛😇ᩭ✎𝙲𝙾𝚃𝙾𝚁𝚁𝙴𝙾 𝚈 𝙼á𝚂 \ n│⁉️ᩭ✎𝙰𝚅𝙸𝚂𝙾 𝙸𝙼𝙿𝙾𝚁𝚃𝙰𝙽𝚃𝙴: \ n𝙿𝚘𝚛 𝚏𝚊𝚟𝚘𝚛 𝙻𝚎𝚎 𝚕𝚊𝚜 𝚛𝚎𝚐𝚕𝚊𝚜 𝚍𝚎𝚕 𝚐𝚛𝚞𝚙𝚘 𝚙𝚊𝚛𝚊 𝚚𝚞𝚎 𝚎𝚟𝚒𝚝𝚎𝚜 𝚜𝚎𝚛 𝚎𝚕𝚒𝚖𝚒𝚗𝚊𝚍𝚘 𝚢 𝚎𝚟𝚒𝚝𝚎𝚜 𝚝𝚎𝚗𝚎𝚛 𝚙𝚛𝚘𝚋𝚕𝚎𝚖𝚊𝚜 𝚌𝚘𝚗 𝚌𝚛𝚎𝚊𝚍𝚘𝚛 𝚐𝚛𝚞 𝚐𝚛𝚞 \ n│@Desc \ n│◦ ➛🌱 ➛🌱 ➛🌱 ➛🌱 ➛🌱 ➛🌱 ➛🌱. 𝐎𝐅𝐂 𝐘𝐎𝐕𝐀𝐍𝐈\n╰────────────┈⊷'

conn.bye = '╭───── °. ♡. ° ‧──── razón n│🌱𝐎𝐅𝐂 𝐘𝐎𝐕𝐀𝐍𝐈☘\n╰────────────┈⊷️'
conn.spromote = '@usuario 𝚂𝙴 𝚂𝚄𝙼𝙰 𝙰𝙻 𝙶𝚁𝚄𝙿𝙾 𝙳𝙴'
conn.sdemote = '@usuario n𝙰𝙱𝙰𝙽𝙳𝙾𝙽𝙰 𝙴𝙻 𝙶𝚁𝚄𝙿𝙾 𝙳𝙴 𝙰𝙳𝙼𝙸𝙽𝚂'
conn.ssubject = '@subject \ n│◦➛📚ᩭ✎𝚂𝙴 𝙷𝙰 𝙼𝙾𝙳𝙸𝙵𝙸𝙲𝙰𝙳𝙾 𝙴𝙻 𝙽𝙾𝙼𝙱𝚁𝙴 𝙳𝙴𝙻 𝙶𝚁𝚄𝙿𝙾'
conn.srevoke = '@desc \ n│◦➛📚ᩭ✎𝚂𝙴 𝙷𝙰 𝙼𝙾𝙳𝙸𝙵𝙸𝙲𝙰𝙳𝙾 𝙻𝙰 𝙳𝙴𝚂𝙲𝚁𝙸𝙿𝙲𝙸𝙾𝙽 𝙳𝙴𝙻 𝙶𝚁𝚄𝙿𝙾'
conn.srevoke = '@revoke \ n│◦➛📚ᩭ✎𝚂𝙴 𝙷𝙰 𝙰𝙲𝚃𝚄𝙰𝙻𝙸𝚉𝙰𝙳𝙾 𝙴𝙻 𝙻𝙸𝙽𝙺 𝙳𝙴𝙻 𝙶𝚁𝚄𝙿𝙾 𝙶𝚁𝚄𝙿𝙾 𝙶𝚁𝚄𝙿𝙾 𝙶𝚁𝚄𝙿𝙾 𝙶𝚁𝚄𝙿𝙾 𝙶𝚁𝚄𝙿𝙾 𝙶𝚁𝚄𝙿𝙾 𝙶𝚁𝚄𝙿𝙾 𝙶𝚁𝚄𝙿𝙾 𝙶𝚁𝚄𝙿𝙾 𝙶𝚁𝚄𝙿𝙾 𝙶𝚁𝚄𝙿𝙾 𝙶𝚁𝚄𝙿𝙾 𝙶𝚁𝚄𝙿𝙾 𝙶𝚁𝚄𝙿𝙾 𝙶𝚁𝚄𝙿𝙾 𝙶𝚁𝚄𝙿𝙾 𝙶𝚁𝚄𝙿𝙾 𝙶𝚁𝚄𝙿𝙾 𝙶𝚁𝚄𝙿𝙾 𝙶𝚁𝚄𝙿𝙾 𝙶𝚁𝚄𝙿𝙾 𝙶𝚁𝚄𝙿𝙾 𝙶𝚁𝚄𝙿𝙾 𝙶𝚁𝚄𝙿𝙾 𝙶𝚁𝚄𝙿𝙾

conn.handler = handler.handler.bind(global.conn)
conn.participantsUpdate = controlador.participantsUpdate.bind(global.conn)
conn.groupsUpdate = controlador.groupsUpdate.bind(global.conn)
conn.onDelete = handler.deleteUpdate.bind(global.conn)
conn.onCall = handler.callUpdate.bind(global.conn)
conn.conexiónActualizar = conexiónActualizar.bind(global.conn)
conn.credsUpdate = saveCreds.bind(global.conn, true)

conn.ev.on('mensajes.upsert', conn.handler)
conn.ev.on('group-participants.update', conn.participantsUpdate)
conn.ev.on('groups.update', conn.groupsUpdate)
conn.ev.on('mensaje.eliminar', conn.onEliminar)
conn.ev.on('llamada', conn.onLlamar)
conn.ev.on('conexión.actualizar', conn.conexiónActualizar)
conn.ev.on('creds.update', conn.credsUpdate)
esInicio = falso
volver verdadero
}

const pluginFolder = global.__dirname(join(__dirname, './plugins/index'))
const pluginFilter = nombre de archivo => /\.js$/.test(nombre de archivo)
complementos globales = {}
función asíncrona archivosInit() {
for (let filename of readdirSync(pluginFolder).filter(pluginFilter)) {
tratar {
let file = global.__filename(join(pluginFolder, filename))
módulo const = esperar importación (archivo)
global.plugins[nombre de archivo] = módulo.predeterminado || módulo
} atrapar (e) {
conn.registrador.error(e)
eliminar global.plugins[nombre de archivo]
}}}
archivosInit().then(_ => Object.keys(global.plugins)).catch(console.error)

global.reload = asíncrono (_ev, nombre de archivo) => {
if (pluginFilter(nombre de archivo)) {
let dir = global.__filename(join(pluginFolder, filename), true)
if (nombre de archivo en global.plugins) {
if (existsSync(dir)) conn.logger.info(` plugin actualizado - '${filename}'`)
más {
conn.logger.warn(`complemento eliminado - '${nombre de archivo}'`)
volver eliminar global.plugins[nombre de archivo]
}
} else conn.logger.info(`nuevo complemento - '${nombre de archivo}'`)
let err = syntaxerror(readFileSync(dir), nombre de archivo, {
sourceType: 'módulo',
allowAwaitOutsideFunction: verdadero
})
if (err) conn.logger.error(`error de sintaxis al cargar '${nombre de archivo}'\n${formato(err)}`)
más prueba {
módulo const = (esperar importación(`${global.__filename(dir)}?update=${Date.now()}`))
global.plugins[nombre de archivo] = módulo.predeterminado || módulo
} atrapar (e) {
conn.logger.error(`error requiere complemento '${nombre de archivo}\n${formato(e)}'`)
} finalmente {
global.plugins = Object.fromEntries(Object.entries(global.plugins).sort(([a], [b]) => a.localeCompare(b)))
}}}
Objeto.congelar(global.recargar)
ver (pluginFolder, global.reload)
esperar global.reloadHandler()
función asíncrona _quickTest() {
dejar probar = esperar Promesa.todo([
engendrar('ffmpeg'),
engendrar('ffprobe'),
spawn('ffmpeg', ['-hide_banner', '-loglevel', 'error', '-filter_complex', 'color', '-frames:v', '1', '-f', 'webp', '-']),
engendrar('convertir'),
engendrar('magia'),
engendrar('gm'),
spawn('buscar', ['--version'])
].mapa(p => {
return Promesa.carrera([
nueva Promesa(resolver => {
p.on('cerrar', código => {
resolver (código! == 127)
})}),
nueva Promesa(resolver => {
p.on('error', _ => resolver(falso))
})])}))
let [ffmpeg, ffprobe, ffmpegWebp, convert, magick, gm, find] = prueba
let s = global.support = { ffmpeg, ffprobe, ffmpegWebp, convert, magick, gm, find }
Objeto.freeze(global.soporte)
}
establecerIntervalo(async() => {
var a = esperar clearTmp()
console.log (chalk.cyanbright (`\ n▣───igulo \n│\n▣─────────────────────────────────────··\n`··\n') )
}, 180000)
_examen rápido()
.entonces(() => conn.logger.info(`Ƈᴀʀɢᴀɴᴅᴏ..\n`))
.catch(consola.error)
