const { getContentBySlug, getAllSlugs } = require("./src/lib/content.ts");

const ARABIC_CHAR_REGEX = /[\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF\uFB50-\uFDFF\uFE70-\uFEFF]/;

const LATIN_RUN_REGEX =
  /(?<![A-Za-z0-9_])([/\\~%$@-]{0,2}[A-Za-z0-9]+(?:[.:@\\/%#&=?+~_-]+[A-Za-z0-9]+)*(?: [-A-Za-z0-9]+(?:[.:@\\/%#&=?+~_-]+[A-Za-z0-9]+)*)*[/\\%]?)(?![A-Za-z0-9_])/g;

function slugify(text) {
  return text
    .normalize("NFC")
    .replace(/[\u064B-\u065F\u0670\u06D6-\u06ED\u0640]/gu, "")
    .toLowerCase()
    .trim()
    .replace(/[^\p{L}\p{N}\s-]/gu, "")
    .replace(/\s+/g, "-");
}

let passCount = 0;
let failCount = 0;

function assert(condition, message) {
  if (condition) {
    console.log(`[PASS] ${message}`);
    passCount++;
  } else {
    console.error(`[FAIL] ${message}`);
    failCount++;
  }
}

console.log("=== 1. LATIN RUN REGEX MATCHING TESTS ===");
const stringTests = [
  { input: "/var/log/auth.log", expected: "/var/log/auth.log" },
  { input: "powershell -enc", expected: "powershell -enc" },
  { input: "--help", expected: "--help" },
  { input: "%APPDATA%\\Roaming", expected: "%APPDATA%\\Roaming" },
  { input: "$env:PATH", expected: "$env:PATH" },
  { input: "نسبة 50% نجاح", expected: "50%" },
  { input: "https://attack.mitre.org/techniques/T1059/", expected: "https://attack.mitre.org/techniques/T1059/" },
  { input: "معرف CVE-2021-44228, تم رصده", expected: "CVE-2021-44228" },
  { input: "Mimikatz", expected: "Mimikatz" },
  { input: "Event ID 4624", expected: "Event ID 4624" },
  { input: "Pass-the-Hash", expected: "Pass-the-Hash" },
  { input: "192.168.1.50:8080", expected: "192.168.1.50:8080" },
  { input: "C:\\Windows\\System32\\cmd.exe", expected: "C:\\Windows\\System32\\cmd.exe" },
  { input: "HKLM\\SOFTWARE\\Microsoft", expected: "HKLM\\SOFTWARE\\Microsoft" },
  { input: "T1059.001", expected: "T1059.001" },
  { input: "استخدم mimikatz.", expected: "mimikatz" },
  { input: "فحص (Event ID 4625) بدقة", expected: "Event ID 4625" },
];

for (const t of stringTests) {
  LATIN_RUN_REGEX.lastIndex = 0;
  const match = LATIN_RUN_REGEX.exec(t.input);
  assert(match && match[1] === t.expected, `String "${t.input}" matched "${t.expected}" (got "${match ? match[1] : null}")`);
}

console.log("\n=== 2. TRAILING PUNCTUATION EXCLUSION TESTS ===");
LATIN_RUN_REGEX.lastIndex = 0;
const periodMatch = LATIN_RUN_REGEX.exec("انتهت الجلسة بواسطة mimikatz.");
assert(periodMatch && periodMatch[1] === "mimikatz", "Trailing period is strictly outside <bdi>");

LATIN_RUN_REGEX.lastIndex = 0;
const commaMatch = LATIN_RUN_REGEX.exec("تم استغلال CVE-2021-44228, وتم التحقق");
assert(commaMatch && commaMatch[1] === "CVE-2021-44228", "Trailing comma is strictly outside <bdi>");

console.log("\n=== 3. BLOCK DIRECTION TESTS (HAS ARABIC) ===");
const engOnlyPara = "All domain controllers must be patched immediately to prevent lateral movement.";
const arParaWithEngStart = "PowerShell هو إطار عمل قوي يعتمد عليه المهاجمون.";
const engOnlyQuote = "Security in depth is not a single product.";
const arHeadingWithEng = "Kerberoasting وتحليل التذاكر";

assert(!ARABIC_CHAR_REGEX.test(engOnlyPara), "English-only paragraph has ZERO Arabic -> qualifies for dir='ltr'");
assert(ARABIC_CHAR_REGEX.test(arParaWithEngStart), "Arabic paragraph starting with 'PowerShell' has Arabic -> stays dir='rtl'");
assert(!ARABIC_CHAR_REGEX.test(engOnlyQuote), "English-only blockquote has ZERO Arabic -> qualifies for dir='ltr'");
assert(ARABIC_CHAR_REGEX.test(arHeadingWithEng), "Arabic heading starting with 'Kerberoasting' has Arabic -> stays dir='rtl'");

console.log("\n=== 4. SLUGIFICATION & HAMZA PRESERVATION TESTS ===");
const slugTashkeel = slugify("تَحْلِيلُ البَيَانَاتِ والأَدِلَّةِ");
assert(slugTashkeel === "تحليل-البيانات-والأدلة", `Tashkeel stripped, hamza preserved: ${slugTashkeel}`);

const slugHamza = slugify("أدوات الفحص والتَّدْقِيق وإدارة آليات المسؤولية");
assert(slugHamza === "أدوات-الفحص-والتدقيق-وإدارة-آليات-المسؤولية", `All hamza forms preserved: ${slugHamza}`);

console.log("\n=== 5. CONTENT LOADER & LANGUAGE CLASSIFICATION TESTS ===");
const arArticle = getContentBySlug("articles", "arabic-rtl-showcase-ar");
assert(arArticle && arArticle.frontmatter.lang === "ar", "Arabic showcase article correctly resolved as lang='ar'");

const enArticle = getContentBySlug("articles", "email_investigation");
assert(enArticle && enArticle.frontmatter.lang === "en", "English article correctly resolved as lang='en'");

const allArticleSlugs = getAllSlugs("articles");
assert(allArticleSlugs.includes("arabic-rtl-showcase-ar"), "getAllSlugs includes arabic-rtl-showcase-ar");

console.log("\n=== TEST SUMMARY ===");
console.log(`Passed: ${passCount}, Failed: ${failCount}`);
if (failCount > 0) {
  process.exit(1);
}

