"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface Question {
  id: string
  question: string
  options: { value: string; label: string; tags: string[] }[]
}

interface Craft {
  id: string
  name: string
  description: string
  region: string
  material: string
  tags: string[]
  image: string
}

const questions: Question[] = [
  {
    id: "aesthetic",
    question: "どのような美意識がお好みですか？",
    options: [
      { value: "simple", label: "シンプルでモダン", tags: ["modern", "minimal"] },
      { value: "decorative", label: "装飾的で伝統的", tags: ["traditional", "ornate"] },
      { value: "natural", label: "自然で温かみのある", tags: ["natural", "warm"] },
      { value: "elegant", label: "上品で洗練された", tags: ["elegant", "refined"] },
      { value: "bold", label: "大胆で印象的", tags: ["bold", "striking"] },
      { value: "subtle", label: "控えめで繊細", tags: ["subtle", "delicate"] },
    ],
  },
  {
    id: "usage",
    question: "どのような用途でお使いになりますか？",
    options: [
      { value: "decorative", label: "装飾品として", tags: ["decorative", "display"] },
      { value: "everyday", label: "日常使いとして", tags: ["functional", "practical"] },
      { value: "gift", label: "贈り物として", tags: ["gift", "special"] },
      { value: "ceremony", label: "特別な儀式や行事で", tags: ["ceremonial", "formal"] },
      { value: "collection", label: "コレクションとして", tags: ["collection", "hobby"] },
      { value: "meditation", label: "瞑想や精神的な活動で", tags: ["spiritual", "mindful"] },
    ],
  },
  {
    id: "material",
    question: "どの素材に最も興味がありますか？",
    options: [
      { value: "wood", label: "木材", tags: ["wood", "natural"] },
      { value: "ceramic", label: "陶磁器", tags: ["ceramic", "clay"] },
      { value: "textile", label: "織物・染物", tags: ["textile", "fabric"] },
      { value: "metal", label: "金属", tags: ["metal", "iron"] },
      { value: "glass", label: "ガラス", tags: ["glass", "crystal"] },
      { value: "paper", label: "和紙", tags: ["paper", "washi"] },
      { value: "bamboo", label: "竹", tags: ["bamboo", "natural"] },
      { value: "lacquer", label: "漆", tags: ["lacquer", "urushi"] },
    ],
  },
  {
    id: "region",
    question: "どの地域の文化に最も惹かれますか？",
    options: [
      { value: "kyoto", label: "京都", tags: ["kyoto", "elegant"] },
      { value: "okinawa", label: "沖縄", tags: ["okinawa", "colorful"] },
      { value: "tohoku", label: "東北地方", tags: ["tohoku", "rustic"] },
      { value: "hokuriku", label: "北陸地方", tags: ["hokuriku", "refined"] },
      { value: "tokyo", label: "東京・江戸", tags: ["tokyo", "edo", "urban"] },
      { value: "kansai", label: "関西地方", tags: ["kansai", "traditional"] },
      { value: "kyushu", label: "九州地方", tags: ["kyushu", "bold"] },
      { value: "shikoku", label: "四国地方", tags: ["shikoku", "spiritual"] },
    ],
  },
  {
    id: "color",
    question: "どのような色合いがお好みですか？",
    options: [
      { value: "earth", label: "土の色（茶色、ベージュ）", tags: ["earth", "natural", "warm"] },
      { value: "vibrant", label: "鮮やかな色（赤、青、緑）", tags: ["vibrant", "colorful", "bold"] },
      { value: "monochrome", label: "モノトーン（白、黒、グレー）", tags: ["monochrome", "minimal", "modern"] },
      { value: "gold", label: "金色・銀色", tags: ["metallic", "luxury", "elegant"] },
      { value: "pastel", label: "淡い色合い", tags: ["pastel", "soft", "gentle"] },
      { value: "deep", label: "深い色合い（紺、紫、深緑）", tags: ["deep", "rich", "sophisticated"] },
    ],
  },
]

const crafts: Craft[] = [
  {
    id: "kyo-yaki",
    name: "京焼・清水焼",
    description: "京都の洗練されたデザインが特徴の陶磁器。繊細な美しさと上品な釉薬技法で知られています。",
    region: "京都",
    material: "陶磁器",
    tags: ["ceramic", "kyoto", "elegant", "traditional", "decorative"],
    image: "/elegant-japanese-kyoto-pottery-with-refined-glazin.jpg",
  },
  {
    id: "nambu-tekki",
    name: "南部鉄器",
    description: "岩手県の重厚で耐久性のある鋳鉄製品。機能性と素朴な美しさで愛されています。",
    region: "東北",
    material: "金属",
    tags: ["metal", "iron", "tohoku", "functional", "rustic", "practical"],
    image: "/traditional-japanese-cast-iron-teapot-nambu-tekki.jpg",
  },
  {
    id: "bingata",
    name: "紅型",
    description: "沖縄の色鮮やかな手染め織物。大胆な模様と南国の植物モチーフが特徴です。",
    region: "沖縄",
    material: "織物",
    tags: ["textile", "fabric", "okinawa", "colorful", "decorative", "gift"],
    image: "/colorful-okinawan-bingata-textile-with-tropical-pa.jpg",
  },
  {
    id: "edo-kiriko",
    name: "江戸切子",
    description: "東京の精巧な模様が施されたガラス工芸。繊細なカット技法が美しい輝きを生み出します。",
    region: "東京",
    material: "ガラス",
    tags: ["glass", "modern", "elegant", "decorative", "refined", "gift"],
    image: "/intricate-japanese-edo-kiriko-cut-glass-with-geome.jpg",
  },
  {
    id: "nishijin-ori",
    name: "西陣織",
    description: "着物に使われる豪華な織物。日本の織物技術の頂点を表す伝統工芸です。",
    region: "京都",
    material: "織物",
    tags: ["textile", "fabric", "kyoto", "traditional", "ornate", "special"],
    image: "/luxurious-japanese-nishijin-ori-silk-textile-with-.jpg",
  },
  {
    id: "wajima-nuri",
    name: "輪島塗",
    description: "石川県の美しい漆器。耐久性と美しい仕上がりで知られる北陸の名品です。",
    region: "北陸",
    material: "木材・漆",
    tags: ["wood", "hokuriku", "refined", "functional", "natural", "practical", "lacquer"],
    image: "/elegant-japanese-wajima-lacquerware-bowl-with-gold.jpg",
  },
  {
    id: "arita-yaki",
    name: "有田焼",
    description: "佐賀県の白磁に美しい絵付けが施された磁器。日本初の磁器として400年の歴史を持ちます。",
    region: "九州",
    material: "陶磁器",
    tags: ["ceramic", "kyushu", "elegant", "traditional", "decorative", "refined"],
    image: "/beautiful-arita-porcelain-with-blue-and-white-patt.jpg",
  },
  {
    id: "kanazawa-haku",
    name: "金沢箔",
    description: "石川県金沢市の金箔工芸。美しい金の輝きで装飾品や工芸品を彩ります。",
    region: "北陸",
    material: "金属",
    tags: ["metallic", "hokuriku", "luxury", "elegant", "decorative", "gold"],
    image: "/elegant-kanazawa-gold-leaf-craft-with-shimmering-s.jpg",
  },
  {
    id: "kumano-fude",
    name: "熊野筆",
    description: "広島県の高品質な筆。書道や化粧筆として世界中で愛用されています。",
    region: "関西",
    material: "竹・毛",
    tags: ["bamboo", "kansai", "functional", "practical", "traditional", "refined"],
    image: "/traditional-japanese-kumano-brushes-with-bamboo-ha.jpg",
  },
  {
    id: "daruma",
    name: "だるま",
    description: "群馬県高崎市の縁起物。願いを込めて目を入れる伝統的な置物です。",
    region: "関東",
    material: "紙・木材",
    tags: ["paper", "spiritual", "traditional", "decorative", "ceremonial", "gift"],
    image: "/traditional-red-daruma-doll-with-blank-eyes-for-wi.jpg",
  },
  {
    id: "kokeshi",
    name: "こけし",
    description: "東北地方の木製人形。シンプルで温かみのある表情が魅力的です。",
    region: "東北",
    material: "木材",
    tags: ["wood", "tohoku", "natural", "decorative", "traditional", "gift"],
    image: "/traditional-wooden-kokeshi-dolls-with-simple-paint.jpg",
  },
  {
    id: "tsugaru-nuri",
    name: "津軽塗",
    description: "青森県の独特な模様の漆器。何度も塗り重ねて研ぎ出す技法が美しい模様を生み出します。",
    region: "東北",
    material: "木材・漆",
    tags: ["wood", "lacquer", "tohoku", "decorative", "traditional", "refined"],
    image: "/tsugaru-lacquerware-with-colorful-marbled-patterns.jpg",
  },
  {
    id: "kaga-yuzen",
    name: "加賀友禅",
    description: "石川県の華やかな染物技法。自然の美しさを表現した絵画的な着物が特徴です。",
    region: "北陸",
    material: "織物",
    tags: ["textile", "fabric", "hokuriku", "colorful", "elegant", "traditional"],
    image: "/elegant-kaga-yuzen-kimono-fabric-with-natural-moti.jpg",
  },
  {
    id: "bizen-yaki",
    name: "備前焼",
    description: "岡山県の釉薬を使わない焼き締めの陶器。土の自然な色合いと質感が魅力です。",
    region: "関西",
    material: "陶磁器",
    tags: ["ceramic", "kansai", "natural", "earth", "rustic", "functional"],
    image: "/natural-bizen-pottery-with-earth-tones-and-organic.jpg",
  },
  {
    id: "kutani-yaki",
    name: "九谷焼",
    description: "石川県の色鮮やかな絵付けが特徴の磁器。「九谷五彩」と呼ばれる美しい色使いで知られます。",
    region: "北陸",
    material: "陶磁器",
    tags: ["ceramic", "hokuriku", "colorful", "vibrant", "decorative", "traditional"],
    image: "/colorful-kutani-porcelain-with-vibrant-painted-des.jpg",
  },
]

export default function JapaneseCraftApp() {
  const [currentScreen, setCurrentScreen] = useState<"start" | "questions" | "result">("start")
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<Record<string, string>>({})
  const [recommendedCraft, setRecommendedCraft] = useState<Craft | null>(null)

  const handleAnswer = (questionId: string, value: string) => {
    const newAnswers = { ...answers, [questionId]: value }
    setAnswers(newAnswers)

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
    } else {
      // Calculate recommendation
      const userTags: string[] = []
      Object.entries(newAnswers).forEach(([questionId, answerValue]) => {
        const question = questions.find((q) => q.id === questionId)
        const option = question?.options.find((o) => o.value === answerValue)
        if (option) {
          userTags.push(...option.tags)
        }
      })

      // Find craft with most matching tags
      let bestMatch = crafts[0]
      let maxMatches = 0

      crafts.forEach((craft) => {
        const matches = craft.tags.filter((tag) => userTags.includes(tag)).length
        if (matches > maxMatches) {
          maxMatches = matches
          bestMatch = craft
        }
      })

      setRecommendedCraft(bestMatch)
      setCurrentScreen("result")
    }
  }

  const resetApp = () => {
    setCurrentScreen("start")
    setCurrentQuestion(0)
    setAnswers({})
    setRecommendedCraft(null)
  }

  if (currentScreen === "start") {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <Card className="w-full max-w-md text-center">
          <CardHeader className="space-y-4">
            <div className="text-4xl mb-2">🎨</div>
            <CardTitle className="text-2xl text-balance">あなたにぴったりの日本の伝統工芸を見つけよう</CardTitle>
            <CardDescription className="text-pretty">
              あなたの美意識やライフスタイルに合った日本の伝統工芸を、パーソナライズされた診断で発見しましょう。
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button onClick={() => setCurrentScreen("questions")} className="w-full" size="lg">
              診断を始める
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (currentScreen === "questions") {
    const question = questions[currentQuestion]

    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <Card className="w-full max-w-lg">
          <CardHeader>
            <div className="flex items-center justify-between mb-2">
              <Badge variant="secondary">
                質問 {currentQuestion + 1} / {questions.length}
              </Badge>
              <div className="w-24 bg-muted rounded-full h-2">
                <div
                  className="bg-primary h-2 rounded-full transition-all duration-300"
                  style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
                />
              </div>
            </div>
            <CardTitle className="text-xl text-balance">{question.question}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {question.options.map((option) => (
              <Button
                key={option.value}
                variant="outline"
                className="w-full justify-start h-auto p-4 text-left bg-transparent"
                onClick={() => handleAnswer(question.id, option.value)}
              >
                <span className="text-pretty">{option.label}</span>
              </Button>
            ))}
          </CardContent>
        </Card>
      </div>
    )
  }

  if (currentScreen === "result" && recommendedCraft) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <Card className="w-full max-w-2xl">
          <CardHeader className="text-center">
            <div className="text-4xl mb-2">✨</div>
            <CardTitle className="text-2xl text-balance">あなたにぴったりの工芸品</CardTitle>
            <CardDescription>あなたの好みに基づいて、この日本の伝統工芸をおすすめします</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="text-center">
              <img
                src={recommendedCraft.image || "/placeholder.svg"}
                alt={recommendedCraft.name}
                className="w-full max-w-sm mx-auto rounded-lg shadow-md mb-4"
              />
              <h2 className="text-2xl font-semibold text-primary mb-2">{recommendedCraft.name}</h2>
              <p className="text-muted-foreground text-pretty mb-4">{recommendedCraft.description}</p>
              <div className="flex flex-wrap gap-2 justify-center mb-6">
                <Badge variant="secondary">📍 {recommendedCraft.region}</Badge>
                <Badge variant="secondary">🎨 {recommendedCraft.material}</Badge>
              </div>
            </div>

            <div className="flex gap-3 justify-center">
              <Button onClick={resetApp} variant="outline">
                もう一度診断する
              </Button>
              <Button asChild>
                <a
                  href={`https://www.google.com/search?q=${encodeURIComponent(recommendedCraft.name + " 購入")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  詳しく調べる
                </a>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return null
}
