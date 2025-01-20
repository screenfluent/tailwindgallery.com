import sharp from 'sharp';
import type { ImageMetadata } from 'astro';
import fs from 'node:fs/promises';

function cleanImagePath(src: string): string {
    // Usuń parametry z URL (wszystko po ?)
    return src.split('?')[0].replace('/@fs', '');
}

export async function createWebsiteCollage(
    mobile: ImageMetadata,
    tablet: ImageMetadata,
    desktop: ImageMetadata
) {
    // Stwórz tło
    const background = await sharp({
        create: {
            width: 720,
            height: 1000,
            channels: 4,
            background: { r: 234, g: 234, b: 234, alpha: 1 } // #EAEAEA
        }
    }).webp().toBuffer();

    // Przygotuj obrazki
    const mobileResized = await sharp(await fs.readFile(cleanImagePath(mobile.src)))
        .resize(290, 580, { fit: 'cover' })
        .webp()
        .toBuffer();

    const tabletResized = await sharp(await fs.readFile(cleanImagePath(tablet.src)))
        .resize(430, 580, { fit: 'cover' })
        .webp()
        .toBuffer();

    const desktopResized = await sharp(await fs.readFile(cleanImagePath(desktop.src)))
        .resize(720, 400, { fit: 'cover' })
        .webp()
        .toBuffer();

    // Połącz obrazki
    return await sharp(background)
        .composite([
            {
                input: mobileResized,
                top: 20,
                left: 20,
            },
            {
                input: tabletResized,
                top: 20,
                left: 330,
            },
            {
                input: desktopResized,
                top: 580,
                left: 20,
            }
        ])
        .webp()
        .toBuffer();
} 