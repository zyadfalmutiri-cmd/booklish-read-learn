import { createClient } from "@supabase/supabase-js";
import { generateStoryCover, extractGradientColors } from "@/lib/cover-generator";
import { stories } from "@/data/stories";

/**
 * Upload story covers to Supabase Storage
 */

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  throw new Error("Missing Supabase environment variables");
}

const supabase = createClient(supabaseUrl, supabaseKey);
const BUCKET_NAME = "story-covers";

async function uploadCoverToSupabase(slug: string, imageData: string) {
  try {
    // Convert base64 to blob
    const response = await fetch(imageData);
    const blob = await response.blob();

    const fileName = `${slug}.png`;

    const { data, error } = await supabase.storage
      .from(BUCKET_NAME)
      .upload(fileName, blob, {
        cacheControl: "3600",
        upsert: true,
      });

    if (error) {
      throw error;
    }

    // Get public URL
    const { data: publicData } = supabase.storage
      .from(BUCKET_NAME)
      .getPublicUrl(fileName);

    return publicData.publicUrl;
  } catch (error) {
    console.error(`Failed to upload ${slug}:`, error);
    return null;
  }
}

async function generateAndUploadAllCovers() {
  console.log("🚀 Starting automatic cover generation and upload...\n");

  const coverUrls: Record<string, string> = {};
  let successCount = 0;
  let failureCount = 0;

  for (const story of stories) {
    try {
      const [gradientFrom, gradientTo] = extractGradientColors(story.coverHue);

      console.log(`⏳ Processing: ${story.title}...`);

      // Generate cover
      const imageData = await generateStoryCover({
        emoji: story.cover,
        title: story.title,
        gradientFrom,
        gradientTo,
        width: 1200,
        height: 800,
      });

      // Upload to Supabase
      const publicUrl = await uploadCoverToSupabase(story.slug, imageData);

      if (publicUrl) {
        coverUrls[story.slug] = publicUrl;
        successCount++;
        console.log(`✅ Uploaded: ${story.slug}`);
        console.log(`   URL: ${publicUrl}\n`);
      } else {
        failureCount++;
        console.log(`⚠️  Generated but failed to upload: ${story.slug}\n`);
      }
    } catch (error) {
      failureCount++;
      console.error(`❌ Error processing ${story.slug}:`, error, "\n");
    }
  }

  console.log(`\n📊 Upload Summary:`);
  console.log(`   ✅ Success: ${successCount}`);
  console.log(`   ❌ Failed: ${failureCount}`);
  console.log(`   📦 Total: ${stories.length}`);

  return coverUrls;
}

export { generateAndUploadAllCovers, uploadCoverToSupabase };
