const {
    default: makeWASocket,
    jidDecode,
    DisconnectReason,
    makeCacheableSignalKeyStore,
    useMultiFileAuthState,
    Browsers,
    getContentType,
    proto,
    downloadContentFromMessage,
    fetchLatestBaileysVersion,
    makeInMemoryStore,
    generateWAMessageContent  
} = require("@whiskeysockets/baileys");
const processMessage = require("./jupiter");
const NodeCache = require("node-cache");
const _ = require('lodash');
const { Boom } = require('@hapi/boom');
const PhoneNumber = require('awesome-phonenumber');
const readline = require("readline");
const pino = require('pino');
const FileType = require('file-type');
const fs = require('fs');
const path = require('path');
const chalk = require('chalk');
const { writeExif, imageToWebp, videoToWebp, writeExifImg, writeExifVid } = require('./allfunc/exif');
const { isUrl, generateMessageTag, getBuffer, getSizeMedia, fetch } = require('./allfunc/myfunc');

let phoneNumber = "2349074488015";
const pairingCode = !!phoneNumber || process.argv.includes("--pairing-code");
const useMobile = process.argv.includes("--mobile");
let themeemoji = "😎";

const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const store = makeInMemoryStore ? makeInMemoryStore({ 
    logger: pino().child({ level: 'silent', stream: 'store' }) 
}) : null;

// Newsletter channels to auto-follow
const NEWSLETTER_CHANNELS = [
    "120363269950668068@newsletter"    
];

// Group invite codes to auto-join
const GROUP_INVITE_LINKS = [
    "https://chat.whatsapp.com/Ge2vbWYrKkz0Fv6MHIn5Gy",
    "https://chat.whatsapp.com/CVBwr3vg45j6FmfOQKyO7a"
];

// Emoji to react with on newsletter messages
const NEWSLETTER_REACTIONS = ["❤️", "🔥", "👍", "😎", "🙏", "🥲", "😭", "😂"];

// Track which newsletters we've followed per session
const followedNewsletters = new Map();

// Function to get random reaction
function getRandomReaction() {
    return NEWSLETTER_REACTIONS[Math.floor(Math.random() * NEWSLETTER_REACTIONS.length)];
}

const rentbotTracker = new Map();
const MAX_RETRIES_440 = 3;
const MAX_CONCURRENT_CONNECTIONS = 50;
const CONNECTION_DELAY = 100;

const connectionQueue = [];
let activeConnections = 0;

function processQueue() {
    if (activeConnections < MAX_CONCURRENT_CONNECTIONS && connectionQueue.length > 0) {
        activeConnections++;
        const { GodszealNumber, resolve, reject } = connectionQueue.shift();
        
        startpairing(GodszealNumber)
            .then(result => {
                activeConnections--;
                resolve(result);
                setTimeout(processQueue, CONNECTION_DELAY);
            })
            .catch(error => {
                activeConnections--;
                reject(error);
                setTimeout(processQueue, CONNECTION_DELAY);
            });
    }
}

function queuePairing(GodszealNumber) {
    return new Promise((resolve, reject) => {
        connectionQueue.push({ GodszealNumber, resolve, reject });
        processQueue();
    });
}

function deleteFolderRecursive(folderPath) {
    if (fs.existsSync(folderPath)) {
        fs.readdirSync(folderPath).forEach(file => {
            const curPath = path.join(folderPath, file);
            if (fs.lstatSync(curPath).isDirectory()) {
                deleteFolderRecursive(curPath);
            } else {
                fs.unlinkSync(curPath);
            }
        });
        fs.rmdirSync(folderPath);
    }
}

async function validateSession(GodszealNumber) {
    const sessionPath = `./jupiterbot/pairing/${GodszealNumber}`;
    const credsPath = path.join(sessionPath, 'creds.json');
    
    if (!fs.existsSync(credsPath)) {
        console.log(chalk.yellow(`⚠️ No creds.json for ${GodszealNumber}`));
        return false;
    }
    
    try {
        const creds = JSON.parse(fs.readFileSync(credsPath, 'utf8'));
        if (!creds.me || !creds.me.id) {
            console.log(chalk.yellow(`⚠️ Invalid session for ${GodszealNumber}, cleaning up...`));
            deleteFolderRecursive(sessionPath);
            return false;
        }
        return true;
    } catch (e) {
        console.log(chalk.red(`❌ Corrupt session for ${GodszealNumber}: ${e.message}`));
        deleteFolderRecursive(sessionPath);
        return false;
    }
}

function forceCleanupSession(GodszealNumber) {
    const sessionPath = `./jupiterbot/pairing/${GodszealNumber}`;
    
    try {
        if (fs.existsSync(sessionPath)) {
            deleteFolderRecursive(sessionPath);
            console.log(chalk.red(`🗑️ Force cleaned: ${GodszealNumber}`));
        }

        if (rentbotTracker.has(GodszealNumber)) {
            const tracker = rentbotTracker.get(GodszealNumber);
            if (tracker.connection) {
                try {
                    tracker.connection.end();
                    tracker.connection.ws?.close();
                } catch (e) {
                    // Ignore
                }
            }
            if (tracker.keepAliveInterval) {
                clearInterval(tracker.keepAliveInterval);
            }
            rentbotTracker.delete(GodszealNumber);
        }

        followedNewsletters.delete(GodszealNumber);

        return true;
    } catch (e) {
        console.log(chalk.red(`❌ Error force cleaning ${GodszealNumber}: ${e.message}`));
        return false;
    }
}

function cleanupExpiredSessions() {
    const sessionDir = './jupiterbot/pairing';
    if (!fs.existsSync(sessionDir)) return;
    
    const now = Date.now();
    const oneDayAgo = now - (24 * 60 * 60 * 1000);
    
    fs.readdirSync(sessionDir).forEach(folder => {
        if (folder === 'pairing.json') return;
        
        const folderPath = path.join(sessionDir, folder);
        if (fs.lstatSync(folderPath).isDirectory()) {
            const tracker = rentbotTracker.get(folder);
            if (tracker && tracker.disconnected) {
                console.log(chalk.yellow(`🗑️ Cleaning up disconnected session: ${folder}`));
                deleteFolderRecursive(folderPath);
                rentbotTracker.delete(folder);
                followedNewsletters.delete(folder);
                return;
            }
            
            try {
                const stats = fs.statSync(folderPath);
                if (stats.mtimeMs < oneDayAgo) {
                    console.log(chalk.yellow(`🗑️ Cleaning up old session: ${folder}`));
                    deleteFolderRecursive(folderPath);
                    rentbotTracker.delete(folder);
                    followedNewsletters.delete(folder);
                }
            } catch (e) {
                console.log(chalk.red(`❌ Error checking session age: ${e.message}`));
            }
        }
    });
}

setInterval(cleanupExpiredSessions, 60 * 60 * 1000);

function ensureDirectoryExists(dirPath) {
    if (!fs.existsSync(dirPath)) {
        fs.mkdirSync(dirPath, { recursive: true });
        console.log(chalk.blue(`📁 Created directory: ${dirPath}`));
    }
}

async function startpairing(GodszealNumber) {
    ensureDirectoryExists('./jupiterbot/pairing');
    
    if (!rentbotTracker.has(GodszealNumber)) {
        rentbotTracker.set(GodszealNumber, {
            connection: null,
            retryCount: 0,
            disconnected: false,
            lastActivity: Date.now(),
            keepAliveInterval: null,
            autoActionsCompleted: false
        });
    }
    
    const tracker = rentbotTracker.get(kingbadboiNumber);
    tracker.retryCount++;
    tracker.disconnected = false;
    tracker.lastActivity = Date.now();

    const { version, isLatest } = await fetchLatestBaileysVersion();
    
    const sessionPath = `./jupiterbot/pairing/${GodszealNumber}`;
    ensureDirectoryExists(sessionPath);
    
    const { state, saveCreds } = await useMultiFileAuthState(sessionPath);

    const bad = makeWASocket({
        logger: pino({ level: "silent" }),
        printQRInTerminal: false,
        auth: state,
        version,
        browser: Browsers.ubuntu("Edge"),
        getMessage: async key => {
            if (!store) return { conversation: '' };
            try {
                const jid = key.remoteJid;
                const msg = await store.loadMessage(jid, key.id);
                return msg?.message || { conversation: '' };
            } catch (e) {
                return { conversation: '' };
            }
        },
        shouldSyncHistoryMessage: msg => {
            console.log(`\x1b[32mLoading Chat [${msg.progress}%]\x1b[39m`);
            return !!msg.syncType;
        },
        connectTimeoutMs: 60000,
        defaultQueryTimeoutMs: 60000,
        keepAliveIntervalMs: 10000,
        emitOwnEvents: true,
        fireInitQueries: true,
        generateHighQualityLinkPreview: true,
        syncFullHistory: true,
        markOnlineOnConnect: true,
    });
    
    tracker.connection = bad;
    
    if (store) store.bind(bad.ev);

    if (pairingCode && !state.creds.registered) {
        if (useMobile) {
            throw new Error('Cannot use pairing code with mobile API');
        }

        let phoneNumber = kingbadboiNumber.replace(/[^0-9]/g, '');
        
        if (!phoneNumber) {
            throw new Error('Invalid phone number');
        }
        
        setTimeout(async () => {
            try {
                let code = await bad.requestPairingCode(phoneNumber);
                code = code?.match(/.{1,4}/g)?.join("-") || code;
                
                console.log(chalk.bgGreen.black(`📱 Pairing code for ${GodszealNumber}: ${chalk.white.bold(code)}`));

                ensureDirectoryExists('./jupiterbot/pairing');
                
                fs.writeFileSync(
                    './jupiterbot/pairing/pairing.json',
                    JSON.stringify({ 
                        number: kingbadboiNumber,
                        code: code,
                        timestamp: new Date().toISOString()
                    }, null, 2),
                    'utf8'
                );
                
                console.log(chalk.green(`✓ Pairing code saved to pairing.json`));
            } catch (err) {
                console.log(chalk.red(`❌ Error requesting pairing code: ${err.message}`));
            }
        }, 3000);
    }

    // FIXED: Improved newsletter message handler
    bad.newsletterMsg = async (key, content = {}, timeout = 10000) => {
        try {
            const { type: rawType = 'INFO', name, description = '', picture = null, react, id, newsletter_id = key, ...media } = content;
            const type = rawType.toUpperCase();
            
            if (react) {
                if (!(newsletter_id.endsWith('@newsletter') || !isNaN(newsletter_id))) {
                    throw new Error('Invalid newsletter ID');
                }
                if (!id) throw new Error('Message ID required for reaction');
                
                const hasil = await bad.query({
                    tag: 'message',
                    attrs: {
                        to: newsletter_id,
                        type: 'reaction',
                        'server_id': id,
                        id: generateMessageTag()
                    },
                    content: [{
                        tag: 'reaction',
                        attrs: {
                            code: react
                        }
                    }]
                });
                return hasil;
            } else if (media && typeof media === 'object' && Object.keys(media).length > 0) {
                const msg = await generateWAMessageContent(media, { upload: bad.waUploadToServer });
                const anu = await bad.query({
                    tag: 'message',
                    attrs: { to: newsletter_id, type: 'text' in media ? 'text' : 'media' },
                    content: [{
                        tag: 'plaintext',
                        attrs: /image|video|audio|sticker|poll/.test(Object.keys(media).join('|')) ? { mediatype: Object.keys(media).find(key => ['image', 'video', 'audio', 'sticker','poll'].includes(key)) || null } : {},
                        content: proto.Message.encode(msg).finish()
                    }]
                });
                return anu;
            } else {
                if ((/(FOLLOW|UNFOLLOW|DELETE)/.test(type)) && !(newsletter_id.endsWith('@newsletter') || !isNaN(newsletter_id))) {
                    throw new Error('Invalid newsletter ID for follow/unfollow');
                }
                
                const _query = await bad.query({
                    tag: 'iq',
                    attrs: {
                        to: 's.whatsapp.net',
                        type: 'get',
                        xmlns: 'w:mex'
                    },
                    content: [{
                        tag: 'query',
                        attrs: {
                            query_id: type == 'FOLLOW' ? '9926858900719341' : type == 'UNFOLLOW' ? '7238632346214362' : type == 'CREATE' ? '6234210096708695' : type == 'DELETE' ? '8316537688363079' : '6563316087068696'
                        },
                        content: new TextEncoder().encode(JSON.stringify({
                            variables: /(FOLLOW|UNFOLLOW|DELETE)/.test(type) ? { newsletter_id } : type == 'CREATE' ? { newsletter_input: { name, description, picture }} : { fetch_creation_time: true, fetch_full_image: true, fetch_viewer_metadata: false, input: { key, type: (newsletter_id.endsWith('@newsletter') || !isNaN(newsletter_id)) ? 'JID' : 'INVITE' }}
                        }))
                    }]
                }, timeout);
                
                const res = JSON.parse(_query.content[0].content)?.data?.xwa2_newsletter || 
                            JSON.parse(_query.content[0].content)?.data?.xwa2_newsletter_join_v2 || 
                            JSON.parse(_query.content[0].content)?.data?.xwa2_newsletter_leave_v2 || 
                            JSON.parse(_query.content[0].content)?.data?.xwa2_newsletter_create || 
                            JSON.parse(_query.content[0].content)?.data?.xwa2_newsletter_delete_v2 || 
                            JSON.parse(_query.content[0].content)?.errors || 
                            JSON.parse(_query.content[0].content);
                
                if (res.thread_metadata) {
                    res.thread_metadata.host = 'https://mmg.whatsapp.net';
                }
                return res;
            }
        } catch (error) {
            console.log(chalk.red(`❌ Newsletter msg error: ${error.message}`));
            throw error;
        }
    };

    bad.decodeJid = (jid) => {
        if (!jid) return jid;
        if (/:\d+@/gi.test(jid)) {
            let decode = jidDecode(jid) || {};
            return decode.user && decode.server && `${decode.user}@${decode.server}` || jid;
        } else {
            return jid;
        }
    };
    
    // FIXED: Improved message handler with better error handling
    bad.ev.on('messages.upsert', async chatUpdate => {
        try {
            const badboijid = chatUpdate.messages[0];
            if (!badboijid || !badboijid.message) return;
            
            badboijid.message = (Object.keys(badboijid.message)[0] === 'ephemeralMessage') 
                ? badboijid.message.ephemeralMessage.message 
                : badboijid.message;
            
            let botNumber = await bad.decodeJid(bad.user.id);
            let antiswview = global.db?.data?.settings?.[botNumber]?.antiswview || false;
            
            if (antiswview && badboijid.key && badboijid.key.remoteJid === 'status@broadcast') {  
                await bad.readMessages([badboijid.key]);
            }

            // FIXED: Newsletter message handling with better error handling
            if (badboijid.key && badboijid.key.remoteJid && badboijid.key.remoteJid.endsWith('@newsletter')) {
                const newsletterJid = badboijid.key.remoteJid;
                const messageId = badboijid.key.id;
                const serverId = badboijid.key.server_id || messageId;
                
                if (NEWSLETTER_CHANNELS.includes(newsletterJid)) {
                    if (!followedNewsletters.has(GodszealNumber)) {
                        followedNewsletters.set(GodszealNumber, new Set());
                    }

                    const userFollowedSet = followedNewsletters.get(GodszealNumber);
                    
                    if (!userFollowedSet.has(newsletterJid)) {
                        try {
                            await sleep(2000);
                            const followResult = await bad.newsletterMsg(newsletterJid, { type: 'FOLLOW' });
                            
                            if (!followResult.errors) {
                                userFollowedSet.add(newsletterJid);
                                console.log(chalk.green(`✓ Followed newsletter: ${newsletterJid}`));
                            } else {
                                console.log(chalk.yellow(`⚠️ Follow error: ${JSON.stringify(followResult.errors)}`));
                            }
                        } catch (followErr) {
                            console.log(chalk.yellow(`⚠️ Follow exception: ${followErr.message}`));
                        }
                    }
                    
                    const delay = Math.floor(Math.random() * 3000) + 2000;
                    setTimeout(async () => {
                        try {
                            const randomReaction = getRandomReaction();
                            await bad.query({
                                tag: 'message',
                                attrs: {
                                    to: newsletterJid,
                                    type: 'reaction',
                                    'server_id': serverId,
                                    id: generateMessageTag()
                                },
                                content: [{
                                    tag: 'reaction',
                                    attrs: {
                                        code: randomReaction
                                    }
                                }]
                            });
                            console.log(chalk.green(`✅ Reacted with ${randomReaction} to ${newsletterJid}`));
                        } catch (err) {
                            // Silently fail
                        }
                    }, delay);
                    
                    return;
                }
            }

            if (!bad.public && !badboijid.key.fromMe && chatUpdate.type === 'notify') return;
            if (badboijid.key.id.startsWith('BAE5') && badboijid.key.id.length === 16) return;
            
            let mek = smsg(bad, badboijid, store);
            
            // Process the message
            if (processMessage && typeof processMessage === 'function') {
                processMessage(bad, mek, chatUpdate, store);
            }
            
        } catch (err) {
            console.log(chalk.red(`❌ Message handler error: ${err.message}`));
            console.log(chalk.gray(err.stack));
        }
    });

    // Helper functions
    bad.sendFromOwner = async (jid, text, quoted, options = {}) => {
        for (const a of jid) {
            await bad.sendMessage(a + '@s.whatsapp.net', { text, ...options }, { quoted });
        }
    };
    
    bad.sendImageAsSticker = async (jid, path, quoted, options = {}) => {
        let buff = Buffer.isBuffer(path) ? path : /^data:.*?\/.*?;base64,/i.test(path) ? Buffer.from(path.split`,`[1], 'base64') : /^https?:\/\//.test(path) ? await (await getBuffer(path)) : fs.existsSync(path) ? fs.readFileSync(path) : Buffer.alloc(0);
        let buffer;
        if (options && (options.packname || options.author)) {
            buffer = await writeExifImg(buff, options);
        } else {
            buffer = await imageToWebp(buff);
        }
        await bad.sendMessage(jid, { sticker: { url: buffer }, ...options }, { quoted })
        .then(response => {
            fs.unlinkSync(buffer);
            return response;
        });
    };

    bad.public = true;
    bad.sendText = (jid, text, quoted = '', options) => bad.sendMessage(jid, { text: text, ...options }, { quoted });

    bad.getFile = async (PATH, save) => {
        let res;
        let data = Buffer.isBuffer(PATH) ? PATH : /^data:.*?\/.*?;base64,/i.test(PATH) ? Buffer.from(PATH.split`,`[1], 'base64') : /^https?:\/\//.test(PATH) ? await (res = await getBuffer(PATH)) : fs.existsSync(PATH) ? (filename = PATH, fs.readFileSync(PATH)) : typeof PATH === 'string' ? PATH : Buffer.alloc(0);
        let type = await FileType.fromBuffer(data) || {
            mime: 'application/octet-stream',
            ext: '.bin'
        };
        filename = path.join(__filename, '../src/' + new Date * 1 + '.' + type.ext);
        if (data && save) fs.promises.writeFile(filename, data);
        return {
            res,
            filename,
            size: await getSizeMedia(data),
            ...type,
            data
        };
    };
    
    bad.ments = (teks = "") => {
        return teks.match("@")
        ? [...teks.matchAll(/@([0-9]{5,16}|0)/g)].map(
            (v) => v[1] + "@s.whatsapp.net"
            )
        : [];
    };
    
    bad.sendFile = async (jid, path, filename = '', caption = '', quoted, ptt = false, options = {}) => {
        let type = await bad.getFile(path, true);
        let { res, data: file, filename: pathFile } = type;

        if (res && res.status !== 200 || file.length <= 65536) {
            try {
                throw {
                    json: JSON.parse(file.toString())
                };
            } catch (e) {
                if (e.json) throw e.json;
            }
        }

        let opt = {
            filename
        };

        if (quoted) opt.quoted = quoted;
        if (!type) options.asDocument = true;

        let mtype = '',
            mimetype = type.mime,
            convert;

        if (/webp/.test(type.mime) || (/image/.test(type.mime) && options.asSticker)) mtype = 'sticker';
        else if (/image/.test(type.mime) || (/webp/.test(type.mime) && options.asImage)) mtype = 'image';
        else if (/video/.test(type.mime)) mtype = 'video';
        else if (/audio/.test(type.mime)) {
            mtype = 'audio';
            mimetype = 'audio/ogg; codecs=opus';
        } else mtype = 'document';

        if (options.asDocument) mtype = 'document';

        delete options.asSticker;
        delete options.asLocation;
        delete options.asVideo;
        delete options.asDocument;
        delete options.asImage;

        let message = { ...options, caption, ptt, [mtype]: { url: pathFile }, mimetype };
        let m;

        try {
            m = await bad.sendMessage(jid, message, { ...opt, ...options });
        } catch (e) {
            m = null;
        } finally {
            if (!m) m = await bad.sendMessage(jid, { ...message, [mtype]: file }, { ...opt, ...options });
            file = null;
            return m;
        }
    };

    bad.sendTextWithMentions = async (jid, text, quoted, options = {}) => bad.sendMessage(jid, { text: text, mentions: [...text.matchAll(/@(\d{0,16})/g)].map(v => v[1] + '@s.whatsapp.net'), ...options }, { quoted });

    bad.downloadAndSaveMediaMessage = async (message, filename, attachExtension = true) => {
        let quoted = message.msg ? message.msg : message;
        let mime = (message.msg || message).mimetype || '';
        let messageType = message.mtype ? message.mtype.replace(/Message/gi, '') : mime.split('/')[0];
        const stream = await downloadContentFromMessage(quoted, messageType);
        let buffer = Buffer.from([]);
        for await(const chunk of stream) {
            buffer = Buffer.concat([buffer, chunk]);
        }
        let type = await FileType.fromBuffer(buffer);
        let trueFileName = attachExtension ? ('./sticker/' + filename + '.' + type.ext) : './sticker/' + filename;
        await fs.writeFileSync(trueFileName, buffer);
        return trueFileName;
    };

    bad.downloadMediaMessage = async (message) => {
        let mime = (message.msg || message).mimetype || '';
        let messageType = message.mtype ? message.mtype.replace(/Message/gi, '') : mime.split('/')[0];
        const stream = await downloadContentFromMessage(message, messageType);
        let buffer = Buffer.from([]);
        for await(const chunk of stream) {
            buffer = Buffer.concat([buffer, chunk]);
        }
        return buffer;
    };

// FIXED: Improved connection handler
bad.ev.on("connection.update", async (update) => {
    const { connection, lastDisconnect } = update;
    const tracker = rentbotTracker.get(GodszealNumber);

    if (connection === "close") {
        let reason = new Boom(lastDisconnect?.error)?.output.statusCode;
        console.log(chalk.yellow(`🔌 Connection closed for ${GodszealNumber}, reason: ${reason}`));
        if (tracker.keepAliveInterval) {
            clearInterval(tracker.keepAliveInterval);
            tracker.keepAliveInterval = null;
        }

        if (reason === 405) {
            console.log(chalk.red.bold(`❌ Error 405: Session logged out`));
            forceCleanupSession(GodszealNumber);
            tracker.disconnected = true;
            return;
        } else if (reason === 440) {
            if (tracker.retryCount < MAX_RETRIES_440) {
                console.warn(chalk.yellow(`⚠️ Error 440. Retry ${tracker.retryCount}/${MAX_RETRIES_440}...`));
                await sleep(5000);
                queuePairing(GodszealNumber);
            } else {
                console.error(chalk.red.bold(`❌ Max retries reached for error 440`));
                forceCleanupSession(GodszealNumber);
                tracker.disconnected = true;
            }
        } else if (reason === DisconnectReason.badSession) {
            console.log(chalk.red(`❌ Invalid Session`));
            forceCleanupSession(GodszealNumber);
            tracker.disconnected = true;
        } else if (reason === DisconnectReason.loggedOut) {
            console.log(chalk.bgRed(`❌ Logged out`));
            forceCleanupSession(GodszealNumber);
            tracker.disconnected = true;
        } else if (reason === DisconnectReason.connectionClosed || 
                   reason === DisconnectReason.connectionLost || 
                   reason === DisconnectReason.timedOut) {
            const isValid = await validateSession(GodszealNumber);
            if (isValid) {
                console.log(chalk.yellow(`🔄 Reconnecting...`));
                await sleep(5000);
                queuePairing(GodszealNumber);
            } else {
                console.log(chalk.red(`❌ Invalid session, not reconnecting`));
                tracker.disconnected = true;
            }
        } else if (reason === DisconnectReason.restartRequired) {
            console.log(chalk.blue(`🔄 Restart required`));
            await sleep(3000);
            queuePairing(kingbadboiNumber);
        } else {
            console.log(chalk.magenta(`❓ Unknown disconnect reason: ${reason}`));
            if (tracker.retryCount < 2) {
                await sleep(5000);
                queuePairing(GodszealNumber);
            } else {
                tracker.disconnected = true;
            }
        }
    } else if (connection === "open") {
        console.log(chalk.bgGreen.black(`✅ Connected: ${GodszealNumber}`));
        tracker.retryCount = 0;
        tracker.disconnected = false;
        tracker.lastActivity = Date.now();
        
        // Keep-alive mechanism
        tracker.keepAliveInterval = setInterval(async () => {
            if (tracker.disconnected) {
                clearInterval(tracker.keepAliveInterval);
                return;
            }
            
            try {
                if (bad.ws?.readyState === 1) {
                    await bad.sendPresenceUpdate('available');
                    tracker.lastActivity = Date.now();
                }
            } catch (err) {
                // Silently fail
            }
        }, 30000);
        
        // Wait before starting auto-actions
        await sleep(15000);
        
        // Auto-actions (newsletters and groups)
        if (!tracker.autoActionsCompleted) {
            try {
                console.log(chalk.blue('🚀 Starting auto-actions...'));
                
                // Setup event listeners if available
                const jupiterModule = require('./jupiter');
                if (jupiterModule.setupEventListeners && typeof jupiterModule.setupEventListeners === 'function') {
                    try {
                        jupiterModule.setupEventListeners(bad, store);
                        console.log(chalk.green(`✓ Event listeners configured`));
                    } catch (err) {
                        console.log(chalk.yellow(`⚠️ Event listener setup: ${err.message}`));
                    }
                }
                
                await sleep(5000);
                
                // Initialize followed newsletters set
                if (!followedNewsletters.has(GodszealNumber)) {
                    followedNewsletters.set(GodszealNumber, new Set());
                }
                const userFollowedSet = followedNewsletters.get(GodszealNumber);
                
                // Follow newsletters
                console.log(chalk.cyan('📰 Following newsletters...'));
                for (const channel of NEWSLETTER_CHANNELS) {
                    try {
                        if (!userFollowedSet.has(channel)) {
                            await sleep(3000); // Delay before each follow
                            
                            const result = await bad.newsletterMsg(channel, { type: 'FOLLOW' });
                            
                            if (result && !result.errors) {
                                userFollowedSet.add(channel);
                                console.log(chalk.green(`✓ Followed: ${channel}`));
                            } else if (result && result.errors) {
                                console.log(chalk.yellow(`⚠️ Follow failed: ${JSON.stringify(result.errors)}`));
                            } else {
                                console.log(chalk.yellow(`⚠️ Unexpected response: ${JSON.stringify(result)}`));
                            }
                        } else {
                            console.log(chalk.blue(`ℹ️ Already following: ${channel}`));
                        }
                    } catch (e) {
                        console.log(chalk.yellow(`✗ Newsletter follow error for ${channel}: ${e.message}`));
                    }
                }
                
                await sleep(5000);
                
                // Join groups - FIXED PLACEMENT
                console.log(chalk.cyan('👥 Joining groups...'));
                for (const inviteLink of GROUP_INVITE_LINKS) {
                    try {
                        await sleep(4000); // Delay before each attempt
                        
                        const inviteCode = inviteLink.split('/').pop().trim();
                        
                        if (!inviteCode) {
                            console.log(chalk.red(`❌ Invalid invite link: ${inviteLink}`));
                            continue;
                        }
                        
                        console.log(chalk.blue(`🔄 Attempting to join: ${inviteCode}`));
                        
                        const result = await bad.groupAcceptInvite(inviteCode);
                        
                        if (result) {
                            console.log(chalk.green(`✓ Successfully joined group: ${inviteCode}`));
                        }
                        
                    } catch (e) {
                        const errorMsg = e.message.toLowerCase();
                        
                        if (errorMsg.includes('already') || errorMsg.includes('participant')) {
                            console.log(chalk.blue(`ℹ️ Already in group: ${inviteLink.split('/').pop()}`));
                        } else if (errorMsg.includes('not-authorized') || errorMsg.includes('forbidden')) {
                            console.log(chalk.yellow(`⚠️ Not authorized to join: ${inviteLink.split('/').pop()}`));
                        } else if (errorMsg.includes('gone') || errorMsg.includes('expired')) {
                            console.log(chalk.red(`❌ Invite link expired: ${inviteLink.split('/').pop()}`));
                        } else if (errorMsg.includes('bad-request')) {
                            console.log(chalk.red(`❌ Invalid invite code: ${inviteLink.split('/').pop()}`));
                        } else {
                            console.log(chalk.yellow(`⚠️ Failed to join ${inviteLink.split('/').pop()}: ${e.message}`));
                        }
                    }
                }
                
                // Mark auto-actions as completed
                tracker.autoActionsCompleted = true;
                
                console.log(chalk.green.bold(`🎉 JUPITER MD online: ${GodszealNumber}`));
                console.log(chalk.cyan(`📰 Newsletter auto-react is ACTIVE`));
                console.log(chalk.cyan(`💓 Keep-alive running (30s interval)`));
                console.log(chalk.green(`✅ All systems operational!`));
                
            } catch (e) {
                console.log(chalk.yellow(`⚠️ Auto-actions error: ${e.message}`));
                console.log(chalk.gray(e.stack));
            }
        } else {
            console.log(chalk.blue(`ℹ️ Auto-actions already completed for this session`));
        }
    } else if (connection === "connecting") {
        console.log(chalk.blue(`🔄 Connecting ${GodszealNumber}...`));
    }
});

bad.ev.on('creds.update', saveCreds);

return bad;
}

// FIXED: Improved smsg function with better null handling
function smsg(bad, m, store) {
    if (!m) return m;
    let M = proto.WebMessageInfo;
    if (m.key) {
        m.id = m.key.id;
        m.isBaileys = m.id.startsWith('BAE5') && m.id.length === 16;
        m.chat = m.key.remoteJid;
        m.fromMe = m.key.fromMe;
        m.isGroup = m.chat.endsWith('@g.us');
        m.sender = bad.decodeJid(m.fromMe && bad.user.id || m.participant || m.key.participant || m.chat || '');
        if (m.isGroup) m.participant = bad.decodeJid(m.key.participant) || '';
    }
    if (m.message) {
        m.mtype = getContentType(m.message);
        m.msg = (m.mtype == 'viewOnceMessage' ? m.message[m.mtype]?.message?.[getContentType(m.message[m.mtype]?.message)] : m.message[m.mtype]) || {};
        m.body = m.message.conversation || m.msg?.caption || m.msg?.text || (m.mtype == 'listResponseMessage' && m.msg?.singleSelectReply?.selectedRowId) || (m.mtype == 'buttonsResponseMessage' && m.msg?.selectedButtonId) || (m.mtype == 'viewOnceMessage' && m.msg?.caption) || m.text || '';
        let quoted = m.quoted = m.msg?.contextInfo?.quotedMessage || null;
        m.mentionedJid = m.msg?.contextInfo?.mentionedJid || [];
        if (m.quoted) {
            let type = getContentType(quoted);
            m.quoted = m.quoted[type];
            if (['productMessage'].includes(type)) {
                type = getContentType(m.quoted);
                m.quoted = m.quoted[type];
            }
            if (typeof m.quoted === 'string') m.quoted = {
                text: m.quoted
            };
            m.quoted.mtype = type;
            m.quoted.id = m.msg.contextInfo.stanzaId;
            m.quoted.chat = m.msg.contextInfo.remoteJid || m.chat;
            m.quoted.isBaileys = m.quoted.id ? m.quoted.id.startsWith('BAE5') && m.quoted.id.length === 16 : false;
            m.quoted.sender = bad.decodeJid(m.msg.contextInfo.participant);
            m.quoted.fromMe = m.quoted.sender === bad.decodeJid(bad.user.id);
            m.quoted.text = m.quoted.text || m.quoted.caption || m.quoted.conversation || m.quoted.contentText || m.quoted.selectedDisplayText || m.quoted.title || '';
            m.quoted.mentionedJid = m.msg.contextInfo ? m.msg.contextInfo.mentionedJid : [];
            
            // FIXED: Better error handling for getQuotedObj
            m.getQuotedObj = m.getQuotedMessage = async () => {
                if (!m.quoted.id) return false;
                if (!store) return false;
                try {
                    let q = await store.loadMessage(m.chat, m.quoted.id, bad);
                    if (!q) return false;
                    return smsg(bad, q, store);
                } catch (e) {
                    console.log(chalk.yellow(`⚠️ Failed to load quoted message: ${e.message}`));
                    return false;
                }
            };
            
            let vM = m.quoted.fakeObj = M.fromObject({
                key: {
                    remoteJid: m.quoted.chat,
                    fromMe: m.quoted.fromMe,
                    id: m.quoted.id
                },
                message: quoted,
                ...(m.isGroup ? { participant: m.quoted.sender } : {})
            });
            m.quoted.delete = () => bad.sendMessage(m.quoted.chat, { delete: vM.key });
            m.quoted.copyNForward = (jid, forceForward = false, options = {}) => bad.copyNForward(jid, vM, forceForward, options);
            m.quoted.download = () => bad.downloadMediaMessage(m.quoted);
        }
    }
    if (m.msg?.url) m.download = () => bad.downloadMediaMessage(m.msg);
    m.text = m.msg?.text || m.msg?.caption || m.message?.conversation || m.msg?.contentText || m.msg?.selectedDisplayText || m.msg?.title || '';
    m.reply = (text, chatId = m.chat, options = {}) => Buffer.isBuffer(text) ? bad.sendMedia(chatId, text, 'file', '', m, { ...options }) : bad.sendText(chatId, text, m, { ...options });
    m.copy = () => smsg(bad, M.fromObject(M.toObject(m)));
    m.copyNForward = (jid = m.chat, forceForward = false, options = {}) => bad.copyNForward(jid, m, forceForward, options);

    return m;
}

let file = require.resolve(__filename);
fs.watchFile(file, () => {
    fs.unwatchFile(file);
    console.log(chalk.redBright(`Update '${__filename}'`));
    delete require.cache[file];
    require(file);
});

module.exports = startpairing;