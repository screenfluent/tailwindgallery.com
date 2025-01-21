import sharp from 'sharp';
import type { ImageMetadata } from 'astro';
import fs from 'node:fs/promises';

function cleanImagePath(src: string): string {
    // Remove /@fs prefix and URL parameters
    return src.replace(/^\/@fs/, '').split('?')[0];
}

export async function createWebsiteCollage(
    mobile: ImageMetadata,
    tablet: ImageMetadata,
    desktop: ImageMetadata
) {
    // Canvas dimensions
    const CANVAS = {
        width: 1000,
        height: 1000
    };

    // Spacing between elements
    const GAP = 20;

    // Height of the top row (mobile and tablet)
    const TOP_ROW_HEIGHT = 480;
    
    // Element widths
    const WIDTHS = {
        mobile: 380,    // Narrower mobile
        tablet: 580,    // Wider tablet
        desktop: CANVAS.width - (GAP * 2) // Full width minus margins
    };

    // Element heights
    const HEIGHTS = {
        mobile: TOP_ROW_HEIGHT,
        tablet: TOP_ROW_HEIGHT,
        desktop: 480
    };

    // Element positions
    const POSITIONS = {
        mobile: { top: GAP, left: GAP },
        tablet: { top: GAP, left: WIDTHS.mobile + (GAP * 2) },
        desktop: { top: TOP_ROW_HEIGHT + (GAP * 2), left: GAP }
    };

    const BACKGROUND_COLOR = { r: 245, g: 245, b: 245, alpha: 1 };

    // Create background
    const background = await sharp({
        create: {
            width: CANVAS.width,
            height: CANVAS.height,
            channels: 4,
            background: BACKGROUND_COLOR
        }
    }).webp().toBuffer();

    try {
        const [mobileResized, tabletResized, desktopResized] = await Promise.all([
            sharp(await fs.readFile(cleanImagePath(mobile.src)))
                .resize(WIDTHS.mobile, HEIGHTS.mobile, { fit: 'cover' })
                .webp()
                .toBuffer(),
            sharp(await fs.readFile(cleanImagePath(tablet.src)))
                .resize(WIDTHS.tablet, HEIGHTS.tablet, { fit: 'cover' })
                .webp()
                .toBuffer(),
            sharp(await fs.readFile(cleanImagePath(desktop.src)))
                .resize(WIDTHS.desktop, HEIGHTS.desktop, { fit: 'cover' })
                .webp()
                .toBuffer()
        ]);

        return await sharp(background)
            .composite([
                {
                    input: mobileResized,
                    ...POSITIONS.mobile
                },
                {
                    input: tabletResized,
                    ...POSITIONS.tablet
                },
                {
                    input: desktopResized,
                    ...POSITIONS.desktop
                }
            ])
            .webp()
            .toBuffer();
    } catch (error) {
        console.error('Error processing images:', error);
        throw new Error('Failed to create collage');
    }
}

// Add new function to save collage
export async function saveWebsiteCollage(
    mobile: ImageMetadata,
    tablet: ImageMetadata,
    desktop: ImageMetadata,
    outputPath: string
) {
    const collageBuffer = await createWebsiteCollage(mobile, tablet, desktop);
    await fs.writeFile(outputPath, collageBuffer);
    console.log(`Collage has been saved to: ${outputPath}`);
} 