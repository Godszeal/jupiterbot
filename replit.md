# Jupiter MD Bot

## Overview

Jupiter MD is a multi-platform bot system that operates on both Telegram and WhatsApp. The primary function is to provide a Telegram bot interface that can pair and manage WhatsApp bot instances using the Baileys library. The system allows users to connect WhatsApp accounts via pairing codes and provides various bot commands for group management, media processing, and automated moderation.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Core Components

**Entry Point & Authentication**
- `index.js` serves as the main entry point with obfuscated code that handles startup authentication via password verification
- Uses `token.js` for storing bot credentials (Telegram bot token and startup password)
- Authentication state persisted in `database/auth.json`

**Telegram Bot Layer**
- `bot.js` implements the Telegram bot using `node-telegram-bot-api`
- Handles user interaction, membership verification for required groups/channels
- Manages admin permissions via `jupiterbot/admin.json`
- Controls pairing workflow for WhatsApp connections

**WhatsApp Connection Layer**
- `pair.js` handles WhatsApp connections using `@whiskeysockets/baileys` (custom fork: holyrag/XD-Baileys)
- Uses multi-file auth state for session persistence
- Implements auto-follow for newsletter channels and auto-join for group invites
- `jupiter.js` processes WhatsApp messages and implements bot commands

**Process Management**
- `ecosystem.config.js` configures PM2 for production deployment
- Memory limits set to 800MB with automatic restart capabilities
- Watches only `index.js` for changes to prevent unnecessary restarts

### Message Processing Architecture

**Command System**
- Commands defined in `commands/` directory using a `cmd()` pattern registration
- `handlers/` directory contains message handlers (e.g., anti-link detection)
- Command structure: `{ pattern, desc, category, use }` for command metadata

**Utility Functions**
- `allfunc/` directory contains shared utility modules:
  - `exif.js`, `Data2.js` - Media processing (image/video to WebP conversion)
  - `myfunc.js`, `myfunc1.js` through `myfunc4.js` - Various helper functions
  - `remini.js` - Image enhancement via external API
  - `storage.js`, `Data1.js` - Buffer handling and HTTP requests

### Configuration

**Global Settings** (`setting/config.js`)
- Bot identity: name, owner info, footer text
- Permission messages for restricted features
- Status mode (self/public)
- Prefix patterns for commands

**Data Storage**
- `database/` directory for JSON-based storage:
  - `users.json` - Registered user IDs
  - `telepremium.json` - Premium Telegram users
  - `banned.json` - Banned users
  - `settings.json` - Runtime settings

### Media Assets

- `media/` directory for bot images and audio
- `src/media/tiktokvids/` contains JSON files with video URLs for random content features

## External Dependencies

### APIs & Services

**WhatsApp Connection**
- Baileys library (custom fork: `github:holyrag/XD-Baileys`) for WhatsApp Web multi-device protocol
- Handles QR-less pairing via pairing codes

**Telegram**
- `node-telegram-bot-api` for Telegram Bot API integration
- Required group: `@godszealtech`
- Required channel: `@aitoolshub01`

**Media Processing**
- `fluent-ffmpeg` for video/audio transcoding
- `jimp` for image manipulation
- `node-webpmux` for WebP sticker creation
- `google-tts-api` for text-to-speech
- External image enhancement via `inferenceengine.vyro.ai`

**Content Sources**
- `@vreden/youtube_scraper` for YouTube content
- `yt-search` for YouTube search functionality
- `catbox.moe` and `file.io` for temporary file uploads

### Key npm Dependencies

- `axios` - HTTP client
- `cheerio` - HTML parsing
- `moment-timezone` - Date/time handling
- `chalk` - Terminal styling
- `pino` - Logging
- `node-cache` - In-memory caching
- `awesome-phonenumber` - Phone number parsing
- `file-type` - File type detection
- `form-data` - Multipart form handling

### Database

Currently uses JSON file-based storage. No PostgreSQL or other database configured, but the architecture could support adding Drizzle ORM with a database later.