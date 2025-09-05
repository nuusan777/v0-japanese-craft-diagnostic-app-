"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"

// 伝統工芸品データ
const crafts = [
  {
    id: "nambu-tetsuki",
    name: "南部鉄器",
    description: "岩手県の伝統的な鉄器。耐久性と美しい鉄肌が特徴で、急須や鍋などが有名。400年以上の歴史を持つ。",
  image: "/Gemini_Generated_Image_rdq0jlrdq0jlrdq0.png",
    traits: ["力強い", "実用性重視", "職人気質", "堅実"],
    regions: ["岩手県"],
    difficulty: "中級",
    history: "江戸時代初期から続く南部藩の武具・茶道具製造が起源。",
  },
  {
    id: "arita-yaki",
    name: "有田焼",
    description: "佐賀県有田町で生まれた日本を代表する磁器。白磁に鮮やかな絵付けが特徴。海外でも人気。",
  image: "/Gemini_Generated_Image_olqyreolqyreolqy.png",
    traits: ["創造的", "繊細", "美意識", "伝統重視"],
    regions: ["佐賀県"],
    difficulty: "上級",
    history: "17世紀初頭、朝鮮陶工・李参平によって発祥。江戸時代に輸出され世界的に有名に。",
  },
  {
    id: "bizen-yaki",
    name: "備前焼",
    description: "岡山県備前市で作られる日本六古窯のひとつ。釉薬を使わず焼き締める素朴な風合いが魅力。",
  image:"/Gemini_Generated_Image_ybunenybunenybun.png",
    traits: ["素朴", "自然愛好", "忍耐強い", "伝統重視"],
    regions: ["岡山県"],
    difficulty: "中級",
    history: "平安時代から続く歴史。茶道具や花器として人気。",
  },
  {
    id: "kutani-yaki",
    name: "九谷焼",
    description: "石川県の色絵磁器。鮮やかな五彩（青・赤・黄・紫・緑）が特徴。美術品としても高評価。",
  image: "/Gemini_Generated_Image_js86z0js86z0js86.png",
    traits: ["色彩感覚", "芸術的", "美意識", "創造的"],
    regions: ["石川県"],
    difficulty: "上級",
    history: "江戸時代初期に始まり、明治以降世界へ輸出。",
  },
  {
    id: "wajima-nuri",
    name: "輪島塗",
    description: "石川県輪島市の漆器。堅牢で美しい加飾が特徴。蒔絵や沈金技法が有名。",
  image: "/Gemini_Generated_Image_wxyp1rwxyp1rwxyp.png",
    traits: ["完璧主義", "高級志向", "品格重視", "持続性"],
    regions: ["石川県"],
    difficulty: "上級",
    history: "室町時代から続く。漆と木地の技術が融合。",
  },
  {
    id: "hakone-yosegi",
    name: "箱根寄木細工",
    description: "神奈川県箱根町の木工芸。幾何学模様の寄木細工が特徴。パズル箱などが人気。",
  image: "/Gemini_Generated_Image_ohgg4oohgg4oohgg.png",
    traits: ["温和", "自然派", "実用的", "シンプル"],
    regions: ["神奈川県"],
    difficulty: "初級",
    history: "江戸時代後期から発展。観光土産としても有名。",
  },
  {
    id: "mino-washi",
    name: "美濃和紙",
    description: "岐阜県美濃市の伝統的な和紙。丈夫で美しい質感が特徴。書道や工芸に利用。",
  image: "/Gemini_Generated_Image_gyyeuhgyyeuhgyye.png",
    traits: ["繊細", "伝統重視", "自然愛好", "職人気質"],
    regions: ["岐阜県"],
    difficulty: "初級",
    history: "奈良時代から続く。ユネスコ無形文化遺産。",
  },
  // ...（不要な孤立行を削除）
  {
    id: "edo-kiriko",
    name: "江戸切子",
    description: "東京都で生まれた伝統的なガラス工芸。美しいカット模様が特徴。",
  image: "/Gemini_Generated_Image_xj8kkhxj8kkhxj8k.png",
    traits: ["透明感", "精密", "現代的", "光好き"],
    regions: ["東京都"],
    difficulty: "中級",
    history: "江戸時代末期から続く。職人技が光る。",
  },
  {
    id: "beppu-bamboo",
    name: "別府竹細工",
    description: "大分県別府市の伝統的な竹工芸。生活道具や美術品として人気。",
  image: "/Gemini_Generated_Image_i26r48i26r48i26r.png",
    traits: ["柔軟性", "エコ志向", "実用的", "軽やか"],
    regions: ["大分県"],
    difficulty: "中級",
    history: "江戸時代から続く。全国有数の竹細工産地。",
  },
  {
    id: "raku-yaki",
    name: "楽焼",
    description: "京都府で作られる茶道具の陶器。侘び寂びの美学を体現。",
  image: "/Gemini_Generated_Image_1lzqe1lzqe1lzqe1.png",
    traits: ["精神性", "茶道愛好", "侘寂", "瞑想的"],
    regions: ["京都府"],
    difficulty: "上級",
    history: "安土桃山時代から続く。千利休と楽家による発祥。",
  },
  {
    id: "kumanofude",
    name: "熊野筆",
    description: "広島県熊野町で作られる高級書道筆。柔らかな毛とコシの強さが特徴。書道だけでなく化粧筆としても有名。",
  image: "/Gemini_Generated_Image_qn3bd2qn3bd2qn3b.png",
    traits: ["繊細", "表現力", "伝統重視", "職人気質"],
    regions: ["広島県"],
    difficulty: "中級",
    history: "江戸時代末期から続く。全国生産量の8割を占める。",
  },
  {
    id: "japanese-ink",
    name: "和墨（奈良墨）",
    description: "奈良県で作られる伝統的な墨。松煙や菜種油を使い、深い黒色と香りが特徴。書道に欠かせない。",
  image: "/Gemini_Generated_Image_vlmb9zvlmb9zvlmb.png",
    traits: ["精神性", "伝統重視", "集中力", "表現力"],
    regions: ["奈良県"],
    difficulty: "上級",
    history: "奈良時代から続く。全国の墨のほとんどが奈良産。",
  },
  {
    id: "echizen-washi-calligraphy",
    name: "越前和紙（書道用）",
    description: "福井県越前市の伝統和紙。書道用紙としても高品質で、墨のにじみや発色が美しい。",
  image: "/Gemini_Generated_Image_xzv7u3xzv7u3xzv7.png",
    traits: ["繊細", "自然愛好", "伝統重視", "職人気質"],
    regions: ["福井県"],
    difficulty: "初級",
    history: "1500年以上の歴史。ユネスコ無形文化遺産。",
  },
  {
    id: "ikebana-ikeboryu",
    name: "池坊流（華道）",
    description: "京都発祥の華道流派。最古の流派で、立花・生花など様々な様式がある。",
  image: "/Gemini_Generated_Image_h9xgboh9xgboh9xg.png",
    traits: ["美意識", "自然愛好", "季節感", "空間感覚"],
    regions: ["京都府"],
    difficulty: "中級",
    history: "室町時代から続く。華道の源流。",
  },
  {
    id: "ikebana-sogetsu",
    name: "草月流（華道）",
    description: "東京発祥の華道流派。自由な発想と現代的な作品が特徴。",
  image: "/Gemini_Generated_Image_rljawfrljawfrlja.png",
    traits: ["創造的", "現代的", "自由", "美意識"],
    regions: ["東京都"],
    difficulty: "初級",
    history: "昭和初期に創設。世界的に展開。",
  },
  {
    id: "origami-chiyogami",
    name: "江戸千代紙（折り紙）",
    description: "江戸時代から続く色鮮やかな和紙折り紙。伝統的な模様が特徴。",
  image: "/Gemini_Generated_Image_7e3d357e3d357e3d.png",
    traits: ["色彩感覚", "伝統重視", "創造的", "工夫好き"],
    regions: ["東京都"],
    difficulty: "初級",
    history: "江戸時代から続く。玩具や装飾にも利用。",
  },
  {
    id: "gifu-washi-origami",
    name: "美濃和紙折り紙",
    description: "岐阜県美濃市の和紙を使った折り紙。丈夫で美しい質感が特徴。",
  image: "/Gemini_Generated_Image_b328klb328klb328.png",
    traits: ["繊細", "自然愛好", "創造的", "忍耐強い"],
    regions: ["岐阜県"],
    difficulty: "初級",
    history: "美濃和紙の産地で作られる。伝統的な遊びや工芸に利用。",
  },
  {
    id: "tosa-washi-origami",
    name: "土佐和紙折り紙",
    description: "高知県の土佐和紙を使った折り紙。柔らかく丈夫な質感が特徴。",
  image: "/Gemini_Generated_Image_djusfydjusfydjus.png",
    traits: ["柔軟性", "自然愛好", "創造的", "伝統重視"],
    regions: ["高知県"],
    difficulty: "初級",
    history: "土佐和紙の産地で作られる。伝統的な遊びや工芸に利用。",
  },
  {
    id: "kyofuroshiki",
    name: "京風呂敷",
    description: "京都で染められる伝統的な風呂敷。美しい友禅模様や絞り染めが特徴。",
  image: "/Gemini_Generated_Image_ljje5uljje5uljje.png",
    traits: ["エコ志向", "実用的", "色彩感覚", "工夫好き"],
    regions: ["京都府"],
    difficulty: "初級",
    history: "江戸時代から続く。贈答や包み文化の象徴。",
  },
  {
    id: "nara-noren",
    name: "奈良暖簾",
    description: "奈良で作られる伝統的な暖簾。麻や綿素材に美しい染色が施される。",
  image: "/Gemini_Generated_Image_9k5lez9k5lez9k5l.png",
    traits: ["商業的", "伝統重視", "色彩感覚", "実用的"],
    regions: ["奈良県"],
    difficulty: "中級",
    history: "室町時代から続く。商家の象徴。",
  },
  {
    id: "kyosensu",
    name: "京扇子",
    description: "京都で作られる伝統的な扇子。雅な絵柄と繊細な骨組みが特徴。",
  image: "/Gemini_Generated_Image_wdd3vqwdd3vqwdd3.png",
    traits: ["実用的", "季節感", "携帯性", "優雅"],
    regions: ["京都府"],
    difficulty: "中級",
    history: "平安時代から続く。舞踊や贈答品にも。",
  },
  {
    id: "edo-kanzashi",
    name: "江戸簪",
    description: "東京都で発展した伝統的な髪飾り。細工や蒔絵が美しい。",
  image: "/Gemini_Generated_Image_v62uz1v62uz1v62u.png",
    traits: ["装飾的", "女性的", "細やか", "季節感"],
    regions: ["東京都"],
    difficulty: "上級",
    history: "江戸時代から続く。花嫁や舞妓の髪飾り。",
  },
  {
    id: "edo-netsuke",
    name: "江戸根付",
    description: "東京都で発展した小さな彫刻の装身具。細密な彫刻技術が光る。",
  image: "/Gemini_Generated_Image_leb5dvleb5dvleb5.png",
    traits: ["精密", "ミニチュア好き", "彫刻的", "収集癖"],
    regions: ["東京都"],
    difficulty: "上級",
    history: "江戸時代から続く。印籠や煙草入れの留め具。",
  },
  {
    id: "yamagata-temari",
    name: "山形手毬",
    description: "山形県で作られる伝統的な手毬。美しい幾何学模様が特徴。",
  image: "/Gemini_Generated_Image_6iyu4b6iyu4b6iyu.png",
    traits: ["幾何学的", "色彩感覚", "母性的", "忍耐強い"],
    regions: ["山形県"],
    difficulty: "中級",
    history: "江戸時代から続く。祝い事や贈り物に。",
  },
  {
    id: "takasaki-daruma",
    name: "高崎だるま",
    description: "群馬県高崎市で作られる縁起物のだるま。願掛けや合格祈願で有名。",
  image: "/Gemini_Generated_Image_akmj48akmj48akmj.png",
    traits: ["縁起担ぎ", "目標志向", "伝統重視", "精神性"],
    regions: ["群馬県"],
    difficulty: "初級",
    history: "江戸時代から続く。全国シェア8割以上。",
  },
  {
    id: "tsugaru-kokeshi",
    name: "津軽こけし",
    description: "青森県津軽地方で作られる伝統的な木製人形。素朴な表情が特徴。",
  image: "/Gemini_Generated_Image_52wek052wek052we.png",
    traits: ["温和", "郷土愛", "素朴", "愛らしい"],
    regions: ["青森県"],
    difficulty: "初級",
    history: "明治時代から続く。東北各地に系統あり。",
  },
  {
    id: "hiroshima-kendama",
    name: "広島けん玉",
    description: "広島県廿日市市で作られる日本一のけん玉産地。競技用としても有名。",
  image: "/kendama.png",
    traits: ["技巧的", "集中力", "競技好き", "練習熱心"],
    regions: ["広島県"],
    difficulty: "初級",
    history: "大正時代から続く。世界大会も開催。",
  },
  {
    id: "tsugaru-shinobue",
    name: "津軽笛",
    description: "青森県津軽地方の祭りで使われる篠笛。力強い音色が特徴。",
  image: "/Gemini_Generated_Image_s4kh33s4kh33s4kh.png",
    traits: ["繊細", "音楽的", "祭り好き", "自然派"],
    regions: ["青森県"],
    difficulty: "中級",
    history: "津軽三味線とともに津軽民謡で活躍。",
  },
  {
    id: "nogaku-nokan",
    name: "能楽能管",
    description: "能楽で使われる竹製の横笛。独特の高音と伝統的な演奏法が特徴。",
  image: "/Gemini_Generated_Image_tw2cmutw2cmutw2c.png",
    traits: ["伝統芸能", "音楽的", "表現力", "文化的"],
    regions: ["東京都", "京都府"],
    difficulty: "上級",
    history: "室町時代から続く。能楽の重要な楽器。",
  },
  {
    id: "gagaku-ryuteki",
    name: "雅楽龍笛",
    description: "雅楽で使われる竹製の横笛。幻想的な音色と宮廷音楽の伝統。",
  image: "/Gemini_Generated_Image_qneyocqneyocqney.png",
    traits: ["雅楽", "音楽的", "幻想的", "伝統重視"],
    regions: ["京都府", "奈良県"],
    difficulty: "上級",
    history: "奈良時代から続く。宮廷音楽で使用。",
  },
  {
    id: "tsugaru-shamisen",
    name: "津軽三味線",
    description: "青森県発祥の力強い音色が特徴の三味線。民謡や演奏会で人気。",
  image: "/Gemini_Generated_Image_xoyij0xoyij0xoyi.png",
    traits: ["音楽的", "技巧的", "表現力", "文化的"],
    regions: ["青森県"],
    difficulty: "上級",
    history: "明治時代から発展。全国に広まる。",
  },
  {
    id: "nagauta-shamisen",
    name: "長唄三味線",
    description: "歌舞伎や長唄で使われる三味線。繊細な音色が特徴。",
  image: "/Gemini_Generated_Image_bws6ekbws6ekbws6.png",
    traits: ["音楽的", "伝統芸能", "表現力", "繊細"],
    regions: ["東京都"],
    difficulty: "上級",
    history: "江戸時代から続く。歌舞伎音楽の中心。",
  },
  {
    id: "matsuri-taiko",
    name: "祭り太鼓（青森ねぶた）",
    description: "青森県のねぶた祭りで使われる力強い太鼓。祭りの熱気を盛り上げる。",
    image: "/Gemini_Generated_Image_spfru0spfru0spfr.png",
    traits: ["力強い", "リズム感", "団体行動", "祭り好き"],
    regions: ["青森県"],
    difficulty: "中級",
    history: "ねぶた祭りで活躍。地域ごとに特色あり。",
  },
  {
    id: "kagura-taiko",
    name: "神楽太鼓（広島）",
    description: "広島県の神楽で使われる太鼓。伝統芸能の中心的存在。",
    image: "/Gemini_Generated_Image_2hlzwc2hlzwc2hlz.png",
    traits: ["力強い", "伝統芸能", "表現力", "祭り好き"],
    regions: ["広島県"],
    difficulty: "中級",
    history: "神楽の舞台で活躍。地域ごとに特色あり。",
  },
  {
    id: "edo-sumi-e",
    name: "江戸水墨画",
    description: "江戸時代に発展した墨の濃淡で表現する美学。",
    image: "/Gemini_Generated_Image_cp8nzqcp8nzqcp8n.png",
    traits: ["芸術的", "精神性", "シンプル", "表現力"],
    regions: ["東京都"],
    difficulty: "中級",
    history: "江戸時代に多くの絵師が活躍。",
  },
  {
    id: "kyoto-sumi-e",
    name: "京都水墨画",
    description: "京都で発展した伝統的な水墨画。禅の精神が息づく。",
    image: "/Gemini_Generated_Image_53v0zt53v0zt53v0.png",
    traits: ["精神性", "禅的", "伝統重視", "表現力"],
    regions: ["京都府"],
    difficulty: "中級",
    history: "禅寺などで描かれる。",
  },
  {
    id: "ukiyo-e",
    name: "浮世絵",
    description: "江戸の粋を現代に伝える版画芸術",
    image: "/Gemini_Generated_Image_jp1r25jp1r25jp1r.png",
    traits: ["色彩感覚", "版画技術", "江戸文化", "大衆的"],
    regions: ["東京都"],
    difficulty: "上級",
  },
  {
    id: "shizuoka-gyotaku",
    name: "静岡魚拓",
    description: "静岡県の漁師文化から生まれた魚拓。釣り人に人気。",
    image: "/Gemini_Generated_Image_tycsbbtycsbbtycs.png",
    traits: ["自然愛好", "釣り好き", "記録好き", "実用的"],
    regions: ["静岡県"],
    difficulty: "初級",
    history: "駿河湾の漁師が発祥。",
  },
  {
    id: "hokkaido-gyotaku",
    name: "北海道魚拓",
    description: "北海道の釣り文化で発展した魚拓。大物狙いが特徴。",
    image: "/Gemini_Generated_Image_6z2xh26z2xh26z2x.png",
    traits: ["自然愛好", "釣り好き", "記録好き", "実用的"],
    regions: ["北海道"],
    difficulty: "初級",
    history: "寒冷地ならではの魚種が多い。",
  },
  {
    id: "aizu-sashiko",
    name: "会津刺子",
    description: "福島県会津地方の刺子。防寒や補強のための美しい模様。",
    image: "/Gemini_Generated_Image_3chx3l3chx3l3chx.png",
    traits: ["幾何学的", "実用的", "節約精神", "忍耐強い"],
    regions: ["福島県"],
    difficulty: "初級",
    history: "雪国の生活から生まれた技法。",
  },
  {
    id: "tsugaru-sashiko",
    name: "津軽刺子",
    description: "青森県津軽地方の刺子。素朴な幾何学模様が特徴。",
    image: "/Gemini_Generated_Image_d4nsqed4nsqed4ns.png",
    traits: ["幾何学的", "素朴", "忍耐強い", "郷土愛"],
    regions: ["青森県"],
    difficulty: "初級",
    history: "津軽地方の農村で発展。",
  },
  {
    id: "aomori-boro",
    name: "青森襤褸",
    description: "青森県の寒冷地で生まれた襤褸。布を大切に使う知恵。",
    image: "/Gemini_Generated_Image_77a5t177a5t177a5.png",
    traits: ["エコ志向", "節約精神", "創意工夫", "歴史愛"],
    regions: ["青森県"],
    difficulty: "初級",
    history: "寒さ対策として発展。",
  },
  {
    id: "niigata-boro",
    name: "新潟襤褸",
    description: "新潟県の雪国文化から生まれた襤褸。布の再利用が特徴。",
    image: "/Gemini_Generated_Image_gjlq20gjlq20gjlq.png",
    traits: ["エコ志向", "節約精神", "創意工夫", "歴史愛"],
    regions: ["新潟県"],
    difficulty: "初級",
    history: "雪国の生活の知恵。",
  },
  {
    id: "indigo",
    name: "藍染",
    description: "深い青の世界。自然の恵みから生まれる色",
    image: "/Gemini_Generated_Image_uuvx6duuvx6duuvx.png",
    traits: ["自然派", "色彩感覚", "伝統重視", "化学好き"],
    regions: ["徳島県", "岡山県"],
    difficulty: "中級",
  },
  {
    id: "katazome",
    name: "型染",
    description: "型紙を使った美しい染色技法",
    image: "/Gemini_Generated_Image_fam0cdfam0cdfam0.png",
    traits: ["パターン好き", "色彩感覚", "精密", "反復作業"],
    regions: ["三重県", "京都府"],
    difficulty: "中級",
  },
  {
    id: "yuzen",
    name: "友禅染",
    description: "絵画のような美しい着物の染色技法",
    image: "/Gemini_Generated_Image_n8xlwyn8xlwyn8xl.png",
    traits: ["絵画的", "高級志向", "色彩感覚", "細やか"],
    regions: ["京都府", "石川県"],
    difficulty: "上級",
  },
  {
    id: "bingata",
    name: "紅型",
    description: "沖縄の鮮やかな染色技法。南国の色彩",
    image: "/Gemini_Generated_Image_enlrwxenlrwxenlr.png",
    traits: ["鮮やか", "南国的", "色彩感覚", "開放的"],
    regions: ["沖縄県"],
    difficulty: "中級",
  },
  {
    id: "tsumami",
    name: "つまみ細工",
    description: "小さな布片で作る立体的な花飾り",
    image: "/Gemini_Generated_Image_ki0rsrki0rsrki0r.png",
    traits: ["細やか", "立体感覚", "装飾的", "女性的"],
    regions: ["東京都"],
    difficulty: "中級",
  },
  {
    id: "mizuhiki",
    name: "水引",
    description: "紙紐で結ぶ日本の心。贈り物の美学",
    image: "/Gemini_Generated_Image_t98lint98lint98l.png",
    traits: ["礼儀正しい", "結び好き", "贈り物好き", "細やか"],
    regions: ["長野県", "石川県"],
    difficulty: "中級",
  },
  {
    id: "kumiko",
    name: "組子",
    description: "釘を使わない木組みの技術。精密な幾何学模様",
    image: "/Gemini_Generated_Image_mr8q0zmr8q0zmr8q.png",
    traits: ["幾何学的", "精密", "数学的", "建築的"],
    regions: ["福岡県", "秋田県"],
    difficulty: "上級",
  },
  {
    id: "shippo",
    name: "七宝",
    description: "金属とガラスの美しい融合。宝石のような輝き",
    image: "/Gemini_Generated_Image_4elo3c4elo3c4elo.png",
    traits: ["宝石好き", "色彩感覚", "高級志向", "精密"],
    regions: ["愛知県", "東京都"],
    difficulty: "上級",
  },
  {
    id: "raden",
    name: "螺鈿",
    description: "貝殻の虹色の輝きを活かした装飾技法",
    image: "/Gemini_Generated_Image_xu82ouxu82ouxu82.png",
    traits: ["光好き", "虹色好き", "高級志向", "装飾的"],
    regions: ["京都府", "石川県"],
    difficulty: "上級",
  },
  {
    id: "maki-e",
    name: "蒔絵",
    description: "金粉で描く漆器の装飾。究極の美の追求",
    image: "/Gemini_Generated_Image_u7vdt5u7vdt5u7vd.png",
    traits: ["豪華", "金好き", "完璧主義", "高級志向"],
    regions: ["石川県", "京都府"],
    difficulty: "上級",
  },
  {
    id: "satsuma",
    name: "薩摩焼",
    description: "鹿児島の土が生む独特の風合いの陶器",
    image: "/Gemini_Generated_Image_dh6yw0dh6yw0dh6y.png",
    traits: ["土好き", "南国的", "素朴", "力強い"],
    regions: ["鹿児島県"],
    difficulty: "中級",
  },
  {
    id: "imari",
    name: "伊万里焼",
    description: "磁器の白地に美しい絵付けが映える",
    image: "/Gemini_Generated_Image_tqcljztqcljztqcl.png",
    traits: ["絵付け好き", "白好き", "上品", "国際的"],
    regions: ["佐賀県"],
    difficulty: "中級",
  },
  {
    id: "kutani",
    name: "九谷焼",
    description: "五彩の鮮やかな色絵が特徴的な磁器",
    image: "/Gemini_Generated_Image_yrro2kyrro2kyrro.png",
    traits: ["色彩豊か", "鮮やか", "絵画的", "華やか"],
    regions: ["石川県"],
    difficulty: "中級",
  },
  {
    id: "bizen",
    name: "備前焼",
    description: "釉薬を使わない土の美しさ。窯変の神秘",
    image: "/Gemini_Generated_Image_dxqp4cdxqp4cdxqp.png",
    traits: ["自然派", "素朴", "土好き", "偶然性"],
    regions: ["岡山県"],
    difficulty: "中級",
  },
  {
    id: "hagi",
    name: "萩焼",
    description: "茶人に愛される素朴で温かみのある陶器",
    image: "/Gemini_Generated_Image_oqcw85oqcw85oqcw.png",
    traits: ["茶道愛好", "素朴", "温かみ", "侘寂"],
    regions: ["山口県"],
    difficulty: "中級",
  },
  {
    id: "shigaraki",
    name: "信楽焼",
    description: "狸の置物で有名な素朴で親しみやすい陶器",
    image: "/Gemini_Generated_Image_9jmxc59jmxc59jmx.png",
    traits: ["親しみやすい", "素朴", "愛嬌", "庶民的"],
    regions: ["滋賀県"],
    difficulty: "初級",
  },
  {
    id: "tokoname",
    name: "常滑焼",
    description: "急須で有名な実用性に優れた陶器",
    image: "/Gemini_Generated_Image_91x7t291x7t291x7.png",
    traits: ["実用的", "茶好き", "機能美", "日常的"],
    regions: ["愛知県"],
    difficulty: "初級",
  },
  {
    id: "mashiko",
    name: "益子焼",
    description: "民芸運動の中心となった素朴で力強い陶器",
    image: "/Gemini_Generated_Image_ot3fguot3fguot3f.png",
    traits: ["民芸的", "力強い", "素朴", "実用的"],
    regions: ["栃木県"],
    difficulty: "初級",
  },
  {
    id: "kasama",
    name: "笠間焼",
    description: "自由な発想で作られる現代的な陶芸",
    image: "/Gemini_Generated_Image_76tu3u76tu3u76tu.png",
    traits: ["自由発想", "現代的", "創造的", "実験的"],
    regions: ["茨城県"],
    difficulty: "中級",
  },
  {
    id: "tamba",
    name: "丹波焼",
    description: "中世から続く歴史ある陶器。自然釉の美しさ",
    image: "/Gemini_Generated_Image_bofa7kbofa7kbofa.png",
    traits: ["歴史好き", "自然釉", "古典的", "重厚"],
    regions: ["兵庫県"],
    difficulty: "中級",
  },
  {
    id: "echizen",
    name: "越前焼",
    description: "日本六古窯の一つ。素朴で力強い焼き物",
    image: "/Gemini_Generated_Image_xs5h5dxs5h5dxs5h.png",
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
  const [selectedOption, setSelectedOption] = useState<number | null>(null)
  const [result, setResult] = useState<(typeof crafts)[0] | null>(null)

  // 診断リセット関数
  const resetQuiz = () => {
    setCurrentStep("start")
    setCurrentQuestion(0)
    setAnswers([])
    setResult(null)
  }

  const handleAnswer = (traits: string[], index: number) => {
    setSelectedOption(index)
    setTimeout(() => {
      const newAnswers = [...answers, ...traits]
      setAnswers(newAnswers)
      setSelectedOption(null)
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1)
      } else {
        calculateResult(newAnswers)
      }
    }, 180); // 0.18秒だけ選択状態を表示
  }

  const calculateResult = (allAnswers: string[]) => {
    const traitCounts: { [key: string]: number } = {}

    // 回答から特性をカウント
    allAnswers.forEach((trait) => {
      traitCounts[trait] = (traitCounts[trait] || 0) + 1;
    });

    // 各工芸品とのマッチ度を計算
    const craftScores = crafts.map((craft) => {
      let score = 0;
      craft.traits.forEach((trait) => {
        if (traitCounts[trait]) {
          score += traitCounts[trait];
        }
      });
      return { craft, score };
    });

    // スコアが最大の工芸品を選択
    const best = craftScores.reduce((a, b) => (a.score > b.score ? a : b));
    setResult(best.craft);
    setCurrentStep("result");
  };

        {/* 結果画面 */}
        {currentStep === "result" && result && (
          <div className="bg-[#F7F5E6] space-y-2">
            <Card className="bg-[#F7F5E6] border-border">
              <CardHeader className="bg-[#F7F5E6] text-center pb-1">
                <CardTitle className="bg-[#F7F5E6] text-2xl sm:text-3xl text-card-foreground text-center px-2 leading-tight break-words">あなたにおすすめの伝統工芸品</CardTitle>
              </CardHeader>
              <CardContent className="bg-[#F7F5E6] space-y-1 flex flex-col items-center justify-center">
                <div className="w-full max-w-md mx-auto h-40 flex items-center justify-center rounded-lg mb-1 bg-[#F7F5E6]">
                  <img
                    src={result?.image || "/placeholder.svg"}
                    alt={result?.name}
                    className="h-full object-cover rounded-lg bg-[#F7F5E6]"
                  />
                </div>
                <h2 className="text-3xl font-bold text-primary mb-0">{result?.name}</h2>
                <p className="text-lg text-card-foreground text-pretty mb-1">{result?.description}</p>

                <div className="flex flex-row gap-4 w-full justify-center mb-1">
                  <div className="flex flex-col items-start">
                    <h3 className="font-semibold text-card-foreground mb-0">あなたの特性</h3>
                    <div className="flex flex-wrap gap-0.5">
                      {result?.traits?.map((trait, index) => (
                        <Badge key={index} variant="secondary" className="bg-secondary text-secondary-foreground text-sm px-2 py-1">
                          {trait}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div className="flex flex-col items-start">
                    <h3 className="font-semibold text-card-foreground mb-0">主な産地</h3>
                    <div className="flex flex-wrap gap-0.5">
                      {result?.regions?.map((region, index) => (
                        <Badge key={index} variant="outline" className="border-border text-sm px-2 py-1">
                          {region}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex flex-col items-start w-full max-w-xs mb-1">
                  <h3 className="font-semibold text-card-foreground mb-0">難易度</h3>
                  <Badge
                    variant={
                      result?.difficulty === "初級"
                        ? "default"
                        : result?.difficulty === "中級"
                          ? "secondary"
                          : "destructive"
                    }
                    className={
                      result?.difficulty === "初級"
                        ? "bg-chart-3 text-white"
                        : result?.difficulty === "中級"
                          ? "bg-chart-2 text-white"
                          : "bg-chart-1 text-white"
                    }
                  >
                    {result?.difficulty}
                  </Badge>
                </div>

                <div className="text-center mb-1">
                  <p className="text-muted-foreground text-pretty mb-1">
                    この工芸品があなたの性格や好みに最も適しています。<br />ぜひ体験教室や工房見学から始めてみてください！
                  </p>
                  <div className="flex gap-1 justify-center">
                    <Button
                      onClick={() => resetQuiz()}
                      variant="outline"
                      className="border-border hover:bg-accent hover:text-accent-foreground bg-transparent px-3 py-1 text-base"
                    >
                      もう一度診断する
                    </Button>
                    <Button
                      className="bg-primary text-primary-foreground hover:bg-primary/90 px-3 py-1 text-base"
                      onClick={() => window.open(`https://www.google.com/search?q=${result?.name}+体験教室`, "_blank")}
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
                    .filter((craft) => craft.id !== result?.id)
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

  return (
  <div className="min-h-screen flex flex-col justify-between bg-[#F7F5E6]">
      <div className="flex-1">
        {/* 診断画面 or 結果画面 */}
          {currentStep === "start" ? (
            <div className="flex flex-col items-center justify-center h-full py-36">
              <Card className="bg-card border-border max-w-md w-full mx-auto px-4">
                <CardHeader className="text-center">
                  <CardTitle className="text-3xl text-card-foreground mb-2">伝統工芸診断</CardTitle>
                  <CardDescription className="text-lg text-muted-foreground">
                    あなたの性格や好みにぴったりな日本の伝統工芸品を診断します。<br />
                    いくつかの質問に答えるだけで、あなたにおすすめの工芸品が分かります。
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col justify-center items-center space-y-6">
                  <img src="/placeholder-logo.png" alt="ロゴ" className="w-28 h-28 mb-2 rounded-full border" />
                  <div className="w-full flex justify-center">
                    <Button
                      className="bg-primary text-primary-foreground text-lg px-8 py-4 rounded-xl hover:bg-primary/90 w-full max-w-xs mx-auto"
                      onClick={() => setCurrentStep("quiz")}
                    >
                      診断をはじめる
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          ) : currentStep !== "result" ? (
            <div className="flex flex-col items-center justify-center min-h-[60vh] py-8 px-0">
              {/* タイトル・説明のみ（進捗バー削除） */}
              <div className="w-full max-w-sm mx-auto flex flex-col items-center mb-6">
                <h1 className="text-2xl md:text-3xl font-bold text-center mb-2 tracking-wide">推し伝統品診断</h1>
                <p className="text-xs text-center text-muted-foreground mb-4 tracking-wider leading-relaxed font-normal">
                  １５の質問に答えて、５０種類の伝統工芸品から<br />
                  あなたにぴったりのものを発見してください
                </p>
              </div>
              {/* 質問文 */}
              <div className="w-9/12 max-w-sm mx-auto mb-6">
                <div className="flex items-center gap-4 mb-2">
                  <span className="text-lg md:text-xl font-normal text-gray-800 tracking-wide">質問 {currentQuestion + 1} / {questions.length}</span>
                  <div className="flex-1">
                    <div className="w-32 h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className="h-2 rounded-full bg-pink-300 transition-all"
                        style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
                <div className="text-xl md:text-2xl font-medium text-gray-900 leading-relaxed whitespace-pre-line text-left">
                  {questions[currentQuestion].question}
                </div>
              </div>
              {/* 選択肢カード */}
              <div className="w-full max-w-sm mx-auto grid grid-cols-2 gap-3 mb-4 font-normal">
                {questions[currentQuestion].options.map((option, index) => {
                  const isSelected = selectedOption === index;
                  return (
                    <button
                      key={index}
                      onClick={() => handleAnswer(option.traits, index)}
                      className={`rounded-xl border-2 px-6 py-12 text-center text-lg font-medium shadow transition-all whitespace-pre-line tracking-wide
                        ${isSelected ? "bg-pink-200 text-white border-rose-500" : "bg-white text-gray-800 border-rose-300 hover:bg-pink-50"}`}
                      style={{ fontFamily: 'Hina Mincho, Noto Sans JP, serif' }}
                      disabled={selectedOption !== null}
                    >
                      {option.text}
                    </button>
                  );
                })}
              </div>
            </div>
          ) : result ? (
          <div className="space-y-6">
            <Card className="bg-card border-border">
              <CardHeader className="text-center">
                <CardTitle className="text-5xl text-card-foreground">診断結果</CardTitle>
                <CardTitle className="text-2xl text-card-foreground">あなたにおすすめの伝統工芸品</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="text-center">
                  <img
                    src={result?.image || "/placeholder.svg"}
                    alt={result?.name || "工芸品"}
                    className="w-full max-w-md mx-auto h-64 object-cover rounded-lg mb-4"
                  />
                  <h2 className="text-3xl font-bold text-primary mb-2">{result?.name}</h2>
                  <p className="text-lg text-card-foreground text-pretty">{result?.description}</p>
                </div>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-semibold text-card-foreground mb-3">あなたの特性</h3>
                    <div className="flex flex-wrap gap-2">
                      {result?.traits?.map((trait, index) => (
                        <Badge key={index} variant="secondary" className="bg-secondary text-secondary-foreground">
                          {trait}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h3 className="font-semibold text-card-foreground mb-3">主な産地</h3>
                    <div className="flex flex-wrap gap-2">
                      {result?.regions?.map((region, index) => (
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
                      result?.difficulty === "初級"
                        ? "default"
                        : result?.difficulty === "中級"
                          ? "secondary"
                          : "destructive"
                    }
                    className={
                      result?.difficulty === "初級"
                        ? "bg-chart-3 text-white"
                        : result?.difficulty === "中級"
                          ? "bg-chart-2 text-white"
                          : "bg-chart-1 text-white"
                    }
                  >
                    {result?.difficulty}
                  </Badge>
                </div>
                <div className="text-center space-y-4">
                  <p className="text-muted-foreground text-pretty">
                    この工芸品があなたの性格や好みに最も適しています。<br />ぜひ体験教室や工房見学から始めてみてください！
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
                      onClick={() => window.open(`https://www.google.com/search?q=${result?.name}+体験教室`, "_blank")}
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
                    .filter((craft) => craft.id !== result?.id)
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
        ) : null}
      </div>
      {/* 下部和柄（画像波模様） */}
  <div className="w-full h-[320px] bg-transparent flex-shrink-0">
        <img src="/Gemini_Generated_Image_bpwekbpwekbpwekb (1).png" alt="和柄波模様" className="w-full h-full object-cover" />
      </div>
    </div>

  );
}
