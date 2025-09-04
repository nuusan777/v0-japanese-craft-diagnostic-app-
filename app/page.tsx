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
  {
    id: "ceramics-raku",
    name: "楽焼",
    description: "茶の湯の精神を表現する陶芸。侘び寂びの美学",
    image: "/traditional-japanese-raku-pottery-tea-ceremony.jpg",
    traits: ["精神性", "茶道愛好", "侘寂", "瞑想的"],
    regions: ["京都府", "東京都"],
    difficulty: "上級",
  },
  {
    id: "calligraphy",
    name: "書道",
    description: "筆と墨で表現する文字の芸術。心を込めた一筆一筆",
    image: "/japanese-calligraphy-shodo-brush-ink.jpg",
    traits: ["精神性", "文化的", "集中力", "表現力"],
    regions: ["全国"],
    difficulty: "初級",
  },
  {
    id: "ikebana",
    name: "華道",
    description: "花と枝で表現する空間の美。自然との調和",
    image: "/japanese-ikebana-flower-arrangement.jpg",
    traits: ["美意識", "自然愛好", "季節感", "空間感覚"],
    regions: ["全国"],
    difficulty: "初級",
  },
  {
    id: "origami",
    name: "折り紙",
    description: "一枚の紙から生まれる無限の可能性",
    image: "/traditional-japanese-origami-paper-folding.jpg",
    traits: ["数学的", "精密", "創造的", "忍耐強い"],
    regions: ["全国"],
    difficulty: "初級",
  },
  {
    id: "furoshiki",
    name: "風呂敷",
    description: "包む文化の美学。一枚の布の多様な表現",
    image: "/japanese-furoshiki-wrapping-cloth.jpg",
    traits: ["エコ志向", "実用的", "色彩感覚", "工夫好き"],
    regions: ["全国"],
    difficulty: "初級",
  },
  {
    id: "noren",
    name: "暖簾",
    description: "店先を彩る布の芸術。商いの心を表現",
    image: "/traditional-japanese-noren-shop-curtain.jpg",
    traits: ["商業的", "伝統重視", "色彩感覚", "実用的"],
    regions: ["全国"],
    difficulty: "中級",
  },
  {
    id: "sensu",
    name: "扇子",
    description: "涼を呼ぶ美しい道具。実用と装飾の融合",
    image: "/traditional-japanese-folding-fan-sensu.jpg",
    traits: ["実用的", "季節感", "携帯性", "優雅"],
    regions: ["京都府", "東京都"],
    difficulty: "中級",
  },
  {
    id: "kanzashi",
    name: "簪",
    description: "髪を飾る美しい装身具。女性の美を引き立てる",
    image: "/traditional-japanese-kanzashi-hair-ornament.jpg",
    traits: ["装飾的", "女性的", "細やか", "季節感"],
    regions: ["京都府", "東京都"],
    difficulty: "上級",
  },
  {
    id: "netsuke",
    name: "根付",
    description: "小さな彫刻の世界。江戸時代の粋な装身具",
    image: "/traditional-japanese-netsuke-miniature-carving.jpg",
    traits: ["精密", "ミニチュア好き", "彫刻的", "収集癖"],
    regions: ["東京都", "大阪府"],
    difficulty: "上級",
  },
  {
    id: "temari",
    name: "手毬",
    description: "糸で織りなす幾何学模様。母から子への愛情",
    image: "/traditional-japanese-temari-thread-ball.jpg",
    traits: ["幾何学的", "色彩感覚", "母性的", "忍耐強い"],
    regions: ["全国"],
    difficulty: "中級",
  },
  {
    id: "daruma",
    name: "だるま",
    description: "願いを込める縁起物。七転び八起きの精神",
    image: "/traditional-japanese-daruma-doll.jpg",
    traits: ["縁起担ぎ", "目標志向", "伝統重視", "精神性"],
    regions: ["群馬県", "静岡県"],
    difficulty: "初級",
  },
  {
    id: "kokeshi",
    name: "こけし",
    description: "東北の温もりを伝える木の人形",
    image: "/traditional-japanese-kokeshi-wooden-doll.jpg",
    traits: ["温和", "郷土愛", "シンプル", "愛らしい"],
    regions: ["宮城県", "山形県", "福島県"],
    difficulty: "初級",
  },
  {
    id: "kendama",
    name: "けん玉",
    description: "技と集中力を競う伝統玩具",
    image: "/traditional-japanese-kendama-wooden-toy.jpg",
    traits: ["技巧的", "集中力", "競技好き", "練習熱心"],
    regions: ["全国"],
    difficulty: "初級",
  },
  {
    id: "shamisen",
    name: "三味線",
    description: "三本の弦が奏でる日本の音色",
    image: "/traditional-japanese-shamisen-string-instrument.jpg",
    traits: ["音楽的", "伝統芸能", "表現力", "文化的"],
    regions: ["全国"],
    difficulty: "上級",
  },
  {
    id: "taiko",
    name: "太鼓",
    description: "力強いリズムで心を揺さぶる",
    image: "/traditional-japanese-taiko-drum.jpg",
    traits: ["力強い", "リズム感", "団体行動", "祭り好き"],
    regions: ["全国"],
    difficulty: "中級",
  },
  {
    id: "fue",
    name: "笛",
    description: "風のような美しい音色を奏でる",
    image: "/placeholder.svg?height=200&width=300",
    traits: ["繊細", "音楽的", "自然派", "瞑想的"],
    regions: ["全国"],
    difficulty: "中級",
  },
  {
    id: "sumi-e",
    name: "水墨画",
    description: "墨の濃淡で表現する東洋の美学",
    image: "/placeholder.svg?height=200&width=300",
    traits: ["芸術的", "精神性", "シンプル", "表現力"],
    regions: ["全国"],
    difficulty: "中級",
  },
  {
    id: "ukiyo-e",
    name: "浮世絵",
    description: "江戸の粋を現代に伝える版画芸術",
    image: "/placeholder.svg?height=200&width=300",
    traits: ["色彩感覚", "版画技術", "江戸文化", "大衆的"],
    regions: ["東京都"],
    difficulty: "上級",
  },
  {
    id: "gyotaku",
    name: "魚拓",
    description: "魚の美しさを紙に写し取る技法",
    image: "/placeholder.svg?height=200&width=300",
    traits: ["自然愛好", "釣り好き", "記録好き", "実用的"],
    regions: ["全国"],
    difficulty: "初級",
  },
  {
    id: "sashiko",
    name: "刺子",
    description: "針と糸で織りなす幾何学模様の美",
    image: "/placeholder.svg?height=200&width=300",
    traits: ["幾何学的", "実用的", "節約精神", "忍耐強い"],
    regions: ["全国"],
    difficulty: "初級",
  },
  {
    id: "boro",
    name: "襤褸",
    description: "継ぎはぎの美学。もったいない精神の表現",
    image: "/placeholder.svg?height=200&width=300",
    traits: ["エコ志向", "節約精神", "創意工夫", "歴史愛"],
    regions: ["全国"],
    difficulty: "初級",
  },
  {
    id: "indigo",
    name: "藍染",
    description: "深い青の世界。自然の恵みから生まれる色",
    image: "/placeholder.svg?height=200&width=300",
    traits: ["自然派", "色彩感覚", "伝統重視", "化学好き"],
    regions: ["徳島県", "岡山県"],
    difficulty: "中級",
  },
  {
    id: "katazome",
    name: "型染",
    description: "型紙を使った美しい染色技法",
    image: "/placeholder.svg?height=200&width=300",
    traits: ["パターン好き", "色彩感覚", "精密", "反復作業"],
    regions: ["三重県", "京都府"],
    difficulty: "中級",
  },
  {
    id: "yuzen",
    name: "友禅染",
    description: "絵画のような美しい着物の染色技法",
    image: "/placeholder.svg?height=200&width=300",
    traits: ["絵画的", "高級志向", "色彩感覚", "細やか"],
    regions: ["京都府", "石川県"],
    difficulty: "上級",
  },
  {
    id: "bingata",
    name: "紅型",
    description: "沖縄の鮮やかな染色技法。南国の色彩",
    image: "/placeholder.svg?height=200&width=300",
    traits: ["鮮やか", "南国的", "色彩感覚", "開放的"],
    regions: ["沖縄県"],
    difficulty: "中級",
  },
  {
    id: "tsumami",
    name: "つまみ細工",
    description: "小さな布片で作る立体的な花飾り",
    image: "/placeholder.svg?height=200&width=300",
    traits: ["細やか", "立体感覚", "装飾的", "女性的"],
    regions: ["東京都"],
    difficulty: "中級",
  },
  {
    id: "mizuhiki",
    name: "水引",
    description: "紙紐で結ぶ日本の心。贈り物の美学",
    image: "/placeholder.svg?height=200&width=300",
    traits: ["礼儀正しい", "結び好き", "贈り物好き", "細やか"],
    regions: ["長野県", "石川県"],
    difficulty: "中級",
  },
  {
    id: "kumiko",
    name: "組子",
    description: "釘を使わない木組みの技術。精密な幾何学模様",
    image: "/placeholder.svg?height=200&width=300",
    traits: ["幾何学的", "精密", "数学的", "建築的"],
    regions: ["福岡県", "秋田県"],
    difficulty: "上級",
  },
  {
    id: "zaiku",
    name: "細工",
    description: "精巧な手仕事の総称。職人の技の結晶",
    image: "/placeholder.svg?height=200&width=300",
    traits: ["精密", "職人気質", "完璧主義", "技術志向"],
    regions: ["全国"],
    difficulty: "上級",
  },
  {
    id: "shippo",
    name: "七宝",
    description: "金属とガラスの美しい融合。宝石のような輝き",
    image: "/placeholder.svg?height=200&width=300",
    traits: ["宝石好き", "色彩感覚", "高級志向", "精密"],
    regions: ["愛知県", "東京都"],
    difficulty: "上級",
  },
  {
    id: "raden",
    name: "螺鈿",
    description: "貝殻の虹色の輝きを活かした装飾技法",
    image: "/placeholder.svg?height=200&width=300",
    traits: ["光好き", "虹色好き", "高級志向", "装飾的"],
    regions: ["京都府", "石川県"],
    difficulty: "上級",
  },
  {
    id: "maki-e",
    name: "蒔絵",
    description: "金粉で描く漆器の装飾。究極の美の追求",
    image: "/placeholder.svg?height=200&width=300",
    traits: ["豪華", "金好き", "完璧主義", "高級志向"],
    regions: ["石川県", "京都府"],
    difficulty: "上級",
  },
  {
    id: "satsuma",
    name: "薩摩焼",
    description: "鹿児島の土が生む独特の風合いの陶器",
    image: "/placeholder.svg?height=200&width=300",
    traits: ["土好き", "南国的", "素朴", "力強い"],
    regions: ["鹿児島県"],
    difficulty: "中級",
  },
  {
    id: "imari",
    name: "伊万里焼",
    description: "磁器の白地に美しい絵付けが映える",
    image: "/placeholder.svg?height=200&width=300",
    traits: ["絵付け好き", "白好き", "上品", "国際的"],
    regions: ["佐賀県"],
    difficulty: "中級",
  },
  {
    id: "kutani",
    name: "九谷焼",
    description: "五彩の鮮やかな色絵が特徴的な磁器",
    image: "/placeholder.svg?height=200&width=300",
    traits: ["色彩豊か", "鮮やか", "絵画的", "華やか"],
    regions: ["石川県"],
    difficulty: "中級",
  },
  {
    id: "bizen",
    name: "備前焼",
    description: "釉薬を使わない土の美しさ。窯変の神秘",
    image: "/placeholder.svg?height=200&width=300",
    traits: ["自然派", "素朴", "土好き", "偶然性"],
    regions: ["岡山県"],
    difficulty: "中級",
  },
  {
    id: "hagi",
    name: "萩焼",
    description: "茶人に愛される素朴で温かみのある陶器",
    image: "/placeholder.svg?height=200&width=300",
    traits: ["茶道愛好", "素朴", "温かみ", "侘寂"],
    regions: ["山口県"],
    difficulty: "中級",
  },
  {
    id: "shigaraki",
    name: "信楽焼",
    description: "狸の置物で有名な素朴で親しみやすい陶器",
    image: "/placeholder.svg?height=200&width=300",
    traits: ["親しみやすい", "素朴", "愛嬌", "庶民的"],
    regions: ["滋賀県"],
    difficulty: "初級",
  },
  {
    id: "tokoname",
    name: "常滑焼",
    description: "急須で有名な実用性に優れた陶器",
    image: "/placeholder.svg?height=200&width=300",
    traits: ["実用的", "茶好き", "機能美", "日常的"],
    regions: ["愛知県"],
    difficulty: "初級",
  },
  {
    id: "mashiko",
    name: "益子焼",
    description: "民芸運動の中心となった素朴で力強い陶器",
    image: "/placeholder.svg?height=200&width=300",
    traits: ["民芸的", "力強い", "素朴", "実用的"],
    regions: ["栃木県"],
    difficulty: "初級",
  },
  {
    id: "kasama",
    name: "笠間焼",
    description: "自由な発想で作られる現代的な陶芸",
    image: "/placeholder.svg?height=200&width=300",
    traits: ["自由発想", "現代的", "創造的", "実験的"],
    regions: ["茨城県"],
    difficulty: "中級",
  },
  {
    id: "tamba",
    name: "丹波焼",
    description: "中世から続く歴史ある陶器。自然釉の美しさ",
    image: "/placeholder.svg?height=200&width=300",
    traits: ["歴史好き", "自然釉", "古典的", "重厚"],
    regions: ["兵庫県"],
    difficulty: "中級",
  },
  {
    id: "echizen",
    name: "越前焼",
    description: "日本六古窯の一つ。素朴で力強い焼き物",
    image: "/placeholder.svg?height=200&width=300",
    traits: ["古窯好き", "歴史愛", "素朴", "力強い"],
    regions: ["福井県"],
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
  {
    id: 9,
    question: "好きな季節は？",
    options: [
      { text: "春（桜、新緑、始まり）", traits: ["季節感", "新鮮", "希望的", "色彩感覚"] },
      { text: "夏（祭り、活動的、情熱）", traits: ["祭り好き", "活動的", "情熱的", "開放的"] },
      { text: "秋（紅葉、収穫、落ち着き）", traits: ["落ち着き", "収穫好き", "温かみ", "成熟"] },
      { text: "冬（雪、静寂、内省）", traits: ["静寂好き", "内省的", "瞑想的", "精神性"] },
    ],
  },
  {
    id: 10,
    question: "手仕事で大切にしたいことは？",
    options: [
      { text: "正確性と精密さ", traits: ["精密", "正確性", "技術志向", "完璧主義"] },
      { text: "創造性と表現力", traits: ["創造的", "表現力", "芸術的", "自由発想"] },
      { text: "実用性と機能美", traits: ["実用的", "機能美", "日常的", "合理的"] },
      { text: "心の込め方と愛情", traits: ["愛情深い", "心込める", "温かみ", "母性的"] },
    ],
  },
  {
    id: 11,
    question: "材料の好みは？",
    options: [
      { text: "土や粘土（陶芸系）", traits: ["土好き", "自然素材", "可塑性", "創造的"] },
      { text: "木材（木工系）", traits: ["木好き", "自然派", "温かみ", "実用的"] },
      { text: "金属（金工系）", traits: ["金属好き", "堅牢性", "精密", "工業的"] },
      { text: "布や糸（織物・染物系）", traits: ["繊維好き", "柔軟性", "色彩感覚", "細やか"] },
    ],
  },
  {
    id: 12,
    question: "作品のサイズの好みは？",
    options: [
      { text: "大きな作品（存在感のある）", traits: ["大胆", "存在感", "力強い", "建築的"] },
      { text: "手のひらサイズ（愛らしい）", traits: ["愛らしい", "携帯性", "親しみやすい", "ミニチュア好き"] },
      { text: "精密な小物（繊細な）", traits: ["繊細", "精密", "細やか", "技巧的"] },
      { text: "実用的なサイズ（日常使い）", traits: ["実用的", "日常的", "機能的", "合理的"] },
    ],
  },
  {
    id: 13,
    question: "学習スタイルは？",
    options: [
      { text: "師匠について伝統的に学ぶ", traits: ["伝統重視", "師弟関係", "礼儀正しい", "文化的"] },
      { text: "本や動画で独学する", traits: ["独学好き", "現代的", "自由", "知的"] },
      { text: "仲間と一緒に楽しく学ぶ", traits: ["社交的", "協調性", "楽しい", "団体行動"] },
      { text: "試行錯誤で体験的に学ぶ", traits: ["実験的", "体験重視", "創意工夫", "探究心"] },
    ],
  },
  {
    id: 14,
    question: "完成度への考え方は？",
    options: [
      { text: "完璧を目指して何度でも作り直す", traits: ["完璧主義", "向上心", "妥協しない", "職人気質"] },
      { text: "80%の完成度で満足する", traits: ["効率的", "現実的", "バランス感覚", "実用的"] },
      { text: "過程を楽しむことが大切", traits: ["過程重視", "楽しい", "体験価値", "マイペース"] },
      { text: "偶然の美しさも受け入れる", traits: ["偶然性", "自然体", "柔軟性", "受容的"] },
    ],
  },
  {
    id: 15,
    question: "工芸品に求める価値は？",
    options: [
      { text: "歴史と伝統の重み", traits: ["歴史愛", "伝統重視", "文化的", "重厚"] },
      { text: "現代生活との調和", traits: ["現代的", "調和", "実用的", "バランス"] },
      { text: "個性的な表現力", traits: ["個性的", "表現力", "独創的", "アーティスティック"] },
      { text: "心の癒しと安らぎ", traits: ["癒し", "安らぎ", "瞑想的", "精神性"] },
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
            15の質問に答えて、50種類の伝統工芸品からあなたにぴったりのものを発見してください
          </p>
        </div>

        {/* スタート画面 */}
        {currentStep === "start" && (
          <Card className="bg-card border-border">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl text-card-foreground">診断を始めましょう</CardTitle>
              <CardDescription className="text-lg">
                15の質問に答えて、50種類の伝統工芸品からあなたにぴったりのものを発見してください
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
                    .slice(0, 8)
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
