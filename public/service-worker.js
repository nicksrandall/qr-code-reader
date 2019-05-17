/**
 * Welcome to your Workbox-powered service worker!
 *
 * You'll need to register this file in your web app and you should
 * disable HTTP caching for this file too.
 * See https://goo.gl/nhQhGp
 *
 * The rest of the code is auto-generated. Please don't update this file
 * directly; instead, make changes to your Workbox build configuration
 * and re-run your build process.
 * See https://goo.gl/2aRDsh
 */

importScripts("https://storage.googleapis.com/workbox-cdn/releases/3.6.3/workbox-sw.js");

/**
 * The workboxSW.precacheAndRoute() method efficiently caches and responds to
 * requests for URLs in the manifest.
 * See https://goo.gl/S9QRab
 */
self.__precacheManifest = [
  {
    "url": "bundle.css",
    "revision": "eb82b84baeb623e743be0eb2a75d0306"
  },
  {
    "url": "bundle.js",
    "revision": "b58a81595305f04c45564cd027d8c08e"
  },
  {
    "url": "global.css",
    "revision": "06d6b74513ea5f86c501b860db0661be"
  },
  {
    "url": "index.html",
    "revision": "094255ab3ec4c52adc48ab768019c85b"
  },
  {
    "url": "zxing.wasm",
    "revision": "b295670b0a21ca09bf0816fc73f27177"
  }
].concat(self.__precacheManifest || []);
workbox.precaching.suppressWarnings();
workbox.precaching.precacheAndRoute(self.__precacheManifest, {});
