from docx import Document
from lxml import etree
d=Document(r'C:/Users/lintianhao/WorkBuddy/2026-06-12-10-12-10/v6_latest.docx')
ns='http://schemas.openxmlformats.org/wordprocessingml/2006/main'
body=d.element.body

def add_para(text):
    p=etree.SubElement(body,'{'+ns+'}p')
    r=etree.SubElement(p,'{'+ns+'}r')
    t=etree.SubElement(r,'{'+ns+'}t')
    t.text=text
    t.set('{http://www.w3.org/XML/1998/namespace}space','preserve')

lines=[
'',
'',
'\u2554\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2557',
'\u2551  \u7d20\u6750\u751f\u6210\u6e05\u5355 V6 \u00b7 3\u8f6e\u4e13\u5bb6\u5ba1\u67e5\u901a\u8fc7  \u2551',
'\u2551  \u5de5\u5177:GPT-Images2 \u00b7 16:9             \u2551',
'\u255a\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u255d',
]

# Instead of using Chinese directly which may encode wrong, let me use simple markers
# and write the actual content inline
content = r"""【素材生成清单 · 3轮专家审查通过】

== 审查摘要 ==
R1 GPT-Images2专家:所有Prompt已适配参数语法。表情参考图加"keep exact same facial structure"约束。Q版透明背景备注"white bg OK, post-remove"。
R2 连续性专家:Q5用户已有抓狂Q版->复用勿重生成。E2深坑全景用户已有场景图->此处为补充细节版。所有Q版与V6镜头描述一致。
R3 Loart专家:Q版全改为静态图(非Seedance视频)。特效素材isolated on black=后期叠加图层。16:9首帧图比例统一。

═══════════════════════════════
一、Q版表情（6张·GPT-Images2·静态图）
═══════════════════════════════
全部规格:chibi style,2-heads,white T-shirt,short dark hair,clean line art,white background

【Q1·打呵欠】用途:一段C·C7
Prompt:chibi style,2-heads proportion,teenage boy,white T-shirt,short dark hair,yawning with mouth wide open,single teardrop at corner of eye,tired sleepy expression,white background,clean anime line art --ar 1:1
审查:与V6镜头描述一致。白色背景便于后期抠图。

【Q2·拍脸震惊】用途:二段C·C9
Prompt:chibi style,2-heads proportion,teenage boy,white T-shirt,short dark hair,both hands slapping own cheeks simultaneously,eyes wide open in exaggerated shock,mouth forming big O shape,anime comedic expression,white background,clean line art --ar 1:1
审查:注意是"双手同时拍脸"非"单手戳脸"。与V6一致。

【Q3·好奇震惊】用途:三段C·C8(画中画)
Prompt:chibi style,2-heads proportion,teenage boy,white T-shirt,short dark hair,both hands on cheeks,wide eyes with curious sparkle in pupils(not fearful),mouth forming small O shape,curious-shocked expression,white background(post-remove to transparent PNG,overlay at 1/4 screen) --ar 1:1
审查:MUST区分于Q4。Q3=好奇震惊(瞳孔正常+眼中微光)。Q4=确认震惊(瞳孔缩小)。分开生成。

【Q4·确认震惊】用途:四段C·C8(画中画)
Prompt:chibi style,2-heads proportion,teenage boy,white T-shirt,short dark hair,both hands on cheeks,wide eyes with small contracted pinpoint pupils(confirming shock NOT curious),mouth forming O shape,expression of sudden realization,white background(post-remove to transparent PNG,overlay at 1/4 screen,stone tablet text still visible) --ar 1:1
审查:瞳孔缩小是Q4的唯一区分特征。生成后对比Q3确认两张不同。

【Q5·抓狂】用途:五段C·C9
Prompt:chibi style,2-heads proportion,teenage boy,white T-shirt,short dark hair,panicked desperate expression,hands pressing both cheeks,three squiggly black stress lines floating above head,exaggerated anime despair,white background,clean line art --ar 1:1
审查:用户已有抓狂Q版。如已有素材与此Prompt一致则复用,勿重复生成。

【Q6·不是梦】用途:四段C·C9(全屏卡+后期配音)
Prompt:chibi style,2-heads proportion,teenage boy,white T-shirt,short dark hair,looking down at own open palm with four small indent marks visible,head slowly lifting up,mouth forming words in exaggerated anime speech style,expression transitioning from shock to dawning realization to seriousness,white background --ar 1:1
审查:全片唯一有台词的Q版。确保手掌凹陷小坑可见(呼应"指甲用力一掐")。后期配音"不是梦..."(气声)。

═══════════════════════════════
二、表情参考图（6组·GPT-Images2·参考图模式）
═══════════════════════════════
方法:上传男生三视图正面->GPT-Images2参考图模式->每段改表情
约束:keep exact same facial structure,hair,white T-shirt,body proportion as reference image,only change expression
每组生成3张(起始-中间-结束),取最佳放入参考图模式

【F1】一段A/B/C·专注->平静->疲惫
neutral focused expression,slightly tired eyes,relaxed eyebrows,calm demeanor,upper body framing,consistent lighting with reference --ar 16:9

【F2】二段A/B/C·不安->恐惧->警觉
tightened brows,lips slightly parted in unease,eyes widened with alertness,slight tension in jaw,transitioning from anxious to fearful to alert,same clothing --ar 16:9

【F3】三段A/B/C·谨慎->犹豫->惊恐
narrowed cautious eyes scanning environment,then hesitant lip bite,then full shocked expression with dilated pupils,same white T-shirt --ar 16:9

【F4】四段A/B/C·眩晕->震撼->凝视
unfocused dizzy gaze,then jaw slightly dropped in awe,then furrowed brows with determined intense stare,same clothing --ar 16:9

【F5】五段A/B/C/D·吸引->恐惧->拼命->决意
trance-like drawn gaze as if hypnotized by an object,then pure terror with eyes wide,then desperate sprint face,then cold resolve with very slight confident smirk at corner of mouth --ar 16:9

【F6】六段A/B/C·紧张->燃->喘息
tense combat focus with narrowed eyes,then fierce battle cry with mouth open,then exhausted heavy breathing with thin bleeding cut on left cheek --ar 16:9

═══════════════════════════════
三、场景/道具补充（5张·GPT-Images2）
═══════════════════════════════

【E1·石门+紫光】用途:三段C·C7
Prompt:ancient broken stone gate in thick fog,two massive tilted stone pillars forming an archway,thin layer of purple glowing energy membrane floating in center like water ripples,faint purple electric patterns on surface,gray stone debris ground,atmospheric fog,dark fantasy,16:9 cinematic composition --ar 16:9
审查:紫光是半透明薄膜状非固体门。与V6"水面波纹般缓慢流动"一致。

【E2·深坑全景+巨剑】用途:四段B·B4
Prompt:massive circular crater hundreds of meters wide,shattered stone tablets and fallen pillars on walls,scattered rusted swords broken shields on ground,a giant broken sword with chipped notched blade stuck diagonally in the foreground-right ground,dull amber sky without sun,faint blue light pulsing rhythmically from crater bottom,suspended dust particles,gray-brown epic tones --ar 16:9
审查:用户已有深坑场景图。此Prompt生成补充细节版(巨剑前景+蓝光脉动+琥珀天空),非替代已有场景。

【E3·石台+刀】用途:五段A·A1
Prompt:low broken stone platform at center of ancient crater,an elegant long curved sword stuck diagonally into the stone,dark silver-steel blade reflecting faint blue light from below,dark leather-wrapped hilt with ancient alien symbols carved into it(same script as stone tablet text),faint white glow pulsing around the sword base like breathing,16:9 --ar 16:9
审查:刀已锁定无误。石台+刀构图用于五段A首帧图。刀柄符号=异世界古文。

【E4·雾墙】用途:五段C·C9及六段全程
Prompt:thick white fog cascading down from the sky like a waterfall curtain,forming a several-meter-high impenetrable barrier of dense mist,stone debris ground visible at the base,the wall surface glowing faintly from within,blocking the path completely,eerie atmospheric,16:9 --ar 16:9
审查:雾墙是持续性场景道具(五段C至六段C)。此图作为空间锚点参考。

【E5·石碑+文字】用途:四段C·C8及六段C·F12
Prompt:ancient broken stone tablet about one persons height,tilted and stuck in stone debris ground,thick layer of gray dust being brushed away by a hand revealing sharp angular alien carved script underneath,each stroke like a knife cut,the script glowing with extremely faint blue light,dim amber sky lighting,16:9 --ar 16:9
审查:文字=笔画锐利棱角分明的异世界古文(非中文/日文/英文)。与刀柄符号同源。

═══════════════════════════════
四、特效素材（3张·GPT-Images2·后期叠加）
═══════════════════════════════
说明:全部isolated on black=导入剪映后使用Screen混合模式叠加

【V1·光羽】用途:五段A3起全段
Prompt:single delicate feather made of pure white light energy,glowing softly,translucent,ethereal,floating upward with subtle particle trail behind,isolated on pure black background,anime-style energy effect --ar 1:1
审查:光羽规则:从刀身脱离后向上飘升10-20cm后消散。此图作为循环叠加素材。

【V2·白光光环】用途:五段C·C8及六段全程
Prompt:three-dimensional ring of white light energy wrapping around a wrist,glowing brightly,translucent,with subtle particle emission radiating outward,anime power-up energy effect,isolated on pure black background --ar 1:1
审查:三维环状缠绕(非平面贴图)。生成后测试与手腕匹配度。

【V3·结尾卡】用途:六段C·F11结尾
Prompt:pure black screen with elegant white serif text in bottom right corner reading To Be Continued,text has subtle black drop shadow for readability,clean minimalist cinematic design,16:9 --ar 16:9
审查:白色文字+黑色阴影=在任何灰化天空背景上可读。1.5s停留。

═══════════════════════════════
五、生成优先级与验证
═══════════════════════════════
P0(立即):表情参考图F1-F6(6组约18张取6张)
P0(立即):Q版Q1-Q6(6张·若Q5已有则5张)
P1(随后):场景补充E1-E5(5张·E2/E3可能已有素材可复用)
P2(最后):特效V1-V3(3张·后期叠加)

总计需生成:6组表情+6张Q版+5张场景+3张特效=20组素材
已有可复用:男生三视图·怪物三视图·刀三视图·3场景·灵魂之火·Q5抓狂

验证流程:每张生成后->与V6对应段落描述逐项核对->不符则调整Prompt重生成->确认后编号归档->导入Loart参考图模式
"""

for line in content.split('\n'):
    add_para(line)

d.save(r'C:/Users/lintianhao/Desktop/分镜稿_V6_终稿.docx')
print('Done: asset list appended to V6')
