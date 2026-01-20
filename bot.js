require('dotenv').config();
require('./setting/config');
const TelegramBot = require('node-telegram-bot-api');
const fs = require('fs').promises;
const path = require('path');
const chalk = require('chalk');
const { sleep } = require('./utils');
const { BOT_TOKEN } = require('./token');
const { autoLoadPairs } = require('./autoload');

const bot = new TelegramBot(BOT_TOKEN, { polling: true });
const adminFilePath = path.join(__dirname, 'jupiterbot', 'admin.json');
let adminIDs = [];

// Required group and channels
const REQUIRED_GROUP = '@godszealtech'; // Main group where users must join
const REQUIRED_CHANNELS = [
  '@aitoolshub01'
];
const GROUP_CHAT_ID = '@godszealtech'; // Group where commands should be blocked

// Social media links
const SOCIAL_LINKS = {
  whatsapp: 'https://whatsapp.com/channel/0029VaXKAEoKmCPS6Jz7sw0N',
  telegram_channels: [
    'https://t.me/aitoolshubo1'
  ],
  telegram_group: 'https://t.me/+2w61Ipkrgh4xNjlk',
  telegram: 'https://t.me/Godwin366390',
  PROMOTION_CHANNEL: '', // <-- add this
  folder: 'https://t.me/godszealtech' // <-- add this if needed
};

// Utility functions
const exists = async (filePath) => {
  try {
    await fs.access(filePath);
    return true;
  } catch {
    return false;
  }
};

const loadAdminIDs = async () => {
  const ownerID = '6868076002';
  const defaultAdmins = [ownerID];

  if (!(await exists(adminFilePath))) {
    await fs.writeFile(adminFilePath, JSON.stringify(defaultAdmins, null, 2));
    adminIDs = defaultAdmins;
    console.log('✅ Created admin.json with default owner ID');
  } else {
    try {
      const raw = await fs.readFile(adminFilePath, 'utf8');
      adminIDs = JSON.parse(raw);
    } catch (err) {
      console.error('❌ Error loading admin.json:', err);
      adminIDs = defaultAdmins;
    }
  }
  console.log('📥 Loaded Admin IDs:', adminIDs);
};

// Check if user has joined required group and channels
const checkMembership = async (userId) => {
  try {
    // Check group membership
    const groupMember = await bot.getChatMember(REQUIRED_GROUP, userId).catch(() => ({ status: 'left' }));
    
    // Check all channels membership
    const channelChecks = await Promise.all(
      REQUIRED_CHANNELS.map(channel => 
        bot.getChatMember(channel, userId).catch(() => ({ status: 'left' }))
      )
    );

    const validStatuses = ['member', 'administrator', 'creator'];
    const hasJoinedGroup = validStatuses.includes(groupMember.status);
    const hasJoinedAllChannels = channelChecks.every(member => validStatuses.includes(member.status));

    return {
      hasJoinedGroup,
      hasJoinedAllChannels,
      hasJoinedAll: hasJoinedGroup && hasJoinedAllChannels
    };
  } catch (error) {
    console.error('Error checking membership:', error);
    return {
      hasJoinedGroup: false,
      hasJoinedAllChannels: false,
      hasJoinedAll: false
    };
  }
};

// Send join requirement message
const sendJoinRequirement = (chatId) => {
  return bot.sendMessage(
    chatId,
    '𝐉𝐎𝐈𝐍 𝐅𝐎𝐑 𝐌𝐎𝐑𝐄 𝐈𝐍𝐅𝐎."',
    {
      reply_markup: {
        inline_keyboard: [
          [
            { 
              text: '𝐉𝐎𝐈𝐍 𝐆𝐑𝐎𝐔𝐏', 
              url: 'https://t.me/godszealtech' 
            }
          ],
          [
            { 
              text: '𝐉𝐎𝐈𝐍 𝐎𝐔𝐑 𝐌𝐀𝐈𝐍 𝐂𝐇𝐀𝐍𝐍𝐄𝐋', 
              url: 'https://t.me/aitoolshub01'
            },
            { 
              text: '𝐉𝐎𝐈𝐍 𝐎𝐔𝐑 𝐁𝐀𝐂𝐊𝐔𝐏 𝐂𝐇𝐀𝐍𝐍𝐄𝐋', 
              url: 'https://t.me/+2w61Ipkrgh4xNjlk' 
            }
          ],
          [
            { 
              text: '✅𝐂𝐇𝐄𝐂𝐊 𝐉𝐎𝐈𝐍', 
              callback_data: 'check_membership' 
            }
          ],
          [
            { text: '𝐖𝐇𝐀𝐓𝐒𝐀𝐏𝐏 𝐂𝐇𝐀𝐍𝐍𝐄𝐋', url: SOCIAL_LINKS.whatsapp }
          ]
        ]
      }
    }
  );
};

// Check if message is from the main group
const isFromMainGroup = (msg) => {
  if (msg.chat.type === 'private') return false;
  
  // Check if it's the main group by username or chat ID
  return msg.chat.username === 'godszealtech' || 
         msg.chat.id.toString() === GROUP_CHAT_ID.replace('@', '-100');
};

// Send private message instruction
const sendPrivateInstruction = async (chatId, userId, firstName) => {
  try {
    const botInfo = await bot.getMe();
    return bot.sendMessage(
      chatId,
      `𝐇𝐞𝐲 𓃘 𝐛𝐫𝐫${firstName}\n\n` +
      `𝐏𝐥𝐞𝐚𝐬𝐞 𝐬𝐭𝐚𝐫𝐭 𝐦𝐞 𝐢𝐧 𝐲𝐨𝐮𝐫 𝐩𝐫𝐢𝐯𝐚𝐭𝐞 𝐜𝐡𝐚𝐭 𝐭𝐨 𝐩𝐚𝐢𝐫 ⚔️*`,
      {
        reply_markup: {
          inline_keyboard: [
            [
              { 
                text: '𝐂𝐎𝐍𝐍𝐄𝐂𝐓 𝐏𝐑𝐈𝐕𝐀𝐓𝐄𝐋𝐘', 
                url: `https://t.me/${botInfo.username}?start=private`
              }
            ],
            [
              { text: '𝐎𝐔𝐑 𝐖𝐇𝐀𝐓𝐒𝐀𝐏𝐏 𝐂𝐇𝐀𝐍𝐍𝐄𝐋', url: SOCIAL_LINKS.whatsapp }
            ],
            [
              { 
                text: '𝐉𝐎𝐈𝐍 𝐎𝐔𝐑 𝐌𝐀𝐈𝐍 𝐂𝐇𝐀𝐍𝐍𝐄𝐋', 
                url: 'https://t.me/aitoolshub01' 
              },
              { 
                text: '𝐉𝐎𝐈𝐍 𝐎𝐔𝐑 𝐁𝐀𝐂𝐊𝐔𝐏 𝐂𝐇𝐀𝐍𝐍𝐄𝐋', 
                url: 'https://t.me/+2w61Ipkrgh4xNjlk' 
              }
            ]
          ]
        }
      }
    );
  } catch (error) {
    console.error('Error in sendPrivateInstruction:', error);
    return bot.sendMessage(
      chatId,
      `𝐇𝐞𝐲 𓃘 𝐛𝐫𝐫 ${firstName}\n\n` +
      `𝐏𝐥𝐞𝐚𝐬𝐞 𝐬𝐭𝐚𝐫𝐭 𝐦𝐞 𝐢𝐧 𝐲𝐨𝐮𝐫 𝐩𝐫𝐢𝐯𝐚𝐭𝐞 𝐜𝐡𝐚𝐭 𝐭𝐨 𝐩𝐚𝐢𝐫 ⚔️`,
    );
  }
};

// Middleware to check if command is used in private chat
const requirePrivateChat = (handler) => {
  return async (msg, match) => {
    const chatId = msg.chat.id;
    const userId = msg.from.id;
    const firstName = msg.from.first_name || 'User';

    // If message is from the main group, redirect to private
    if (isFromMainGroup(msg)) {
      try {
        await sendPrivateInstruction(chatId, userId, firstName);
        // Delete the command message if bot has delete permissions
        try {
          await bot.deleteMessage(chatId, msg.message_id);
        } catch (deleteError) {
          // Ignore if can't delete (no admin rights)
        }
      } catch (error) {
        console.error('Error sending private instruction:', error);
      }
      return; // Stop processing the command
    }

    // Continue with original handler for private chats
    return handler(msg, match);
  };
};

// Middleware to check membership before executing commands
const requireMembership = (handler) => {
  return async (msg, match) => {
    const chatId = msg.chat.id;
    const userId = msg.from.id;

    // Skip membership check for admins
    if (adminIDs.includes(userId.toString())) {
      return handler(msg, match);
    }

    const membership = await checkMembership(userId);
    
    if (!membership.hasJoinedAll) {
      return sendJoinRequirement(chatId);
    }

    return handler(msg, match);
  };
};

// Combined middleware: check private chat first, then membership
const requirePrivateAndMembership = (handler) => {
  return requirePrivateChat(requireMembership(handler));
};

// State management
let isShuttingDown = false;
let isAutoLoadRunning = false;

// Auto-load functionality
const runAutoLoad = async () => {
  if (isAutoLoadRunning || isShuttingDown) return;
  isAutoLoadRunning = true;

  try {
    console.log('⏱️ INITIALIZING AUTO-LOAD');
    await autoLoadPairs();
    console.log('✅ AUTO-LOAD COMPLETED');
  } catch (e) {
    console.error('❌ AUTO-LOAD FAILED:', e);
  } finally {
    isAutoLoadRunning = false;
  }
};

const startAutoLoadLoop = () => {
  runAutoLoad();
  setInterval(runAutoLoad, 60 * 60 * 1000);
};

// Graceful shutdown
const gracefulShutdown = (signal) => {
  if (isShuttingDown) return;
  isShuttingDown = true;
  
  console.log(`🛑 Received ${signal}. Shutting down gracefully...`);
  bot.stopPolling();
  console.log('✅ Bot stopped successfully');
  process.exit(0);
};

// ========================
// PROTECTED COMMAND HANDLING
// ========================

// Start command with private chat and membership check
bot.onText(/\/start/, requirePrivateAndMembership(async (msg) => {
  const chatId = msg.chat.id;
  const firstName = msg.from.first_name;
  
  await bot.sendMessage(
    chatId,
    `╔═══⛧⸸『  𝗝𝗨𝗣𝗜𝗧𝗘𝗥 𝗠𝗗 ℂ𝕆ℝ𝔼  』⸸⛧═══╗
║ ⚙️ 𝕭𝖔𝖙 𝕹𝖆𝖒𝖊   : 𝗝𝗨𝗣𝗜𝗧𝗘𝗥 𝗠𝗗 ⚔️
║ 🧠 𝕮𝖗𝖊𝖆𝖙𝖔𝖗   : 𝗚𝗢𝗗𝗦𝗭𝗘𝗔𝗟☯︎
╚══════════════════════════════════╝

╔═════『 𝗝𝗨𝗣𝗜𝗧𝗘𝗥 𝗠𝗗- 𝕮𝕺𝕄𝕄𝔸ℕ𝔻 𝕮𝕀ℝℂ𝕃𝕰 🔪 』═════╗
║ ⚔️ • /connect     — 𝙱𝚘𝚗𝚍 𝚆𝚒𝚝𝚑 𝚃𝚑𝚎 𝚅𝚘𝚒𝚍
║ 🩸 • /delpair     — 𝙲𝚞𝚝 𝚃𝚑𝚎 𝙲𝚞𝚛𝚜𝚎
║ 👁️ • /listpair   — 𝚁𝚎𝚟𝚎𝚊𝚕 𝚃𝚑𝚎 𝙲𝚘𝚗𝚝𝚛𝚊𝚌𝚝𝚜
║ 💀 • /autoload   — 𝙲𝚘𝚍𝚎 𝙰𝚠𝚊𝚔𝚎𝚗𝚜 𝙸𝚝𝚜𝚎𝚕𝚏
╚══════════════════════════════════╝⛓️ STAY LINKED TO 𝗝𝗨𝗣𝗜𝗧𝗘𝗥 𝗠𝗗... OR BE ERASED ⛓️
`,
    {
      reply_markup: {
        inline_keyboard: [
          [{ text: '𝐃𝐄𝐕/𝐎𝐖𝐍𝐄𝐑', url: 'https://t.me/@Godwin366390' }],
          [
            { text: '𝐅𝐎𝐋𝐋𝐎𝐖 𝐖𝐇𝐀𝐓𝐒𝐀𝐏𝐏 𝐂𝐇𝐀𝐍𝐍𝐄𝐋', url: SOCIAL_LINKS.whatsapp }
          ],
          [
            { 
              text: '𝐌𝐀𝐈𝐍 𝐂𝐇𝐀𝐍𝐍𝐄𝐋', 
              url: 'https://t.me/aitoolshub01' 
            },
            { 
              text: '𝐁𝐀𝐂𝐊𝐔𝐏 𝐂𝐇𝐀𝐍𝐍𝐄𝐋', 
              url: 'https://t.me/+2w61Ipkrgh4xNjlk' 
            }
          ]
        ]
      }
    }
  );
}));

// Help command with private chat and membership check


// Handle bare /connect command with private chat and membership check
bot.onText(/^\/connect\s*$/, requirePrivateAndMembership((msg) => {
  const chatId = msg.chat.id;
  bot.sendMessage(
    chatId,
    '𝚃𝙾 𝙿𝚁𝙾𝙲𝙴𝙴𝙳 𝙿𝙻𝙴𝙰𝚂𝙴 𝙴𝙽𝚈𝙴𝚁 𝙰 𝙿𝙷𝙾𝙽𝙴 𝙽𝚄𝙼𝙱𝚁 𝙸𝙽 𝚃𝙷𝙴 𝙵𝙾𝚁𝙼𝙰𝚃 /connect 𝟸𝟹𝟺𝚡𝚡𝚡`',
    {
      reply_markup: {
        inline_keyboard: [
          [{ text: '𝐃𝐄𝐕/𝐎𝐖𝐍𝐄𝐑', url: 'https://t.me/xoraxdev' }],
          [
            { text: '𝐅𝐎𝐋𝐋𝐎𝐖 𝐖𝐀 𝐂𝐇𝐀𝐍𝐍𝐄𝐋', url: SOCIAL_LINKS.whatsapp }
          ],
          [
            { 
              text: '𝐌𝐀𝐈𝐍 𝐂𝐇𝐀𝐍𝐍𝐄𝐋', 
              url: 'https://t.me/xorax_community' 
            },
            { 
              text: '𝐁𝐀𝐂𝐊𝐔𝐏 𝐂𝐇𝐀𝐍𝐍𝐄𝐋', 
              url: 'https://t.me/xoraxdev' 
            }
          ]
        ]
      }
    }
  );
}));

// Handle bare /delpair command with private chat and membership check
bot.onText(/^\/delpair\s*$/, requirePrivateAndMembership((msg) => {
  const chatId = msg.chat.id;
  bot.sendMessage(
    chatId,
    '𝚃𝙾 𝙿𝚁𝙾𝙲𝙴𝙴𝙳 𝙿𝙻𝙴𝙰𝚂𝙴 𝙴𝙽𝚈𝙴𝚁 𝙰 𝙿𝙷𝙾𝙽𝙴 𝙽𝚄𝙼𝙱𝚁 𝙸𝙽 𝚃𝙷𝙴 𝙵𝙾𝚁𝙼𝙰𝚃 /connect 𝟸𝟹𝟺𝚡𝚡𝚡`',
    {
      reply_markup: {
        inline_keyboard: [
          [{ text: '𝐃𝐄𝐕/𝐎𝐖𝐍𝐄𝐑', url: 'https://t.me/@Godwin366390' }],
          [
            { text: '𝐅𝐎𝐋𝐋𝐎𝐖 𝐖𝐀 𝐂𝐇𝐀𝐍𝐍𝐄𝐋', url: SOCIAL_LINKS.whatsapp }
          ],
          [
            { 
              text: '𝐌𝐀𝐈𝐍 𝐂𝐇𝐀𝐍𝐍𝐄𝐋', 
              url: 'https://t.me/aitoolshub01' 
            },
            { 
              text: '𝐁𝐀𝐂𝐊𝐔𝐏 𝐂𝐇𝐀𝐍𝐍𝐄𝐋', 
              url: 'https://t.me/+2w61Ipkrgh4xNjlk' 
            }
          ]
        ]
      }
    }
  );
}));

// Enhanced /connect command with private chat and membership check
bot.onText(/\/connect (.+)/, requirePrivateAndMembership(async (msg, match) => {
  const chatId = msg.chat.id;
  const userId = msg.from.id;
  const text = match[1].trim();

  try {
    if (!text) {
      return bot.sendMessage(
        chatId,
        '𝚃𝙾 𝙿𝚁𝙾𝙲𝙴𝙴𝙳 𝙿𝙻𝙴𝙰𝚂𝙴 𝙴𝙽𝚈𝙴𝚁 𝙰 𝙿𝙷𝙾𝙽𝙴 𝙽𝚄𝙼𝙱𝚁 𝙸𝙽 𝚃𝙷𝙴 𝙵𝙾𝚁𝙼𝙰𝚃 /connect 𝟸𝟹𝟺𝚡𝚡𝚡',
        { 
          reply_markup: {
            inline_keyboard: [
              [
                { text: '𝐅𝐎𝐋𝐋𝐎𝐖 𝐖𝐀 𝐂𝐇𝐀𝐍𝐍𝐄𝐋', url: SOCIAL_LINKS.whatsapp }
              ],
              [
                { 
                  text: '𝐌𝐀𝐈𝐍 𝐂𝐇𝐀𝐍𝐍𝐄𝐋', 
                  url: 'https://t.me/aitoolshub01' 
                },
                { 
                  text: '𝐁𝐀𝐂𝐊𝐔𝐏 𝐂𝐇𝐀𝐍𝐍𝐄𝐋', 
                  url: 'https://t.me/+2w61Ipkrgh4xNjlk' 
                }
              ]
            ]
          }
        }
      );
    }

    if (/[a-z]/i.test(text)) {
      return bot.sendMessage(
        chatId,
        '❌ 𝕃𝔼𝕋𝕋𝔼ℝ𝕊 𝕎𝕀𝕃𝕃 𝔹𝔼 𝕊ℍ𝔸𝕋𝕋𝔼ℝ𝔼𝔻 ⚠️  ☠️ 𝙊𝙉𝙇𝙔 𝙉𝙐𝙈𝘽𝙀𝙍𝙎 𝘼𝙍𝙀 𝘼𝙇𝙇𝙊𝙒𝙀𝘿 — 𝙉𝙊 𝙏𝙀𝙓𝙏! \n 💡 𝙐𝙎𝙀 𝙇𝙄𝙆𝙀: `/connect 23478829274`',
        { 
          reply_markup: {
            inline_keyboard: [
              [
                { text: '𝐅𝐎𝐋𝐋𝐎𝐖 𝐖𝐀 𝐂𝐇𝐀𝐍𝐍𝐄𝐋', url: SOCIAL_LINKS.whatsapp }
              ],
              [
                { 
                  text: '𝐌𝐀𝐈𝐍 𝐂𝐇𝐀𝐍𝐍𝐄𝐋', 
                  url: 'https://t.me/aitoolshub01' 
                },
                { 
                  text: '𝐁𝐀𝐂𝐊𝐔𝐏 𝐂𝐇𝐀𝐍𝐍𝐄𝐋', 
                  url: 'https://t.me/+2w61Ipkrgh4xNjlk' 
                }
              ]
            ]
          }
        }
      );
    }

    if (!/^\d{7,15}(\|\d{1,10})?$/.test(text)) {
      return bot.sendMessage(
        chatId,
        '❌ Invalid format\n\n*  𝙿𝙻𝙴𝙰𝚂𝙴 𝙴𝙽𝚈𝙴𝚁 𝙰 𝙿𝙷𝙾𝙽𝙴 𝙽𝚄𝙼𝙱𝚁 𝙸𝙽 𝚃𝙷𝙴 𝙵𝙾𝚁𝙼𝙰𝚃 /connect 𝟸𝟹𝟺𝚡𝚡𝚡`',
        { 
          reply_markup: {
            inline_keyboard: [
              [
                { text: '𝐅𝐎𝐋𝐋𝐎𝐖 𝐖𝐀 𝐂𝐇𝐀𝐍𝐍𝐄𝐋', url: SOCIAL_LINKS.whatsapp }
              ],
              [
                { 
                  text: '𝐌𝐀𝐈𝐍 𝐂𝐇𝐀𝐍𝐍𝐄𝐋', 
                  url: 'https://t.me/aitoolshub01' 
                },
                { 
                  text: '𝐁𝐀𝐂𝐊𝐔𝐏 𝐂𝐇𝐀𝐍𝐍𝐄𝐋', 
                  url: 'https://t.me/+2w61Ipkrgh4xNjlk' 
                }
              ]
            ]
          }
        }
      );
    }

    if (text.startsWith('0')) {
      return bot.sendMessage(
        chatId,
        '❌𝐍𝐔𝐌𝐁𝐄𝐑𝐒 𝐓𝐇𝐀𝐓 𝐁𝐄𝐆𝐈𝐍𝐒 𝐖𝐈𝐓𝐇 \n 0 𝐀𝐑𝐄 𝐍𝐎𝐓 𝐀𝐋𝐋𝐎𝐖𝐄𝐃 𝐍𝐈𝐆𝐆𝐀𓃱`',
        { 
          reply_markup: {
            inline_keyboard: [
              [
                { text: '𝐅𝐎𝐋𝐋𝐎𝐖 𝐖𝐀 𝐂𝐇𝐀𝐍𝐍𝐄𝐋', url: SOCIAL_LINKS.whatsapp }
              ],
              [
                { 
                  text: '𝐌𝐀𝐈𝐍 𝐂𝐇𝐀𝐍𝐍𝐄𝐋', 
                  url: 'https://t.me/aitoolshub01' 
                },
                { 
                  text: '𝐁𝐀𝐂𝐊𝐔𝐏 𝐂𝐇𝐀𝐍𝐍𝐄𝐋', 
                  url: 'https://t.me/+2w61Ipkrgh4xNjlk' 
                }
              ]
            ]
          }
        }
      );
    }

    const countryCode = text.slice(0, 3);
    if (["252", "202"].includes(countryCode)) {
      return bot.sendMessage(
        chatId,
        "❌ Unsupported country code\n\nPlease use numbers from supported regions",
        {
          reply_markup: {
            inline_keyboard: [
              [
                { text: '𝐅𝐎𝐋𝐋𝐎𝐖 𝐖𝐀 𝐂𝐇𝐀𝐍𝐍𝐄𝐋', url: SOCIAL_LINKS.whatsapp }
              ],
              [
                { 
                  text: '𝐌𝐀𝐈𝐍 𝐂𝐇𝐀𝐍𝐍𝐄𝐋', 
                  url: 'https://t.me/aitoolshub01' 
                },
                { 
                  text: '𝐁𝐀𝐂𝐊𝐔𝐏 𝐂𝐇𝐀𝐍𝐍𝐄𝐋', 
                  url: 'https://t.me/+2w61Ipkrgh4xNjlk' 
                }
              ]
            ]
          }
        }
      );
    }

    // Rest of pairing logic remains the same...
    const pairingFolder = path.join(__dirname, 'jupiterbot', 'pairing');
    if (!(await exists(pairingFolder))) {
      await fs.mkdir(pairingFolder, { recursive: true });
    }

    const files = await fs.readdir(pairingFolder);
    const pairedCount = files.filter(file => file.endsWith('@s.whatsapp.net')).length;
    
    if (pairedCount >= 50) {
      return bot.sendMessage(
        chatId, 
        "⚠️ 𝙿𝙰𝙸𝚁𝙸𝙽𝙶 𝙻𝙸𝙼𝙸𝚃 𝚂𝙻𝙰𝙈𝙼𝙴𝙳 🚫  ☠️ 𝙉𝙊 𝙈𝙊𝙍𝙀 𝙎𝙇𝙊𝙏𝙎 𝘼𝙑𝘼𝙄𝙇𝘼𝘽𝙇𝙀!\n 💀 𝘿𝙈 @@Godwin366390 𝙩𝙤 𝙎𝙋𝘼𝙒𝙉 𝙉𝙀𝙒 𝙎𝙀𝙍𝙑𝙀𝙍𝙎 ⚙️",
        {
          reply_markup: {
            inline_keyboard: [
              [
                { text: '𝐅𝐎𝐋𝐋𝐎𝐖 𝐖𝐀 𝐂𝐇𝐀𝐍𝐍𝐄𝐋', url: SOCIAL_LINKS.whatsapp }
              ],
              [
                { 
                  text: '𝐌𝐀𝐈𝐍 𝐂𝐇𝐀𝐍𝐍𝐄𝐋', 
                  url: 'https://t.me/aitoolshub01' 
                },
                { 
                  text: '𝐁𝐀𝐂𝐊𝐔𝐏 𝐂𝐇𝐀𝐍𝐍𝐄𝐋', 
                  url: 'https://t.me/+2w61Ipkrgh4xNjlk' 
                }
              ]
            ]
          }
        }
      );
    }

    const startpairing = require('./pair.js');
    const Xreturn = text.split("|")[0].replace(/[^0-9]/g, '') + "@s.whatsapp.net";
    
    await startpairing(Xreturn);
    await sleep(4000);

    const pairingFile = path.join(pairingFolder, 'pairing.json');
    const cu = await fs.readFile(pairingFile, 'utf-8');
    const cuObj = JSON.parse(cu);
    delete require.cache[require.resolve('./pair.js')];

    bot.sendMessage(
      chatId,
      `╔═══⛧⸸⛧━━━ 𝗣𝗔𝗜𝗥 𝗖𝗢𝗗𝗘 𝗝𝗨𝗣𝗜𝗧𝗘𝗥 𝗠𝗗━━━⛧⸸⛧═══╗
║ ☠️ 𝗣𝗔𝗜𝗥𝗜𝗡𝗚 𝗖𝗢𝗗𝗘 ⚔️
║ 🔥 𝗖𝗢𝗗𝗘:${cuObj.code}
╚════════════════════════════════════════════╝`,
      {
        disable_web_page_preview: true,
        reply_markup: {
          inline_keyboard: [
            [
              { text: '𝐅𝐎𝐋𝐋𝐎𝐖 𝐖𝐀 𝐂𝐇𝐀𝐍𝐍𝐄𝐋', url: SOCIAL_LINKS.whatsapp }
            ],
            [
              { 
                text: '𝐌𝐀𝐈𝐍 𝐂𝐇𝐀𝐍𝐍𝐄𝐋', 
                url: 'https://t.me/aitoolshub01' 
              },
              { 
                text: '𝐁𝐀𝐂𝐊𝐔𝐏 𝐂𝐇𝐀𝐍𝐍𝐄𝐋', 
                url: 'https://t.me/+2w61Ipkrgh4xNjlk' 
              }
            ]
          ]
        }
      }
    );
  } catch (error) {
    console.error('PAIR COMMAND ERROR:', error);
    bot.sendMessage(
      chatId, 
      '⚠️ 𝗔𝗟𝗔𝗥𝗠! 𝗝𝗨𝗣𝗜𝗧𝗘𝗥 𝗠𝗗 𝗘𝗡𝗖𝗢𝗨𝗡𝗧𝗘𝗥𝗘𝗗 𝗔 𝗦𝗘𝗥𝗩𝗘𝗥 𝗕𝗟𝗢𝗢𝗗𝗟𝗘𝗧...  \n🩸 𝗦𝘆𝘀𝘁𝗲𝗺 𝗳𝗹𝗮𝘄𝘀 𝗱𝗲𝘁𝗲𝗰𝘁𝗲𝗱 — 𝗿𝗲𝘁𝗿𝘆 𝗹𝗮𝘁𝗲𝗿 𝗼𝗿 𝗳𝗮𝗰𝗲 𝘁𝗵𝗲 𝐞͢𝐫͢𝐫͢𝐨͢𝐫͢.',
      {
        reply_markup: {
          inline_keyboard: [
            [
              { text: '𝐅𝐎𝐋𝐋𝐎𝐖 𝐖𝐀 𝐂𝐇𝐀𝐍𝐍𝐄𝐋', url: SOCIAL_LINKS.whatsapp }
            ],
            [
              { 
                text: '𝐌𝐀𝐈𝐍 𝐂𝐇𝐀𝐍𝐍𝐄𝐋', 
                url: 'https://t.me/aitoolshub01' 
              },
              { 
                text: '𝐁𝐀𝐂𝐊𝐔𝐏 𝐂𝐇𝐀𝐍𝐍𝐄𝐋', 
                url: 'https://t.me/+2w61Ipkrgh4xNjlk' 
              }
            ]
          ]
        }
      }
    );
  }
}));

// Enhanced /delpair command with private chat and membership check
bot.onText(/\/delpair (.+)/, requirePrivateAndMembership(async (msg, match) => {
  const chatId = msg.chat.id;
  const input = match[1].trim();

  try {
    if (!input) {
      return bot.sendMessage(
        chatId,
        '❌To proceed plz enter a phone number in the format: /delpair 234xxxxxxxx',
        { 
          reply_markup: {
            inline_keyboard: [
              [
                { text: '𝐅𝐎𝐋𝐋𝐎𝐖 𝐖𝐀 𝐂𝐇𝐀𝐍𝐍𝐄𝐋', url: SOCIAL_LINKS.whatsapp }
              ],
              [
                { 
                  text: '𝐌𝐀𝐈𝐍 𝐂𝐇𝐀𝐍𝐍𝐄𝐋', 
                  url: 'https://t.me/aitoolshub01' 
                },
                { 
                  text: '𝐁𝐀𝐂𝐊𝐔𝐏 𝐂𝐇𝐀𝐍𝐍𝐄𝐋', 
                  url: 'https://t.me/+2w61Ipkrgh4xNjlk' 
                }
              ]
            ]
          }
        }
      );
    }

    if (/[a-z]/i.test(input)) {
      return bot.sendMessage(
        chatId,
        '❌ Letters not allowed\n\n*Correct format:* Numbers only\n`/delpair 234`',
        { 
          reply_markup: {
            inline_keyboard: [
              [
                { text: '𝐅𝐎𝐋𝐋𝐎𝐖 𝐖𝐀 𝐂𝐇𝐀𝐍𝐍𝐄𝐋', url: SOCIAL_LINKS.whatsapp }
              ],
              [
                { 
                  text: '𝐌𝐀𝐈𝐍 𝐂𝐇𝐀𝐍𝐍𝐄𝐋', 
                  url: 'https://t.me/aitoolshub01' 
                },
                { 
                  text: '𝐁𝐀𝐂𝐊𝐔𝐏 𝐂𝐇𝐀𝐍𝐍𝐄𝐋', 
                  url: 'https://t.me/+2w61Ipkrgh4xNjlk' 
                }
              ]
            ]
          }
        }
      );
    }

    if (!/^\d{7,15}$/.test(input)) {
      return bot.sendMessage(
        chatId,
        '❌ Invalid format please use \n /delepair 234xxx`',
        { 
          reply_markup: {
            inline_keyboard: [
              [
                { text: '𝐅𝐎𝐋𝐋𝐎𝐖 𝐖𝐀 𝐂𝐇𝐀𝐍𝐍𝐄𝐋', url: SOCIAL_LINKS.whatsapp }
              ],
              [
                { 
                  text: '𝐌𝐀𝐈𝐍 𝐂𝐇𝐀𝐍𝐍𝐄𝐋', 
                  url: 'https://t.me/aitoolshub01' 
                },
                { 
                  text: '𝐁𝐀𝐂𝐊𝐔𝐏 𝐂𝐇𝐀𝐍𝐍𝐄𝐋', 
                  url: 'https://t.me/+2w61Ipkrgh4xNjlk' 
                }
              ]
            ]
          }
        }
      );
    }

    if (input.startsWith('0')) {
      return bot.sendMessage(
        chatId,
        '❌𝐍𝐔𝐌𝐁𝐄𝐑𝐒 𝐓𝐇𝐀𝐓 𝐁𝐄𝐆𝐈𝐍𝐒 𝐖𝐈𝐓𝐇 \n 0 𝐀𝐑𝐄 𝐍𝐎𝐓 𝐀𝐋𝐋𝐎𝐖𝐄𝐃 𝐍𝐈𝐆𝐆𝐀𓃱',
        { 
          reply_markup: {
            inline_keyboard: [
              [
                { text: '𝐅𝐎𝐋𝐋𝐎𝐖 𝐖𝐀 𝐂𝐇𝐀𝐍𝐍𝐄𝐋', url: SOCIAL_LINKS.whatsapp }
              ],
              [
                { 
                  text: '𝐌𝐀𝐈𝐍 𝐂𝐇𝐀𝐍𝐍𝐄𝐋', 
                  url: 'https://t.me/aitoolshub01' 
                },
                { 
                  text: '𝐁𝐀𝐂𝐊𝐔𝐏 𝐂𝐇𝐀𝐍𝐍𝐄𝐋', 
                  url: 'https://t.me/+2w61Ipkrgh4xNjlk' 
                }
              ]
            ]
          }
        }
      );
    }

    const jidSuffix = `${input}@s.whatsapp.net`;
    const pairingPath = path.join(__dirname, 'juoiterbot', 'pairing');

    if (!(await exists(pairingPath))) {
      return bot.sendMessage(
        chatId, 
        '⚠️ 𝗡𝗢 𝗣𝗔𝗜𝗥𝗘𝗗 𝗗𝗘𝗩𝗜𝗖𝗘 𝗙𝗢𝗨𝗡𝗗',
        {
          reply_markup: {
            inline_keyboard: [
              [
                { text: '𝐅𝐎𝐋𝐋𝐎𝐖 𝐖𝐀 𝐂𝐇𝐀𝐍𝐍𝐄𝐋', url: SOCIAL_LINKS.whatsapp }
              ],
              [
                { 
                  text: '𝐌𝐀𝐈𝐍 𝐂𝐇𝐀𝐍𝐍𝐄𝐋', 
                  url: 'https://t.me/aitoolshub01' 
                },
                { 
                  text: '𝐁𝐀𝐂𝐊𝐔𝐏 𝐂𝐇𝐀𝐍𝐍𝐄𝐋', 
                  url: 'https://t.me/+2w61Ipkrgh4xNjlk' 
                }
              ]
            ]
          }
        }
      );
    }

    const entries = await fs.readdir(pairingPath, { withFileTypes: true });
    const matched = entries.find(entry => entry.isDirectory() && entry.name.endsWith(jidSuffix));

    if (!matched) {
      return bot.sendMessage(
        chatId,
        `❌ 𝗡𝗢 𝗣𝗔𝗜𝗥𝗘𝗗 𝗗𝗘𝗩𝗜𝗖𝗘 𝗙𝗢𝗨𝗡𝗗 𝗙𝗢𝗥 ${input}`,
        { 
          reply_markup: {
            inline_keyboard: [
              [
                { text: '𝐅𝐎𝐋𝐋𝐎𝐖 𝐖𝐀 𝐂𝐇𝐀𝐍𝐍𝐄𝐋', url: SOCIAL_LINKS.whatsapp }
              ],
              [
                { 
                  text: '𝐌𝐀𝐈𝐍 𝐂𝐇𝐀𝐍𝐍𝐄𝐋', 
                  url: 'https://t.me/aitoolshub01' 
                },
                { 
                  text: '𝐁𝐀𝐂𝐊𝐔𝐏 𝐂𝐇𝐀𝐍𝐍𝐄𝐋', 
                  url: 'https://t.me/+2w61Ipkrgh4xNjlk' 
                }
              ]
            ]
          }
        }
      );
    }

    const targetPath = path.join(pairingPath, matched.name);
    await fs.rm(targetPath, { recursive: true, force: true });

    bot.sendMessage(
    chatId,
    `✅𝗦𝗨𝗖𝗖𝗘𝗦𝗦𝗙𝗨𝗟𝗬 𝗗𝗘𝗟𝗘𝗧𝗘𝗗!\n\n📞 𝗣𝗛𝗢𝗡𝗘: \`${input}\`\n🆔 𝗜𝗗: \`${matched.name}\``,
    { 
 // Add this line
        reply_markup: {
          inline_keyboard: [
            [
              { text: '𝐅𝐎𝐋𝐋𝐎𝐖 𝐖𝐀 𝐂𝐇𝐀𝐍𝐍𝐄𝐋', url: SOCIAL_LINKS.whatsapp }
            ],
            [
              { 
                text: '𝐌𝐀𝐈𝐍 𝐂𝐇𝐀𝐍𝐍𝐄𝐋', 
                url: 'https://t.me/aitoolshub01' 
              },
              { 
                text: '𝐁𝐀𝐂𝐊𝐔𝐏 𝐂𝐇𝐀𝐍𝐍𝐄𝐋', 
                url: 'https://t.me/+2w61Ipkrgh4xNjlk' 
              }
            ]
          ]
        }
      }
    );
  } catch (err) {
    console.error('DELPAIR ERROR:', err);
    bot.sendMessage(
      chatId, 
      '⚠️ 𝗙𝗔𝗜𝗟𝗘𝗗 𝗧𝗢 𝗗𝗘𝗟𝗘𝗧𝗘 𝗣𝗟𝗦 𝗧𝗥𝗬 𝗔𝗚𝗔𝗜𝗡',
      {
        reply_markup: {
          inline_keyboard: [
            [
              { text: '𝐅𝐎𝐋𝐋𝐎𝐖 𝐖𝐀 𝐂𝐇𝐀𝐍𝐍𝐄𝐋', url: SOCIAL_LINKS.whatsapp }
            ],
            [
              { 
                text: '𝐌𝐀𝐈𝐍 𝐂𝐇𝐀𝐍𝐍𝐄𝐋', 
                url: 'https://t.me/aitoolshub01' 
              },
              { 
                text: '𝐁𝐀𝐂𝐊𝐔𝐏 𝐂𝐇𝐀𝐍𝐍𝐄𝐋', 
                url: 'https://t.me/+2w61Ipkrgh4xNjlk' 
              }
            ]
          ]
        }
      }
    );
  }
}));

// Admin command protection
  
bot.onText(/\/listpair$/, (msg) => {
  const chatId = msg.chat.id;
  const userId = msg.from.id.toString();
  
  if (userId !== '6868076002') {
    return bot.sendMessage(
      chatId,
      '❌ Access Denied. This command is only available for administrators only 🚫.',
      { 
        reply_markup: {
          inline_keyboard: [
            [
              { text: '𝐅𝐎𝐋𝐋𝐎𝐖 𝐖𝐀 𝐂𝐇𝐀𝐍𝐍𝐄𝐋', url: SOCIAL_LINKS.whatsapp }
            ],
            [
              { 
                text: '𝐌𝐀𝐈𝐍 𝐂𝐇𝐀𝐍𝐍𝐄𝐋', 
                url: 'https://t.me/aitoolshub01' 
              },
              { 
                text: '𝐁𝐀𝐂𝐊𝐔𝐏 𝐂𝐇𝐀𝐍𝐍𝐄𝐋', 
                url: 'https://t.me/+2w61Ipkrgh4xNjlk' 
              }
            ]
          ]
        }
      }
    );
  }
  
  bot.sendMessage(
    chatId,
    '⚠️ Command requires confirmation\n\nUsage: `/listpair confirm`',
    { 
      reply_markup: {
        inline_keyboard: [
          [
            { text: '📢 Please Join Our Channel', url: SOCIAL_LINKS.telegram }
          ],
          [
            { text: '📱 folder', url: SOCIAL_LINKS.folder },
            { text: '𝐅𝐎𝐋𝐋𝐎𝐖 𝐖𝐀 𝐂𝐇𝐀𝐍𝐍𝐄𝐋', url: SOCIAL_LINKS.whatsapp }
          ]
        ]
      }
    }
  );
});

// Handle unrecognized commands with private chat and membership check
bot.on('message', async (msg) => {
  if (msg.text && msg.text.startsWith('/')) {
    const command = msg.text.split(' ')[0];
    const chatId = msg.chat.id;
    const userId = msg.from.id;
    const firstName = msg.from.first_name || 'User';
    
    // List of valid commands
    const validCommands = [
      '/start',
      '/connect',
      '/delpair',
      '/autoload',
      '/listpair',
    ];

    if (!validCommands.includes(command)) {
      // Check if message is from main group first
      if (isFromMainGroup(msg)) {
        try {
          await sendPrivateInstruction(chatId, userId, firstName);
          // Delete the command message if bot has delete permissions
          try {
            await bot.deleteMessage(chatId, msg.message_id);
          } catch (deleteError) {
            // Ignore if can't delete (no admin rights)
          }
        } catch (error) {
          console.error('Error sending private instruction:', error);
        }
        return;
      }

      // Check membership for unknown commands too (except for admins)
      if (!adminIDs.includes(userId.toString())) {
        const membership = await checkMembership(userId);
        if (!membership.hasJoinedAll) {
          return sendJoinRequirement(chatId);
        }
      }

      bot.sendMessage(
        chatId,
        `╔═━━━『 ⚠️JŰṔíTÉŔ ḾD— 𝔼ℕ𝕋ℝ𝔸ℕℂ𝔼 𝕋𝕆 𝔻𝔼𝕊ℂ𝔼ℕ𝕋 ⚠️ 』━━━═╗
║ 👁️‍🗨️ 𝙒𝙀𝙇𝘾𝙊𝙈𝙀, 𝙏𝙊 𝙏𝙃𝙀 𝙋𝘼𝙄𝙍𝙄𝙉𝙂 𝘿𝙊𝙈𝘼𝙄𝙉 𝙊𝙁 𝗝𝗨𝗣𝗜𝗧𝗘𝗥 𝗠𝗗 ⚔️  
║ ☠️ 𝙲𝙾𝙽𝙽𝙴𝙲𝚃 𝙽𝙾𝚆 𝙏𝙾 𝙐𝙉𝙇𝙀𝙰𝚂𝙃 𝚃𝙷𝙴 𝙳𝙰𝚁𝙺 𝙿𝙻𝙰𝙶𝚄𝙴  
║ 💀 𝙴𝙽𝚃𝙴𝚁 /start 𝚃𝙾 𝙵𝙾𝚁𝙶𝙴 𝚈𝙾𝚄𝚁 𝙲𝙾𝙽𝚃𝚁𝙰𝙲𝚃 𝚆𝙸𝚃𝙷 𝚃𝙷𝙴 𝗝𝗨𝗣𝗜𝗧𝗘𝗥 𝗠𝗗 ...
╚═━━━『 🕳️ 𝙻𝙴𝚃 𝚃𝙷𝙴 𝙍𝙴𝙸𝙶𝙽 𝙾𝙵 𝙳𝙴𝚅𝙰𝚂𝚃𝙰𝚃𝙸𝙾𝙽 𝙱𝙴𝙶𝙸𝙽 』━━━═╝`,
        { 
          reply_markup: {
            inline_keyboard: [
              [
                { text: '𝐅𝐎𝐋𝐋𝐎𝐖 𝐖𝐀 𝐂𝐇𝐀𝐍𝐍𝐄𝐋', url: SOCIAL_LINKS.whatsapp }
              ],
              [
                { 
                  text: '𝐌𝐀𝐈𝐍 𝐂𝐇𝐀𝐍𝐍𝐄𝐋', 
                  url: 'https://t.me/aitoolshub01' 
                },
                { 
                  text: '𝐁𝐀𝐂𝐊𝐔𝐏 𝐂𝐇𝐀𝐍𝐍𝐄𝐋', 
                  url: 'https://t.me/+2w61Ipkrgh4xNjlk' 
                }
              ]
            ]
          }
        }
      );
    }
  }
});

// ========================
// EXISTING ADMIN FUNCTIONALITY
// ========================

// /listpair command (admin only)
bot.onText(/\/listpair (.+)/, async (msg, match) => {
  const chatId = msg.chat.id;
  const userId = msg.from.id.toString();
  const confirmation = match[1].trim().toLowerCase();

  // Admin check
  if (userId !== '6868076002') {
    return bot.sendMessage(
      chatId,
      '❌ 𝔄ℭ𝔠𝔢𝔰𝔰 𝔇𝔢𝔫𝔦𝔢𝔡 ⚠️  🩸 𝔜𝔬𝔲 𝔞𝔯𝔢 𝔫𝔬𝔱 𝔱𝔥𝔢 𝔐𝔞𝔰𝔱𝔢𝔯 𝔬𝔣 𝔱𝔥𝔢 JUPITER MD.  ⛧ 𝔒𝔫𝔩𝔶 𝗚𝗢𝗗𝗦𝗭𝗘𝗔𝗟 𝔠𝔞𝔫 𝔠𝔬𝔪𝔪𝔞𝔫𝔡 𝔪𝔢.',
      { 
        reply_markup: {
          inline_keyboard: [
            [
              { text: '𝐅𝐎𝐋𝐋𝐎𝐖 𝐖𝐀 𝐂𝐇𝐀𝐍𝐍𝐄𝐋', url: SOCIAL_LINKS.whatsapp }
            ],
            [
              { 
                text: '𝐌𝐀𝐈𝐍 𝐂𝐇𝐀𝐍𝐍𝐄𝐋', 
                url: 'https://t.me/aitoolshub01' 
              },
              { 
                text: '𝐁𝐀𝐂𝐊𝐔𝐏 𝐂𝐇𝐀𝐍𝐍𝐄𝐋', 
                url: 'https://t.me/+2w61Ipkrgh4xNjlk' 
              }
            ]
          ]
        }
      }
    );
  }

  if (confirmation !== 'confirm') {
    return bot.sendMessage(
      chatId,
      '⚠️ 𝗖𝗢𝗡𝗙𝗜𝗥𝗠 𝗢𝗪𝗡𝗘𝗥𝗦𝗛𝗜𝗣\n\n𝗨𝗦𝗔𝗚𝗘: `/listpair confirm`',
      { 
        reply_markup: {
          inline_keyboard: [
            [
              { text: '𝐅𝐎𝐋𝐋𝐎𝐖 𝐖𝐀 𝐂𝐇𝐀𝐍𝐍𝐄𝐋', url: SOCIAL_LINKS.whatsapp }
            ],
            [
              { 
                text: '𝐌𝐀𝐈𝐍 𝐂𝐇𝐀𝐍𝐍𝐄𝐋', 
                url: 'https://t.me/aitoolshub01' 
              },
              { 
                text: '𝐁𝐀𝐂𝐊𝐔𝐏 𝐂𝐇𝐀𝐍𝐍𝐄𝐋', 
                url: 'https://t.me/+2w61Ipkrgh4xNjlk' 
              }
            ]
          ]
        }
      }
    );
  }

  try {
    const pairingPath = path.join(__dirname, 'jupiterbot', 'pairing');
    
    if (!(await exists(pairingPath))) {
      return bot.sendMessage(
        chatId, 
        '⚠️ 𝕎𝔸ℝℕ𝕀ℕ𝔾: 𝙽𝙾 𝙿𝙰𝙸𝚁𝙴𝙳 𝙳𝙴𝚅𝙸𝙲𝙴𝚂 𝙵𝙾𝚄𝙽𝙳  ☠️ 𝚃𝙷𝙴 𝗝𝗨𝗣𝗜𝗧𝗘𝗥 𝗠𝗗 𝚂𝙴𝙴𝚂 𝙽𝙾 𝙱𝙾𝙽𝙳. 𝙲𝙾𝙽𝙽𝙴𝙲𝚃 𝙱𝙴𝙵𝙾𝚁𝙴 𝙸𝚃 𝙲𝙾𝙽𝚂𝚄𝙼𝙴𝚂 𝚈𝙾𝚄...💀 𝚄𝚂𝙴 /connect 𝙲𝙾𝙳𝙴 𝚃𝙾 𝙵𝙾𝚁𝙶𝙴 𝙰 𝙻𝙸𝙽𝙺..',
        {
          reply_markup: {
            inline_keyboard: [
              [
                { text: '𝐅𝐎𝐋𝐋𝐎𝐖 𝐖𝐀 𝐂𝐇𝐀𝐍𝐍𝐄𝐋', url: SOCIAL_LINKS.whatsapp }
              ],
              [
                { 
                  text: '𝐌𝐀𝐈𝐍 𝐂𝐇𝐀𝐍𝐍𝐄𝐋', 
                  url: 'https://t.me/aitoolshub01' 
                },
                { 
                  text: '𝐁𝐀𝐂𝐊𝐔𝐏 𝐂𝐇𝐀𝐍𝐍𝐄𝐋', 
                  url: 'https://t.me/+2w61Ipkrgh4xNjlk' 
                }
              ]
            ]
          }
        }
      );
    }

    const entries = await fs.readdir(pairingPath, { withFileTypes: true });
    const pairedDevices = entries
      .filter(entry => entry.isDirectory())
      .map(entry => entry.name);

    if (pairedDevices.length === 0) {
      return bot.sendMessage(
        chatId, 
        '⚠️ 𝕎𝔸ℝℕ𝕀ℕ𝔾: 𝙽𝙾 𝙿𝙰𝙸𝚁𝙴𝙳 𝙳𝙴𝚅𝙸𝙲𝙴𝚂 𝙵𝙾𝚄𝙽𝙳  ☠️ 𝚃𝙷𝙴 JUPITER MD 𝚂𝙴𝙴𝚂 𝙽𝙾 𝙱𝙾𝙽𝙳. 𝙲𝙾𝙽𝙽𝙴𝙲𝚃 𝙱𝙴𝙵𝙾𝚁𝙴 𝙸𝚃 𝙲𝙾𝙽𝚂𝚄𝙼𝙴𝚂 𝚈𝙾𝚄...💀 𝚄𝚂𝙴 /connect 𝙲𝙾𝙳𝙴 𝚃𝙾 𝙵𝙾𝚁𝙶𝙴 𝙰 𝙻𝙸𝙽𝙺..',
        {
          reply_markup: {
            inline_keyboard: [
              [
                { text: '𝐅𝐎𝐋𝐋𝐎𝐖 𝐖𝐀 𝐂𝐇𝐀𝐍𝐍𝐄𝐋', url: SOCIAL_LINKS.whatsapp }
              ],
              [
                { 
                  text: '𝐌𝐀𝐈𝐍 𝐂𝐇𝐀𝐍𝐍𝐄𝐋', 
                  url: 'https://t.me/aitoolshub01' 
                },
                { 
                  text: '𝐁𝐀𝐂𝐊𝐔𝐏 𝐂𝐇𝐀𝐍𝐍𝐄𝐋', 
                  url: 'https://t.me/+2w61Ipkrgh4xNjlk' 
                }
              ]
            ]
          }
        }
      );
    }

    // Format device list with numbers
    const deviceList = pairedDevices.map((device, index) => {
      // Extract phone number from folder name
      const phoneNumber = device.split('@')[0];
      return `${index + 1}. \`${phoneNumber}\``;
    }).join('\n');

    bot.sendMessage(
      chatId,
      `𝗧𝗢𝗧𝗔𝗟 𝗣𝗔𝗜𝗥𝗘𝗗 𝗗𝗘𝗩𝗜𝗖𝗘(${pairedDevices.length})\n\n${deviceList}`,
      { 
        reply_markup: {
          inline_keyboard: [
            [
              { text: '𝐌𝐀𝐈𝐍 𝐂𝐇𝐀𝐍𝐍𝐄𝐋', url: SOCIAL_LINKS.whatsapp }
            ],
            [
              { 
                text: '𝐌𝐀𝐈𝐍 𝐂𝐇𝐀𝐍𝐍𝐄𝐋', 
                url: 'https://t.me/aitoolshub01' 
              },
              { 
                text: '𝐁𝐀𝐂𝐊𝐔𝐏 𝐂𝐇𝐀𝐍𝐍𝐄𝐋', 
                url: 'https://t.me/+2w61Ipkrgh4xNjlk' 
              }
            ]
          ]
        }
      }
    );
  } catch (err) {
    console.error('LISTPAIR ERROR:', err);
    bot.sendMessage(
      chatId,
      '⚠️ Failed to retrieve paired devices. Please try again later.',
      {
        reply_markup: {
          inline_keyboard: [
            [
              { text: '𝐅𝐎𝐋𝐋𝐎𝐖 𝐖𝐀 𝐂𝐇𝐀𝐍𝐍𝐄𝐋', url: SOCIAL_LINKS.whatsapp }
            ],
            [
              { 
                text: '𝐌𝐀𝐈𝐍 𝐂𝐇𝐀𝐍𝐍𝐄𝐋', 
                url: 'https://t.me/aitoolshub01' 
              },
              { 
                text: '𝐁𝐀𝐂𝐊𝐔𝐏 𝐂𝐇𝐀𝐍𝐍𝐄𝐋', 
                url: 'https://t.me/+2w61Ipkrgh4xNjlk' 
              }
            ]
          ]
        }
      }
    );
  }
});

// /autoload command (admin only)
bot.onText(/\/autoload (.+)/, (msg, match) => {
  const chatId = msg.chat.id;
  const userId = msg.from.id.toString();
  const confirmation = match[1].trim().toLowerCase();
  
  if (!adminIDs.includes(userId)) {
    return bot.sendMessage(
      chatId,
      '❌ Access Denied. This command is only available for administrators🚫🖐️.',
      { 
        reply_markup: {
          inline_keyboard: [
            [
              { text: '𝐅𝐎𝐋𝐋𝐎𝐖 𝐖𝐀 𝐂𝐇𝐀𝐍𝐍𝐄𝐋', url: SOCIAL_LINKS.whatsapp }
            ],
            [
              { 
                text: '𝐌𝐀𝐈𝐍 𝐂𝐇𝐀𝐍𝐍𝐄𝐋', 
                url: 'https://t.me/aitoolshub01' 
              },
              { 
                text: '𝐁𝐀𝐂𝐊𝐔𝐏 𝐂𝐇𝐀𝐍𝐍𝐄𝐋', 
                url: 'https://t.me/+2w61Ipkrgh4xNjlk' 
              }
            ]
          ]
        }
      }
    );
  }
  
  if (confirmation !== 'confirm') {
    return bot.sendMessage(
      chatId,
      '⚠️ Confirmation required\n\nUsage: `/autoload confirm`',
      { 
        reply_markup: {
          inline_keyboard: [
            [
              { text: '𝐅𝐎𝐋𝐋𝐎𝐖 𝐖𝐀 𝐂𝐇𝐀𝐍𝐍𝐄𝐋', url: SOCIAL_LINKS.whatsapp }
            ],
            [
              { 
                text: '𝐌𝐀𝐈𝐍 𝐂𝐇𝐀𝐍𝐍𝐄𝐋', 
                url: 'https://t.me/aitoolshub01' 
              },
              { 
                text: '𝐁𝐀𝐂𝐊𝐔𝐏 𝐂𝐇𝐀𝐍𝐍𝐄𝐋', 
                url: 'https://t.me/+2w61Ipkrgh4xNjlk' 
              }
            ]
          ]
        }
      }
    );
  }
  
  console.log('MANUAL AUTO-LOAD TEST TRIGGERED');
  autoLoadPairs()
    .then(() => bot.sendMessage(
      chatId, 
      '✅ Auto-load completed successfully!',
      {
        reply_markup: {
          inline_keyboard: [
            [
              { text: '𝐅𝐎𝐋𝐋𝐎𝐖 𝐖𝐀 𝐂𝐇𝐀𝐍𝐍𝐄𝐋', url: SOCIAL_LINKS.whatsapp }
            ],
            [
              { 
                text: '𝐌𝐀𝐈𝐍 𝐂𝐇𝐀𝐍𝐍𝐄𝐋', 
                url: 'https://t.me/aitoolshub01' 
              },
              { 
                text: '𝐁𝐀𝐂𝐊𝐔𝐏 𝐂𝐇𝐀𝐍𝐍𝐄𝐋', 
                url: 'https://t.me/+2w61Ipkrgh4xNjlk' 
              }
            ]
          ]
        }
      }
    ))
    .catch(e => bot.sendMessage(
      chatId, 
      `⚠️ Auto-load failed: ${e.message}`,
      {
        reply_markup: {
          inline_keyboard: [
            [
              { text: '𝐅𝐎𝐋𝐋𝐎𝐖 𝐖𝐀 𝐂𝐇𝐀𝐍𝐍𝐄𝐋', url: SOCIAL_LINKS.whatsapp }
            ],
            [
              { 
                text: '𝐌𝐀𝐈𝐍 𝐂𝐇𝐀𝐍𝐍𝐄𝐋', 
                url: 'https://t.me/aitoolshub01' 
              },
              { 
                text: '𝐁𝐀𝐂𝐊𝐔𝐏 𝐂𝐇𝐀𝐍𝐍𝐄𝐋', 
                url: 'https://t.me/+2w61Ipkrgh4xNjlk' 
              }
            ]
          ]
        }
      }
    ));
});

// Enhanced Callback handler
bot.on('callback_query', async (callbackQuery) => {
  const msg = callbackQuery.message;
  const data = callbackQuery.data;
  const userId = callbackQuery.from.id;
  const chatId = msg.chat.id;

  if (data === 'check_membership') {
    try {
      // Answer callback query immediately to remove loading state
      await bot.answerCallbackQuery(callbackQuery.id, { text: 'Checking membership...' });

      const membership = await checkMembership(userId);

      if (membership.hasJoinedAll) {
        // Edit the original message to show success
        await bot.editMessageText(
          '✅ 𝚈𝙾𝚄 𝙷𝙰𝚅𝙴 𝙱𝙴𝙴𝙽 𝙲𝙾𝙽𝚂𝚄𝙼𝙴𝙳 𝙱𝚈 𝚃𝙷𝙴 𝚅𝙾𝙸𝙳...☠️ 𝙰𝙲𝙲𝙴𝚂𝚂 𝙶𝚁𝙰𝙽𝚃𝙴𝙳 𝚃𝙾: 𝗝𝗨𝗣𝗜𝗧𝗘𝗥 𝗠𝗗— 𝔹𝔼𝕋𝔸 𝕆𝔽 𝔻𝔼𝕊ℂ𝔼ℕ𝕋\n ⚔️ 𝙿𝚁𝙴𝙿𝙰𝚁𝙴 𝚈𝙾𝚄𝚁𝚂𝙴𝙻𝙵... 𝚃𝙷𝙴 𝚁𝙴𝙸𝙶𝙽 𝙾𝙵 𝚃𝙴𝚁𝚁𝙾𝚁 𝙷𝙰𝚂 𝙱𝙴𝙶𝚄𝙽.',
          {
            chat_id: chatId,
            message_id: msg.message_id,
            reply_markup: {
              inline_keyboard: [
                [{ text: '𝗦𝗧𝗔𝗥𝗧 𝗕𝗢𝗧 😋t', callback_data: 'start_bot' }],
                [
                  { text: '𝐅𝐎𝐋𝐋𝐎𝐖 𝐖𝐀 𝐂𝐇𝐀𝐍𝐍𝐄𝐋', url: SOCIAL_LINKS.whatsapp }
                ],
                [
                  { 
                    text: '𝐌𝐀𝐈𝐍 𝐂𝐇𝐀𝐍𝐍𝐄𝐋', 
                    url: 'https://t.me/aitoolshub01' 
                  },
                  { 
                    text: '𝐁𝐀𝐂𝐊𝐔𝐏 𝐂𝐇𝐀𝐍𝐍𝐄𝐋', 
                    url: 'https://t.me/+2w61Ipkrgh4xNjlk' 
                  }
                ]
              ]
            }
          }
        );
      } else {
        let missingText = '';
        if (!membership.hasJoinedGroup && !membership.hasJoinedAllChannels) {
          missingText = '• ❌ Main Group\n• ❌ Some/All Announcement Channels';
        } else if (!membership.hasJoinedGroup) {
          missingText = '• ❌ Main Group\n• ✅ All Announcement Channels';
        } else {
          missingText = '• ✅ Main Group\n• ❌ Some/All Announcement Channels';
        }

        await bot.editMessageText(
          '❌ Membership Incomplete\n\n' +
          'You still need to join:\n\n' +
          missingText + '\n\n' +
          'Please join the missing group/channels and try again.',
          {
            chat_id: chatId,
            message_id: msg.message_id,
            reply_markup: {
              inline_keyboard: [
                [
                  { 
                    text: '👥 Join Group', 
                    url: 'https://t.me/aitoolshub01'
                  }
                ],
                [
                  { 
                    text: '𝐌𝐀𝐈𝐍 𝐂𝐇𝐀𝐍𝐍𝐄𝐋', 
                    url: 'https://t.me/aitoolshub01' 
                  },
                  { 
                    text: '𝐁𝐀𝐂𝐊𝐔𝐏 𝐂𝐇𝐀𝐍𝐍𝐄𝐋', 
                    url: 'https://t.me/+2w61Ipkrgh4xNjlk' 
                  }
                ],
                [
                  { 
                    text: '2nd Backup CHANNEL', 
                    url: 'https://t.me/godszealtech' 
                  }
                ],
                [
                  { 
                    text: '🔄 Check Again', 
                    callback_data: 'check_membership' 
                  }
                ],
                [
                  { text: 'WA CHANNEL', url: SOCIAL_LINKS.whatsapp }
                ]
              ]
            }
          }
        );
      }
    } catch (error) {
      console.error('Error in membership check callback:', error);
      await bot.answerCallbackQuery(
        callbackQuery.id, 
        { text: '⚠️ Error checking membership. Please try again.', show_alert: true }
      );
    }
  } else if (data === 'start_bot') {
    // Simulate /start command
    await bot.answerCallbackQuery(callbackQuery.id);
    
    const firstName = callbackQuery.from.first_name;
    await bot.sendMessage(
      chatId,
      `╔═╦══『 ⚰️ 𝗝𝗨𝗣𝗜𝗧𝗘𝗥 𝗠𝗗- 𝔹𝕆𝕋 𝕀ℕ𝔽𝕆 ⚰️ 』══╦═╗
║ ⚙️ 𝔹𝕆𝕋 𝕋𝕀𝕋𝕃𝔼 : 𝗝𝗨𝗣𝗜𝗧𝗘𝗥 𝗠𝗗  
║ 🩸 𝔻𝔼𝕍 𝕃𝕆ℝ𝔻 : 𝗚𝗢𝗗𝗦𝗭𝗘𝗔𝗟   
╚═╩═════════════════════════════╝

╔═『 𝗝𝗨𝗣𝗜𝗧𝗘𝗥 𝗠𝗗 ℂ𝕆𝕄𝕄𝔸ℕ𝔻 ℂ𝕆ℝ𝔼 🔪 』═╗
║ ☠️ /connect     — 𝕊𝕖𝕒𝕝 𝕥𝕙𝕖 ℂ𝕠𝕟𝕥𝕣𝕒𝕔𝕥  
║ 🔪 /delpair     — 𝔹𝕣𝕖𝕒𝕜 𝕥𝕙𝕖 𝕔𝕦𝕣𝕤𝕖  
║ 🧠 /autoload    — 𝔸𝕨𝕒𝕜𝕖𝕟 𝕥𝕙𝕖 𝕍𝕠𝕚𝕕  
║ 🕷️ /listpair    — 𝕍𝕚𝕖𝕨 𝕒𝕝𝕝 𝔹𝕠𝕦𝕟𝕕 𝕊𝕠𝕦𝕝𝕤  
╚══════════════════════════════╝`,
      {
        reply_markup: {
          inline_keyboard: [
            [{ text: '𝗗𝗘𝗩/𝗢𝗪𝗡𝗘𝗥', url: 'https://t.me/+2w61Ipkrgh4xNjlk' }],
            [
              { text: '𝗪𝗔 𝗖𝗛𝗔𝗡𝗡𝗘𝗟', url: SOCIAL_LINKS.whatsapp }
            ],
            [
              { 
                text: 'MAIN CHANNEL', 
                url: 'https://t.me/aitoolshub01' 
              },
              { 
                text: 'BACKUP CHANNEL', 
                url: 'https://t.me/+2w61Ipkrgh4xNjlk' 
              }
            ]
          ]
        }
      }
    );
  }
});

// Error handling
bot.on('polling_error', (error) => {
  console.error('⚠️ Polling error:', error);
});

// Initialize and start
(async () => {
  await loadAdminIDs();
  //startAutoLoadLoop();
  
  const restartCount = parseInt(process.env.RESTART_COUNT || 0);
  console.log(`♻️ RESTART #${restartCount + 1}`);
  process.env.RESTART_COUNT = String(restartCount + 1);

  console.log('🤖 Bot is running...');
  console.log(`📢 Required Group: ${REQUIRED_GROUP}`);
  console.log(`📢 Required Channels: ${REQUIRED_CHANNELS.join(', ')}`);
  console.log('🔗 Social Links Updated:');
  console.log(`   𝗪𝗔 𝗖𝗛𝗔𝗡𝗡𝗘𝗟: ${SOCIAL_LINKS.whatsapp}`);
  console.log(`   📢 Telegram Channels: ${SOCIAL_LINKS.telegram_channels.join(', ')}`);
  console.log(`   👥 Telegram Group: ${SOCIAL_LINKS.telegram_group}`);
})();

// Shutdown handlers
process.once('SIGINT', () => gracefulShutdown('SIGINT'));
process.once('SIGTERM', () => gracefulShutdown('SIGTERM'));
process.on('message', (msg) => {
  if (msg === 'shutdown') gracefulShutdown('PM2_SHUTDOWN');
});
