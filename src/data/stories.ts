import { storyAudio } from "@/data/story-audio";
import type { Story, Category } from "@/lib/types";
import { theMissingKey } from "@/data/stories/the-missing-key";
import { lightersFromTheLighthouse } from "@/data/stories/letters-from-the-lighthouse";
import { echoesOfMars } from "@/data/stories/echoes-of-mars";
import { theRiversEdge } from "@/data/stories/the-rivers-edge";
import { thePainterUpstairs } from "@/data/stories/the-painter-upstairs";
import { theLastTrainHome } from "@/data/stories/the-last-train-home";
import { theCoffeeBeanJourney } from "@/data/stories/the-coffee-bean-journey";
import { theNightBus } from "@/data/stories/the-night-bus";
import { whyWeDream } from "@/data/stories/why-we-dream";
import { theLostDog } from "@/data/stories/the-lost-dog";
import { aNewFriend } from "@/data/stories/a-new-friend";
import { theRainyAfternoon } from "@/data/stories/the-rainy-afternoon";
import { theBlueBicycle } from "@/data/stories/the-blue-bicycle";
import { grandmothersRecipe } from "@/data/stories/grandmothers-recipe";
import { firstDay } from "@/data/stories/first-day";
import { theKindStranger } from "@/data/stories/the-kind-stranger";
import { theBrokenWindow } from "@/data/stories/the-broken-window";
import { theLittleBird } from "@/data/stories/the-little-bird";
import { aBirthdaySurprise } from "@/data/stories/a-birthday-surprise";
import { theEmptyHouse } from "@/data/stories/the-empty-house";
import { aLetterFromParis } from "@/data/stories/a-letter-from-paris";
import { lostInTheCity } from "@/data/stories/lost-in-the-city";
import { theMarathon } from "@/data/stories/the-marathon";
import { theOldPhotograph } from "@/data/stories/the-old-photograph";
import { aStrangeDiscovery } from "@/data/stories/a-strange-discovery";
import { theMusician } from "@/data/stories/the-musician";
import { theLastLibrary } from "@/data/stories/the-last-library";
import { theInheritance } from "@/data/stories/the-inheritance";
import { betweenTwoWorlds } from "@/data/stories/between-two-worlds";
import { theClockTower } from "@/data/stories/the-clock-tower";
import { theRedUmbrella } from "@/data/stories/the-red-umbrella";
import { myMorningCoffee } from "@/data/stories/my-morning-coffee";
import { aWalkInThePark } from "@/data/stories/a-walk-in-the-park";
import { theNewNeighbor } from "@/data/stories/the-new-neighbor";
import { myFavoriteFood } from "@/data/stories/my-favorite-food";
import { theOldRadio } from "@/data/stories/the-old-radio";
import { aDayAtTheMarket } from "@/data/stories/a-day-at-the-market";
import { theLittleCat } from "@/data/stories/the-little-cat";
import { mySchoolBag } from "@/data/stories/my-school-bag";
import { theQuietMorning } from "@/data/stories/the-quiet-morning";
import { theSummerJob } from "@/data/stories/the-summer-job";
import { aLetterToMom } from "@/data/stories/a-letter-to-mom";
import { theBrokenPhone } from "@/data/stories/the-broken-phone";
import { movingToANewCity } from "@/data/stories/moving-to-a-new-city";
import { theCookingClass } from "@/data/stories/the-cooking-class";
import { aWeekendTrip } from "@/data/stories/a-weekend-trip";
import { theLostWallet } from "@/data/stories/the-lost-wallet";
import { learningToSwim } from "@/data/stories/learning-to-swim";
import { theNewTeacher } from "@/data/stories/the-new-teacher";
import { aSurpriseVisit } from "@/data/stories/a-surprise-visit";
import { theJobInterview } from "@/data/stories/the-job-interview";
import { aDifficultDecision } from "@/data/stories/a-difficult-decision";
import { theFamilyReunion } from "@/data/stories/the-family-reunion";
import { startingABusiness } from "@/data/stories/starting-a-business";
import { theHikingAccident } from "@/data/stories/the-hiking-accident";
import { aMisunderstanding } from "@/data/stories/a-misunderstanding";
import { theOnlineFriend } from "@/data/stories/the-online-friend";
import { changingCareers } from "@/data/stories/changing-careers";
import { theNeighborhoodGarden } from "@/data/stories/the-neighborhood-garden";
import { aSecondChance } from "@/data/stories/a-second-chance";
import { theWhistleblower } from "@/data/stories/the-whistleblower";
import { aQuestionOfTrust } from "@/data/stories/a-question-of-trust";
import { theArtForger } from "@/data/stories/the-art-forger";
import { negotiatingPeace } from "@/data/stories/negotiating-peace";
import { theRefugeeStory } from "@/data/stories/the-refugee-story";
import { anUnexpectedInheritance } from "@/data/stories/an-unexpected-inheritance";
import { theClimateScientist } from "@/data/stories/the-climate-scientist";
import { aCityDivided } from "@/data/stories/a-city-divided";
import { theMemoryThief } from "@/data/stories/the-memory-thief";
import { breakingTheSilence } from "@/data/stories/breaking-the-silence";
import { thePhilosopherKing } from "@/data/stories/the-philosopher-king";
import { aMatterOfPerspective } from "@/data/stories/a-matter-of-perspective";
import { theLinguist } from "@/data/stories/the-linguist";
import { echoesOfThePast } from "@/data/stories/echoes-of-the-past";
import { theDiplomat } from "@/data/stories/the-diplomat";
import { anEthicalDilemma } from "@/data/stories/an-ethical-dilemma";
import { theArchivist } from "@/data/stories/the-archivist";
import { shadowsOfEmpire } from "@/data/stories/shadows-of-empire";
import { theConsciousnessQuestion } from "@/data/stories/the-consciousness-question";
import { aFragilePeace } from "@/data/stories/a-fragile-peace";
import { GloryOfRonldo, messiGrowthHormone, DiedStanding } from "@/data/stories/stories.sports";

function withDefaults(story: Story): Story {
  const tags: Category[] = story.tags ?? [];
  const merged = new Set<Category>(tags);
  if (story.genre !== "non-fiction") merged.add("fiction");
  if (story.minutes <= 5) merged.add("short");
  const audio = storyAudio[story.slug];
  return { ...story, tags: Array.from(merged), ...(audio ? { audio } : {}) };
}


export const stories: Story[] = [
  // Original 9
  theMissingKey,
  theNightBus,
  theRiversEdge,
  lightersFromTheLighthouse,
  theCoffeeBeanJourney,
  echoesOfMars,
  thePainterUpstairs,
  theLastTrainHome,
  whyWeDream,
  // New beginner (10)
  theLostDog,
  aNewFriend,
  theRainyAfternoon,
  theBlueBicycle,
  grandmothersRecipe,
  firstDay,
  theKindStranger,
  theBrokenWindow,
  theLittleBird,
  aBirthdaySurprise,
  // New intermediate (7)
  theEmptyHouse,
  aLetterFromParis,
  lostInTheCity,
  theMarathon,
  theOldPhotograph,
  aStrangeDiscovery,
  theMusician,
  // New advanced (4)
  theLastLibrary,
  theInheritance,
  betweenTwoWorlds,
  theClockTower,
  theClockTower,
  // القصص الجديدة (٥٠)
  theRedUmbrella,
  myMorningCoffee,
  aWalkInThePark,
  theNewNeighbor,
  myFavoriteFood,
  theOldRadio,
  aDayAtTheMarket,
  theLittleCat,
  mySchoolBag,
  theQuietMorning,
  theSummerJob,
  aLetterToMom,
  theBrokenPhone,
  movingToANewCity,
  theCookingClass,
  aWeekendTrip,
  theLostWallet,
  learningToSwim,
  theNewTeacher,
  aSurpriseVisit,
  theJobInterview,
  aDifficultDecision,
  theFamilyReunion,
  startingABusiness,
  theHikingAccident,
  aMisunderstanding,
  theOnlineFriend,
  changingCareers,
  theNeighborhoodGarden,
  aSecondChance,
  theWhistleblower,
  aQuestionOfTrust,
  theArtForger,
  negotiatingPeace,
  theRefugeeStory,
  anUnexpectedInheritance,
  theClimateScientist,
  aCityDivided,
  theMemoryThief,
  breakingTheSilence,
  thePhilosopherKing,
  aMatterOfPerspective,
  theLinguist,
  echoesOfThePast,
  theDiplomat,
  anEthicalDilemma,
  theArchivist,
  shadowsOfEmpire,
  theConsciousnessQuestion,
  aFragilePeace,
    // Sports category (3)
  GloryOfRonldo,
  messiGrowthHormone,
  DiedStanding,
].map(withDefaults);


export function getStory(slug: string): Story | undefined {
  return stories.find((s) => s.slug === slug);
}
