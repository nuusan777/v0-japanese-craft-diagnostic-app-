"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"

// 伝統工芸品データ
const crafts = [
  {
    id: "pottery",
    name: "陶磁器",
    description: "土と火が生み出す美しい器。有田焼、備前焼、九谷焼など",
    image: "/beautiful-japanese-pottery-ceramics.jpg",
    traits: ["創造的", "忍耐強い", "自然愛好", "伝統重視"],
    regions: ["佐賀県", "岡山県", "石川県"],
    difficulty: "中級",
  },
  {
    id: "textile",
    name: "織物・染物",
    description: "糸から生まれる芸術。西陣織、友禅染、藍染など",
    image: "/traditional-japanese-textile-weaving-kimono.jpg",
    traits: ["細やか", "色彩感覚", "集中力", "美意識"],
    regions: ["京都府", "東京都", "徳島県"],
    difficulty: "上級",
  },
  {
    id: "lacquerware",
    name: "漆器",
    description: "漆の深い艶と美しさ。輪島塗、会津塗、津軽塗など",
    image: "/elegant-japanese-lacquerware-urushi.jpg",
    traits: ["完璧主義", "高級志向", "品格重視", "持続性"],
    regions: ["石川県", "福島県", "青森県"],
    difficulty: "上級",
  },
  {
    id: "metalwork",
    name: "金工",
    description: "金属の美しさを追求。南部鉄器、燕三条、高岡銅器など",
    image: "/traditional-japanese-metalwork-iron-casting.jpg",
    traits: ["力強い", "実用性重視", "職人気質", "堅実"],
    regions: ["岩手県", "新潟県", "富山県"],
    difficulty: "中級",
  },
  {
    id: "woodwork",
    name: "木工",
    description: "木の温もりを活かした工芸。箱根寄木細工、飛騨高山など",
    image: "/beautiful-japanese-woodwork-crafts.jpg",
    traits: ["温和", "自然派", "実用的", "シンプル"],
    regions: ["神奈川県", "岐阜県", "秋田県"],
    difficulty: "初級",
  },
  {
    id: "washi",
    name: "和紙",
    description: "日本古来の紙作り。美濃和紙、越前和紙、土佐和紙など",
    image: "/traditional-japanese-washi-paper-making.jpg",
    traits: ["繊細", "文化的", "知的", "表現力"],
    regions: ["岐阜県", "福井県", "高知県"],
    difficulty: "初級",
  },
  {
    id: "glass",
    name: "ガラス工芸",
    description: "透明な美しさ。江戸切子、薩摩切子、琉球ガラスなど",
    image: "/beautiful-japanese-glass-craft-edo-kiriko.jpg",
    traits: ["透明感", "現代的", "光好き", "精密"],
    regions: ["東京都", "鹿児島県", "沖縄県"],
    difficulty: "中級",
  },
  {
    id: "bamboo",
    name: "竹工芸",
    description: "竹の柔軟性を活かした工芸。別府竹細工、駿河竹千筋細工など",
    image: "/traditional-japanese-bamboo-craft-baskets.jpg",
    traits: ["柔軟性", "エコ志向", "実用的", "軽やか"],
    regions: ["大分県", "静岡県", "京都府"],
    difficulty: "中級",
  },
]

// 診断質問
const questions = [
  {
    id: 1,
    question: "あなたの性格に最も近いのは？",
    options: [
      { text: "完璧主義で細部にこだわる", traits: ["完璧主義", "細やか", "精密"] },
      { text: "創造的でアイデアが豊富", traits: ["創造的", "表現力", "色彩感覚"] },
      { text: "実用的で機能性を重視", traits: ["実用的", "堅実", "力強い"] },
      { text: "自然を愛し穏やかな性格", traits: ["自然愛好", "温和", "自然派"] },
    ],
  },
  {
    id: 2,
    question: "好きな色合いは？",
    options: [
      { text: "深い色合い（紺、茶、黒など）", traits: ["伝統重視", "品格重視", "高級志向"] },
      { text: "鮮やかな色合い（赤、青、緑など）", traits: ["色彩感覚", "現代的", "表現力"] },
      { text: "自然な色合い（ベージュ、木目など）", traits: ["自然派", "シンプル", "エコ志向"] },
      { text: "透明感のある色合い（白、水色など）", traits: ["透明感", "光好き", "繊細"] },
    ],
  },
  {
    id: 3,
    question: "作業スタイルは？",
    options: [
      { text: "じっくり時間をかけて丁寧に", traits: ["忍耐強い", "完璧主義", "持続性"] },
      { text: "集中して一気に仕上げる", traits: ["集中力", "職人気質", "力強い"] },
      { text: "楽しみながらマイペースで", traits: ["軽やか", "柔軟性", "温和"] },
      { text: "計画的に段階を踏んで", traits: ["堅実", "実用性重視", "知的"] },
    ],
  },
  {
    id: 4,
    question: "理想の作品は？",
    options: [
      { text: "日常で長く使える実用品", traits: ["実用的", "持続性", "堅実"] },
      { text: "美しさを追求した芸術品", traits: ["美意識", "品格重視", "高級志向"] },
      { text: "個性的で独創的な作品", traits: ["創造的", "表現力", "現代的"] },
      { text: "自然の美しさを表現した作品", traits: ["自然愛好", "自然派", "エコ志向"] },
    ],
  },
  {
    id: 5,
    question: "学びたい技術レベルは？",
    options: [
      { text: "基礎から始めて楽しく学びたい", traits: ["初級向け"] },
      { text: "ある程度の技術を身につけたい", traits: ["中級向け"] },
      { text: "高度な技術を極めたい", traits: ["上級向け"] },
      { text: "レベルは問わず興味のあるものを", traits: ["柔軟性"] },
    ],
  },
  {
    id: 6,
    question: "作業環境の好みは？",
    options: [
      { text: "静かで集中できる環境", traits: ["集中力", "完璧主義", "知的"] },
      { text: "自然に囲まれた環境", traits: ["自然愛好", "自然派", "エコ志向"] },
      { text: "伝統的な工房の雰囲気", traits: ["伝統重視", "職人気質", "文化的"] },
      { text: "明るく開放的な環境", traits: ["現代的", "軽やか", "透明感"] },
    ],
  },
  {
    id: 7,
    question: "重視する価値観は？",
    options: [
      { text: "伝統と歴史の継承", traits: ["伝統重視", "文化的", "品格重視"] },
      { text: "環境への配慮", traits: ["エコ志向", "自然派", "自然愛好"] },
      { text: "機能性と実用性", traits: ["実用性重視", "実用的", "堅実"] },
      { text: "美しさと芸術性", traits: ["美意識", "色彩感覚", "表現力"] },
    ],
  },
  {
    id: 8,
    question: "完成した作品をどう使いたい？",
    options: [
      { text: "毎日の生活で実際に使う", traits: ["実用的", "実用性重視", "持続性"] },
      { text: "大切な人への贈り物にする", traits: ["温和", "品格重視", "美意識"] },
      { text: "インテリアとして飾る", traits: ["美意識", "現代的", "透明感"] },
      { text: "技術向上のための練習作品", traits: ["職人気質", "完璧主義", "知的"] },
    ],
  },
]

export default function CraftDiagnosticApp() {
  const [currentStep, setCurrentStep] = useState<"start" | "quiz" | "result">("start")
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<string[]>([])
  const [result, setResult] = useState<(typeof crafts)[0] | null>(null)

  const handleAnswer = (traits: string[]) => {
    const newAnswers = [...answers, ...traits]
    setAnswers(newAnswers)

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
    } else {
      calculateResult(newAnswers)
    }
  }

  const calculateResult = (allAnswers: string[]) => {
    const traitCounts: { [key: string]: number } = {}

    // 回答から特性をカウント
    allAnswers.forEach((trait) => {
      traitCounts[trait] = (traitCounts[trait] || 0) + 1
    })

    // 各工芸品とのマッチ度を計算
    const craftScores = crafts.map((craft) => {
      let score = 0
      craft.traits.forEach((trait) => {
        score += traitCounts[trait] || 0
      })

      // 難易度による調整
      if (traitCounts["初級向け"] && craft.difficulty === "初級") score += 2
      if (traitCounts["中級向け"] && craft.difficulty === "中級") score += 2
      if (traitCounts["上級向け"] && craft.difficulty === "上級") score += 2

      return { craft, score }
    })

    // 最高スコアの工芸品を選択
    const bestMatch = craftScores.reduce((best, current) => (current.score > best.score ? current : best))

    setResult(bestMatch.craft)
    setCurrentStep("result")
  }

  const resetQuiz = () => {
    setCurrentStep("start")
    setCurrentQuestion(0)
    setAnswers([])
    setResult(null)
  }

  const progress = ((currentQuestion + 1) / questions.length) * 100

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* ヘッダー */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-4 text-balance">🎨 伝統工芸診断</h1>
          <p className="text-lg text-muted-foreground text-pretty">
            あなたの性格と好みから、最適な日本の伝統工芸品を見つけましょう
          </p>
        </div>

        {/* スタート画面 */}
        {currentStep === "start" && (
          <Card className="bg-card border-border">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl text-card-foreground">診断を始めましょう</CardTitle>
              <CardDescription className="text-lg">
                8つの質問に答えて、あなたにぴったりの伝統工芸品を発見してください
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {crafts.slice(0, 8).map((craft) => (
                  <div key={craft.id} className="text-center">
                    <img
                      src={craft.image || "/placeholder.svg"}
                      alt={craft.name}
                      className="w-full h-24 object-cover rounded-lg mb-2"
                    />
                    <p className="text-sm font-medium text-card-foreground">{craft.name}</p>
                  </div>
                ))}
              </div>
              <div className="text-center">
                <Button
                  onClick={() => setCurrentStep("quiz")}
                  size="lg"
                  className="bg-primary text-primary-foreground hover:bg-primary/90"
                >
                  診断を開始する
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* 質問画面 */}
        {currentStep === "quiz" && (
          <div className="space-y-6">
            <div className="space-y-2">
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>
                  質問 {currentQuestion + 1} / {questions.length}
                </span>
                <span>{Math.round(progress)}%</span>
              </div>
              <Progress value={progress} className="h-2" />
            </div>

            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="text-xl text-card-foreground">{questions[currentQuestion].question}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {questions[currentQuestion].options.map((option, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    className="w-full text-left justify-start h-auto p-4 border-border hover:bg-accent hover:text-accent-foreground bg-transparent"
                    onClick={() => handleAnswer(option.traits)}
                  >
                    {option.text}
                  </Button>
                ))}
              </CardContent>
            </Card>
          </div>
        )}

        {/* 結果画面 */}
        {currentStep === "result" && result && (
          <div className="space-y-6">
            <Card className="bg-card border-border">
              <CardHeader className="text-center">
                <CardTitle className="text-2xl text-card-foreground">あなたにおすすめの伝統工芸品</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="text-center">
                  <img
                    src={result.image || "/placeholder.svg"}
                    alt={result.name}
                    className="w-full max-w-md mx-auto h-64 object-cover rounded-lg mb-4"
                  />
                  <h2 className="text-3xl font-bold text-primary mb-2">{result.name}</h2>
                  <p className="text-lg text-card-foreground text-pretty">{result.description}</p>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-semibold text-card-foreground mb-3">あなたの特性</h3>
                    <div className="flex flex-wrap gap-2">
                      {result.traits.map((trait, index) => (
                        <Badge key={index} variant="secondary" className="bg-secondary text-secondary-foreground">
                          {trait}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="font-semibold text-card-foreground mb-3">主な産地</h3>
                    <div className="flex flex-wrap gap-2">
                      {result.regions.map((region, index) => (
                        <Badge key={index} variant="outline" className="border-border">
                          {region}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold text-card-foreground mb-2">難易度</h3>
                  <Badge
                    variant={
                      result.difficulty === "初級"
                        ? "default"
                        : result.difficulty === "中級"
                          ? "secondary"
                          : "destructive"
                    }
                    className={
                      result.difficulty === "初級"
                        ? "bg-chart-3 text-white"
                        : result.difficulty === "中級"
                          ? "bg-chart-2 text-white"
                          : "bg-chart-1 text-white"
                    }
                  >
                    {result.difficulty}
                  </Badge>
                </div>

                <div className="text-center space-y-4">
                  <p className="text-muted-foreground text-pretty">
                    この工芸品があなたの性格や好みに最も適しています。 ぜひ体験教室や工房見学から始めてみてください！
                  </p>
                  <div className="flex gap-4 justify-center">
                    <Button
                      onClick={resetQuiz}
                      variant="outline"
                      className="border-border hover:bg-accent hover:text-accent-foreground bg-transparent"
                    >
                      もう一度診断する
                    </Button>
                    <Button
                      className="bg-primary text-primary-foreground hover:bg-primary/90"
                      onClick={() => window.open(`https://www.google.com/search?q=${result.name}+体験教室`, "_blank")}
                    >
                      体験教室を探す
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* 他の工芸品も表示 */}
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="text-xl text-card-foreground">他の伝統工芸品も見てみる</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {crafts
                    .filter((craft) => craft.id !== result.id)
                    .slice(0, 4)
                    .map((craft) => (
                      <div key={craft.id} className="text-center">
                        <img
                          src={craft.image || "/placeholder.svg"}
                          alt={craft.name}
                          className="w-full h-20 object-cover rounded-lg mb-2"
                        />
                        <p className="text-sm font-medium text-card-foreground">{craft.name}</p>
                        <p className="text-xs text-muted-foreground">{craft.difficulty}</p>
                      </div>
                    ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  )
}
