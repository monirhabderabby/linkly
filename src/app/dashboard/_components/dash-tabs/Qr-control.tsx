"use client";
import { QRCode } from "react-qrcode-logo";

const QrControll = ({ url }: { url: string }) => {
  return (
    <div>
      <QRCode id="qr" value={url} size={40} />
    </div>
  );
};

export default QrControll;
