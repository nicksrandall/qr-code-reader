<script>
  import { onMount } from "svelte";
  import ZXing from "../wasm/zxing.js";
  import wasmUrl from "../wasm/zxing.wasm";

  function base64ToUint8Array(uri) {
    const binary_string =  window.atob(uri.split(",")[1]);
    const len = binary_string.length;
    const bytes = new Uint8Array( len );
    for (var i = 0; i < len; i++) {
        bytes[i] = binary_string.charCodeAt(i);
    }
    return bytes;
  }

  const zxing = new ZXing({
      noInitialRun: true,
      locateFile(url) {
        if (url.endsWith('.wasm')) return wasmUrl;
        return url;
      },
  });

  let video;
  let canvas;
  let ctx;
  let barcodeDetector;

  let width = 640;
  let height = 480;
  let ratio = 1;

  function isBarcodeDetectorSupported(barcodeDetector) {
      return barcodeDetector.detect(document.createElement('canvas'))
       .then(_ => true)
         .catch(e => e.name === 'NotSupportedError' ? false : true)
  }

  function wasmTick() {
    ctx.drawImage(video, 0, 0, width, height);

    const pngData = canvas.toDataURL("image/png");
    const fileData = base64ToUint8Array(pngData);
    const buffer = zxing._malloc(fileData.length);
    zxing.HEAPU8.set(fileData, buffer);
    var result = zxing.readBarcodeFromPng(buffer, fileData.length, true, '');
    zxing._free(buffer);
    if (result.text) {
      goToSite(result.format, result.text);
      return
    }
    window.requestAnimationFrame(wasmTick);
  }

  function nativeTick() {
    barcodeDetector.detect(canvas)
      .then(texts => {
        if (texts.length) {
          let item = texts[0];
          goToSite(item.format, item.rawValue);
        } else {
          window.requestAnimationFrame(nativeTick);
        }
      })
  }

  function goToSite(format, text)  {
      switch(format) {
        case "UPC_A":
        case "UPC_E":
          window.location.href = `https://www.amazon.com/s?k=${text}`;
          return
        case "QR_CODE":
          window.location.href = text;
          return
        default:
          console.log(`Unknown Barcode type: ${format}`);
      }
  }

  // center the video on the page.
  function handleVideoReady(e) {
    width = video.videoWidth;
    height = video.videoHeight;
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    if ('BarcodeDetector' in window && false) {
      barcodeDetector = new BarcodeDetector({
        formats: [
          'qr_code',
          'upc_a',
          'upc_e',
        ]
      });
      isBarcodeDetectorSupported(barcodeDetector)
        .then(isSupported => {
          if (isSupported) {
            window.requestAnimationFrame(nativeTick);
          } else {
            window.requestAnimationFrame(wasmTick);
          }
        });
    } else {
      window.requestAnimationFrame(wasmTick);
    }
  }

  onMount(() => {
    ctx = canvas.getContext("2d");
    const constraints = {
      width: 640,
      height: 480,
      facingMode: "environment"
    };
    navigator.mediaDevices
      .getUserMedia({
        audio: false,
        video: constraints
      })
      .then(stream => {
        video.srcObject = stream;
      })
      .catch(err => {
        console.error("media device err", err);
      });
  });
</script>

<style>
  .video-bg {
    position: absolute;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    object-fit: cover;
  }
  .canvas {
    display: none;
  }
</style>

<video class="video-bg" style="transform: scale({ratio.toFixed(3)})" autoplay playsinline bind:this="{video}" on:loadeddata="{handleVideoReady}"></video>
<canvas class="canvas" bind:this="{canvas}"></canvas>
