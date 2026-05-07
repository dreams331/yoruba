"""
Run this after saving the Ife head image as images/favicon.png:
    python3 make-favicon.py
"""
from PIL import Image
import sys

input_path = 'images/favicon.png'
output_path = 'images/favicon.png'

img = Image.open(input_path).convert('RGBA')
w, h = img.size
print(f'Original size: {w}x{h}')

# Centre-crop to square
side = min(w, h)
left = (w - side) // 2
top = (h - side) // 2  # centre vertically — face is centred in these images
cropped = img.crop((left, top, left + side, top + side))

# Resize to 512x512
resized = cropped.resize((512, 512), Image.LANCZOS)
resized.save(output_path, 'PNG')
print(f'✅ Saved 512x512 favicon to {output_path}')
