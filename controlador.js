importar {smsg} desde './lib/simple.js'
importar {formato} desde 'util'
importar {fileURLToPath} desde 'url'
importar ruta, {unirse} desde 'ruta'
importar {unwatchFile, watchFile} desde 'fs'
importar tiza desde 'tiza'

/**
 * @tipo {importación('@adiwajshing/baileys')}
 */
const { proto } = (esperar importación('@adiwajshing/baileys')).predeterminado
const esNúmero = x => tipo de x === 'número' && !isNaN(x)
const delay = ms => isNumber(ms) && new Promise(resolve => setTimeout(function () {
    clearTimeout(esto)
    resolver()
}, milisegundo))

/**
 * Manejar mensajes upsert
 * @param {import('@adiwajshing/baileys').BaileysEventMap<unknown>['messages.upsert']} groupUpdate
 */
exportar controlador de función asíncrona (chatUpdate) {
    este.msgqueque = este.msgqueque || []
    si (! actualización de chat)
        devolver
    this.pushMessage(chatUpdate.messages).catch(console.error)
    let m = chatUpdate.messages[chatUpdate.messages.length - 1]
    si (!m)
        devolver
    si (global.db.datos == nulo)
        esperar global.loadDatabase()
    tratar {
        m = smsg(esto, m) || metro
        si (! m)
            devolver
        m.exp = 0
        m.límite = falso
        tratar {
            // TODO: use loop para insertar datos en lugar de esto
            let usuario = global.db.data.users[m.sender]
            if (tipo de usuario! == 'objeto')
                global.db.data.users[m.remitente] = {}
            si (usuario) {
                if (!isNumber(usuario.exp)) usuario.exp = 0
                if (!isNumber(user.limit)) user.limit = 10
                if (!isNumber(usuario.últimoreclamo)) usuario.últimoreclamo = 0
                if (!('registrado' en usuario)) usuario.registrado = falso
              if (!usuario.registrado) {
                if (!('nombre' en usuario)) usuario.nombre = m.nombre
                if (!isNumber(usuario.edad)) usuario.edad = -1
                if (!isNumber(usuario.regTime)) usuario.regTime = -1
               }
                if (!isNumber(usuario.afk)) usuario.afk = -1
                if (!('afkRazón' en usuario)) usuario.afkRazón = ''
                if (!('prohibido' en usuario)) usuario.prohibido = falso
                if (!isNumber(usuario.advertencia)) usuario.advertencia = 0
                if (!isNumber(usuario.nivel)) usuario.nivel = 0
                if (!('rol' en usuario)) usuario.role = 'Novato'
                if (!('autolevelup' en usuario)) user.autolevelup = true
                if (!isNumber(usuario.dinero)) usuario.dinero = 0
                if (!isNumber(user.limit)) user.limit = 10
                if (!isNumber(usuario.últimoreclamo)) usuario.últimoreclamo = 0
            } más
                global.db.data.users[m.remitente] = {
                    experiencia: 0,
                    límite: 10,
                    último reclamo: 0,
                    registrado: falso,
                    nombre: m.nombre,
                    edad: -1,
                    tiempo de registro: -1,
                    afk: -1,
                    afkRazón: '',
                    prohibido: falso,
                    advertir: 0,
                    nivel: 0,
                    papel: 'Novato',
                    nivelación automática: cierto,
                    dinero: 0,
                    límite: 10,
                    último reclamo: 0,
                    última semana: 0,
                    último mes: 0,
                }
            let chat = global.db.data.chats[m.chat]
            if (tipo de chat! == 'objeto')
                global.db.data.chats[m.chat] = {}
            si (chatear) {
                if (!('isBanned' in chat)) chat.isBanned = false
                if (!('bienvenido' en el chat)) chat.bienvenido = verdadero
                if (!('detectar' en el chat)) chat.detect = true
                if (!('Bienvenido' en el chat)) chat.sBienvenido = ''
                if (!('Adiós' en el chat)) chat.sAdiós = ''
                if (!('Promover' en el chat)) chat.sPromover = ''
                if (!('sDemote' en el chat)) chat.sDemote = ''
                if (!('eliminar' en el chat)) chat.eliminar = verdadero
                if (!('modohorny' en el chat)) chat.modohorny = false    
                if (!('autosticker' en el chat)) chat.autosticker = false                    
                if (!('audios' en el chat)) chat.audios = falso                            
                if (!('antiEnlace' en el chat)) chat.antiEnlace = falso
                if (!('antiLink2' en el chat)) chat.antiLink2 = falso
                if (!('antiviewonce' en el chat)) chat.antiviewonce = false
                if (!('antitóxico' en el chat)) chat.antitóxico = falso
                if (!('antiTraba' en el chat)) chat.antiTraba = false
                if (!('antiárabe' en el chat)) chat.antiárabe = falso
                if (!isNumber(chat.caducado)) chat.caducado = 0
            } más
                global.db.data.chats[m.chat] = {
                    está prohibido: falso,
                    bienvenido: cierto,
                    detectar: ​​verdadero,
                    sBienvenido: '',
                    adiós: '',
                    sPromocionar: '',
                    sDegradar: '',
                    eliminar: cierto,
                    modohorny: cierto,
                    autoadhesivo: falso,
                    audio: cierto,
                    antienlace: falso,
                    antiLink2: falso,
                    antiviewonce: falso,
                    antitóxico: falso,
                    antiTraba: falso,
                    antiárabe: falso,
                    caducado: 0,
                }
            let settings = global.db.data.settings[this.user.jid]
            if (tipo de configuración! == 'objeto') global.db.data.settings[this.user.jid] = {}
            si (configuración) {
                if (!('self' in settings)) settings.self = false
                if (!('autolectura' en la configuración)) configuración.autolectura = falso
                if (!('restringir' en la configuración)) configuración.restringir = falso
                if (!('antiCall' en la configuración)) settings.antiCall = falso
                if (!('antiPrivate' en la configuración)) settings.antiPrivate = false
            } else global.db.data.settings[este.usuario.jid] = {
                yo: falso,
                lectura automática: falso,
                restringir: falso,
                antillamada: falso,
                antiprivado: falso
            }
        } atrapar (e) {
            consola.error(e)
        }
        si (opta['nyimak'])
            devolver
        if (!m.fromMe && opts['self'])
            devolver
        if (opts['pconly'] && m.chat.endsWith('g.us'))
            devolver
        if (opts['gconly'] && !m.chat.endsWith('g.us'))
            devolver
        if (opts['swonly'] && m.chat !== 'status@broadcast')
            devolver
        if (tipo de m.texto! == 'cadena')
            m.texto = ''

        const isROwner = [conn.decodeJid(global.conn.user.id), ...global.propietario.map(([number]) => number)].map(v => v.replace(/[^0 -9]/g, '') + '@s.whatsapp.net').incluye(m.remitente)
        const esPropietario = esROpropietario || m.fromMe
        const isMods = isOwner || global.mods.map(v => v.replace(/[^0-9]/g, '') + '@s.whatsapp.net').includes(m.sender)
        const isPrems = isROwner || global.prems.map(v => v.replace(/[^0-9]/g, '') + '@s.whatsapp.net').includes(m.sender)

        if (opts['queque'] && m.text && !(isMods || isPrems)) {
            let queque = this.msgqueque, tiempo = 1000 * 5
            const ID anterior = queque[queque.longitud - 1]
            queque.push(m.id || m.key.id)
            setInterval(función asíncrona () {
                if (queque.indexOf(previousID) === -1) clearInterval(this)
                esperar retraso (tiempo)
            }, hora)
        }

        si (m.isBaileys)
            devolver
        m.exp += Math.ceil(Math.random() * 10)

        let usedPrefix
        let _user = global.db.data && global.db.data.users && global.db.data.users[m.sender]

        const groupMetadata = (m.isGroup ? ((conn.chats[m.chat] || {}).metadata || espera esto.groupMetadata(m.chat).catch(_ => null)) : {}) | | {}
        const participantes = (m.isGroup ? groupMetadata.participants : []) || []
        const usuario = (m.isGroup ? participantes.find(u => conn.decodeJid(u.id) === m.sender) : {}) || {} // Datos del usuario
        const bot = (m.isGroup ? participantes.find(u => conn.decodeJid(u.id) == this.user.jid) : {}) || {} // Tu información
        const isRAdmin = usuario?.admin == 'superadministrador' || falso
        const esAdmin = esRAdmin || usuario?.admin == 'administrador' || false // ¿Es usuario administrador?
        const isBotAdmin = bot?.admin || false // ¿Eres administrador?

        const ___dirname = ruta.join(ruta.dirname(fileURLToPath(import.meta.url)), './plugins')
        for (deje el nombre en global.plugins) {
            let plugin = global.plugins[nombre]
            si (! complemento)
                Seguir
            si (complemento.deshabilitado)
                Seguir
            const __filename = join(___dirname, nombre)
            if (typeof plugin.all === 'función') {
                tratar {
                    espera plugin.all.call(esto, m, {
                        actualización de chat,
                        __dirname: ___dirname,
                        __Nombre del archivo
                    })
                } atrapar (e) {
                    // si (tipo de e === 'cadena') continuar
                    consola.error(e)
                    for (let [jid] of global.owner.filter(([number, _, isDeveloper]) => isDeveloper && number)) {
                        let data = (esperar conn.onWhatsApp(jid))[0] || {}
                        si (datos.existe)
                            M.Rply (`*[⚠️ 𝚁𝙴𝙿𝙾𝚁𝚃𝙴 𝙳𝙴 𝙲𝙾𝙼𝙰𝙽𝙳𝙾 𝙲𝙾𝙽 𝙵𝙰𝙻𝙻𝙾𝚂 ⚠️]*\ n \ n*—◉ 𝙿𝙻𝚄𝙶𝙸𝙽:*$ {nombre} \ n*𝚄𝚂𝚄𝙰𝚁𝙸𝙾 𝚄𝚂𝚄𝙰𝚁𝙸𝙾:*$ {M.Sender} \ n*—◉ 𝙲𝙾𝙼𝙰𝙽𝙳𝙾 𝙲𝙾𝙼𝙰𝙽𝙳𝙾 𝙲𝙾𝙼𝙰𝙽𝙳𝙾 :* ${m.text}\n\n*—◉ 𝙴𝚁𝚁𝙾𝚁:*\n\`\`\`${formato(e)}\`\`\`\n\n*[❗] 𝚁𝙴𝙿𝙾𝚁𝚃𝙴𝙻𝙾 𝙰𝙴 𝙁𝙾𝙁𝙾 𝙳𝙴𝙻 𝙱𝙾𝚃 𝙿𝙰𝚁𝙰 𝙳𝙰𝚁𝙻𝙴 𝚄𝙽𝙰 𝚂𝙾𝙻𝚄𝙲𝙸𝙾𝙽, 𝙿𝚄𝙴𝙳𝙴 𝚄𝚂𝙰𝚁 𝙴𝙻 𝙲𝙾𝙼𝙰𝙽𝙳𝙾 #informe*`.trim (), data.jid)
                    }
                }
            }
            if (!opts['restringir'])
                if (plugin.tags && plugin.tags.includes('admin')) {
                    // global.dfail('restringir', m, esto)
                    Seguir
                }
            const str2Regex = str => str.replace(/[|\\{}()[\]^$+*?.]/g, '\\$&')
            let _prefix = plugin.customPrefix ? plugin.customPrefix: conn.prefix? conn.prefijo : global.prefijo
            let match = (_prefix instanceof RegExp ? // ¿Modo RegExp?
                [[_prefix.exec(m.text), _prefix]] :
                Array.isArray(_prefijo) ? // ¿matriz?
                    _prefijo.mapa(p => {
                        let re = p instancia de RegExp ? // RegExp en matriz?
                            pag :
                            nueva RegExp(str2Regex(p))
                        volver [re.exec(m.text), re]
                    }):
                    typeof _prefix === 'cadena' ? // ¿Cadena?
                        [[nueva RegExp(str2Regex(_prefix)).exec(m.text), nueva RegExp(str2Regex(_prefix))]] :
                        [[[], nueva expresión regular]]
            ).encontrar(p => p[1])
            if (typeof plugin.before === 'función') {
                if (espera plugin.before.call(this, m, {
                    fósforo,
                    Con: esto,
                    Participantes,
                    grupo de metadatos,
                    usuario,
                    bot,
                    esROpropietario,
                    es dueño,
                    esRAdmin,
                    es administrador,
                    esAdministradorBot,
                    esprems,
                    actualización de chat,
                    __dirname: ___dirname,
                    __Nombre del archivo
                }))
                    Seguir
            }
            if (tipo de complemento! == 'función')
                Seguir
            if ((prefijousado = (coincidencia[0] || '')[0])) {
                let noPrefix = m.text.replace(usedPrefix, '')
                let [comando, ...argumentos] = noPrefix.trim().split` `.filter(v => v)
                argumentos = argumentos || []
                let _args = noPrefix.trim().split` `.slice(1)
                dejar texto = _args.join` `
                comando = (comando || '').toLowerCase()
                dejar fallar = complemento.fallar || global.dfail // Cuando falla
                let isAccept = plugin.command instancia de RegExp ? // ¿Modo expresión regular?
                    plugin.command.test(comando) :
                    Array.isArray(complemento.comando) ? // ¿matriz?
                        plugin.command.some(cmd => cmd instancia de RegExp ? // RegExp en Array?
                            cmd.test(comando) :
                            cmd === comando
                        ) :
                        typeof plugin.command === 'cadena' ? // ¿Cadena?
                            complemento.comando === comando:
                            falso

                si (! es Aceptar)
                    Seguir
                m.plugin = nombre
                if (m.chat en global.db.data.chats || m.sender en global.db.data.users) {
                    let chat = global.db.data.chats[m.chat]
                    let usuario = global.db.data.users[m.sender]
                    if (name != 'propietario-desbanchat.js' && chat?.isBanned)
                        volver // Excepto esto
                    if (nombre != 'propietario-unbanuser.js' && usuario?.banned)
                        devolver
                }
                if (plugin.rowner && plugin.owner && !(isROwner || isOwner)) { // Ambos propietarios
                    fail('propietario', m, esto)
                    Seguir
                }
                if (plugin.rowner && !isROwner) { // Propietario real
                    fail('propietario', m, esto)
                    Seguir
                }
                if (plugin.propietario && !isOwner) { // Propietario del número
                    fail('propietario', m, esto)
                    Seguir
                }
                if (plugin.mods && !isMods) { // Moderador
                    fail('mods', m, esto)
                    Seguir
                }
                if (complemento.premium && !isPrems) { // Premium
                    fail('premium', m, esto)
                    Seguir
                }
                if (plugin.group && !m.isGroup) { // Solo grupo
                    fail('grupo', m, esto)
                    Seguir
                } else if (plugin.botAdmin && !isBotAdmin) { // Tu administrador
                    fail('botAdmin', m, esto)
                    Seguir
                } else if (plugin.admin && !isAdmin) { // Administrador de usuarios
                    fail('administrador', m, esto)
                    Seguir
                }
                if (plugin.private && m.isGroup) { // Solo chat privado
                    fail('privado', m, esto)
                    Seguir
                }
                if (plugin.register == true && _user.registered == false) { // Butuh daftar?
                    fail('desreg', m, esto)
                    Seguir
                }
                m.esComando = verdadero
                let xp = 'exp' en el complemento? parseInt (plugin.exp): 17 // Ganancia de XP por comando
                si (exp > 200)
                    m.reply('Ngecit -_-') // Jejeje
                más
                    m.exp += xp
                if (!isPrems && plugin.limit && global.db.data.users[m.sender].limit < plugin.limit * 1) {
                    this.reply (m.chat, `*[❗𝐈𝐍𝐅𝐎 ❗] 𝚂𝚄𝚂 𝙳𝙸𝙰𝙼𝙰𝙽𝚃𝙴𝚂 𝚂𝙴 𝙷𝙰𝙽 𝙰𝙶𝙾𝚃𝙰𝙳𝙾, 𝙿𝚄𝙴𝙳𝙴 𝙲𝙾𝙼𝙿𝚁𝙰𝚁 𝙼𝙰𝚂 𝚄𝚂𝙰𝙽𝙳𝙾 𝙲𝙾𝙼𝙰𝙽𝙳𝙾 𝙲𝙾𝙼𝙰𝙽𝙳𝙾 $ {usedprefix} comprar <cantidad>*`, m)
                    continuar // Limitar habis
                }
                if (complemento.nivel > _usuario.nivel) {
                    this.reply (m.chat, `*[❗𝐈𝐍𝐅𝐎 ❗] 𝚂𝙴 𝚁𝙴𝚀𝚄𝙸𝙴𝚁𝙴 𝙴𝙻 𝙽𝙸𝚅𝙴𝙻 $ {plugin.level} 𝙿𝙰𝚁𝙰 𝚄𝚂𝙰𝚁 𝙴𝚂𝚃𝙴 𝙲𝙾𝙼𝙰𝙽𝙳𝙾. 𝚃𝚄 𝙽𝙸𝚅𝙴𝙻 𝙴𝚂 $ {_ user.level}*`, m)
                    continuar // Si no se ha alcanzado el nivel
                }
                dejar extra = {
                    fósforo,
                    prefijo usado,
                    sin prefijo,
                    _argumentos,
                    argumentos,
                    dominio,
                    texto,
                    Con: esto,
                    Participantes,
                    grupo de metadatos,
                    usuario,
                    bot,
                    esROpropietario,
                    es dueño,
                    esRAdmin,
                    es administrador,
                    esAdministradorBot,
                    esprems,
                    actualización de chat,
                    __dirname: ___dirname,
                    __Nombre del archivo
                }
                tratar {
                    espera plugin.call(esto, m, extra)
                    si (! es Prem)
                        m.límite = m.límite || plugin.limit || falso
                } atrapar (e) {
                    // Ocurrió un error
                    m.error = e
                    consola.error(e)
                    si (e) {
                        let texto = formato (e)
                        for (let key of Object.values(global.APIKeys))
                            text = text.replace(new RegExp(key, 'g'), '#HIDDEN#')
                        si (e.nombre)
                            for (let [jid] of global.owner.filter(([number, _, isDeveloper]) => isDeveloper && number)) {
                                let data = (esperar conn.onWhatsApp(jid))[0] || {}
                                si (datos.existe)
                                    M.Rply (`*[⚠️ 𝚁𝙴𝙿𝙾𝚁𝚃𝙴 𝙳𝙴 𝙲𝙾𝙼𝙰𝙽𝙳𝙾 𝙲𝙾𝙽 𝙵𝙰𝙻𝙻𝙾𝚂 ⚠️]*\ n \ n*—◉ 𝙿𝙻𝚄𝙶𝙸𝙽:*$ {M.Plugin} \ n*—◉ 𝚄𝚂𝚄𝙰𝚁𝙸𝙾:*$ {M.Sender} \ n* - - - - ◉ 𝙲𝙾𝙼𝙰𝙽𝙳𝙾:* ${prefijousado}${comando} ${args.join(' ')}\n\n\`\`\`${texto}\`\`\`\n\n*[❗] 𝚁𝙴𝙿𝙾𝚁𝚃𝙴𝙻𝙾 𝙰𝙻 𝙲𝚁𝙴𝙰𝙳𝙾𝚁 𝙳𝙴𝙻 𝙱𝙾𝚃 𝙿𝙰𝚁𝙰 𝙳𝙰𝚁𝙻𝙴 𝚄𝙽𝙰 𝚂𝙾𝙻𝚄𝙲𝙸𝙾𝙽, 𝙿𝚄𝙴𝙳𝙴 𝚄𝚂𝙰𝚁 𝙴𝙻 𝙲𝙾𝙼𝙰𝙽𝙳𝙾 #informe*`.trim (), data.jid)
                            }
                        m.responder(texto)
                    }
                } finalmente {
                    // m.respuesta(util.formato(_usuario))
                    if (typeof plugin.after === 'función') {
                        tratar {
                            espera plugin.after.call(this, m, extra)
                        } atrapar (e) {
                            consola.error(e)
                        }
                    }
                    si (m.límite)
                        m.reply(+m.limit + ' 𝐃𝐈𝐀𝐌𝐀𝐍𝐓𝐄 💎 𝐔𝐒𝐀𝐃𝐎')
                }
                descanso
            }
        }
    } atrapar (e) {
        consola.error(e)
    } finalmente {
        if (opts['queque'] && m.text) {
            const quequeIndex = this.msgqueque.indexOf(m.id || m.key.id)
            si (ÍndiceQueque !== -1)
                this.msgqueque.splice(quequeIndex, 1)
        }
        //console.log(global.db.data.users[m.sender])
        dejar usuario, estadísticas = global.db.data.stats
        si (m) {
            if (m.remitente && (usuario = global.db.data.users[m.remitente])) {
                usuario.exp += m.exp
                usuario.límite -= m.límite * 1
            }

            dejar stat
            si (m.plugin) {
                dejar ahora = + nueva fecha
                if (m.plugin en estadísticas) {
                    stat = stats[m.plugin]
                    if (!isNumber(stat.total))
                        stat.total = 1
                    if (!isNumber(stat.success))
                        stat.success = m.error != null ? 0 : 1
                    if (!isNumber(stat.last))
                        stat.last = ahora
                    if (!isNumber(stat.lastSuccess))
                        stat.lastSuccess = m.error != null ? 0: ahora
                } más
                    stat = stats[m.plugin] = {
                        totales: 1,
                        éxito: m.error != null ? 0 : 1,
                        último: ahora,
                        lastSuccess: m.error != null ? 0: ahora
                    }
                stat.total += 1
                stat.last = ahora
                if (m.error == nulo) {
                    stat.éxito += 1
                    stat.lastSuccess = ahora
                }
            }
        }

        tratar {
            if (!opts['noprint']) await (await import(`./lib/print.js`)).predeterminado(m, this)
        } atrapar (e) {
            consola.log(m, m.citado, e)
        }
        si (opta['autoleer'])
            espera esto.readMessages([m.key])
        function elegirRandom(lista) { lista de retorno[Math.floor(Math.random() * list.length)]}
        this.sendPresenceUpdate('grabación', m.chat)       
    }
}
/**
 * Manejar la actualización de los participantes de los grupos
 * @param {import('@adiwajshing/baileys').BaileysEventMap<unknown>['group-participants.update']} groupUpdate
 */
exportar función asíncrona participantesActualizar({ id, participantes, acción }) {
    si (opta['self'])
        devolver
    // if (id in conn.chats) return // El primer inicio de sesión será spam
    si (esto.esInit)
        devolver
    si (global.db.datos == nulo)
        espera loadDatabase()
    let chat = global.db.data.chats[id] || {}
    dejar texto = ''
    cambiar (acción) {
        caso 'añadir':
        caso 'quitar':
            si (chat.bienvenido) {
                let groupMetadata = esperar esto.groupMetadata(id) || (con.chats[id] || {}).metadatos
                para (permitir usuario de participantes) {
                    let pp = './src/avatar_contact.png'
                    tratar {
                        pp = esperar esto.profilePictureUrl(usuario, 'imagen')
                    } atrapar (e) {
                    } finalmente {
                    let apii = esperar esto.getFile(pp)
                        text = (action === 'add' ? (chat.sBienvenido || this.welcome || conn.welcome || 'Bienvenido, @user!').replace('@subject', await this.getName(id) ).replace('@desc', groupMetadata.desc?.toString() || '*𝚂𝙸𝙽 𝙳𝙴𝚂𝙲𝚁𝙸𝙿𝙲𝙸𝙾𝙽*'):
                              (chat.sBye || this.bye || conn.bye || '¡Adiós, @usuario!')).replace('@user', '@' + user.split('@')[0])
                        
//let ftroli = { key: { fromMe: false,"participant":"0@s.whatsapp.net", "remoteJid": "6289523258649-1604595598@g.us" }, "message": { orderMessage: { itemCount: 6546464643, status: 200, thumbnail: imagen1, surface: 200, message: wm, orderTitle: wm, sellerJid: '0@s.whatsapp.net' }}, contextInfo: { "forwardingScore": 999, "isForwarded": true}, sendEphemeral: true}   

this.sendButton(id, text, groupMetadata.subject, apii.data, [[(action == 'add' ? '𝙱𝙸𝙴𝙽𝚅𝙴𝙽𝙸𝙳𝙾' : '𝙰𝙳𝙸𝙾𝚂'), (action == 'add' ? '#welcomegc' : '#byegc')], ['𝙼𝙴𝙽𝚄 𝙳𝙴 𝙲𝙾𝙼𝙰𝙽𝙳𝙾𝚂', `#menu`]], null, {mentions: this.parseMention(text)})
                
/* this.sendFile(id, apii.data, 'pp.jpg', text, null, false, { mentions: [user] }) */
                   }
                }
            }
            break
        case 'promote':
        case 'daradmin':
        case 'darpoder':
            text = (chat.sPromote || this.spromote || conn.spromote || '@user ```is now Admin```')
        case 'demote':
        case 'quitarpoder':
        case 'quitaradmin':
            if (!text)
                text = (chat.sDemote || this.sdemote || conn.sdemote || '@user ```is no longer Admin```')
            text = text.replace('@user', '@' + participants[0].split('@')[0])
            if (chat.detect)
                this.sendMessage(id, { text, mentions: this.parseMention(text) })
            break
    }
}

/**
 * Handle groups update
 * @param {import('@adiwajshing/baileys').BaileysEventMap<unknown>['groups.update']} groupsUpdate 
 */
export async function groupsUpdate(groupsUpdate) {
    if (opts['self'])
        return
    for (const groupUpdate of groupsUpdate) {
        const id = groupUpdate.id
        if (!id) continue
        let chats = global.db.data.chats[id], text = ''
        if (!chats?.detect) continue
        if (groupUpdate.desc) text = (chats.sDesc || this.sDesc || conn.sDesc || '```Description has been changed to```\n@desc').replace('@desc', groupUpdate.desc)
        if (groupUpdate.subject) text = (chats.sSubject || this.sSubject || conn.sSubject || '```Subject has been changed to```\n@subject').replace('@subject', groupUpdate.subject)
        if (groupUpdate.icon) text = (chats.sIcon || this.sIcon || conn.sIcon || '```Icon has been changed to```').replace('@icon', groupUpdate.icon)
        if (groupUpdate.revoke) text = (chats.sRevoke || this.sRevoke || conn.sRevoke || '```Group link has been changed to```\n@revoke').replace('@revoke', groupUpdate.revoke)
        if (!text) continue
        await this.sendMessage(id, { text, mentions: this.parseMention(text) })
    }
}

export async function callUpdate(callUpdate) {
    let isAnticall = global.db.data.settings[this.user.jid].antiCall
    if (!isAnticall) return
    for (let nk of callUpdate) {
    if (nk.isGroup == false) {
    if (nk.status == "offer") {
    let callmsg = await this.reply(nk.from, `Hola *@${nk.from.split('@')[0]}*, las ${nk.isVideo ? 'videollamadas' : 'llamadas'} no están permitidas, serás bloqueado.\n-\nSi accidentalmente llamaste póngase en contacto con mi creador para que te desbloquee!`, false, { mentions: [nk.from] })
    //let data = global.owner.filter(([id, isCreator]) => id && isCreator)
    //await this.sendContact(nk.from, data.map(([id, name]) => [id, name]), false, { quoted: callmsg })
    await this.updateBlockStatus(nk.from, 'block')
    }
    }
    }
}

export async function deleteUpdate(message) {
    try {
        const { fromMe, id, participant } = message
        if (fromMe)
            return
        let msg = this.serializeM(this.loadMessage(id))
        if (!msg)
            return
        let chat = global.db.data.chats[msg.chat] || {}
        if (chat.delete)
            return
        await this.reply(msg.chat, `
━━━━⬣  𝘼𝙉𝙏𝙄 𝘿𝙀𝙇𝙀𝙏𝙀  ⬣━━━━
*■ Nombre:* @${participant.split`@`[0]}
*■ Enviando el mensaje..*
*■ Para desactivar esta función escriba el comando:*
*—◉ #disable antidelete*
*—◉ #enable delete*
━━━━⬣  𝘼𝙉𝙏𝙄 𝘿𝙀𝙇𝙀𝙏𝙀  ⬣━━━━
`.trim(), msg, {
            mentions: [participant]
        })
        this.copyNForward(msg.chat, msg).catch(e => console.log(e, msg))
    } catch (e) {
        console.error(e)
    }
}

global.dfail = (type, m, conn) => {
    let msg = {
        rowner: '*[ ⚠️ 𝐀𝐋𝐄𝐑𝐓𝐀 ⚠️ ] 𝙴𝚂𝚃𝙴 𝙲𝙾𝙼𝙰𝙽𝙳𝙾 𝚂𝙾𝙻𝙾 𝙿𝚄𝙴𝙳𝙴 𝚂𝙴𝚁 𝚄𝚃𝙸𝙻𝙸𝚉𝙰𝙳𝙾 𝙿𝙾𝚁 𝙴𝙻/𝙻𝙰 𝙿𝚁𝙾𝙿𝙸𝙴𝚃𝙰𝚁𝙸𝙾/𝙰 (𝙾𝚆𝙽𝙴𝚁) 𝙳𝙴𝙻 𝙱𝙾𝚃*',
        owner: '*[ ⚠️ 𝐀𝐋𝐄𝐑𝐓𝐀 ⚠️ ] 𝙴𝚂𝚃𝙴 𝙲𝙾𝙼𝙰𝙽𝙳𝙾 𝚂𝙾𝙻𝙾 𝙿𝚄𝙴𝙳𝙴 𝚂𝙴𝚁 𝚄𝚃𝙸𝙻𝙸𝚉𝙰𝙳𝙾 𝙿𝙾𝚁 𝙴𝙻/𝙻𝙰 𝙿𝚁𝙾𝙿𝙸𝙴𝚃𝙰𝚁𝙸𝙾/𝙰 (𝙾𝚆𝙽𝙴𝚁) 𝙳𝙴𝙻 𝙱𝙾𝚃*',
        mods: '*[ ⚠️ 𝐀𝐋𝐄𝐑𝐓𝐀 ⚠️ ] 𝙴𝚂𝚃𝙴 𝙲𝙾𝙼𝙰𝙽𝙳𝙾 𝚂𝙾𝙻𝙾 𝙿𝚄𝙴𝙳𝙴 𝚂𝙴𝚁 𝚄𝚃𝙸𝙻𝙸𝚉𝙰𝙳𝙾 𝙿𝙾𝚁 𝙼𝙾𝙳𝙴𝚁𝙰𝙳𝙾𝚁𝙴𝚂 𝚈 𝙴𝙻/𝙻𝙰 𝙿𝚁𝙾𝙿𝙸𝙴𝚃𝙰𝚁𝙸𝙾/𝙰 (𝙾𝚆𝙽𝙴𝚁) 𝙳𝙴𝙻 𝙱𝙾𝚃*',
        premium: '*[ ⚠️ 𝐀𝐋𝐄𝐑𝐓𝐀 ⚠️ ] 𝙴𝚂𝚃𝙴 𝙲𝙾𝙼𝙰𝙽𝙳𝙾 𝚂𝙾𝙻𝙾 𝙿𝚄𝙴𝙳𝙴 𝚂𝙴𝚁 𝚄𝚃𝙸𝙻𝙸𝚉𝙰𝙳𝙾 𝙿𝙾𝚁 𝚄𝚂𝚄𝙰𝚁𝙸𝙾𝚂 𝙿𝚁𝙴𝙼𝙸𝚄𝙼 𝚈 𝙴𝙻/𝙻𝙰 𝙿𝚁𝙾𝙿𝙸𝙴𝚃𝙰𝚁𝙸𝙾/𝙰 (𝙾𝚆𝙽𝙴𝚁) 𝙳𝙴𝙻 𝙱𝙾𝚃*',
        group: '*[ ⚠️ 𝐀𝐋𝐄𝐑𝐓𝐀 ⚠️ ] 𝙴𝚂𝚃𝙴 𝙲𝙾𝙼𝙰𝙽𝙳𝙾 𝚂𝙾𝙻𝙾 𝙿𝚄𝙴𝙳𝙴 𝚂𝙴𝚁 𝚄𝚃𝙸𝙻𝙸𝚉𝙰𝙳𝙾 𝙴𝙽 𝙶𝚁𝚄𝙿𝙾𝚂*',
        private: '*[ ⚠️ 𝐀𝐋𝐄𝐑𝐓𝐀 ⚠️ ] 𝙴𝚂𝚃𝙴 𝙲𝙾𝙼𝙰𝙽𝙳𝙾 𝚂𝙾𝙻𝙾 𝙿𝚄𝙴𝙳𝙴 𝚂𝙴𝚁 𝚄𝚃𝙸𝙻𝙸𝚉𝙰𝙳𝙾 𝙴𝙽 𝙲𝙷𝙰𝚃 𝙿𝚁𝙸𝚅𝙰𝙳𝙾 𝙳𝙴𝙻 𝙱𝙾𝚃*',
        admin: '*[ ⚠️ 𝐀𝐋𝐄𝐑𝐓𝐀 ⚠️ ] 𝙴𝚂𝚃𝙴 𝙲𝙾𝙼𝙰𝙽𝙳𝙾 𝚂𝙾𝙻𝙾 𝙿𝚄𝙴𝙳𝙴 𝚂𝙴𝚁 𝚄𝚃𝙸𝙻𝙸𝚉𝙰𝙳𝙾 𝙿𝙾𝚁 𝙰𝙳𝙼𝙸𝙽𝚂 𝙳𝙴𝙻 𝙶𝚁𝚄𝙿𝙾*',
        botAdmin: '*[ ⚠️ 𝐀𝐋𝐄𝐑𝐓𝐀 ⚠️ ] 𝙿𝙰𝚁𝙰 𝙿𝙾𝙳𝙴𝚁 𝚄𝚂𝙰𝚁 𝙴𝚂𝚃𝙴 𝙲𝙾𝙼𝙰𝙽𝙳𝙾 𝙴𝚂 𝙽𝙴𝙲𝙴𝚂𝙰𝚁𝙸𝙾 𝚀𝚄𝙴 𝙴𝙻 𝙱𝙾𝚃 𝚂𝙴𝙰 𝙰𝙳𝙼𝙸𝙽, 𝙰𝙲𝙴𝙽𝙳𝙴𝚁 𝙰 𝙰𝙳𝙼𝙸𝙽 𝙴𝚂𝚃𝙴 𝙽𝚄𝙼𝙴𝚁𝙾*',
        unreg: '*[ 🛑 𝐇𝐄𝐘!! 𝐀𝐋𝐓𝐎, 𝐍𝐎 𝐄𝐒𝐓𝐀𝐒 𝐑𝐄𝐆𝐈𝐒𝐓𝐑𝐀𝐃𝐎 🛑 ]*\n\n*—◉ 𝙿𝙰𝚁𝙰 𝚄𝚂𝙰𝚁 𝙴𝚂𝚃𝙴 𝙲𝙾𝙼𝙰𝙽𝙳𝙾 𝙳𝙴𝙱𝙴𝚂 𝚁𝙴𝙶𝙸𝚂𝚃𝚁𝙰𝚁𝚃𝙴, 𝚄𝚂𝙰 𝙴𝙻 𝙲𝙾𝙼𝙰𝙽𝙳𝙾*\n*➣ #verificar*',
        restrict: '*[ ⚠️ 𝐀𝐋𝐄𝐑𝐓𝐀 ⚠️ ] 𝙴𝚂𝚃𝙴 𝙲𝙾𝙼𝙰𝙽𝙳𝙾 𝙴𝚂𝚃𝙰 𝚁𝙴𝚂𝚃𝚁𝙸𝙽𝙶𝙸𝙳𝙾/𝙳𝙴𝚂𝙰𝙲𝚃𝙸𝚅𝙰𝙳𝙾 𝙿𝙾𝚁 𝙳𝙴𝚂𝙸𝙲𝙸𝙾𝙽 𝙳𝙴𝙻 𝙿𝚁𝙾𝙿𝙸𝙴𝚃𝙰𝚁𝙸𝙾/𝙰 (𝙾𝚆𝙽𝙴𝚁) 𝙳𝙴𝙻 𝙱𝙾𝚃*'
    }[type]
    if (msg) return m.reply(msg)
}

let file = global.__filename(import.meta.url, true)
watchFile(file, async () => {
    unwatchFile(file)
    console.log(chalk.redBright("Update 'handler.js'"))
    if (global.reloadHandler) console.log(await global.reloadHandler())
})
