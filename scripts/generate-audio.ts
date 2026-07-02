import { MsEdgeTTS, OUTPUT_FORMAT } from "msedge-tts";
import { createClient } from "@supabase/supabase-js";
import { parseBuffer } from "music-metadata";
import { writeFileSync } from "fs";
import { stories } from "../src/data/stories";
import { storyAudio } from "../src/data/story-audio";

const SUPABASE_URL = process.env.SUPABASE_URL!;
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY!;
const BUCKET = "story-audio";
const VOICE = "en-US-AriaNeural";
const OUTPUT_FILE = "src/data/story-audio.ts";

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

async function generateAudioBuffer(text: string): Promise<Buffer> {
  const tts = new MsEdgeTTS();
  await tts.setMetadata(VOICE, OUTPUT_FORMAT.AUDIO_24KHZ_48KBITRATE_MONO_MP3);
  const { audioStream } = tts.toStream(text);
  const chunks: Buffer[] = [];
  for await (const chunk of audioStream as any) chunks.push(chunk as Buffer);
  return Buffer.concat(chunks);
}

async function main() {
  const result: Record<string, { url: string; duration: number; source: "penguin" | "tts" }> = {
    ...storyAudio,
  };

  for (const story of stories) {
    if (result[story.slug]) {
      console.log(`تخطي (موجود مسبقًا): ${story.slug}`);
      continue;
    }

    console.log(`جاري توليد: ${story.title}`);
    try {
      const text = story.paragraphs.join(" ");
      const audioBuffer = await generateAudioBuffer(text);
      const metadata = await parseBuffer(audioBuffer, "audio/mpeg");
      const duration = Math.round(metadata.format.duration ?? 0);

      const path = `${story.slug}.mp3`;
      const { error } = await supabase.storage
        .from(BUCKET)
        .upload(path, audioBuffer, { contentType: "audio/mpeg", upsert: true });

      if (error) {
        console.error(`فشل رفع ${story.slug}: ${error.message}`);
        continue;
      }

      const { data: publicUrlData } = supabase.storage.from(BUCKET).getPublicUrl(path);

      result[story.slug] = { url: publicUrlData.publicUrl, duration, source: "tts" };
      console.log(`تم: ${story.slug} (${duration} ثانية)`);
    } catch (e) {
      console.error(`خطأ في ${story.slug}:`, e);
    }
  }

  const fileContent = `import type { StoryAudio } from "@/lib/types";

// هذا الملف يتولّد تلقائيًا بواسطة scripts/generate-audio.ts
// لإضافة صوت قصص Penguin يدويًا، أضف سطر هنا بنفس الشكل مع source: "penguin"
export const storyAudio: Record<string, StoryAudio> = ${JSON.stringify(result, null, 2)};
`;

  writeFileSync(OUTPUT_FILE, fileContent);
  console.log("تم تحديث story-audio.ts");
}

main();
