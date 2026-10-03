import { MsEdgeTTS, OUTPUT_FORMAT } from 'msedge-tts';

async function main() {
  const tts = new MsEdgeTTS();
  await tts.setMetadata("pt-BR-AntonioNeural", OUTPUT_FORMAT.AUDIO_24KHZ_48KBITRATE_MONO_MP3);
  const voices = await tts.getVoices();
  const ptVoices = voices.filter(v => v.Locale.startsWith('pt'));
  console.log("Found PT voices:", ptVoices.map(v => `${v.ShortName} (${v.Gender})`));
}

main().catch(console.error);
