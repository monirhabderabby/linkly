"use client";
import QRCode from "react-qr-code";

const QrControll = ({ url }: { url: string }) => {
  return (
    <div>
      <QRCode id="qr" value={url} size={40} />
    </div>
  );
};

export default QrControll;
