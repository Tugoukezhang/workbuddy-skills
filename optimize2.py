from docx import Document

doc = Document(r'C:\Users\lintianhao\Desktop\分镜稿.docx')
changes = 0

for p in doc.paragraphs:
    t = p.text
    if not t: continue

    # STED1: 二段镜1 - add sun temple hint
    if '像玻璃碎裂的纹路从眼角向外蔓延' in t and '黑屏碎裂散落' in t:
        new = t.replace('黑屏碎裂散落', '这些裂纹不在屏幕上——而是在他太阳穴附近的皮肤下微微发光一瞬。黑屏碎裂散落')
        for r in p.runs:
            if '黑屏碎裂散落' in r.text:
                r.text = new
                changes += 1
                break

    # UX2: 三段镜1 - Q版 at start of segment 3
    if '锁定声音方向' in t and '视线在浓雾中扫过' in t and '放下戒备' in str(p.text):
        for r in p.runs:
            if '锁定声音方向' in r.text:
                r.text = r.text + ' Q版小人在画面左上角弹出——炸毛瞪眼0.5秒消失。'
                changes += 1
                break

    # KAN1: F7 - composition anchor
    if 'both hands gripping the blade overhead' in t and 'Extreme sense of height' in t:
        new = t.replace('Extreme sense of height and speed', 'The boy fills the upper third of the frame, the monster core eye in the lower third. Extreme sense of height and speed')
        for r in p.runs:
            if 'Extreme sense of height and speed' in r.text:
                r.text = new
                changes += 1
                break

    # VFX2: F6 - stone weight
    if 'the slab soars up to the monster' in t and 'stepping platform mid-air' in t:
        new = t.replace('stepping platform mid-air', "stepping platform mid-air, the slab's rough edges crack and shed small stone fragments as it flies, showing its immense mass")
        for r in p.runs:
            if 'stepping platform mid-air' in r.text:
                r.text = new
                changes += 1
                break

    # PSY1: F5 - immediate pain reaction
    if 'A flying rock shard cuts a thin bleeding line across his cheek' in t and 'Wide-angle shot' in t:
        new = t.replace('Wide-angle shot', 'A sharp grimace crosses his face for a split second — then he forces it down. Wide-angle shot')
        for r in p.runs:
            if 'Wide-angle shot' in r.text and 'cuts a thin bleeding' in t:
                r.text = new
                changes += 1
                break

    # SC1: 五段环境 - distance annotation
    if '深坑正中心，一把精美的长刀斜插在低矮残破石台之上' in t and '环境：同上' in t:
        new = t.replace('环境：同上。深坑正中心', '环境：同上。石碑距深坑中心约100米。深坑正中心')
        for r in p.runs:
            if '环境：同上。深坑正中心' in r.text:
                r.text = new
                changes += 1
                break

    # SC2: F6-F11 - battle scar continuity (F6)
    if 'using it as a stepping platform mid-air' in t and 'crack and shed' in t:
        for r in p.runs:
            if 'cracked battlefield ground' in r.text and 'the slab soars' not in t:
                r.text = r.text.replace('cracked battlefield ground', 'battlefield ground scarred with impact craters from the earlier attacks')
                changes += 1
                break

    # CUL1: 五段镜2 - knife symbols hint
    if '和石碑上那行文字的笔画系统如出一辙' in t:
        for r in p.runs:
            if '如出一辙' in r.text:
                r.text = r.text.replace('如出一辙', '如出一辙——其中几个笔画无意中构成了残破的"封"字轮廓')
                changes += 1
                break

    # UX1: 三段镜2-3 - add environment detail between exploration and discovery
    if '每一脚踏在碎石上都是' in t and '猎人的谨慎' in t:
        for r in p.runs:
            if '先脚尖试探、再脚跟着力' in r.text:
                r.text = r.text + '。远处雾中又传来一声碎石滚动——他在黑暗中停了一秒，确认方向，继续前行'
                changes += 1
                break

doc.save(r'C:\Users\lintianhao\Desktop\分镜稿.docx')
print(f'Changes: {changes}')
