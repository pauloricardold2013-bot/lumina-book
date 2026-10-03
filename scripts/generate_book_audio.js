import { MsEdgeTTS, OUTPUT_FORMAT } from 'msedge-tts';
import fs from 'fs';
import path from 'path';
import { DEFAULT_BOOKS } from '../src/data/defaultBooks.js';

async function generateSingleSlide(ttsVoice, text, outputFile) {
  const tts = new MsEdgeTTS();
  await tts.setMetadata(ttsVoice, OUTPUT_FORMAT.AUDIO_24KHZ_48KBITRATE_MONO_MP3);
  const { audioStream } = tts.toStream(text);
  const writeStream = fs.createWriteStream(outputFile);

  return new Promise((resolve, reject) => {
    audioStream.pipe(writeStream);
    writeStream.on('finish', () => {
      resolve();
    });
    writeStream.on('error', (err) => {
      reject(err);
    });
    audioStream.on('error', (err) => {
      reject(err);
    });
  });
}

async function generateAll() {
  const targetDir = path.resolve('public/audio/reino_magico');
  if (!fs.existsSync(targetDir)) {
    fs.mkdirSync(targetDir, { recursive: true });
  }

  const book = DEFAULT_BOOKS.find(b => b.id === 'reino-magico-jhully');
  if (!book) return;

  const voice = "pt-BR-AntonioNeural";
  console.log(`Starting studio generation for ${book.slides.length} slides with voice ${voice}...`);

  for (let i = 0; i < book.slides.length; i++) {
    const slide = book.slides[i];
    const outputFile = path.join(targetDir, `slide_${i + 1}.mp3`);

    // Clean text for natural human storytelling
    const textToNarrate = `${slide.title ? slide.title + '.\n\n' : ''}${slide.subtitle ? slide.subtitle + '.\n\n' : ''}${slide.content || ''}`
      .replace(/[📖✨🛡️👻🌑🐇📚]/g, '')
      .replace(/\*\*/g, '')
      .replace(/—/g, ', ')
      .trim();

    console.log(`Generating Slide ${i + 1}/${book.slides.length}: ${slide.title || 'Sem título'}...`);

    let attempts = 0;
    let success = false;
    while (attempts < 3 && !success) {
      try {
        attempts++;
        await generateSingleSlide(voice, textToNarrate, outputFile);
        console.log(`✓ Slide ${i + 1} saved successfully (${fs.statSync(outputFile).size} bytes)`);
        success = true;
      } catch (err) {
        console.warn(`Retry slide ${i + 1} (attempt ${attempts}):`, err.message);
        await new Promise(r => setTimeout(r, 600));
      }
    }

    await new Promise(r => setTimeout(r, 300));
  }

  console.log('🎉 ALL SLIDES SUCCESSFULLY GENERATED IN STUDIO QUALITY!');
}

generateAll().catch(console.error);
