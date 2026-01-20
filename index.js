const _0x5bca04 = _0x5220;
(function (_0x12bd1e, _0x2524a3) {
    const _0x1e84f4 = _0x5220, _0x258c62 = _0x12bd1e();
    while (!![]) {
        try {
            const _0x5e7166 = -parseInt(_0x1e84f4(0x16e)) / (-0x1df9 + 0x72a + 0x16d0) + -parseInt(_0x1e84f4(0x162)) / (-0x17d0 + 0x319 * 0x2 + 0xbc * 0x18) * (-parseInt(_0x1e84f4(0x159)) / (0x1055 + 0x1786 * 0x1 + -0x27d8)) + -parseInt(_0x1e84f4(0x13e)) / (0x203e + -0x3 * -0x927 + -0xb * 0x56d) * (parseInt(_0x1e84f4(0x1a3)) / (0x3fb * -0x2 + -0xc1 * 0x9 + 0xec4)) + parseInt(_0x1e84f4(0x13a)) / (0x1bb * -0x3 + 0x16c + 0x3cb) * (-parseInt(_0x1e84f4(0x1c0)) / (-0x4c6 + 0x347 + 0x186)) + parseInt(_0x1e84f4(0x1b1)) / (-0x46 * 0x64 + 0x637 + 0x1 * 0x1529) + -parseInt(_0x1e84f4(0x146)) / (0xe34 + -0xd * 0x5c + -0x1 * 0x97f) * (-parseInt(_0x1e84f4(0x1a0)) / (0x5d * 0x2 + -0x2 * 0x12f2 + -0x2 * -0x129a)) + parseInt(_0x1e84f4(0x120)) / (0xf6c + -0xbbe + -0x3a3);
            if (_0x5e7166 === _0x2524a3)
                break;
            else
                _0x258c62['push'](_0x258c62['shift']());
        } catch (_0x462317) {
            _0x258c62['push'](_0x258c62['shift']());
        }
    }
}(_0x3f84, 0x2e8a7 + -0xdc7 * -0x3 + -0x141 * 0x24));
const fs = require('fs'), readline = require(_0x5bca04(0x11d)), chalk = require(_0x5bca04(0x1c1)), {startupPassword} = require(_0x5bca04(0x195)), AUTH_FILE = _0x5bca04(0x1ae) + _0x5bca04(0x1ad), startpairing = require(_0x5bca04(0x169)), delay = _0x455cb5 => new Promise(_0x200c00 => setTimeout(_0x200c00, _0x455cb5)), autoLoadPairs = async () => {
        const _0x16b79d = _0x5bca04, _0x182c94 = {
                'cluoU': _0x16b79d(0x12a) + _0x16b79d(0x18c) + _0x16b79d(0x197) + _0x16b79d(0x156),
                'NgaOc': _0x16b79d(0x1ca) + _0x16b79d(0x149) + _0x16b79d(0x129) + '/',
                'ggcER': _0x16b79d(0x183) + _0x16b79d(0x14c) + _0x16b79d(0x157),
                'JxlGu': function (_0xc3f74b, _0x102289) {
                    return _0xc3f74b === _0x102289;
                },
                'RsNDV': _0x16b79d(0x11f) + _0x16b79d(0x1be) + _0x16b79d(0x190),
                'NkYhB': _0x16b79d(0x175) + _0x16b79d(0x1a2) + _0x16b79d(0x1d0) + _0x16b79d(0x196) + _0x16b79d(0x1a8),
                'lDNRs': function (_0x2ad1f2, _0x9ea961) {
                    return _0x2ad1f2(_0x9ea961);
                },
                'obDTI': function (_0xe4fd4f, _0x420987) {
                    return _0xe4fd4f < _0x420987;
                },
                'PBori': function (_0x5e880d, _0x5e597b) {
                    return _0x5e880d + _0x5e597b;
                },
                'CyiZC': function (_0x11458d, _0x489745) {
                    return _0x11458d(_0x489745);
                },
                'INbpN': function (_0x1bcffb, _0x1eabe9) {
                    return _0x1bcffb < _0x1eabe9;
                },
                'bqwqE': function (_0xe2ec6f, _0x5688a7) {
                    return _0xe2ec6f - _0x5688a7;
                },
                'UmcVN': _0x16b79d(0x121) + _0x16b79d(0x14d) + _0x16b79d(0x1a7),
                'kJWFG': _0x16b79d(0x175) + _0x16b79d(0x1a2) + _0x16b79d(0x1a5) + _0x16b79d(0x165)
            };
        console[_0x16b79d(0x1c7)](chalk[_0x16b79d(0x1ba)](_0x182c94[_0x16b79d(0x1ce)]));
        const _0x3260a6 = _0x182c94[_0x16b79d(0x16c)];
        if (!fs[_0x16b79d(0x12e)](_0x3260a6)) {
            console[_0x16b79d(0x1c7)](chalk[_0x16b79d(0x12b)](_0x182c94[_0x16b79d(0x19a)]));
            return;
        }
        const _0x53bb53 = fs[_0x16b79d(0x1a9) + 'c'](_0x3260a6, { 'withFileTypes': !![] })[_0x16b79d(0x125)](_0x52e1f5 => _0x52e1f5[_0x16b79d(0x143) + 'y']())[_0x16b79d(0x19f)](_0x4cc1a3 => _0x4cc1a3[_0x16b79d(0x1b6)])[_0x16b79d(0x125)](_0xa5a6e => _0xa5a6e[_0x16b79d(0x126)](_0x16b79d(0x1c3) + _0x16b79d(0x17a)));
        if (_0x182c94[_0x16b79d(0x192)](_0x53bb53[_0x16b79d(0x11c)], 0x1 * 0x17f2 + -0x95 * 0x3b + -0x3 * -0x377)) {
            console[_0x16b79d(0x1c7)](chalk[_0x16b79d(0x1ba)](_0x182c94[_0x16b79d(0x133)]));
            return;
        }
        console[_0x16b79d(0x1c7)](chalk[_0x16b79d(0x1b7)](_0x16b79d(0x147) + _0x53bb53[_0x16b79d(0x11c)] + (_0x16b79d(0x17f) + _0x16b79d(0x15c) + _0x16b79d(0x163) + '.'))), console[_0x16b79d(0x1c7)](chalk[_0x16b79d(0x18d)](_0x182c94[_0x16b79d(0x12c)])), await _0x182c94[_0x16b79d(0x1b0)](delay, 0x11d5 * 0x2 + 0x26df + -0x13a3 * 0x3);
        for (let _0x358f85 = -0x356 + 0x9ec + -0x696; _0x182c94[_0x16b79d(0x130)](_0x358f85, _0x53bb53[_0x16b79d(0x11c)]); _0x358f85++) {
            const _0x594b89 = _0x53bb53[_0x358f85];
            try {
                console[_0x16b79d(0x1c7)](chalk[_0x16b79d(0x18d)](_0x16b79d(0x180) + _0x16b79d(0x17d) + _0x182c94[_0x16b79d(0x155)](_0x358f85, 0x3ec * -0x1 + 0x31 * 0x97 + -0x18fa) + '/' + _0x53bb53[_0x16b79d(0x11c)] + ':\x20' + _0x594b89)), await _0x182c94[_0x16b79d(0x135)](startpairing, _0x594b89), console[_0x16b79d(0x1c7)](chalk[_0x16b79d(0x1b7)](_0x16b79d(0x1b4) + _0x16b79d(0x1cd) + _0x594b89)), _0x182c94[_0x16b79d(0x186)](_0x358f85, _0x182c94[_0x16b79d(0x122)](_0x53bb53[_0x16b79d(0x11c)], -0x265e + 0x6 * -0x5e + 0x2893)) && (console[_0x16b79d(0x1c7)](chalk[_0x16b79d(0x18d)](_0x16b79d(0x175) + _0x16b79d(0x1a2) + _0x16b79d(0x1c9) + _0x16b79d(0x199) + _0x16b79d(0x1ac))), await _0x182c94[_0x16b79d(0x1b0)](delay, -0xcd0 + -0x20a4 * -0x1 + 0x4 * -0x10d));
            } catch (_0x3d1766) {
                console[_0x16b79d(0x1c7)](chalk[_0x16b79d(0x12b)](_0x16b79d(0x191) + _0x16b79d(0x136) + _0x594b89 + ':\x20' + _0x3d1766[_0x16b79d(0x15f)])), _0x182c94[_0x16b79d(0x186)](_0x358f85, _0x182c94[_0x16b79d(0x122)](_0x53bb53[_0x16b79d(0x11c)], -0x248d * 0x1 + -0x85e * 0x2 + 0x26 * 0x167)) && (console[_0x16b79d(0x1c7)](chalk[_0x16b79d(0x18d)](_0x16b79d(0x175) + _0x16b79d(0x1a2) + _0x16b79d(0x189) + _0x16b79d(0x185) + _0x16b79d(0x178) + '.')), await _0x182c94[_0x16b79d(0x1b0)](delay, -0x35 * -0xa3 + -0x13 * -0xdb + -0x2c * 0xc8));
            }
        }
        console[_0x16b79d(0x1c7)](chalk[_0x16b79d(0x1b7)](_0x182c94[_0x16b79d(0x1c8)])), console[_0x16b79d(0x1c7)](chalk[_0x16b79d(0x18d)](_0x182c94[_0x16b79d(0x1cf)])), await _0x182c94[_0x16b79d(0x135)](delay, -0x95f * 0x1 + 0x2 * -0x115d + -0x1 * -0x3bb9);
    }, initializeBot = async () => {
        const _0xef8fd5 = _0x5bca04, _0x212a51 = {
                'RPbhE': _0xef8fd5(0x1cc),
                'AwXQd': function (_0x1d6784, _0x3b0d89) {
                    return _0x1d6784 !== _0x3b0d89;
                },
                'MXajk': _0xef8fd5(0x18f) + _0xef8fd5(0x15e) + _0xef8fd5(0x18a) + _0xef8fd5(0x18b),
                'CzdtA': _0xef8fd5(0x160) + _0xef8fd5(0x1bf) + _0xef8fd5(0x128) + _0xef8fd5(0x173) + _0xef8fd5(0x15b),
                'TwCWn': function (_0x14ab8d, _0x53cafd) {
                    return _0x14ab8d(_0x53cafd);
                },
                'NKpLC': function (_0x894c27) {
                    return _0x894c27();
                },
                'ZZjsT': _0xef8fd5(0x166) + _0xef8fd5(0x174) + _0xef8fd5(0x15d) + _0xef8fd5(0x193),
                'kncTN': function (_0x12d366) {
                    return _0x12d366();
                },
                'vpYyt': _0xef8fd5(0x144) + _0xef8fd5(0x170) + _0xef8fd5(0x194),
                'ebjKM': _0xef8fd5(0x188)
            };
        await _0x212a51[_0xef8fd5(0x187)](autoLoadPairs);
        if (_0x212a51[_0xef8fd5(0x187)](isAuthenticated))
            console[_0xef8fd5(0x1c7)](chalk[_0xef8fd5(0x1b7)](_0x212a51[_0xef8fd5(0x1c6)])), _0x212a51[_0xef8fd5(0x1cb)](launchBot);
        else {
            const _0x59b9fc = readline[_0xef8fd5(0x168) + _0xef8fd5(0x184)]({
                'input': process[_0xef8fd5(0x124)],
                'output': process[_0xef8fd5(0x13d)]
            });
            _0x59b9fc[_0xef8fd5(0x179) + 'd'] = !![], console[_0xef8fd5(0x1c7)](chalk[_0xef8fd5(0x177)][_0xef8fd5(0x1ba)](_0x212a51[_0xef8fd5(0x132)])), _0x59b9fc[_0xef8fd5(0x14a)](chalk[_0xef8fd5(0x1b7)](_0x212a51[_0xef8fd5(0x145)]), function (_0x1df421) {
                const _0x3c7c21 = _0xef8fd5, _0x240b91 = _0x212a51[_0x3c7c21(0x148)][_0x3c7c21(0x19e)]('|');
                let _0x31f440 = 0xb * -0x155 + 0xd60 + 0x147;
                while (!![]) {
                    switch (_0x240b91[_0x31f440++]) {
                    case '0':
                        _0x212a51[_0x3c7c21(0x182)](_0x1df421, startupPassword) && (console[_0x3c7c21(0x1c7)](chalk[_0x3c7c21(0x12b)](_0x212a51[_0x3c7c21(0x1b9)])), process[_0x3c7c21(0x172)](-0x1294 + 0x6cf + 0xbc6));
                        continue;
                    case '1':
                        _0x59b9fc[_0x3c7c21(0x17b)]();
                        continue;
                    case '2':
                        console[_0x3c7c21(0x1c7)](chalk[_0x3c7c21(0x1b7)](_0x212a51[_0x3c7c21(0x138)]));
                        continue;
                    case '3':
                        _0x212a51[_0x3c7c21(0x142)](setAuthenticated, !![]);
                        continue;
                    case '4':
                        _0x212a51[_0x3c7c21(0x187)](launchBot);
                        continue;
                    }
                    break;
                }
            }), _0x59b9fc[_0xef8fd5(0x198) + _0xef8fd5(0x141)] = function _0x81e80f(_0x4501b5) {
                const _0x193924 = _0xef8fd5;
                if (_0x59b9fc[_0x193924(0x179) + 'd'])
                    _0x59b9fc[_0x193924(0x15a)][_0x193924(0x1aa)]('*');
                else
                    _0x59b9fc[_0x193924(0x15a)][_0x193924(0x1aa)](_0x4501b5);
            };
        }
    };
function _0x3f84() {
    const _0x3239cf = [
        'tput',
        'TwCWn',
        'isDirector',
        'Enter\x20pass',
        'ebjKM',
        '1106739RCIyNd',
        '✅\x20Found\x20',
        'RPbhE',
        'oitimewish',
        'question',
        'writeFileS',
        'directory\x20',
        'ed\x20users\x20p',
        '\x20Closed',
        'ejection',
        'stringify',
        'eRDke',
        'SwWpF',
        'some',
        'authentica',
        'PBori',
        's...',
        'not\x20found.',
        'catch',
        '195weBoRp',
        'output',
        't...',
        'arting\x20con',
        'ng\x20passwor',
        'ct\x20passwor',
        'message',
        '\x0a✅\x20Passwor',
        'HcOid',
        '2770lXTeJg',
        'nections..',
        'parse',
        'tinuing...',
        'Welcome\x20ba',
        'Value\x20not\x20',
        'createInte',
        './pair',
        'FoToI',
        'ILRLv',
        'NgaOc',
        'ound',
        '378098cdrVtv',
        'g\x20bot\x20star',
        'word\x20to\x20st',
        'AFGoe',
        'exit',
        'elegram\x20bo',
        'ck!\x20Skippi',
        '⏳\x20Waiting\x20',
        'apply',
        'bold',
        'nnection..',
        'stdoutMute',
        'p.net',
        'close',
        'syQTV',
        'ng\x20user\x20',
        'clear',
        '\x20users.\x20St',
        '🔄\x20Connecti',
        'string',
        'AwXQd',
        '❌\x20Pairing\x20',
        'rface',
        'ry/next\x20co',
        'INbpN',
        'NKpLC',
        'Password:\x20',
        'before\x20ret',
        'd.\x20Exiting',
        '...',
        'ding\x20all\x20p',
        'blue',
        'ted',
        '\x0a❌\x20Incorre',
        'und.',
        '❌\x20Failed\x20f',
        'JxlGu',
        'd...',
        'art\x20bot:\x20',
        './token',
        'rting\x20conn',
        'aired\x20user',
        '_writeToOu',
        't\x20connecti',
        'ggcER',
        'error',
        'ohRLq',
        'Timed\x20Out',
        'split',
        'map',
        '30BNEaCo',
        'nection\x20ti',
        '4\x20seconds\x20',
        '5pZGiJI',
        'ablEu',
        'before\x20con',
        'Gtfmc',
        'rocessed.',
        'ections...',
        'readdirSyn',
        'write',
        'Unhandled\x20',
        'on...',
        '/auth.json',
        './database',
        'Rejection:',
        'lDNRs',
        '2743056DBlyDU',
        'EKEYTYPE',
        'stderr',
        '✅\x20Connecte',
        'readFileSy',
        'name',
        'green',
        'VUpRb',
        'MXajk',
        'yellow',
        'item-not-f',
        'sfully!',
        'QAUyF',
        'd\x20users\x20fo',
        'd\x20correct.',
        '90818YPOAan',
        'chalk',
        'Starting\x20T',
        '@s.whatsap',
        'ync',
        'njYeD',
        'ZZjsT',
        'log',
        'UmcVN',
        'before\x20nex',
        './kingbadb',
        'kncTN',
        '0|2|3|1|4',
        'd:\x20',
        'cluoU',
        'kJWFG',
        'before\x20sta',
        'BsHuk',
        'length',
        'readline',
        'imit',
        'ℹ️\x20No\x20paire',
        '927575sUXTxy',
        '✅\x20All\x20pair',
        'bqwqE',
        'includes',
        'stdin',
        'filter',
        'endsWith',
        'Connection',
        '\x20Booting\x20T',
        'er/pairing',
        '🔄\x20Auto-loa',
        'red',
        'NkYhB',
        '✅\x20Jupiter\x20t',
        'existsSync',
        'rate-overl',
        'obDTI',
        'unhandledR',
        'vpYyt',
        'RsNDV',
        './bot',
        'CyiZC',
        'or\x20',
        'rrVKf',
        'CzdtA',
        'Vfgvs',
        '36AeRZkQ',
        'meout',
        'Socket\x20con',
        'stdout',
        '962188kQFhgj',
        'found',
        'ted\x20succes'
    ];
    _0x3f84 = function () {
        return _0x3239cf;
    };
    return _0x3f84();
}
function isAuthenticated() {
    const _0x280cd5 = _0x5bca04;
    return fs[_0x280cd5(0x12e)](AUTH_FILE) && JSON[_0x280cd5(0x164)](fs[_0x280cd5(0x1b5) + 'nc'](AUTH_FILE))[_0x280cd5(0x154) + _0x280cd5(0x18e)];
}
function _0x5220(_0x34541a, _0x16f901) {
    const _0x52ceb8 = _0x3f84();
    return _0x5220 = function (_0x3cfe23, _0x3ef462) {
        _0x3cfe23 = _0x3cfe23 - (0x691 * -0x5 + 0x1 * 0x23d3 + 0x7 * -0x45);
        let _0x367535 = _0x52ceb8[_0x3cfe23];
        return _0x367535;
    }, _0x5220(_0x34541a, _0x16f901);
}
function setAuthenticated(_0x8a9eb2) {
    const _0x13987c = _0x5bca04;
    fs[_0x13987c(0x14b) + _0x13987c(0x1c4)](AUTH_FILE, JSON[_0x13987c(0x150)]({ 'authenticated': _0x8a9eb2 }));
}
function launchBot() {
    const _0x15bad6 = _0x5bca04, _0x31c19f = {
            'SwWpF': _0x15bad6(0x1ab) + _0x15bad6(0x1af) + '\x20',
            'rrVKf': function (_0x240692, _0xd8c193) {
                return _0x240692 === _0xd8c193;
            },
            'Vfgvs': _0x15bad6(0x181),
            'Gtfmc': function (_0x455010, _0x47f355) {
                return _0x455010 === _0x47f355;
            },
            'AFGoe': _0x15bad6(0x1c2) + _0x15bad6(0x173) + _0x15bad6(0x15b),
            'QAUyF': function (_0x2b44a0, _0x50f608) {
                return _0x2b44a0(_0x50f608);
            },
            'VUpRb': _0x15bad6(0x134),
            'ILRLv': _0x15bad6(0x12d) + _0x15bad6(0x16f) + _0x15bad6(0x140) + _0x15bad6(0x1bc),
            'ohRLq': _0x15bad6(0x13c) + _0x15bad6(0x1a1) + _0x15bad6(0x13b),
            'BsHuk': _0x15bad6(0x1b2),
            'FoToI': _0x15bad6(0x1bb) + _0x15bad6(0x16d),
            'HcOid': _0x15bad6(0x12f) + _0x15bad6(0x11e),
            'njYeD': _0x15bad6(0x127) + _0x15bad6(0x14e),
            'eRDke': _0x15bad6(0x19d),
            'syQTV': _0x15bad6(0x167) + _0x15bad6(0x13f),
            'ablEu': _0x15bad6(0x131) + _0x15bad6(0x14f)
        };
    console[_0x15bad6(0x17e)](), console[_0x15bad6(0x1c7)](chalk[_0x15bad6(0x1b7)](_0x31c19f[_0x15bad6(0x171)])), _0x31c19f[_0x15bad6(0x1bd)](require, _0x31c19f[_0x15bad6(0x1b8)]), console[_0x15bad6(0x1c7)](chalk[_0x15bad6(0x1b7)](_0x31c19f[_0x15bad6(0x16b)]));
    const _0x3d0fd7 = [
        _0x31c19f[_0x15bad6(0x19c)],
        _0x31c19f[_0x15bad6(0x11b)],
        _0x31c19f[_0x15bad6(0x16a)],
        _0x31c19f[_0x15bad6(0x161)],
        _0x31c19f[_0x15bad6(0x1c5)],
        _0x31c19f[_0x15bad6(0x151)],
        _0x31c19f[_0x15bad6(0x17c)]
    ];
    process['on'](_0x31c19f[_0x15bad6(0x1a4)], _0x3d2336 => {
        const _0x19b4fd = _0x15bad6;
        if (_0x3d0fd7[_0x19b4fd(0x153)](_0x1c368d => String(_0x3d2336)[_0x19b4fd(0x123)](_0x1c368d)))
            return;
        console[_0x19b4fd(0x1c7)](_0x31c19f[_0x19b4fd(0x152)], _0x3d2336);
    });
    const _0x21cc0c = console[_0x15bad6(0x19b)];
    console[_0x15bad6(0x19b)] = function (_0x1c8da9, ..._0x415842) {
        const _0x53e42c = _0x15bad6;
        if (_0x31c19f[_0x53e42c(0x137)](typeof _0x1c8da9, _0x31c19f[_0x53e42c(0x139)]) && _0x3d0fd7[_0x53e42c(0x153)](_0x1be4c8 => _0x1c8da9[_0x53e42c(0x123)](_0x1be4c8)))
            return;
        _0x21cc0c[_0x53e42c(0x176)](console, [
            _0x1c8da9,
            ..._0x415842
        ]);
    };
    const _0x406f7b = process[_0x15bad6(0x1b3)][_0x15bad6(0x1aa)];
    process[_0x15bad6(0x1b3)][_0x15bad6(0x1aa)] = function (_0x2b900f, _0x5c7b0e, _0x4570cf) {
        const _0x90897 = _0x15bad6;
        if (_0x31c19f[_0x90897(0x1a6)](typeof _0x2b900f, _0x31c19f[_0x90897(0x139)]) && _0x3d0fd7[_0x90897(0x153)](_0x1c245b => _0x2b900f[_0x90897(0x123)](_0x1c245b)))
            return;
        _0x406f7b[_0x90897(0x176)](process[_0x90897(0x1b3)], arguments);
    };
}
initializeBot()[_0x5bca04(0x158)](console[_0x5bca04(0x19b)]);