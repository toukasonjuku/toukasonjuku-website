# -*- coding: utf-8 -*-
"""桃下村塾サイトのQRコード生成"""
import qrcode
from qrcode.constants import ERROR_CORRECT_H
from PIL import Image

URL = "https://www.momoshita.jp"
OUT_DIR = "qr"

import os
os.makedirs(OUT_DIR, exist_ok=True)

# ---- 1) シンプル黒QR（一番読み取りやすい） ----
qr = qrcode.QRCode(
    version=None,
    error_correction=ERROR_CORRECT_H,  # 30%まで欠損OK（ロゴ埋め込み用）
    box_size=20,
    border=4,
)
qr.add_data(URL)
qr.make(fit=True)

img_plain = qr.make_image(fill_color="#1a1311", back_color="white").convert("RGBA")
img_plain.save(f"{OUT_DIR}/qr-plain.png")
print("saved:", f"{OUT_DIR}/qr-plain.png", img_plain.size)

# ---- 2) ロゴ入りQR ----
logo = Image.open("images/shared/logo-icon.png").convert("RGBA")
qr_w, qr_h = img_plain.size

# ロゴはQR全体の約22%サイズ
logo_size = int(qr_w * 0.22)
# アスペクト比維持してリサイズ
lw, lh = logo.size
scale = logo_size / max(lw, lh)
logo = logo.resize((int(lw * scale), int(lh * scale)), Image.LANCZOS)
lw, lh = logo.size

# ロゴ背景に白い丸を敷いて視認性UP
pad = int(logo_size * 0.18)
badge = Image.new("RGBA", (lw + pad * 2, lh + pad * 2), (0, 0, 0, 0))
from PIL import ImageDraw
d = ImageDraw.Draw(badge)
d.ellipse((0, 0, badge.size[0], badge.size[1]), fill="white")
badge.paste(logo, (pad, pad), logo)

# 中央に合成
bx = (qr_w - badge.size[0]) // 2
by = (qr_h - badge.size[1]) // 2
img_logo = img_plain.copy()
img_logo.paste(badge, (bx, by), badge)
img_logo.save(f"{OUT_DIR}/qr-logo.png")
print("saved:", f"{OUT_DIR}/qr-logo.png", img_logo.size)

print("DONE")
