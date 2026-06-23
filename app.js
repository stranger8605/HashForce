// Hashing libraries to run in app.js main thread (re-used from worker implementations)

function md5(string) {
  function k(x, y) {
    var a = (x & 0xFFFF) + (y & 0xFFFF);
    return (((x >> 16) + (y >> 16) + (a >> 16)) << 16) | (a & 0xFFFF);
  }
  function g(x, y) { return (x << y) | (x >>> (32 - y)); }
  function f(q, a, b, x, s, t) { return k(g(k(k(a, q), k(x, t)), s), b); }
  function h(a, b, c, d, x, s, t) { return f((b & c) | (~b & d), a, b, x, s, t); }
  function i(a, b, c, d, x, s, t) { return f((d & b) | (~d & c), a, b, x, s, t); }
  function j(a, b, c, d, x, s, t) { return f(b ^ c ^ d, a, b, x, s, t); }
  function l(a, b, c, d, x, s, t) { return f(c ^ (b | ~d), a, b, x, s, t); }

  var x = [], temp = 8 + (((string.length + 8) >> 6) + 1) * 64;
  for (var o = 0; o < string.length; o++) x[o >> 2] |= string.charCodeAt(o) << ((o % 4) * 8);
  x[string.length >> 2] |= 0x80 << ((string.length % 4) * 8);
  x[temp - 8] = string.length * 8;

  var a = 1732584193, b = -271733879, c = -1732584194, d = 271733878;
  for (var m = 0; m < temp; m += 64) {
    var aa = a, bb = b, cc = c, dd = d;
    a = h(a, b, c, d, x[m + 0], 7, -680876936);
    d = h(d, a, b, c, x[m + 1], 12, -389564586);
    c = h(c, d, a, b, x[m + 2], 17, 606105819);
    b = h(b, c, d, a, x[m + 3], 22, -1044525330);
    a = h(a, b, c, d, x[m + 4], 7, -176418897);
    d = h(d, a, b, c, x[m + 5], 12, 1200080426);
    c = h(c, d, a, b, x[m + 6], 17, -1473231341);
    b = h(b, c, d, a, x[m + 7], 22, -45705983);
    a = h(a, b, c, d, x[m + 8], 7, 1770035416);
    d = h(d, a, b, c, x[m + 9], 12, -1958414417);
    c = h(c, d, a, b, x[m + 10], 17, -42063);
    b = h(b, c, d, a, x[m + 11], 22, -1990404162);
    a = h(a, b, c, d, x[m + 12], 7, 1804603682);
    d = h(d, a, b, c, x[m + 13], 12, -40341101);
    c = h(c, d, a, b, x[m + 14], 17, -1502002290);
    b = h(b, c, d, a, x[m + 15], 22, 1236535329);

    a = i(a, b, c, d, x[m + 1], 5, -165796510);
    d = i(d, a, b, c, x[m + 6], 9, -1069501632);
    c = i(c, d, a, b, x[m + 11], 14, 643717713);
    b = i(b, c, d, a, x[m + 0], 20, -373897302);
    a = i(a, b, c, d, x[m + 5], 5, -701558691);
    d = i(d, a, b, c, x[m + 10], 9, 38016083);
    c = i(c, d, a, b, x[m + 15], 14, -660478335);
    b = i(b, c, d, a, x[m + 4], 20, -405537848);
    a = i(a, b, c, d, x[m + 9], 5, 568446438);
    d = i(d, a, b, c, x[m + 14], 9, -1019803690);
    c = i(c, d, a, b, x[m + 3], 14, -187363961);
    b = i(b, c, d, a, x[m + 8], 20, 1163531501);
    a = i(a, b, c, d, x[m + 13], 5, -1444681467);
    d = i(d, a, b, c, x[m + 2], 9, -51403784);
    c = i(c, d, a, b, x[m + 7], 14, 1735328473);
    b = i(b, c, d, a, x[m + 12], 20, -1926607734);

    a = j(a, b, c, d, x[m + 5], 4, -378558);
    d = j(d, a, b, c, x[m + 8], 11, -2022574463);
    c = j(c, d, a, b, x[m + 11], 16, 1839030562);
    b = j(b, c, d, a, x[m + 14], 23, -35309556);
    a = j(a, b, c, d, x[m + 1], 4, -1530992060);
    d = j(d, a, b, c, x[m + 4], 11, 1272893353);
    c = j(c, d, a, b, x[m + 7], 16, -155497632);
    b = j(b, c, d, a, x[m + 10], 23, -1094730640);
    a = j(a, b, c, d, x[m + 13], 4, 681279174);
    d = j(d, a, b, c, x[m + 0], 11, -358537222);
    c = j(c, d, a, b, x[m + 3], 16, -722521979);
    b = j(b, c, d, a, x[m + 6], 23, 76029189);
    a = j(a, b, c, d, x[m + 9], 4, -640364487);
    d = j(d, a, b, c, x[m + 12], 11, -421815835);
    c = j(c, d, a, b, x[m + 15], 16, 530742520);
    b = j(b, c, d, a, x[m + 2], 23, -995338651);

    a = l(a, b, c, d, x[m + 0], 6, -198630844);
    d = l(d, a, b, c, x[m + 7], 10, 1126891415);
    c = l(c, d, a, b, x[m + 14], 15, -1416354905);
    b = l(b, c, d, a, x[m + 5], 21, -57434055);
    a = l(a, b, c, d, x[m + 12], 6, 1700485571);
    d = l(d, a, b, c, x[m + 3], 10, -1894986606);
    c = l(c, d, a, b, x[m + 10], 15, -1051523);
    b = l(b, c, d, a, x[m + 1], 21, -2054922799);
    a = l(a, b, c, d, x[m + 8], 6, 1873313359);
    d = l(d, a, b, c, x[m + 15], 10, -30611744);
    c = l(c, d, a, b, x[m + 6], 15, -1560198380);
    b = l(b, c, d, a, x[m + 13], 21, 1309151649);
    a = l(a, b, c, d, x[m + 4], 6, -145523070);
    d = l(d, a, b, c, x[m + 11], 10, -1120210379);
    c = l(c, d, a, b, x[m + 2], 15, 718787281);
    b = l(b, c, d, a, x[m + 9], 21, -343485551);

    a = k(a, aa);
    b = k(b, bb);
    c = k(c, cc);
    d = k(d, dd);
  }
  
  var hex = "";
  var word = [a, b, c, d];
  for (var n = 0; n < 4; n++) {
    for (var p = 0; p < 4; p++) {
      var byteVal = (word[n] >> (p * 8)) & 0xFF;
      hex += (byteVal < 16 ? "0" : "") + byteVal.toString(16);
    }
  }
  return hex;
}

function sha1(string) {
  function f(x, y) { return (x << y) | (x >>> (32 - y)); }
  var block = [], temp = 8 + (((string.length + 8) >> 6) + 1) * 64;
  for (var o = 0; o < string.length; o++) block[o >> 2] |= string.charCodeAt(o) << ((3 - (o % 4)) * 8);
  block[string.length >> 2] |= 0x80 << ((3 - (string.length % 4)) * 8);
  block[temp - 4] = string.length * 8;

  var h0 = 1732584193, h1 = -271733879, h2 = -1732584194, h3 = 271733878, h4 = -1009589776;
  var w = new Array(80);
  
  for (var m = 0; m < temp; m += 64) {
    for (var i = 0; i < 16; i++) w[i] = block[(m >> 2) + i] || 0;
    for (var i = 16; i < 80; i++) w[i] = f(w[i - 3] ^ w[i - 8] ^ w[i - 14] ^ w[i - 16], 1);

    var a = h0, b = h1, c = h2, d = h3, e = h4;
    for (var i = 0; i < 80; i++) {
      var fVal, kVal;
      if (i < 20) {
        fVal = (b & c) | (~b & d);
        kVal = 1518500249;
      } else if (i < 40) {
        fVal = b ^ c ^ d;
        kVal = 1859775393;
      } else if (i < 60) {
        fVal = (b & c) | (b & d) | (c & d);
        kVal = -1894007588;
      } else {
        fVal = b ^ c ^ d;
        kVal = -899497514;
      }
      var t = f(a, 5) + fVal + e + kVal + w[i];
      e = d; d = c; c = f(b, 30); b = a; a = t | 0;
    }
    h0 = (h0 + a) | 0;
    h1 = (h1 + b) | 0;
    h2 = (h2 + c) | 0;
    h3 = (h3 + d) | 0;
    h4 = (h4 + e) | 0;
  }
  
  var hex = "";
  var word = [h0, h1, h2, h3, h4];
  for (var n = 0; n < 5; n++) {
    var wordVal = word[n];
    for (var p = 3; p >= 0; p--) {
      var byteVal = (wordVal >> (p * 8)) & 0xFF;
      hex += (byteVal < 16 ? "0" : "") + byteVal.toString(16);
    }
  }
  return hex;
}

function sha256(string) {
  function ror(v, n) { return (v >>> n) | (v << (32 - n)); }
  function ch(x, y, z) { return (x & y) ^ (~x & z); }
  function maj(x, y, z) { return (x & y) ^ (x & z) ^ (y & z); }
  function sigma0(x) { return ror(x, 2) ^ ror(x, 13) ^ ror(x, 22); }
  function sigma1(x) { return ror(x, 6) ^ ror(x, 11) ^ ror(x, 25); }
  function gamma0(x) { return ror(x, 7) ^ ror(x, 18) ^ (x >>> 3); }
  function gamma1(x) { return ror(x, 17) ^ ror(x, 19) ^ (x >>> 10); }

  var K = [
    0x428a2f98, 0x71374491, 0xb5c0fbcf, 0xe9b5dba5, 0x3956c25b, 0x59f111f1, 0x923f82a4, 0xab1c5ed5,
    0xd807aa98, 0x12835b01, 0x243185be, 0x550c7dc3, 0x72be5d74, 0x80deb1fe, 0x9bdc06a7, 0xc19bf174,
    0xe49b69c1, 0xefbe4786, 0x0fc19dc6, 0x240ca1cc, 0x2de92c6f, 0x4a7484aa, 0x5cb0a9dc, 0x76f988da,
    0x983e5152, 0xa831c66d, 0xb00327c8, 0xbf597fc7, 0xc6e00bf3, 0xd5a79147, 0x06ca6351, 0x14292967,
    0x27b70a85, 0x2e1b2138, 0x4d2c6dfc, 0x53380d13, 0x650a7354, 0x766a0abb, 0x81c2c92e, 0x92722c85,
    0xa2bfe8a1, 0xa81a664b, 0xc24b8b70, 0xc76c51a3, 0xd192e819, 0xd6990624, 0xf40e3585, 0x106aa070,
    0x19a4c116, 0x1e376c08, 0x2748774c, 0x34b0bcb5, 0x391c0cb3, 0x4ed8aa4a, 0x5b9cca4f, 0x682e6ff3,
    0x748f82ee, 0x78a5636f, 0x84c87814, 0x8cc70208, 0x90befffa, 0xa4506ceb, 0xbef9a3f7, 0xc67178f2
  ];

  var block = [], temp = 8 + (((string.length + 8) >> 6) + 1) * 64;
  for (var o = 0; o < string.length; o++) block[o >> 2] |= string.charCodeAt(o) << ((3 - (o % 4)) * 8);
  block[string.length >> 2] |= 0x80 << ((3 - (string.length % 4)) * 8);
  block[temp - 4] = string.length * 8;

  var h = [0x6a09e667, 0xbb67ae85, 0x3c6ef372, 0xa54ff53a, 0x510e527f, 0x9b05688c, 0x1f83d9ab, 0x5be0cd19];
  var w = new Array(64);

  for (var m = 0; m < temp; m += 64) {
    for (var i = 0; i < 16; i++) w[i] = block[(m >> 2) + i] || 0;
    for (var i = 16; i < 64; i++) w[i] = (gamma1(w[i - 2]) + w[i - 7] + gamma0(w[i - 15]) + w[i - 16]) | 0;

    var a = h[0], b = h[1], c = h[2], d = h[3], e = h[4], f = h[5], g = h[6], hs = h[7];
    for (var i = 0; i < 64; i++) {
      var t1 = (hs + sigma1(e) + ch(e, f, g) + K[i] + w[i]) | 0;
      var t2 = (sigma0(a) + maj(a, b, c)) | 0;
      hs = g; g = f; f = e; e = (d + t1) | 0; d = c; c = b; b = a; a = (t1 + t2) | 0;
    }
    h[0] = (h[0] + a) | 0;
    h[1] = (h[1] + b) | 0;
    h[2] = (h[2] + c) | 0;
    h[3] = (h[3] + d) | 0;
    h[4] = (h[4] + e) | 0;
    h[5] = (h[5] + f) | 0;
    h[6] = (h[6] + g) | 0;
    h[7] = (h[7] + hs) | 0;
  }

  var hex = "";
  for (var n = 0; n < 8; n++) {
    var wordVal = h[n];
    for (var p = 3; p >= 0; p--) {
      var byteVal = (wordVal >> (p * 8)) & 0xFF;
      hex += (byteVal < 16 ? "0" : "") + byteVal.toString(16);
    }
  }
  return hex;
}

function sha512(str) {
  var utf8 = [];
  for (var i = 0; i < str.length; i++) {
    var c = str.charCodeAt(i);
    if (c < 128) utf8.push(c);
    else if (c < 2048) utf8.push((c >> 6) | 192, (c & 63) | 128);
    else utf8.push((c >> 12) | 224, ((c >> 6) & 63) | 128, (c & 63) | 128);
  }

  var h = [
    0x6a09e667, 0xf3bcc908, 0xbb67ae85, 0x84caa73b, 0x3c6ef372, 0xfe94f82b, 0xa54ff53a, 0x5f1d36f1,
    0x510e527f, 0xade682d1, 0x9b05688c, 0x2b3e6c1f, 0x1f83d9ab, 0xfb41bd6b, 0x5be0cd19, 0x137e2179
  ];

  var K = [
    0x428a2f98, 0xd472f896, 0x71374491, 0xc1a8303b, 0xb5c0fbcf, 0x25926770, 0xe9b5dba5, 0xbebcd99f,
    0x3956c25b, 0xc3240636, 0x59f111f1, 0x76901138, 0x923f82a4, 0x180f934d, 0xab1c5ed5, 0x068f859f,
    0xd807aa98, 0x163188b6, 0x12835b01, 0xc2408a28, 0x243185be, 0x186b8655, 0x550c7dc3, 0x6e0eb317,
    0x72be5d74, 0xbf3a66bf, 0x80deb1fe, 0x72f2038f, 0x9bdc06a7, 0x2774987d, 0xc19bf174, 0xda20c02c,
    0xe49b69c1, 0x378f11d2, 0xefbe4786, 0x80c82d52, 0x0fc19dc6, 0x0a1458e8, 0x240ca1cc, 0x639c4fe4,
    0x2de92c6f, 0x7235807c, 0x4a7484aa, 0xbd1e54db, 0x5cb0a9dc, 0xd3840003, 0x76f988da, 0x8d5b88f3,
    0x983e5152, 0x203534d7, 0xa831c66d, 0x600c3098, 0xb00327c8, 0xcf20c4af, 0xbf597fc7, 0xbb015e10,
    0xc6e00bf3, 0x8df8e6f1, 0xd5a79147, 0x4ca11462, 0x06ca6351, 0x3a60a747, 0x14292967, 0xfcf19ad6,
    0x27b70a85, 0x8b598d94, 0x2e1b2138, 0xcb9948db, 0x4d2c6dfc, 0x130e9d6d, 0x53380d13, 0xfda0fc9e,
    0x650a7354, 0x6d2c4dec, 0x766a0abb, 0x84d28d0b, 0x81c2c92e, 0xbc358b5e, 0x92722c85, 0xe23f95e5,
    0xa2bfe8a1, 0xd6f7d0c3, 0xa81a664b, 0x10fcd61d, 0xc24b8b70, 0x56a64426, 0xc76c51a3, 0x011e3b6e,
    0xd192e819, 0x5e954ff5, 0xd6990624, 0x77d2422a, 0xf40e3585, 0xd38a4242, 0x106aa070, 0x904a6018,
    0x19a4c116, 0xb8e3b52d, 0x1e376c08, 0x300331dd, 0x2748774c, 0x0d3e5270, 0x34b0bcb5, 0xb73d2f25,
    0x391c0cb3, 0xc5c95a63, 0x4ed8aa4a, 0xe3418acb, 0x5b9cca4f, 0x7763e373, 0x682e6ff3, 0xd6b2b8a3,
    0x748f82ee, 0x5defb2fc, 0x78a5636f, 0x43172f60, 0x84c87814, 0xa1f0ab72, 0x8cc70208, 0x1a6439ec,
    0x90befffa, 0x23631e28, 0xa4506ceb, 0xde82bde9, 0xbef9a3f7, 0xb2c67915, 0xc67178f2, 0xe372532b
  ];

  var len = utf8.length;
  utf8.push(0x80);
  while ((utf8.length % 128) !== 112) utf8.push(0);
  for (var i = 0; i < 8; i++) utf8.push(0);
  utf8.push(
    (len >>> 29) & 0xff, (len >>> 21) & 0xff, (len >>> 13) & 0xff, (len >>> 5) & 0xff,
    (len << 3) & 0xff, 0, 0, 0
  );

  var w = new Uint32Array(160);
  var ah = 0, al = 0, bh = 0, bl = 0, ch = 0, cl = 0, dh = 0, dl = 0;
  var eh = 0, el = 0, fh = 0, fl = 0, gh = 0, gl = 0, hh = 0, hl = 0;

  for (var blockOffset = 0; blockOffset < utf8.length; blockOffset += 128) {
    for (var i = 0; i < 16; i++) {
      var offset = blockOffset + i * 8;
      w[i * 2] = (utf8[offset] << 24) | (utf8[offset + 1] << 16) | (utf8[offset + 2] << 8) | utf8[offset + 3];
      w[i * 2 + 1] = (utf8[offset + 4] << 24) | (utf8[offset + 5] << 16) | (utf8[offset + 6] << 8) | utf8[offset + 7];
    }

    for (var i = 16; i < 80; i++) {
      var g0h_x = w[(i - 15) * 2], g0l_x = w[(i - 15) * 2 + 1];
      var g0h = ((g0h_x >>> 1) | (g0l_x << 31)) ^ ((g0h_x >>> 8) | (g0l_x << 24)) ^ (g0h_x >>> 7);
      var g0l = ((g0l_x >>> 1) | (g0h_x << 31)) ^ ((g0l_x >>> 8) | (g0h_x << 24)) ^ ((g0l_x >>> 7) | (g0h_x << 25));

      var g1h_x = w[(i - 2) * 2], g1l_x = w[(i - 2) * 2 + 1];
      var g1h = ((g1h_x >>> 19) | (g1l_x << 13)) ^ ((g1l_x >>> 29) | (g1h_x << 3)) ^ (g1h_x >>> 6);
      var g1l = ((g1l_x >>> 19) | (g1h_x << 13)) ^ ((g1h_x >>> 29) | (g1l_x << 3)) ^ ((g1l_x >>> 6) | (g1h_x << 26));

      var w16h = w[(i - 16) * 2], w16l = w[(i - 16) * 2 + 1];
      var w7h = w[(i - 7) * 2], w7l = w[(i - 7) * 2 + 1];

      var suml = (g1l >>> 0) + (w7l >>> 0) + (g0l >>> 0) + (w16l >>> 0);
      var sumh = (g1h >>> 0) + (w7h >>> 0) + (g0h >>> 0) + (w16h >>> 0) + Math.floor(suml / 4294967296);

      w[i * 2] = sumh | 0;
      w[i * 2 + 1] = suml | 0;
    }

    ah = h[0]; al = h[1]; bh = h[2]; bl = h[3]; ch = h[4]; cl = h[5]; dh = h[6]; dl = h[7];
    eh = h[8]; el = h[9]; fh = h[10]; fl = h[11]; gh = h[12]; gl = h[13]; hh = h[14]; hl = h[15];

    for (var i = 0; i < 80; i++) {
      var s1h = ((eh >>> 14) | (el << 18)) ^ ((eh >>> 18) | (el << 14)) ^ ((el >>> 9) | (eh << 23));
      var s1l = ((el >>> 14) | (eh << 18)) ^ ((el >>> 18) | (eh << 14)) ^ ((eh >>> 9) | (el << 23));

      var chh = (eh & fh) ^ (~eh & gh);
      var chl = (el & fl) ^ (~el & gl);

      var suml1 = (hl >>> 0) + (s1l >>> 0) + (chl >>> 0) + (K[i * 2 + 1] >>> 0) + (w[i * 2 + 1] >>> 0);
      var sumh1 = (hh >>> 0) + (s1h >>> 0) + (chh >>> 0) + (K[i * 2] >>> 0) + (w[i * 2] >>> 0) + Math.floor(suml1 / 4294967296);

      var t1h = sumh1 | 0;
      var t1l = suml1 | 0;

      var s0h = ((ah >>> 28) | (al << 4)) ^ ((al >>> 2) | (ah << 30)) ^ ((al >>> 7) | (ah << 25));
      var s0l = ((al >>> 28) | (ah << 4)) ^ ((ah >>> 2) | (al << 30)) ^ ((ah >>> 7) | (al << 25));

      var majh = (ah & bh) ^ (ah & ch) ^ (bh & ch);
      var majl = (al & bl) ^ (al & cl) ^ (bl & cl);

      var suml2 = (s0l >>> 0) + (majl >>> 0);
      var sumh2 = (s0h >>> 0) + (majh >>> 0) + Math.floor(suml2 / 4294967296);

      var t2h = sumh2 | 0;
      var t2l = suml2 | 0;

      hh = gh; hl = gl;
      gh = fh; gl = fl;
      fh = eh; fl = el;

      var sumle = (dl >>> 0) + (t1l >>> 0);
      eh = (dh + t1h + Math.floor(sumle / 4294967296)) | 0;
      el = sumle | 0;

      dh = ch; dl = cl;
      ch = bh; cl = bl;
      bh = ah; bl = al;

      var sumla = (t1l >>> 0) + (t2l >>> 0);
      ah = (t1h + t2h + Math.floor(sumla / 4294967296)) | 0;
      al = sumla | 0;
    }

    h[0] = (h[0] + ah) | 0; h[1] = (h[1] + al) | 0;
    h[2] = (h[2] + bh) | 0; h[3] = (h[3] + bl) | 0;
    h[4] = (h[4] + ch) | 0; h[5] = (h[5] + cl) | 0;
    h[6] = (h[6] + dh) | 0; h[7] = (h[7] + dl) | 0;
    h[8] = (h[8] + eh) | 0; h[9] = (h[9] + el) | 0;
    h[10] = (h[10] + fh) | 0; h[11] = (h[11] + fl) | 0;
    h[12] = (h[12] + gh) | 0; h[13] = (h[13] + gl) | 0;
    h[14] = (h[14] + hh) | 0; h[15] = (h[15] + hl) | 0;
  }

  var hex = "";
  for (var i = 0; i < 16; i++) {
    var v = h[i];
    var b0 = (v >>> 24) & 0xff, b1 = (v >>> 16) & 0xff, b2 = (v >>> 8) & 0xff, b3 = v & 0xff;
    hex += (b0 < 16 ? "0" : "") + b0.toString(16);
    hex += (b1 < 16 ? "0" : "") + b1.toString(16);
    hex += (b2 < 16 ? "0" : "") + b2.toString(16);
    hex += (b3 < 16 ? "0" : "") + b3.toString(16);
  }
  return hex;
}

// ----------------------------------------------------
// UI Logic & Setup
// ----------------------------------------------------

document.addEventListener("DOMContentLoaded", function () {
  // Navigation Tabs Switching
  const tabs = document.querySelectorAll(".tab-btn");
  const contents = document.querySelectorAll(".tab-content");

  tabs.forEach(tab => {
    tab.addEventListener("click", () => {
      tabs.forEach(t => t.classList.remove("active"));
      contents.forEach(c => c.classList.remove("active"));
      
      tab.classList.add("active");
      const targetContent = document.getElementById(tab.dataset.tab);
      if (targetContent) {
        targetContent.classList.add("active");
      }
      
      // Perform initial renders if relevant tabs clicked
      if (tab.dataset.tab === "tab-generator") {
        updateLiveHashes();
        drawAvalancheGrid();
      } else if (tab.dataset.tab === "tab-strength") {
        calculateEntropy();
      } else if (tab.dataset.tab === "tab-education") {
        updateSandboxHashes();
      }
    });
  });

  // Default embedded wordlist fallback to guarantee functionality without external downloads
  const miniWordlist = [
    "password", "123456", "123456789", "admin", "12345", "guest", "root", "12345678", "qwerty", "password123",
    "supersecret", "secret", "welcome", "login", "test", "master", "security", "pass", "oracle", "mysql",
    "hello", "world", "apple", "orange", "monkey", "dragon", "banana", "coffee", "computer", "football", "cybersecurity"
  ];
  
  // High-frequency wordlist setup (10k common passwords generated asynchronously on load)
  let default10kWordlist = [...miniWordlist];
  
  // Download or construct rockyou-subset or standard common password structures
  function generateCommonPasslist() {
    const basenames = [
      "password", "admin", "secret", "welcome", "shadow", "cyber", "system", "oracle", "test", "root", "guest", "matrix", "hacker",
      "hello", "world", "letmein", "qwerty", "dragon", "monkey", "football", "soccer", "baseball", "computer", "internet",
      "google", "youtube", "netflix", "testing", "charlie", "orange", "apple", "banana", "sweet", "superman", "batman",
      "spiderman", "yellow", "purple", "green", "blue", "black", "white", "summer", "winter", "spring", "autumn", "coffee",
      "school", "family", "hacked", "hunter2", "security", "pass123", "cybersecurity"
    ];
    const patterns = ["", "1", "12", "123", "1234", "12345", "123456", "!", "@", "123!", "2026", "2025"];
    
    let list = new Set(miniWordlist);
    
    // Mix and match to generate ~10,000 common combinations for cracking space
    for (let base of basenames) {
      for (let pat of patterns) {
        list.add(base + pat);
        list.add(base.toUpperCase() + pat);
        list.add(base.charAt(0).toUpperCase() + base.slice(1) + pat);
        // Common substitutions
        let l33t = base.replace(/e/g, "3").replace(/a/g, "@").replace(/i/g, "1").replace(/o/g, "0");
        list.add(l33t + pat);
      }
    }
    
    // Add sequential digits
    for (let i = 0; i < 2000; i++) {
      list.add(String(i));
    }
    
    default10kWordlist = Array.from(list);
  }
  generateCommonPasslist();

  // ----------------------------------------------------
  // Tab 1: Cracker Logic
  // ----------------------------------------------------
  const targetHashInput = document.getElementById("target-hash");
  const hashTypeBadge = document.getElementById("hash-type-badge");
  const hashTypeSelect = document.getElementById("hash-type-select");
  const wordlistSelect = document.getElementById("wordlist-select");
  const customWordlistWrapper = document.getElementById("custom-wordlist-wrapper");
  const customWordlistPasteWrapper = document.getElementById("custom-wordlist-paste-wrapper");
  const wordlistPasteInput = document.getElementById("wordlist-paste");
  const wordlistFile = document.getElementById("wordlist-file");
  const btnStartCrack = document.getElementById("btn-start-crack");
  const btnStopCrack = document.getElementById("btn-stop-crack");
  
  // HUD nodes
  const hudStatus = document.getElementById("hud-status");
  const hudHashType = document.getElementById("hud-hash-type");
  const hudSpeed = document.getElementById("hud-speed");
  const hudProgressBar = document.getElementById("hud-progress-bar");
  const hudProgressPercent = document.getElementById("hud-progress-percent");
  const hudProgressRatio = document.getElementById("hud-progress-ratio");
  const hudTerminalLogs = document.getElementById("hud-terminal-logs");
  
  // Success card
  const crackedSuccessCard = document.getElementById("cracked-success-card");
  const crackResultPlain = document.getElementById("crack-result-plain");
  const crackResultTime = document.getElementById("crack-result-time");
  const crackResultAttempts = document.getElementById("crack-result-attempts");

  let worker = null;
  let customUploadedWordlist = [];

  // Hash type auto-detection logic
  function autodetectHashType(val) {
    const cleaned = val.trim();
    if (cleaned.length === 32) return "md5";
    if (cleaned.length === 40) return "sha1";
    if (cleaned.length === 64) return "sha256";
    if (cleaned.length === 128) return "sha512";
    return null;
  }

  targetHashInput.addEventListener("input", function () {
    const detected = autodetectHashType(this.value);
    if (detected) {
      hashTypeBadge.textContent = `DETECTED: ${detected.toUpperCase()}`;
      hashTypeBadge.style.color = "var(--neon-green)";
    } else {
      hashTypeBadge.textContent = "Auto-detecting...";
      hashTypeBadge.style.color = "var(--text-secondary)";
    }
  });

  wordlistSelect.addEventListener("change", function () {
    customWordlistWrapper.classList.add("hidden");
    customWordlistPasteWrapper.classList.add("hidden");

    if (this.value === "custom") {
      customWordlistWrapper.classList.remove("hidden");
    } else if (this.value === "paste") {
      customWordlistPasteWrapper.classList.remove("hidden");
    }
  });

  // Custom wordlist parser
  wordlistFile.addEventListener("change", function (e) {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = function (evt) {
      const text = evt.target.result;
      // split by newlines and clean lines
      customUploadedWordlist = text.split(/\r?\n/)
        .map(line => line.trim())
        .filter(line => line.length > 0);
      
      writeTerminalLog(`System loaded custom wordlist: ${customUploadedWordlist.length.toLocaleString()} words.`, "info");
    };
    reader.readAsText(file);
  });

  // Test presets loading
  document.querySelectorAll(".preset-btn").forEach(btn => {
    btn.addEventListener("click", function () {
      targetHashInput.value = this.dataset.hash;
      hashTypeSelect.value = this.dataset.type;
      targetHashInput.dispatchEvent(new Event("input"));
      writeTerminalLog(`Preset hash loaded: ${this.dataset.hash.substring(0, 16)}... (${this.dataset.type.toUpperCase()})`, "info");
    });
  });

  function writeTerminalLog(text, type = "muted") {
    const log = document.createElement("div");
    log.className = `log-line text-${type}`;
    log.textContent = `[${new Date().toLocaleTimeString()}] ${text}`;
    hudTerminalLogs.appendChild(log);
    hudTerminalLogs.scrollTop = hudTerminalLogs.scrollHeight;
  }

  function runLocalCracking(targetHash, hashType, wordlist, postMessageFn, isCancelledFn) {
    const hashFunc = ALGORITHMS[hashType];
    if (!hashFunc) {
      postMessageFn({ type: "error", message: `Unsupported hash type: ${hashType}` });
      return;
    }

    const normalizedTarget = targetHash.trim().toLowerCase();
    const total = wordlist.length;
    let checked = 0;
    let batchSize = 150; // Keeps main thread highly responsive (60fps)
    let startTime = performance.now();
    let lastUpdateTime = startTime;
    let lastCheckedCount = 0;

    function processBatch() {
      if (isCancelledFn()) {
        postMessageFn({ type: "status", status: "TERMINATED", message: "Attack aborted by operator." });
        return;
      }

      const end = Math.min(checked + batchSize, total);
      const logs = [];

      for (let i = checked; i < end; i++) {
        const candidate = wordlist[i];
        const hashed = hashFunc(candidate);

        if (hashed === normalizedTarget) {
          const elapsed = (performance.now() - startTime) / 1000;
          postMessageFn({
            type: "success",
            plainText: candidate,
            attempts: i + 1,
            time: elapsed.toFixed(3)
          });
          return;
        }

        if (i % 20 === 0) {
          logs.push({ word: candidate, hash: hashed });
        }
      }

      checked = end;
      const now = performance.now();
      
      if (now - lastUpdateTime >= 120 || checked === total) {
        const elapsed = (now - startTime) / 1000;
        const speed = Math.round((checked - lastCheckedCount) / ((now - lastUpdateTime) / 1000));
        
        postMessageFn({
          type: "progress",
          checked: checked,
          total: total,
          speed: speed || 0,
          elapsed: elapsed.toFixed(1),
          logs: logs
        });

        lastUpdateTime = now;
        lastCheckedCount = checked;
      }

      if (checked < total) {
        setTimeout(processBatch, 0);
      } else {
        postMessageFn({ type: "failure", checked: checked });
      }
    }

    processBatch();
  }

  // Launch Dictionary Attack
  btnStartCrack.addEventListener("click", function () {
    const targetHash = targetHashInput.value.trim();
    if (!targetHash) {
      alert("Please enter a target hash to crack.");
      return;
    }

    let hashType = hashTypeSelect.value;
    if (hashType === "auto") {
      hashType = autodetectHashType(targetHash);
      if (!hashType) {
        alert("Could not auto-detect hash type. Please specify the hash type manually.");
        return;
      }
    }

    let activeWordlist = [];
    if (wordlistSelect.value === "default-1k") {
      activeWordlist = miniWordlist;
    } else if (wordlistSelect.value === "default-10k") {
      activeWordlist = default10kWordlist;
    } else if (wordlistSelect.value === "paste") {
      const pasteText = wordlistPasteInput.value.trim();
      if (!pasteText) {
        alert("Please paste some custom words into the textbox first.");
        return;
      }
      activeWordlist = pasteText.split(/\r?\n/)
        .map(line => line.trim())
        .filter(line => line.length > 0);
    } else {
      if (customUploadedWordlist.length === 0) {
        alert("Please upload a custom wordlist file first.");
        return;
      }
      activeWordlist = customUploadedWordlist;
    }

    // Reset HUD and interface state
    hudStatus.textContent = "RUNNING";
    hudStatus.className = "stat-val text-neon-pink";
    hudHashType.textContent = hashType.toUpperCase();
    hudProgressBar.style.width = "0%";
    hudProgressPercent.textContent = "0.00%";
    hudProgressRatio.textContent = `0 / ${activeWordlist.length.toLocaleString()}`;
    crackedSuccessCard.classList.add("hidden");
    
    btnStartCrack.classList.add("hidden");
    btnStopCrack.classList.remove("hidden");
    btnStopCrack.disabled = false;

    writeTerminalLog(`Spinning up background cracking engine...`, "info");
    writeTerminalLog(`Target: ${targetHash}`, "muted");
    writeTerminalLog(`Algorithm: ${hashType.toUpperCase()}`, "muted");
    writeTerminalLog(`Wordlist size: ${activeWordlist.length.toLocaleString()} candidates`, "muted");

    // Instantiating Web Worker with offline fallback
    if (worker) {
      worker.terminate();
    }

    try {
      // Try to instantiate Web Worker. Note: browser security blocks loading external scripts under file:// protocol.
      worker = new Worker("cracker.worker.js");
    } catch (e) {
      console.warn("Web Worker blocked (likely running via file:// protocol). Falling back to main-thread local runner.", e);
      writeTerminalLog("System: Web Worker blocked due to file:// security policy. Activating fallback local cracking engine...", "info");
      
      let localCancel = false;
      worker = {
        postMessage: function (data) {
          if (data.action === "start") {
            localCancel = false;
            runLocalCracking(data.targetHash, data.hashType, data.wordlist, (msg) => {
              if (worker.onmessage) worker.onmessage({ data: msg });
            }, () => localCancel);
          } else if (data.action === "stop") {
            localCancel = true;
          }
        },
        terminate: function () {
          localCancel = true;
        }
      };
    }

    worker.postMessage({
      action: "start",
      targetHash: targetHash,
      hashType: hashType,
      wordlist: activeWordlist
    });

    worker.onmessage = function (e) {
      const msg = e.data;

      if (msg.type === "progress") {
        const pct = ((msg.checked / msg.total) * 100).toFixed(2);
        hudProgressBar.style.width = `${pct}%`;
        hudProgressPercent.textContent = `${pct}%`;
        hudProgressRatio.textContent = `${msg.checked.toLocaleString()} / ${msg.total.toLocaleString()}`;
        hudSpeed.textContent = msg.speed.toLocaleString();

        // Print batch attempts
        if (msg.logs && msg.logs.length > 0) {
          msg.logs.forEach(log => {
            writeTerminalLog(`Testing candidate: "${log.word}" -> ${log.hash.substring(0, 16)}...`);
          });
        }
      } else if (msg.type === "success") {
        finishCrackingState();
        
        hudProgressBar.style.width = `100%`;
        hudProgressPercent.textContent = `100%`;
        hudStatus.textContent = "CRACKED";
        hudStatus.className = "stat-val text-neon-green";

        // Display results card
        crackedSuccessCard.classList.remove("hidden");
        crackResultPlain.textContent = msg.plainText;
        crackResultTime.textContent = `${msg.time}s`;
        crackResultAttempts.textContent = msg.attempts.toLocaleString();

        writeTerminalLog(`MATCH FOUND: "${msg.plainText}"`, "success");
        writeTerminalLog(`Task completed in ${msg.time}s, matching after ${msg.attempts.toLocaleString()} attempts.`, "success");
      } else if (msg.type === "failure") {
        finishCrackingState();
        hudStatus.textContent = "FAILED";
        hudStatus.className = "stat-val text-danger";
        writeTerminalLog(`Dictionary scan completed. Password not found in current wordlist.`, "danger");
      } else if (msg.type === "status") {
        finishCrackingState();
        hudStatus.textContent = "ABORTED";
        hudStatus.className = "stat-val text-muted";
        writeTerminalLog(msg.message, "danger");
      } else if (msg.type === "error") {
        finishCrackingState();
        alert(msg.message);
      }
    };
  });

  btnStopCrack.addEventListener("click", function () {
    if (worker) {
      worker.postMessage({ action: "stop" });
      writeTerminalLog(`Termination request dispatched.`, "danger");
    }
  });

  function finishCrackingState() {
    btnStartCrack.classList.remove("hidden");
    btnStopCrack.classList.add("hidden");
    btnStopCrack.disabled = true;
    hudSpeed.textContent = "0";
    if (worker) {
      worker.terminate();
      worker = null;
    }
  }

  // Copy buttons behavior
  document.querySelectorAll(".btn-copy").forEach(btn => {
    btn.addEventListener("click", function () {
      const targetId = this.dataset.target;
      const targetEl = document.getElementById(targetId);
      if (targetEl) {
        const text = targetEl.textContent || targetEl.value;
        if (text && text !== "-") {
          navigator.clipboard.writeText(text).then(() => {
            const orig = this.textContent;
            this.textContent = "COPIED!";
            setTimeout(() => { this.textContent = orig; }, 1500);
          });
        }
      }
    });
  });

  // ----------------------------------------------------
  // Tab 2: Live Hasher & Avalanche Effect
  // ----------------------------------------------------
  const generatorInput = document.getElementById("generator-input");
  const genMd5 = document.getElementById("gen-md5");
  const genSha1 = document.getElementById("gen-sha1");
  const genSha256 = document.getElementById("gen-sha256");
  const genSha512 = document.getElementById("gen-sha512");

  const avalancheInputA = document.getElementById("avalanche-input-a");
  const avalancheInputB = document.getElementById("avalanche-input-b");
  const avalancheDiffPct = document.getElementById("avalanche-diff-pct");
  const avalancheGrid = document.getElementById("avalanche-grid");

  generatorInput.addEventListener("input", updateLiveHashes);
  avalancheInputA.addEventListener("input", drawAvalancheGrid);
  avalancheInputB.addEventListener("input", drawAvalancheGrid);

  function updateLiveHashes() {
    const val = generatorInput.value;
    if (val === "") {
      genMd5.textContent = "-";
      genSha1.textContent = "-";
      genSha256.textContent = "-";
      genSha512.textContent = "-";
      return;
    }
    genMd5.textContent = md5(val);
    genSha1.textContent = sha1(val);
    genSha256.textContent = sha256(val);
    genSha512.textContent = sha512(val);
  }

  // Convert a hexadecimal string to a binary array of bits
  function hexToBinArray(hexStr) {
    const bits = [];
    for (let char of hexStr) {
      const val = parseInt(char, 16);
      for (let i = 3; i >= 0; i--) {
        bits.push((val >> i) & 1);
      }
    }
    return bits;
  }

  function drawAvalancheGrid() {
    const a = avalancheInputA.value;
    const b = avalancheInputB.value;

    const hashA = sha256(a);
    const hashB = sha256(b);

    const bitsA = hexToBinArray(hashA);
    const bitsB = hexToBinArray(hashB);

    avalancheGrid.innerHTML = "";
    let flippedCount = 0;
    const totalBits = bitsA.length; // 256 bits for SHA-256

    for (let i = 0; i < totalBits; i++) {
      const bitNode = document.createElement("div");
      
      if (bitsA[i] === bitsB[i]) {
        bitNode.className = "bit-node match";
        bitNode.title = `Bit ${i}: Match (${bitsA[i]})`;
      } else {
        bitNode.className = "bit-node diff";
        bitNode.title = `Bit ${i}: Flipped (${bitsA[i]} vs ${bitsB[i]})`;
        flippedCount++;
      }
      avalancheGrid.appendChild(bitNode);
    }

    const pct = ((flippedCount / totalBits) * 100).toFixed(1);
    avalancheDiffPct.textContent = `Flipped Bits: ${flippedCount} / ${totalBits} (${pct}%)`;

    // Visual styling of diff label
    if (pct > 40) {
      avalancheDiffPct.style.background = "rgba(0, 255, 135, 0.1)";
      avalancheDiffPct.style.borderColor = "var(--neon-green)";
      avalancheDiffPct.style.color = "var(--neon-green)";
    } else {
      avalancheDiffPct.style.background = "rgba(255, 8, 68, 0.1)";
      avalancheDiffPct.style.borderColor = "var(--neon-pink)";
      avalancheDiffPct.style.color = "var(--neon-pink)";
    }
  }

  // ----------------------------------------------------
  // Tab 3: Entropy & Brute Force Simulation
  // ----------------------------------------------------
  const lengthSlider = document.getElementById("strength-length-slider");
  const lengthVal = document.getElementById("slider-length-val");
  const chLower = document.getElementById("charset-lower");
  const chUpper = document.getElementById("charset-upper");
  const chDigits = document.getElementById("charset-digits");
  const chSymbols = document.getElementById("charset-symbols");

  const entropyPoolSize = document.getElementById("entropy-pool-size");
  const entropyCombinations = document.getElementById("entropy-combinations");
  const entropyBitsVal = document.getElementById("entropy-bits-val");

  const timeCpu = document.querySelector("#hardware-row-cpu .est-time");
  const timeGpu = document.querySelector("#hardware-row-gpu .est-time");
  const timeRig = document.querySelector("#hardware-row-rig .est-time");
  const timeBotnet = document.querySelector("#hardware-row-botnet .est-time");

  const btnToggleBruteSim = document.getElementById("btn-toggle-brute-sim");
  const simOverlay = document.querySelector(".sim-overlay");
  const simTextGrid = document.getElementById("sim-text-grid");

  lengthSlider.addEventListener("input", function () {
    lengthVal.textContent = this.value;
    calculateEntropy();
  });

  [chLower, chUpper, chDigits, chSymbols].forEach(checkbox => {
    checkbox.addEventListener("change", calculateEntropy);
  });

  function formatTime(seconds) {
    if (seconds === Infinity) return "Infinity";
    if (seconds < 1) return "< 1 second";
    if (seconds < 60) return `${seconds.toFixed(1)} seconds`;
    if (seconds < 3600) return `${(seconds / 60).toFixed(1)} minutes`;
    if (seconds < 86400) return `${(seconds / 3600).toFixed(1)} hours`;
    if (seconds < 31536000) return `${(seconds / 86400).toFixed(1)} days`;
    if (seconds < 31536000 * 100) return `${(seconds / 31536000).toFixed(1)} years`;
    
    // scientific notation for massive times
    const years = seconds / 31536000;
    return `${years.toExponential(2)} years`;
  }

  function calculateEntropy() {
    let poolSize = 0;
    if (chLower.checked) poolSize += 26;
    if (chUpper.checked) poolSize += 26;
    if (chDigits.checked) poolSize += 10;
    if (chSymbols.checked) poolSize += 32;

    entropyPoolSize.textContent = poolSize;
    
    if (poolSize === 0) {
      entropyCombinations.textContent = "0";
      entropyBitsVal.textContent = "0 bits";
      [timeCpu, timeGpu, timeRig, timeBotnet].forEach(el => el.textContent = "-");
      return;
    }

    const length = parseInt(lengthSlider.value);
    
    // Total combinations = S^L
    const combinations = Math.pow(poolSize, length);
    
    if (combinations < 1e6) {
      entropyCombinations.textContent = combinations.toLocaleString();
    } else {
      entropyCombinations.textContent = combinations.toExponential(2).replace("e+", " × 10^");
    }

    // Entropy = log2(combinations) = L * log2(S)
    const entropy = length * Math.log2(poolSize);
    entropyBitsVal.textContent = `${entropy.toFixed(1)} bits`;

    // Visual quality updates
    if (entropy < 28) {
      entropyBitsVal.style.color = "var(--neon-pink)";
    } else if (entropy < 48) {
      entropyBitsVal.style.color = "var(--neon-yellow)";
    } else {
      entropyBitsVal.style.color = "var(--neon-green)";
    }

    // Worst-case cracking times calculations
    // CPU: 10^7 hashes/s
    // GPU: 1.5 * 10^10 hashes/s
    // Rig: 1.2 * 10^11 hashes/s
    // Botnet: 10^13 hashes/s
    timeCpu.textContent = formatTime(combinations / 1e7);
    timeGpu.textContent = formatTime(combinations / 1.5e10);
    timeRig.textContent = formatTime(combinations / 1.2e11);
    timeBotnet.textContent = formatTime(combinations / 1e13);
  }

  // Brute force simulation ticks
  let simInterval = null;
  btnToggleBruteSim.addEventListener("click", function () {
    if (simInterval) {
      clearInterval(simInterval);
      simInterval = null;
      simOverlay.style.display = "none";
      this.textContent = "START SIMULATION";
      btnToggleBruteSim.classList.remove("danger");
    } else {
      simOverlay.style.display = "block";
      this.textContent = "HALT SIMULATION";
      this.classList.add("danger");
      
      const charSet = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
      simInterval = setInterval(() => {
        simTextGrid.innerHTML = "";
        for (let i = 0; i < 24; i++) {
          let testStr = "";
          for (let j = 0; j < 6; j++) {
            testStr += charSet.charAt(Math.floor(Math.random() * charSet.length));
          }
          const item = document.createElement("span");
          item.textContent = testStr;
          
          // Random highlights
          if (Math.random() > 0.95) {
            item.style.color = "var(--neon-green)";
          } else if (Math.random() > 0.90) {
            item.style.color = "var(--neon-cyan)";
          }
          simTextGrid.appendChild(item);
        }
      }, 50);
    }
  });

  // ----------------------------------------------------
  // Tab 4: Educational Sandbox
  // ----------------------------------------------------
  const saltPass = document.getElementById("salt-pass");
  const saltVal = document.getElementById("salt-val");
  const btnGenSalt = document.getElementById("btn-gen-salt");
  const sandboxHashNosalt = document.getElementById("sandbox-hash-nosalt");
  const sandboxHashSalted = document.getElementById("sandbox-hash-salted");
  
  const rainbowMatchNosalt = document.getElementById("rainbow-match-nosalt");
  const rainbowMatchSalted = document.getElementById("rainbow-match-salted");

  saltPass.addEventListener("input", updateSandboxHashes);
  saltVal.addEventListener("input", updateSandboxHashes);

  // A tiny static "Rainbow Table" lookup dictionary for sandbox demonstration
  const mockRainbowTable = {
    // SHA256 of "supersecret"
    "2bb80d537b1da3e38bd30361aa855686bde0eacd7162fef6a25fe97bf527a25b": "supersecret",
    // SHA256 of "password"
    "5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8": "password",
    // SHA256 of "admin"
    "c7ad44cbad762a5da0a452f9e854fdc1e0e7a52a38015f23f3eab1d80b931dd4": "admin",
    // SHA256 of "123456"
    "8d969eef6ecad3c29a3a629280e686cf0c3f5d5a86aff3ca12020c923adc6c92": "123456"
  };

  btnGenSalt.addEventListener("click", function () {
    const chars = "abcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*";
    let randomSalt = "";
    for (let i = 0; i < 8; i++) {
      randomSalt += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    saltVal.value = randomSalt;
    updateSandboxHashes();
  });

  function updateSandboxHashes() {
    const pass = saltPass.value;
    const salt = saltVal.value;

    const hashNosalt = sha256(pass);
    const hashSalted = sha256(pass + salt);

    sandboxHashNosalt.textContent = hashNosalt;
    sandboxHashSalted.textContent = hashSalted;

    // Check Mock Rainbow Table
    if (mockRainbowTable[hashNosalt]) {
      rainbowMatchNosalt.textContent = `⚠️ Found in Rainbow Table! Value: "${mockRainbowTable[hashNosalt]}"`;
      rainbowMatchNosalt.className = "table-match-badge match-danger";
    } else {
      rainbowMatchNosalt.textContent = "🔍 Not found in Rainbow Table (Secure for now)";
      rainbowMatchNosalt.className = "table-match-badge match-success";
    }

    if (mockRainbowTable[hashSalted]) {
      rainbowMatchSalted.textContent = "⚠️ Found in Rainbow Table!";
      rainbowMatchSalted.className = "table-match-badge match-danger";
    } else {
      rainbowMatchSalted.textContent = "🛡️ Safe (No Rainbow Table matches!)";
      rainbowMatchSalted.className = "table-match-badge match-success";
    }
  }

  // Run initializations
  calculateEntropy();
  updateSandboxHashes();
});
