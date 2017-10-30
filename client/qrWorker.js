import QrCode from 'qrcode-reader';
import {qrCodeStringToObject} from './utils/qrcode';

const log = console.info.bind(console);



self.onmessge = ({data}) => {
  log('worker received image')
  decodeQrCode(data.image, data.resolve);
}

function decodeQrCode(image, resolve) {
  let qr = new QrCode();
  qr.callback = function (error, rawResult) {
    log(error)
    if (error) {
      self.postMessage({ error });
      return;
    }
    let result = qrCodeStringToObject(rawResult.result);
    resolve(result);
  }
  qr.decode(image);
}